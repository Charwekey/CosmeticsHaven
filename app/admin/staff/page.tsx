'use client';

import React, { useState, useEffect } from 'react';
import { mockDb } from '@/lib/db/mock-db';
import { StaffMember, StaffRole, StaffPrivileges, DEFAULT_PRIVILEGES } from '@/lib/types';
import { useShop } from '@/context/ShopContext';
import {
  Users,
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  Eye,
  EyeOff,
  X,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
  UserPlus,
} from 'lucide-react';

// ── Privilege labels for the toggle grid ──────────────────────────────────────
const PRIVILEGE_LABELS: { key: keyof StaffPrivileges; label: string; desc: string }[] = [
  { key: 'products',   label: 'Products',   desc: 'Add, edit, delete products' },
  { key: 'categories', label: 'Categories', desc: 'Manage product categories' },
  { key: 'orders',     label: 'Orders',     desc: 'View & update order status' },
  { key: 'customers',  label: 'Customers',  desc: 'View customer profiles' },
  { key: 'reviews',    label: 'Reviews',    desc: 'Moderate customer reviews' },
  { key: 'coupons',    label: 'Coupons',    desc: 'Manage discount codes' },
  { key: 'reports',    label: 'Reports',    desc: 'Access sales reports' },
  { key: 'cms',        label: 'CMS',        desc: 'Manage website content' },
  { key: 'staff',      label: 'Staff Mgmt', desc: 'Add & manage other staff' },
];

const ROLE_COLORS: Record<StaffRole, { bg: string; text: string; label: string }> = {
  SUPER_ADMIN: { bg: '#312A44', text: '#D7C5D8', label: 'Super Admin' },
  MANAGER:     { bg: '#88708E', text: '#fff',    label: 'Manager' },
  SALES:       { bg: '#4CAF7D', text: '#fff',    label: 'Sales Staff' },
  CONTENT:     { bg: '#7B68EE', text: '#fff',    label: 'Content Staff' },
};

const BLANK_FORM = {
  name: '', email: '', phone: '', password: '', confirmPassword: '',
  staffRole: 'MANAGER' as StaffRole,
  privileges: { ...DEFAULT_PRIVILEGES['MANAGER'] },
};

export default function StaffPage() {
  const { currentUser } = useShop();
  const [staff, setStaff]         = useState<StaffMember[]>([]);
  const [showForm, setShowForm]   = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPw, setShowPw]       = useState(false);
  const [form, setForm]           = useState({ ...BLANK_FORM });
  const [formError, setFormError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Refresh staff list
  const refresh = () => setStaff([...mockDb.getStaff()]);
  useEffect(() => { refresh(); }, []);

  // When role changes in the form, reset privileges to defaults
  const handleRoleChange = (role: StaffRole) => {
    setForm((f) => ({ ...f, staffRole: role, privileges: { ...DEFAULT_PRIVILEGES[role] } }));
  };

  const togglePrivilege = (key: keyof StaffPrivileges) => {
    setForm((f) => ({ ...f, privileges: { ...f.privileges, [key]: !f.privileges[key] } }));
  };

  const openNew = () => {
    setForm({ ...BLANK_FORM, privileges: { ...DEFAULT_PRIVILEGES['MANAGER'] } });
    setEditingId(null);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (member: StaffMember) => {
    setForm({
      name: member.name,
      email: member.email,
      phone: member.phone ?? '',
      password: '',
      confirmPassword: '',
      staffRole: member.staffRole,
      privileges: { ...member.privileges },
    });
    setEditingId(member.id);
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const { name, email, phone, password, confirmPassword, staffRole, privileges } = form;

    if (!name || !email) { setFormError('Name and email are required.'); return; }
    if (!editingId && !password) { setFormError('Password is required for new staff.'); return; }
    if (password && password.length < 6) { setFormError('Password must be at least 6 characters.'); return; }
    if (password && password !== confirmPassword) { setFormError('Passwords do not match.'); return; }

    // Check for duplicate email
    const existingStaff = mockDb.getStaffByEmail(email);
    if (existingStaff && existingStaff.id !== editingId) { setFormError('A staff member with this email already exists.'); return; }

    if (editingId) {
      // Update
      const updates: Partial<Omit<StaffMember, 'id' | 'createdAt' | 'createdBy'>> = {
        name, email, phone, staffRole, privileges,
        ...(password ? { password } : {}),
      };
      mockDb.updateStaff(editingId, updates);
    } else {
      // Create
      mockDb.addStaff({
        name, email, phone, staffRole,
        password,
        privileges,
        createdBy: currentUser?.id ?? 'admin',
      });
    }

    refresh();
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    mockDb.deleteStaff(id);
    refresh();
    setDeleteConfirm(null);
  };

  const handleToggleActive = (member: StaffMember) => {
    mockDb.updateStaff(member.id, { active: !member.active });
    refresh();
  };

  return (
    <div className="space-y-6">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Access Control</p>
          <h2 className="font-serif-luxury text-3xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>
            Staff <span className="heading-gradient">Management</span>
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Add staff members, assign roles, and control what each person can access.
          </p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm px-5 py-2.5 gap-2 shrink-0">
          <UserPlus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {/* ── Role Reference Cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.entries(ROLE_COLORS) as [StaffRole, typeof ROLE_COLORS[StaffRole]][]).map(([role, meta]) => {
          const priv = DEFAULT_PRIVILEGES[role];
          const count = Object.values(priv).filter(Boolean).length;
          return (
            <div key={role} className="card p-4 space-y-2">
              <span className="badge text-[10px] px-2.5 py-1" style={{ background: meta.bg, color: meta.text }}>
                {meta.label}
              </span>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {count} of {PRIVILEGE_LABELS.length} permissions
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {PRIVILEGE_LABELS.map(({ key, label }) => (
                  <span
                    key={key}
                    className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={priv[key]
                      ? { background: 'var(--plum-blossom)', color: 'var(--midnight-orchid)' }
                      : { background: 'var(--silver-wisteria)', color: 'var(--text-muted)', opacity: 0.6 }
                    }
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Staff Table ──────────────────────────────────────────── */}
      <div className="card-elevated overflow-hidden">
        {staff.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Users className="w-12 h-12 mx-auto opacity-25" style={{ color: 'var(--dusky-lilac)' }} />
            <p className="font-serif-luxury text-xl font-semibold" style={{ color: 'var(--midnight-orchid)' }}>
              No staff members yet
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Click "Add Staff" to invite your first team member.
            </p>
            <button onClick={openNew} className="btn-primary text-sm mt-2 inline-flex gap-2 items-center">
              <Plus className="w-4 h-4" /> Add First Staff Member
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
                  {['Staff Member', 'Role', 'Permissions', 'Status', 'Added', 'Actions'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => {
                  const meta = ROLE_COLORS[member.staffRole];
                  const permCount = Object.values(member.privileges).filter(Boolean).length;
                  return (
                    <tr key={member.id} className="transition-colors hover:bg-[var(--bg)]"
                      style={{ borderBottom: '1px solid var(--border)' }}>

                      {/* Name + email */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
                            style={{ background: `${meta.bg}` }}>
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: 'var(--midnight-orchid)' }}>{member.name}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{member.email}</p>
                            {member.phone && <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{member.phone}</p>}
                          </div>
                        </div>
                      </td>

                      {/* Role badge */}
                      <td className="px-5 py-4">
                        <span className="badge text-[10px]" style={{ background: meta.bg, color: meta.text }}>
                          {meta.label}
                        </span>
                      </td>

                      {/* Permissions summary */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {PRIVILEGE_LABELS.map(({ key, label }) => (
                            <span key={key}
                              className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                              style={member.privileges[key]
                                ? { background: 'var(--plum-blossom)', color: 'var(--midnight-orchid)' }
                                : { display: 'none' }
                              }>
                              {label}
                            </span>
                          ))}
                          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                            {permCount}/{PRIVILEGE_LABELS.length}
                          </span>
                        </div>
                      </td>

                      {/* Active toggle */}
                      <td className="px-5 py-4">
                        <button onClick={() => handleToggleActive(member)}
                          className="flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70">
                          {member.active
                            ? <><ToggleRight className="w-5 h-5" style={{ color: '#16a34a' }} /><span style={{ color: '#16a34a' }}>Active</span></>
                            : <><ToggleLeft className="w-5 h-5" style={{ color: 'var(--text-muted)' }} /><span style={{ color: 'var(--text-muted)' }}>Inactive</span></>
                          }
                        </button>
                      </td>

                      {/* Date added */}
                      <td className="px-5 py-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {new Date(member.createdAt).toLocaleDateString('en-GH', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(member)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition hover:opacity-70"
                            style={{ background: 'var(--plum-blossom)' }}>
                            <Edit3 className="w-3.5 h-3.5" style={{ color: 'var(--midnight-orchid)' }} />
                          </button>
                          <button onClick={() => setDeleteConfirm(member.id)}
                            className="w-8 h-8 rounded-xl flex items-center justify-center transition hover:opacity-70"
                            style={{ background: '#fee2e2' }}>
                            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          ADD / EDIT STAFF MODAL
      ══════════════════════════════════════════════════════════════ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ background: 'rgba(49,42,68,0.55)', backdropFilter: 'blur(4px)' }}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">

            {/* Modal header */}
            <div className="px-8 py-5 flex items-center justify-between"
              style={{ background: 'var(--midnight-orchid)' }}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" style={{ color: 'var(--plum-blossom)' }} />
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  {editingId ? 'Edit Staff Member' : 'Add New Staff Member'}
                </h3>
              </div>
              <button onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">

              {/* ─ Basic Info ─ */}
              <div>
                <p className="eyebrow mb-3">Basic Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--midnight-orchid)' }}>
                      Full Name *
                    </label>
                    <input className="input-base" placeholder="e.g. Abena Mensah"
                      value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--midnight-orchid)' }}>
                      Email Address *
                    </label>
                    <input className="input-base" type="email" placeholder="staff@example.com"
                      value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--midnight-orchid)' }}>
                      Phone Number
                    </label>
                    <input className="input-base" placeholder="+233 24 000 0000"
                      value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--midnight-orchid)' }}>
                      Role *
                    </label>
                    <select className="input-base"
                      value={form.staffRole} onChange={(e) => handleRoleChange(e.target.value as StaffRole)}>
                      <option value="SUPER_ADMIN">Super Admin</option>
                      <option value="MANAGER">Manager</option>
                      <option value="SALES">Sales Staff</option>
                      <option value="CONTENT">Content Staff</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ─ Password ─ */}
              <div>
                <p className="eyebrow mb-3">{editingId ? 'Change Password (leave blank to keep)' : 'Set Password'}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--midnight-orchid)' }}>
                      {editingId ? 'New Password' : 'Password *'}
                    </label>
                    <input className="input-base pr-10" type={showPw ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 bottom-2.5 hover:opacity-70" style={{ color: 'var(--dusky-lilac)' }}>
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--midnight-orchid)' }}>
                      Confirm Password
                    </label>
                    <input className="input-base" type="password" placeholder="Repeat password"
                      value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} />
                  </div>
                </div>
              </div>

              {/* ─ Permissions Toggle Grid ─ */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="eyebrow">Permissions</p>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Defaults loaded from role · customise below
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PRIVILEGE_LABELS.map(({ key, label, desc }) => {
                    const granted = form.privileges[key];
                    return (
                      <button key={key} type="button" onClick={() => togglePrivilege(key)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all"
                        style={granted
                          ? { background: 'var(--plum-blossom)', borderColor: 'var(--iris-mist)' }
                          : { background: 'var(--bg)', borderColor: 'var(--border)' }
                        }>
                        {granted
                          ? <CheckCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--midnight-orchid)' }} />
                          : <XCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
                        }
                        <div>
                          <p className="text-xs font-bold" style={{ color: granted ? 'var(--midnight-orchid)' : 'var(--text-muted)' }}>
                            {label}
                          </p>
                          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Error */}
              {formError && (
                <div className="rounded-xl px-4 py-3 text-xs font-medium border"
                  style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#b91c1c' }}>
                  {formError}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm px-6 py-2.5">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm px-6 py-2.5 gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  {editingId ? 'Save Changes' : 'Create Staff Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ─────────────────────────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(49,42,68,0.55)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold" style={{ color: 'var(--midnight-orchid)' }}>Remove Staff Member?</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              This will permanently remove their access. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary text-sm px-5 py-2.5">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="text-sm px-5 py-2.5 rounded-full font-semibold text-white bg-rose-600 hover:bg-rose-700 transition">
                Remove Access
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
