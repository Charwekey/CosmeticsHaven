'use client';

import React, { useState, useEffect } from 'react';
import { mockDb } from '@/lib/db/mock-db';
import { formatDate } from '@/lib/utils';
import { User } from '@/lib/types';
import { Users, Mail, Phone, MapPin, Calendar, Sparkles } from 'lucide-react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<User[]>([]);

  useEffect(() => {
    setCustomers(mockDb.getCustomers());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Client Management</p>
          <h2 className="font-serif-luxury text-3xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>
            Customer <span className="heading-gradient">Profiles</span> ({customers.length})
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            View all registered clients, contact numbers, and delivery locations.
          </p>
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="card-elevated p-16 text-center space-y-3">
          <Users className="w-12 h-12 mx-auto opacity-30" style={{ color: 'var(--dusky-lilac)' }} />
          <p className="font-serif-luxury text-xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>
            No registered clients yet
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            When clients sign up on the site or place an order, their profiles will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customers.map((cust) => (
            <div
              key={cust.id}
              className="card p-5 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white font-serif-luxury shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--midnight-orchid), #5a4270)' }}
                >
                  {cust.name?.charAt(0).toUpperCase() || 'C'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm" style={{ color: 'var(--midnight-orchid)' }}>{cust.name}</h4>
                    <span className="badge badge-orchid text-[9px]">Client</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    <Calendar className="w-3 h-3" />
                    <span>Registered {formatDate(cust.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div
                className="space-y-1.5 text-xs pt-3 border-t"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" style={{ color: 'var(--dusky-lilac)' }} />
                  <span className="font-medium">{cust.email}</span>
                </div>
                {cust.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" style={{ color: 'var(--dusky-lilac)' }} />
                    <span>{cust.phone}</span>
                  </div>
                )}
                {(cust.address || cust.city) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--dusky-lilac)' }} />
                    <span>{cust.address ? `${cust.address}, ` : ''}{cust.city || 'Accra'}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
