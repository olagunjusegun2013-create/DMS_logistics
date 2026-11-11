import React, { useState } from 'react';
import { UserProfile, ScreenId } from '../../types/logistics';

interface SettingsSectionProps {
  currentUser: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onDeleteAllDemoData: () => void;
  onRestoreDemoData: () => void;
  onNavigate: (screenId: ScreenId) => void;
  hasDemoData: boolean;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  currentUser,
  onUpdateUser,
  onDeleteAllDemoData,
  onRestoreDemoData,
  hasDemoData,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [hub, setHub] = useState(currentUser.hub);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...currentUser,
      name,
      email,
      phone,
      hub,
    });
    setIsEditing(false);
    showToast('Administrator profile settings updated successfully');
  };

  const handleExecuteDeleteDemo = () => {
    onDeleteAllDemoData();
    setConfirmModal(false);
    showToast('All demo couriers, clients, and mock consignments deleted!');
  };

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#142b45] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-secondary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 bg-[#0c1d2c]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in">
            <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[28px]">delete_forever</span>
            </div>
            <h3 className="font-['Manrope'] font-bold text-base text-[#0c1d2c]">
              Delete All Demo Accounts?
            </h3>
            <p className="text-xs text-[#74777e] mt-1.5 leading-relaxed">
              This will permanently delete all pre-seeded demo accounts (Tunde Bakare, Emeka Okonkwo, Amina Bello, David Adeleke) and demo test shipments. Your custom registered couriers and real consignments will be preserved.
            </p>

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0c1d2c] rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDeleteDemo}
                className="px-4 py-2 bg-error hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm"
              >
                Yes, Delete All Demo Accounts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[26px] text-secondary">settings</span>
          <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
            System Settings &amp; Operations Administration
          </h1>
        </div>
        <p className="text-xs text-[#74777e] mt-1">
          Manage administrator credentials, purge demo accounts, and configure Lagos corridor logistics parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Operator Profile (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-outline-variant/30 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-secondary">admin_panel_settings</span>
              <h2 className="font-bold text-sm text-[#0c1d2c]">Super Administrator Identity</h2>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs text-secondary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase tracking-wider mb-1">
                  Primary Regional Station
                </label>
                <input
                  type="text"
                  value={hub}
                  onChange={(e) => setHub(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0c1d2c] rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#994700] hover:bg-[#d97732] text-white rounded-lg font-bold shadow-sm"
                >
                  Save Identity
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#142b45] text-white flex items-center justify-center font-extrabold text-xl font-mono shadow-sm">
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </div>
                <div>
                  <h3 className="font-['Manrope'] text-base font-bold text-[#0c1d2c]">{name}</h3>
                  <p className="font-mono text-xs text-secondary font-semibold">{email}</p>
                  <p className="text-xs text-[#74777e] mt-0.5">{currentUser.role}</p>
                </div>
              </div>

              <div className="bg-[#f8f9ff] rounded-xl p-3.5 space-y-2 text-xs border border-outline-variant/20">
                <div className="flex justify-between">
                  <span className="text-[#74777e]">Direct Dispatch Line:</span>
                  <span className="font-mono font-semibold text-[#0c1d2c]">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74777e]">Super Hub Location:</span>
                  <span className="font-semibold text-[#0c1d2c]">{hub}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74777e]">Security Clearance:</span>
                  <span className="font-bold text-emerald-600">Level 5 (Unrestricted Telemetry)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: DEMO DATA MANAGEMENT CARD (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-outline-variant/30 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-error">database</span>
              <h2 className="font-bold text-sm text-[#0c1d2c]">Demo Accounts &amp; Mock Data Control</h2>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-[#74777e] font-bold">
              Database Sync
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-[#43474d] leading-relaxed">
              Transition this DMS Enterprise instance from demonstration mode into your own real logistics production environment. You can purge demo driver and client profiles, or reload them at any time.
            </p>

            <div className="bg-[#fffbf8] border border-secondary/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0c1d2c]">Demo Couriers &amp; Consignments:</span>
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    hasDemoData
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {hasDemoData ? 'Active in Database' : 'Purged (Clean State)'}
                </span>
              </div>

              {hasDemoData ? (
                <button
                  type="button"
                  onClick={() => setConfirmModal(true)}
                  className="w-full py-2.5 rounded-lg bg-error hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                  Delete All Demo Accounts &amp; Mock Orders
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    All demo accounts are deleted. System is running cleanly for real operations.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onRestoreDemoData();
                      showToast('Demo couriers and consignments re-seeded for testing');
                    }}
                    className="w-full py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0c1d2c] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    Restore Pre-seeded Demo Data
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
