import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types/logistics';
import { LOGO_URL } from '../../data/logisticsData';
import { firebaseAuthService } from '../../services/firebase';

interface PortalLoginPageProps {
  onSelectPortal: (role: UserRole, user?: UserProfile) => void;
  currentUser?: UserProfile;
}

export const PortalLoginPage: React.FC<PortalLoginPageProps> = ({
  onSelectPortal,
  currentUser,
}) => {
  const [authTab, setAuthTab] = useState<'quick' | 'email'>('quick');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const user = await firebaseAuthService.signInWithGoogle();
      const profile: UserProfile = {
        id: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || 'user@example.com',
        role: user.email === 'olusegunola1104@gmail.com' ? 'Super Administrator' : selectedRole,
        roleTitle:
          user.email === 'olusegunola1104@gmail.com'
            ? 'Super Administrator'
            : selectedRole,
        avatar: user.photoURL || undefined,
        phone: '+234 800 000 0000',
        hub: 'Lagos Ops Hub',
      };
      setSuccessMessage(`Signed in as ${profile.name}`);
      setTimeout(() => onSelectPortal(profile.role, profile), 600);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in error';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      if (isRegistering) {
        const profile = await firebaseAuthService.signUpWithEmail(
          email,
          password,
          name || email.split('@')[0],
          selectedRole
        );
        setSuccessMessage('Account created successfully!');
        setTimeout(() => onSelectPortal(profile.role, profile), 600);
      } else {
        const user = await firebaseAuthService.signInWithEmail(email, password);
        const role =
          email === 'olusegunola1104@gmail.com'
            ? 'Super Administrator'
            : selectedRole;
        const profile: UserProfile = {
          id: user.uid,
          name: user.displayName || email.split('@')[0],
          email: user.email || email,
          role,
          roleTitle: role,
          phone: '+234 800 000 0000',
          hub: 'Lagos Central Ops',
        };
        setSuccessMessage(`Welcome back, ${profile.name}!`);
        setTimeout(() => onSelectPortal(profile.role, profile), 600);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPortal = (role: UserRole) => {
    if (role === 'Super Administrator') {
      onSelectPortal('Super Administrator', {
        name: 'Olusegun Ola',
        email: 'olusegunola1104@gmail.com',
        role: 'Super Administrator',
        roleTitle: 'Super Administrator & Operations Director',
        phone: '+234 803 110 4921',
        hub: 'Ikeja Central Operations HQ',
      });
    } else if (role === 'Driver') {
      onSelectPortal('Driver', {
        name: 'Tunde Bakare',
        email: 'tunde.bakare@logicore.ng',
        role: 'Driver',
        roleTitle: 'Enterprise Fleet Courier (#DRV-882)',
        phone: '+234 803 491 8820',
        hub: 'Toyota HiAce Van (LND-402-XX)',
      });
    } else {
      onSelectPortal('Customer', {
        name: 'Folake Balogun',
        email: 'folake.balogun@stanbicibtc.com',
        role: 'Customer',
        roleTitle: 'Standard Bank Plc (Consignor)',
        phone: '+234 802 118 3390',
        hub: 'Kingsway Tower Ikoyi',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#081523] text-white flex flex-col justify-between font-sans selection:bg-[#d97732] selection:text-white">
      {/* Top Brand Bar */}
      <header className="w-full border-b border-[#1E3756] bg-[#0c1d2c]/90 backdrop-blur-md px-3.5 sm:px-6 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <img src={LOGO_URL} alt="DMS Logistics" className="h-8 sm:h-9 w-auto object-contain" />
            <div>
              <span className="font-['Manrope'] font-extrabold text-sm sm:text-base text-white tracking-tight block">
                DMS Enterprise
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                LOGISTICS SUITE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] sm:text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="hidden sm:inline">Firebase Cloud Firestore Online</span>
              <span className="sm:hidden">Firebase Live</span>
            </div>
            {currentUser && (
              <span className="text-xs text-slate-300 hidden md:inline">
                Active: <strong className="text-white">{currentUser.name}</strong>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center px-4 pt-10 pb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142B45] border border-[#234268] text-[#fd934c] text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[16px]">verified_user</span>
          <span>Role-Based Portal Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-['Manrope'] tracking-tight text-white">
          Choose Your Operational Workspace
        </h1>
        <p className="mt-2 text-sm text-slate-300 max-w-xl mx-auto">
          Dedicated, purpose-built workspaces with role-specific views for Customers,
          Drivers, and Operations Administrators.
        </p>
      </div>

      {/* Main 3 Portal Choice Cards */}
      <div className="max-w-6xl mx-auto px-4 py-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Customer Portal */}
          <div className="group rounded-2xl bg-gradient-to-b from-[#142B45] to-[#0E1F33] p-6 border border-[#234268] hover:border-[#38bdf8] transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">local_shipping</span>
              </div>
              <span className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                PORTAL 01
              </span>
              <h2 className="text-xl font-bold font-['Manrope'] text-white mt-1">
                Customer Portal
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                For corporate clients and consignors to track live waybills, book autonomous
                courier dispatches, and check invoices.
              </p>

              <div className="mt-4 space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[16px]">check_circle</span>
                  <span>Live GPS Waybill Telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[16px]">check_circle</span>
                  <span>Instant Tariff &amp; SLA Calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-400 text-[16px]">check_circle</span>
                  <span>Self-Service Orders History</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleQuickPortal('Customer')}
              className="mt-6 w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-sky-500/25"
            >
              <span>Enter Customer Portal</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* 2. Driver Mobile Portal */}
          <div className="group rounded-2xl bg-gradient-to-b from-[#142B45] to-[#0E1F33] p-6 border border-[#234268] hover:border-[#10b981] transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">smartphone</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                PORTAL 02
              </span>
              <h2 className="text-xl font-bold font-['Manrope'] text-white mt-1">
                Driver Mobile App
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                For dispatch couriers and fleet drivers on duty to manage shift delivery queues,
                receive turn-by-turn GPS, and submit POD.
              </p>

              <div className="mt-4 space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  <span>Active Shift Queue &amp; Stops</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  <span>Turn-by-Turn GPS Navigation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  <span>Cryptographic POD Signature</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleQuickPortal('Driver')}
              className="mt-6 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-emerald-500/25"
            >
              <span>Enter Driver App</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* 3. Operations & Admin Portal */}
          <div className="group rounded-2xl bg-gradient-to-b from-[#142B45] to-[#0E1F33] p-6 border border-[#234268] hover:border-[#d97732] transition-all duration-300 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#d97732]/10 rounded-full blur-2xl group-hover:bg-[#d97732]/20 transition-all pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#d97732]/20 text-[#fd934c] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
              </div>
              <span className="text-[11px] font-mono text-[#fd934c] font-bold uppercase tracking-wider">
                PORTAL 03
              </span>
              <h2 className="text-xl font-bold font-['Manrope'] text-white mt-1">
                Admin &amp; Operations
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                For Super Administrators, Dispatchers &amp; Operations Directors to monitor fleet
                radars, allocate loads, and oversee billing.
              </p>

              <div className="mt-4 space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fd934c] text-[16px]">check_circle</span>
                  <span>Dispatch Center &amp; Fleet Radar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fd934c] text-[16px]">check_circle</span>
                  <span>11 Management &amp; Billing Sections</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fd934c] text-[16px]">check_circle</span>
                  <span>Audit Logs &amp; Demo Data Purge</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleQuickPortal('Super Administrator')}
              className="mt-6 w-full py-3 rounded-xl bg-[#d97732] hover:bg-[#c36424] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-amber-500/25"
            >
              <span>Enter Admin Operations</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Firebase Authentication & Direct Access Strip */}
      <div className="max-w-xl mx-auto px-4 py-6 w-full">
        <div className="bg-[#102236] rounded-2xl border border-[#1E3756] p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-[18px]">lock</span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Firebase Identity &amp; Access
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[#142B45] p-0.5 rounded-lg border border-[#234268]">
              <button
                type="button"
                onClick={() => setAuthTab('quick')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  authTab === 'quick' ? 'bg-[#d97732] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                1-Click Role Switch
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('email')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                  authTab === 'email' ? 'bg-[#d97732] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Firebase Credentials
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-3 p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-3 p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>{successMessage}</span>
            </div>
          )}

          {authTab === 'quick' ? (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-300">
                Instantly simulate and evaluate the app as any of the 3 primary roles:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickPortal('Super Administrator')}
                  className="p-2.5 rounded-xl bg-[#142B45] hover:bg-[#1C3A5E] border border-white/10 text-left transition cursor-pointer"
                >
                  <span className="text-[10px] text-amber-400 font-mono block">SUPER ADMIN</span>
                  <span className="text-xs font-bold text-white block">Olusegun Ola</span>
                  <span className="text-[10px] text-slate-400 truncate block">HQ Operations</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPortal('Driver')}
                  className="p-2.5 rounded-xl bg-[#142B45] hover:bg-[#1C3A5E] border border-white/10 text-left transition cursor-pointer"
                >
                  <span className="text-[10px] text-emerald-400 font-mono block">COURIER DRIVER</span>
                  <span className="text-xs font-bold text-white block">Tunde Bakare</span>
                  <span className="text-[10px] text-slate-400 truncate block">Van #APP-882</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickPortal('Customer')}
                  className="p-2.5 rounded-xl bg-[#142B45] hover:bg-[#1C3A5E] border border-white/10 text-left transition cursor-pointer"
                >
                  <span className="text-[10px] text-sky-400 font-mono block">CLIENT SHIPPER</span>
                  <span className="text-xs font-bold text-white block">Folake Balogun</span>
                  <span className="text-[10px] text-slate-400 truncate block">Standard Bank Plc</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleGoogleSignIn}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0c1d2c] text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google (Firebase Auth)</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {isRegistering && (
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#142B45] border border-[#234268] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d97732]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#142B45] border border-[#234268] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d97732]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#142B45] border border-[#234268] rounded-lg px-3 py-2 pr-9 text-xs text-white focus:outline-none focus:border-[#d97732]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Target Portal</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full bg-[#142B45] border border-[#234268] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d97732]"
                >
                  <option value="Customer">Customer Portal</option>
                  <option value="Driver">Driver Mobile App</option>
                  <option value="Super Administrator">Super Administrator (HQ Ops)</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Dispatcher">Dispatcher</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-[#d97732] hover:bg-[#c36424] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating via Firebase...</span>
                ) : (
                  <span>{isRegistering ? 'Create Firebase Account' : 'Sign In via Firebase'}</span>
                )}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Register"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#1E3756] py-3 px-6 text-center text-xs text-slate-400">
        <span>© 2025 Logicore DMS Enterprise. Firebase Cloud Firestore Backend.</span>
      </footer>
    </div>
  );
};
