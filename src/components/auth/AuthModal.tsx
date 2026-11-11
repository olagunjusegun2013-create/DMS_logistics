import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types/logistics';
import { LOGO_URL } from '../../data/logisticsData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin?: (user: UserProfile) => void;
  onAuthSuccess?: (user: UserProfile) => void;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onAuthSuccess,
  onLogout,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('super-admin');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const submitUser = (user: UserProfile) => {
    (onAuthSuccess || onLogin)?.(user);
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedRole: UserRole = role;
    const resolvedName = name || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Authenticated User');

    submitUser({
      name: resolvedName,
      email: email || 'olusegunola1104@gmail.com',
      role: resolvedRole,
      roleTitle:
        resolvedRole === 'super-admin' || resolvedRole === 'Super Administrator'
          ? 'Super Administrator'
          : resolvedRole === 'admin' || resolvedRole === 'Administrator'
          ? 'Operations Administrator'
          : resolvedRole === 'dispatcher' || resolvedRole === 'Dispatcher'
          ? 'Lead Dispatch Controller'
          : resolvedRole === 'driver' || resolvedRole === 'Driver'
          ? 'Fleet Courier Specialist'
          : 'Corporate Enterprise Consignor',
      phone: phone || '+234 803 110 4921',
      hub: 'Ikeja Central Headquarters (Lagos)',
    });
  };

  const handleQuickRoleSelect = (selectedRole: UserRole) => {
    if (selectedRole === 'super-admin' || selectedRole === 'Super Administrator') {
      submitUser({
        name: 'Olusegun Ola',
        email: 'olusegunola1104@gmail.com',
        role: 'Super Administrator',
        roleTitle: 'Super Administrator',
        phone: '+234 803 110 4921',
        hub: 'Ikeja Central Operations HQ',
      });
    } else if (selectedRole === 'dispatcher' || selectedRole === 'Dispatcher') {
      submitUser({
        name: 'Chioma Adebayo',
        email: 'c.adebayo@logicore.ng',
        role: 'Dispatcher',
        roleTitle: 'Dispatch Controller',
        phone: '+234 802 441 0021',
        hub: 'Marina Island Terminal',
      });
    } else if (selectedRole === 'driver' || selectedRole === 'Driver') {
      submitUser({
        name: 'Tunde Bakare',
        email: 'tunde.bakare@logicore.ng',
        role: 'Driver',
        roleTitle: 'Enterprise Fleet Courier (#DRV-882)',
        phone: '+234 803 491 8820',
        hub: 'Toyota HiAce Van (LND-402-XX)',
      });
    } else if (selectedRole === 'customer' || selectedRole === 'Customer') {
      submitUser({
        name: 'Folake Balogun',
        email: 'folake.balogun@stanbicibtc.com',
        role: 'Customer',
        roleTitle: 'Standard Bank Plc (Consignor)',
        phone: '+234 802 118 3390',
        hub: 'Kingsway Tower Ikoyi',
      });
    } else {
      submitUser({
        name: 'Sarah Jenkins',
        email: 's.jenkins@logicore.ng',
        role: 'Administrator',
        roleTitle: 'Operations Director',
        phone: '+234 800 123 4567',
        hub: 'Ikeja Central Ops',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1d2c]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-outline-variant/30 overflow-hidden animate-in fade-in zoom-in">
        {/* Header */}
        <div className="p-6 bg-[#142b45] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Logicore Logo" className="h-8 w-auto object-contain" />
            <div>
              <h2 className="font-['Manrope'] font-bold text-base">Logicore Identity &amp; Access</h2>
              <p className="text-[10px] text-slate-300 font-mono">Role-Based Enterprise Authentication</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Quick Demo Role Switcher */}
          <div>
            <span className="block font-bold text-[#43474d] uppercase tracking-wider mb-2 text-[10px]">
              Switch Active User Role Instantly
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRoleSelect('super-admin')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  currentUser.role === 'super-admin'
                    ? 'border-secondary bg-amber-50 text-[#0c1d2c]'
                    : 'border-outline-variant/30 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs">Olusegun Ola</div>
                <div className="text-[10px] text-secondary font-semibold">Super Admin</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleSelect('driver')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  currentUser.role === 'driver'
                    ? 'border-secondary bg-amber-50 text-[#0c1d2c]'
                    : 'border-outline-variant/30 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs">Tunde Bakare</div>
                <div className="text-[10px] text-blue-700 font-semibold">Driver Mobile</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleSelect('customer')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  currentUser.role === 'customer'
                    ? 'border-secondary bg-amber-50 text-[#0c1d2c]'
                    : 'border-outline-variant/30 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs">Folake Balogun</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Customer Portal</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleSelect('dispatcher')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  currentUser.role === 'dispatcher'
                    ? 'border-secondary bg-amber-50 text-[#0c1d2c]'
                    : 'border-outline-variant/30 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-xs">Chioma Adebayo</div>
                <div className="text-[10px] text-purple-700 font-semibold">Dispatcher</div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-outline-variant/30 w-full" />
            <span className="bg-white px-3 text-[10px] text-[#74777e] uppercase font-bold shrink-0">
              Or Custom Sign-In
            </span>
          </div>

          {mode === 'forgot' ? (
            <div className="space-y-3.5">
              <h3 className="font-bold text-sm text-[#0c1d2c]">Reset Forgotten Password</h3>
              <p className="text-xs text-[#74777e]">
                Enter your work email address to receive an instant authentication token.
              </p>
              {forgotSent ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-medium">
                  Password reset link dispatched to <strong>{email || 'your email'}</strong>. Please verify your inbox.
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8f9ff] px-3 py-2.5 rounded-xl border border-outline-variant/40 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="w-full py-2.5 bg-[#142b45] text-white font-bold rounded-xl"
                  >
                    Send Reset Token
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setForgotSent(false);
                }}
                className="text-secondary hover:underline font-semibold block text-center w-full"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block font-bold text-[#43474d] uppercase text-[10px] mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Babatunde Alabi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#f8f9ff] px-3 py-2 rounded-xl border border-outline-variant/40 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#43474d] uppercase text-[10px] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#f8f9ff] px-3 py-2 rounded-xl border border-outline-variant/40 text-xs"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block font-bold text-[#43474d] uppercase text-[10px] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@enterprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f8f9ff] px-3 py-2 rounded-xl border border-outline-variant/40 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase text-[10px] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f8f9ff] px-3 py-2 rounded-xl border border-outline-variant/40 text-xs pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2 text-[#74777e] hover:text-[#0c1d2c]"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase text-[10px] mb-1">
                  Assigned Workspace Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-[#f8f9ff] px-3 py-2 rounded-xl border border-outline-variant/40 text-xs"
                >
                  <option value="super-admin">Super Administrator (Full Unrestricted)</option>
                  <option value="admin">Administrator (Operations &amp; Reporting)</option>
                  <option value="dispatcher">Dispatcher (Corridor &amp; Driver Allocation)</option>
                  <option value="driver">Driver (Mobile Manifest &amp; GPS Stack)</option>
                  <option value="customer">Customer (Booking &amp; Live Tracking)</option>
                </select>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-secondary hover:underline"
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-[#142b45] font-bold hover:underline"
                >
                  {mode === 'login' ? 'Need a new account? Register' : 'Existing user? Login'}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#994700] hover:bg-[#d97732] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer mt-2"
              >
                {mode === 'login' ? 'Authenticate & Enter Portal' : 'Register Account'}
              </button>
            </form>
          )}

          {/* Current Session Info & Logout */}
          <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
            <span className="text-[10px] text-[#74777e]">
              Active: <strong>{currentUser.name}</strong> ({currentUser.role})
            </span>
            <button
              type="button"
              onClick={() => {
                onLogout?.();
                onClose();
              }}
              className="text-rose-600 hover:underline font-semibold text-[11px] cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
