'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-xs w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm"
          style={{
            background: '#fff',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
            animation: 'fadeUp 0.25s ease both',
          }}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#16a34a' }} />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />}
          {toast.type === 'info' && <Info className="w-4 h-4 shrink-0" style={{ color: 'var(--dusky-lilac)' }} />}
          <span className="font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
