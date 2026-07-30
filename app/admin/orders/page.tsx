'use client';

import React, { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { mockDb } from '@/lib/db/mock-db';
import { Order, OrderStatus } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ShoppingBag, Eye, X, CheckCircle2 } from 'lucide-react';

export default function AdminOrdersPage() {
  const { showToast } = useShop();
  const [orders, setOrders] = useState<Order[]>(mockDb.getOrders());
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === 'ALL') return true;
    return o.status === statusFilter;
  });

  const handleStatusChange = (id: string, status: OrderStatus) => {
    mockDb.updateOrderStatus(id, status);
    setOrders([...mockDb.getOrders()]);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
    showToast(`Order status updated to ${status}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Order Management</h2>
          <p className="text-stone-600 text-xs">Track, update delivery status, and review customer receipts.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'READY', 'COMPLETED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
              statusFilter === st
                ? 'gold-gradient-btn text-stone-950 shadow-sm'
                : 'bg-white/60 text-stone-700 hover:bg-white'
            }`}
          >
            {st} ({st === 'ALL' ? orders.length : orders.filter((o) => o.status === st).length})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/90 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200/80 text-stone-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Tracking Code</th>
                <th className="py-3 px-3">Customer & Location</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Total</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/50">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/60 transition">
                  <td className="py-3 px-3 font-mono font-bold text-amber-900">{ord.trackingCode}</td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-stone-900 block">{ord.customerName}</span>
                    <span className="text-[10px] text-stone-500">{ord.deliveryAddress}, {ord.city}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-stone-700">{ord.paymentMethod}</span>
                  </td>
                  <td className="py-3 px-3 text-stone-500">{formatDate(ord.createdAt)}</td>
                  <td className="py-3 px-3 font-bold text-stone-900">{formatCurrency(ord.total)}</td>
                  <td className="py-3 px-3">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                      className="bg-white border border-stone-300 rounded-lg px-2 py-1 text-[11px] font-bold"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="READY">READY</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 space-y-4 border border-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700">Order Invoice</span>
                <h3 className="font-serif-luxury text-xl font-bold text-stone-900">
                  {selectedOrder.trackingCode}
                </h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500">Customer Name:</span>
                <span className="font-bold text-stone-900">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Phone:</span>
                <span className="font-bold text-stone-900">{selectedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-bold text-stone-900 text-right">{selectedOrder.deliveryAddress}, {selectedOrder.city}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 text-xs">Items Purchased:</h4>
              {selectedOrder.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span>{item.productName} (x{item.quantity})</span>
                  <span className="font-bold text-amber-900">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between font-bold text-stone-900 text-sm">
              <span>Total Amount:</span>
              <span className="text-amber-900">{formatCurrency(selectedOrder.total)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
