'use client';

import React from 'react';
import { mockDb } from '@/lib/db/mock-db';
import { formatDate } from '@/lib/utils';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

export default function AdminCustomersPage() {
  const customers = mockDb.getCustomers();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif-luxury text-3xl font-bold text-stone-900">Customer Profiles</h2>
        <p className="text-stone-600 text-xs">View registered clients, contact numbers, and location details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.map((cust) => (
          <div
            key={cust.id}
            className="glass-panel rounded-3xl p-5 border border-white/90 shadow-sm space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gold-gradient-btn flex items-center justify-center font-bold text-stone-950 font-serif-luxury text-lg">
                {cust.name.charAt(0)}
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[9px]">
                  {cust.role}
                </span>
                <h4 className="font-bold text-stone-900 text-sm">{cust.name}</h4>
                <span className="text-[10px] text-stone-500">Joined {formatDate(cust.createdAt)}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-stone-600 pt-2 border-t border-stone-200/60">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-700" />
                <span>{cust.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>{cust.phone || '+233 24 000 0000'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>{cust.address || 'East Legon'}, {cust.city || 'Accra'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
