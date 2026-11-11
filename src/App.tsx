import React, { useState, useEffect } from 'react';
import {
  ScreenId,
  ShipmentOrder,
  Courier,
  CustomerAccount,
  DeliveryException,
  PaymentRecord,
  NotificationItem,
  UserProfile,
  AdminSidebarSection,
  AuditLog,
  PortalType,
  UserRole,
} from './types/logistics';
import { LOGO_URL, SARAH_JENKINS_AVATAR } from './data/logisticsData';
import { dbService } from './services/dbService';
import { firestoreSyncService, firebaseAuthService } from './services/firebase';
import { AdminDashboardScreen } from './components/screens/AdminDashboardScreen';
import { LiveTrackingScreen } from './components/screens/LiveTrackingScreen';
import { RequestDeliveryScreen } from './components/screens/RequestDeliveryScreen';
import { TrackShipmentScreen } from './components/screens/TrackShipmentScreen';
import { DriverDashboardScreen } from './components/screens/DriverDashboardScreen';
import { DriverNavigationScreen } from './components/screens/DriverNavigationScreen';
import { ProofOfDeliveryScreen } from './components/screens/ProofOfDeliveryScreen';
import { AllScreensArtboard } from './components/screens/AllScreensArtboard';
import { PortalLoginPage } from './components/auth/PortalLoginPage';
import { AuthModal } from './components/auth/AuthModal';
import { CustomerOrdersHistoryModal } from './components/sections/CustomerOrdersHistoryModal';
import { CustomerSupportModal } from './components/sections/CustomerSupportModal';

export default function App() {
  // Portal State: 'portal-select' (simplified login/portal chooser), 'admin', 'driver', 'customer'
  const [currentPortal, setCurrentPortal] = useState<PortalType>('portal-select');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('admin-dashboard');
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persistent States synced via dbService and Firebase Firestore
  const [orders, setOrders] = useState<ShipmentOrder[]>(() => dbService.getOrders());
  const [couriers, setCouriers] = useState<Courier[]>(() => dbService.getCouriers());
  const [customers, setCustomers] = useState<CustomerAccount[]>(() => dbService.getCustomers());
  const [exceptions, setExceptions] = useState<DeliveryException[]>(() => dbService.getExceptions());
  const [payments, setPayments] = useState<PaymentRecord[]>(() => dbService.getPayments());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => dbService.getNotifications());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => dbService.getAuditLogs());
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => dbService.getCurrentUser());
  const [hasDemoData, setHasDemoData] = useState<boolean>(() => dbService.hasDemoData());

  // Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCustomerOrdersOpen, setIsCustomerOrdersOpen] = useState(false);
  const [isCustomerSupportOpen, setIsCustomerSupportOpen] = useState(false);
  const [activeAdminSection, setActiveAdminSection] = useState<AdminSidebarSection>('dashboard');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthChange((fbUser) => {
      if (fbUser) {
        console.log('Firebase Auth User Active:', fbUser.email);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handlers for switching portal
  const handlePortalSelect = (role: UserRole, user?: UserProfile) => {
    if (user) {
      dbService.updateCurrentUser(user);
      setCurrentUser(user);
    }

    if (role === 'Driver' || role === 'driver') {
      setCurrentPortal('driver');
      setCurrentScreen('driver-dashboard');
      showToast(`Welcome to Driver Mobile App (${user?.name || 'Tunde Bakare'})`);
    } else if (role === 'Customer' || role === 'customer') {
      setCurrentPortal('customer');
      setCurrentScreen('track-shipment');
      showToast(`Welcome to Customer Portal (${user?.name || 'Folake Balogun'})`);
    } else {
      setCurrentPortal('admin');
      setCurrentScreen('admin-dashboard');
      showToast(`Welcome to Admin & Operations Center (${user?.name || 'Olusegun Ola'})`);
    }
  };

  // Order Lifecycle Handlers
  const handleDeliveryComplete = (trackingId: string) => {
    dbService.completeDelivery(trackingId);
    setOrders(dbService.getOrders());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Success: Consignment ${trackingId} confirmed & sealed via cryptographic POD!`);
  };

  const handleNewOrderCreated = (order: ShipmentOrder) => {
    dbService.addOrder(order);
    firestoreSyncService.saveOrderToCloud(order);
    setOrders(dbService.getOrders());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Waybill ${order.trackingNo} dispatched to active Ikeja queue!`);
    if (currentPortal === 'customer') {
      setCurrentScreen('track-shipment');
    } else {
      setCurrentScreen('admin-dashboard');
    }
  };

  const handleDeleteOrder = (trackingNo: string) => {
    dbService.deleteOrder(trackingNo);
    firestoreSyncService.deleteOrderFromCloud(trackingNo);
    setOrders(dbService.getOrders());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Waybill ${trackingNo} removed from operational ledger.`);
  };

  const handleDeleteCourier = (id: string) => {
    dbService.deleteCourier(id);
    setCouriers(dbService.getCouriers());
    setAuditLogs(dbService.getAuditLogs());
    showToast('Courier record deleted.');
  };

  const handleDeleteCustomer = (id: string) => {
    dbService.deleteCustomer(id);
    setCustomers(dbService.getCustomers());
    setAuditLogs(dbService.getAuditLogs());
    showToast('Customer record deleted.');
  };

  const handleAddCourier = (newCourier: Courier) => {
    dbService.addCourier(newCourier);
    setCouriers(dbService.getCouriers());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Driver ${newCourier.name} registered and activated.`);
  };

  const handleAddCustomer = (newCustomer: CustomerAccount) => {
    dbService.addCustomer(newCustomer);
    setCustomers(dbService.getCustomers());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Corporate client ${newCustomer.name} onboarded.`);
  };

  const handleAssignOrder = (trackingNo: string, courierName: string, initials: string) => {
    dbService.assignOrder(trackingNo, courierName, initials);
    setOrders(dbService.getOrders());
    setCouriers(dbService.getCouriers());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Order ${trackingNo} allocated to ${courierName}.`);
  };

  const handleUpdateException = (exception: DeliveryException) => {
    dbService.updateException(exception);
    setExceptions(dbService.getExceptions());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Exception ${exception.id} status updated to ${exception.status}.`);
  };

  const handleAddException = (exception: DeliveryException) => {
    dbService.addException(exception);
    setExceptions(dbService.getExceptions());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Exception logged: ${exception.reason}`);
  };

  const handleUpdatePayment = (payment: PaymentRecord) => {
    dbService.updatePayment(payment);
    setPayments(dbService.getPayments());
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Invoice ${payment.invoiceNo} marked as ${payment.status}.`);
  };

  const handleUpdateUser = (updated: UserProfile) => {
    dbService.updateCurrentUser(updated);
    setCurrentUser(updated);
    setAuditLogs(dbService.getAuditLogs());
    showToast(`Profile updated: ${updated.name}`);
  };

  const handleDeleteAllDemoData = () => {
    dbService.deleteAllDemoData();
    setOrders(dbService.getOrders());
    setCouriers(dbService.getCouriers());
    setCustomers(dbService.getCustomers());
    setExceptions(dbService.getExceptions());
    setPayments(dbService.getPayments());
    setHasDemoData(false);
    setAuditLogs(dbService.getAuditLogs());
    showToast('All demo accounts and mock consignments permanently deleted.');
  };

  const handleRestoreDemoData = () => {
    dbService.restoreDemoData();
    setOrders(dbService.getOrders());
    setCouriers(dbService.getCouriers());
    setCustomers(dbService.getCustomers());
    setExceptions(dbService.getExceptions());
    setPayments(dbService.getPayments());
    setHasDemoData(true);
    setAuditLogs(dbService.getAuditLogs());
    showToast('Demo dataset reloaded for demonstration and testing.');
  };

  const handleMarkAllAsRead = () => {
    dbService.markAllNotificationsAsRead();
    setNotifications(dbService.getNotifications());
    showToast('All operational alerts marked as read.');
  };

  const handleClearAllNotifications = () => {
    dbService.clearAllNotifications();
    setNotifications(dbService.getNotifications());
    showToast('Notifications inbox cleared.');
  };

  const handleDismissNotification = (id: string) => {
    dbService.dismissNotification(id);
    setNotifications(dbService.getNotifications());
  };

  const handleAuthSuccess = (user: UserProfile) => {
    handlePortalSelect(user.role, user);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim().toLowerCase();
    if (query.includes('98421') || query.includes('track') || query.includes('dangote')) {
      setCurrentScreen('track-shipment');
      if (currentPortal !== 'customer') setCurrentPortal('customer');
      showToast('Navigated to Waybill #DMS-TRK-98421');
    } else if (query.includes('driver') || query.includes('tunde')) {
      setCurrentPortal('driver');
      setCurrentScreen('driver-dashboard');
      showToast('Switched to Driver Tunde Bakare Shift');
    } else if (query.includes('nav') || query.includes('gps')) {
      setCurrentPortal('driver');
      setCurrentScreen('driver-navigation');
      showToast('Switched to Driver Turn-by-Turn GPS');
    } else if (query.includes('pod') || query.includes('proof')) {
      setCurrentPortal('driver');
      setCurrentScreen('proof-of-delivery');
      showToast('Switched to Proof of Delivery');
    } else if (query.includes('radar') || query.includes('live')) {
      setCurrentPortal('admin');
      setCurrentScreen('live-tracking');
      showToast('Switched to Operations Live Fleet Telemetry');
    } else if (query.includes('book') || query.includes('request')) {
      setCurrentPortal('customer');
      setCurrentScreen('request-delivery');
      showToast('Switched to Customer Request Delivery Portal');
    } else {
      showToast(`Search for "${searchQuery}" matched Active Dispatch Center`);
      setCurrentPortal('admin');
      setCurrentScreen('admin-dashboard');
    }
  };

  // If in 'portal-select' mode, show the simplified login and portal selector page
  if (currentPortal === 'portal-select') {
    return (
      <>
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 bg-[#142b45] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-200">
            <span className="material-symbols-outlined text-[18px] text-[#fd934c]">notifications_active</span>
            <span>{toastMessage}</span>
          </div>
        )}
        <PortalLoginPage
          onSelectPortal={handlePortalSelect}
          currentUser={currentUser}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col text-[#0c1d2c] font-sans antialiased selection:bg-[#d97732] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#142b45] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[18px] text-[#fd934c]">notifications_active</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-75 text-white/70 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. DIFFERENTIATED HEADER: CUSTOMER PORTAL                      */}
      {/* ============================================================== */}
      {currentPortal === 'customer' && (
        <header className="sticky top-0 z-50 bg-[#0C1D2C] text-white border-b border-[#1E3756] shadow-md">
          <div className="max-w-[1720px] mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <div
                onClick={() => setCurrentScreen('track-shipment')}
                className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
              >
                <img
                  src={LOGO_URL}
                  alt="DMS Logistics"
                  className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white font-['Manrope']">
                    DMS Enterprise
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-sky-400 font-bold uppercase -mt-0.5">
                    CUSTOMER PORTAL
                  </span>
                </div>
              </div>

              {/* Customer Navigation Links */}
              <nav className="hidden lg:flex items-center gap-1.5 ml-3">
                <button
                  type="button"
                  onClick={() => setCurrentScreen('track-shipment')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    currentScreen === 'track-shipment'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">share_location</span>
                  <span>Track Waybill</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentScreen('request-delivery')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    currentScreen === 'request-delivery'
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">add_box</span>
                  <span>Book New Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCustomerOrdersOpen(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                  <span>My Orders</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCustomerSupportOpen(true)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  <span>Dispatch Support</span>
                </button>
              </nav>
            </div>

            {/* Right Customer Actions & Portal Switcher */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setCurrentScreen('track-shipment')}
                className={`lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentScreen === 'track-shipment' ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-white/10'
                }`}
                title="Track Shipment"
              >
                <span className="material-symbols-outlined text-[16px]">share_location</span>
                <span className="hidden sm:inline">Track</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentScreen('request-delivery')}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-[#d97732] hover:bg-[#c36424] text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span className="hidden sm:inline">New Request</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCustomerOrdersOpen(true)}
                className="lg:hidden p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="My Orders"
              >
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentPortal('portal-select')}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/20 cursor-pointer"
                title="Switch to Driver or Admin portal"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                <span className="hidden sm:inline">Switch Portal</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ============================================================== */}
      {/* 2. DIFFERENTIATED HEADER: DRIVER MOBILE PORTAL                 */}
      {/* ============================================================== */}
      {currentPortal === 'driver' && (
        <header className="sticky top-0 z-50 bg-[#071321] text-white border-b border-[#1E3756] shadow-md">
          <div className="max-w-[1720px] mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div
                onClick={() => setCurrentScreen('driver-dashboard')}
                className="flex items-center gap-2 cursor-pointer shrink-0"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs tracking-tight text-white font-['Manrope'] truncate">
                    Logicore Courier
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase truncate">
                    VAN #APP-882
                  </span>
                </div>
              </div>

              {/* Driver Screen Tabs */}
              <div className="flex items-center gap-1 bg-[#102236] p-1 rounded-xl border border-[#234268] overflow-x-auto max-w-[200px] sm:max-w-none">
                <button
                  type="button"
                  onClick={() => setCurrentScreen('driver-dashboard')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0 ${
                    currentScreen === 'driver-dashboard'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Shift Queue"
                >
                  <span className="material-symbols-outlined text-[15px]">space_dashboard</span>
                  <span className="hidden sm:inline">Queue</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentScreen('driver-navigation')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0 ${
                    currentScreen === 'driver-navigation'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="GPS Navigation"
                >
                  <span className="material-symbols-outlined text-[15px]">navigation</span>
                  <span className="hidden sm:inline">GPS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentScreen('proof-of-delivery')}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shrink-0 ${
                    currentScreen === 'proof-of-delivery'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Proof of Delivery"
                >
                  <span className="material-symbols-outlined text-[15px]">fact_check</span>
                  <span className="hidden sm:inline">POD</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Mobile device frame toggle */}
              <button
                type="button"
                onClick={() => setDeviceFrameMode(!deviceFrameMode)}
                className={`hidden md:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border cursor-pointer transition-all ${
                  deviceFrameMode
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-transparent border-slate-600 text-slate-400'
                }`}
                title="Toggle Phone Frame Container"
              >
                <span className="material-symbols-outlined text-[16px]">devices</span>
                <span>{deviceFrameMode ? 'Device Frame' : 'Fluid Full View'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentPortal('portal-select')}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/20 cursor-pointer"
                title="Switch to Customer or Admin portal"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                <span className="hidden sm:inline">Switch Portal</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ============================================================== */}
      {/* 3. DIFFERENTIATED HEADER: OPERATIONS & ADMIN SUITE             */}
      {/* ============================================================== */}
      {currentPortal === 'admin' && (
        <header className="sticky top-0 z-50 bg-[#0C1D2C] text-white border-b border-[#1E3756] shadow-md">
          <div className="max-w-[1720px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div
                onClick={() => setCurrentScreen('admin-dashboard')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <img
                  src={LOGO_URL}
                  alt="DMS Logistics"
                  className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-sm tracking-tight text-white font-['Manrope']">
                    DMS Enterprise
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#fd934c] uppercase -mt-0.5 font-bold">
                    OPERATIONS DISPATCH CENTER
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Top Screen Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-[#142B45] p-1 rounded-xl border border-[#234268]">
              <button
                type="button"
                onClick={() => setCurrentScreen('admin-dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentScreen === 'admin-dashboard'
                    ? 'bg-[#d97732] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">dashboard</span>
                <span>Operations Desk</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentScreen('live-tracking')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentScreen === 'live-tracking'
                    ? 'bg-[#d97732] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">radar</span>
                <span>Fleet Telemetry Radar</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentScreen('all-artboards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentScreen === 'all-artboards'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-400 hover:bg-emerald-500/10'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span>All 7 Screens Canvas</span>
              </button>
            </div>

            {/* Admin Right Bar & Purge Demo */}
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="relative hidden xl:block">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tracking, driver..."
                  className="w-48 bg-[#142B45] text-xs text-white placeholder:text-slate-400 px-3 py-1.5 pl-8 rounded-lg border border-[#234268] focus:outline-none focus:border-[#d97732]"
                />
                <span className="material-symbols-outlined text-[16px] text-slate-400 absolute left-2.5 top-2">
                  search
                </span>
              </form>

              {/* Demo Data Indicator / Purge Button */}
              {hasDemoData ? (
                <button
                  onClick={handleDeleteAllDemoData}
                  title="Purge all simulated demo accounts & orders"
                  className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">delete_sweep</span>
                  <span>Purge Demo Accounts</span>
                </button>
              ) : (
                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Live Production Mode</span>
                </span>
              )}

              {/* Switch Portal Button */}
              <button
                type="button"
                onClick={() => setCurrentPortal('portal-select')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/20 cursor-pointer"
                title="Switch to Driver or Customer portal"
              >
                <span className="material-symbols-outlined text-[15px]">swap_horiz</span>
                <span>Switch Portal</span>
              </button>

              {/* User Profile */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 pl-2 border-l border-slate-700 hover:opacity-85 transition cursor-pointer text-left"
                title="Manage Admin Profile & Role"
              >
                <img
                  src={SARAH_JENKINS_AVATAR}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full border border-[#d97732] object-cover"
                />
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-bold leading-tight text-white">{currentUser.name}</span>
                  <span className="text-[10px] text-amber-400 font-medium leading-none">
                    {currentUser.role}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ============================================================== */}
      {/* SCREEN RENDER CONTAINER                                        */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col relative w-full">
        {currentScreen === 'admin-dashboard' && (
          <AdminDashboardScreen
            orders={orders}
            couriers={couriers}
            customers={customers}
            notifications={notifications}
            exceptions={exceptions}
            payments={payments}
            auditLogs={auditLogs}
            currentUser={currentUser}
            hasDemoData={hasDemoData}
            activeSection={activeAdminSection}
            onSelectSection={setActiveAdminSection}
            onNavigate={setCurrentScreen}
            onUpdateUser={handleUpdateUser}
            onDeleteOrder={handleDeleteOrder}
            onDeleteCourier={handleDeleteCourier}
            onDeleteCustomer={handleDeleteCustomer}
            onAddCourier={handleAddCourier}
            onAddCustomer={handleAddCustomer}
            onAssignOrder={handleAssignOrder}
            onUpdateException={handleUpdateException}
            onAddException={handleAddException}
            onUpdatePayment={handleUpdatePayment}
            onDeleteAllDemoData={handleDeleteAllDemoData}
            onRestoreDemoData={handleRestoreDemoData}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAllNotifications={handleClearAllNotifications}
            onDismissNotification={handleDismissNotification}
          />
        )}

        {currentScreen === 'live-tracking' && (
          <LiveTrackingScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'request-delivery' && (
          <RequestDeliveryScreen
            onNavigate={setCurrentScreen}
            onOrderCreated={handleNewOrderCreated}
            orders={orders}
          />
        )}

        {currentScreen === 'track-shipment' && (
          <TrackShipmentScreen onNavigate={setCurrentScreen} orders={orders} />
        )}

        {currentScreen === 'driver-dashboard' && (
          <div className="flex-1 flex items-center justify-center p-0 sm:py-6 sm:px-4 bg-[#0a1827]">
            {deviceFrameMode ? (
              <div className="relative w-full sm:max-w-[420px] rounded-none sm:rounded-[36px] p-0 sm:p-3 bg-[#111f30] border-0 sm:border-4 border-[#243e5c] shadow-none sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
                <div className="hidden sm:flex absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0a1827] rounded-full z-50 items-center justify-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>
                <div className="rounded-none sm:rounded-[28px] overflow-hidden">
                  <DriverDashboardScreen onNavigate={setCurrentScreen} />
                </div>
              </div>
            ) : (
              <div className="w-full">
                <DriverDashboardScreen onNavigate={setCurrentScreen} />
              </div>
            )}
          </div>
        )}

        {currentScreen === 'driver-navigation' && (
          <div className="flex-1 flex items-center justify-center p-0 sm:py-6 sm:px-4 bg-[#0a1827]">
            {deviceFrameMode ? (
              <div className="relative w-full sm:max-w-[420px] rounded-none sm:rounded-[36px] p-0 sm:p-3 bg-[#111f30] border-0 sm:border-4 border-[#243e5c] shadow-none sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
                <div className="hidden sm:flex absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0a1827] rounded-full z-50 items-center justify-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>
                <div className="rounded-none sm:rounded-[28px] overflow-hidden">
                  <DriverNavigationScreen onNavigate={setCurrentScreen} />
                </div>
              </div>
            ) : (
              <div className="w-full">
                <DriverNavigationScreen onNavigate={setCurrentScreen} />
              </div>
            )}
          </div>
        )}

        {currentScreen === 'proof-of-delivery' && (
          <div className="flex-1 flex items-center justify-center p-0 sm:py-6 sm:px-4 bg-[#0a1827]">
            {deviceFrameMode ? (
              <div className="relative w-full sm:max-w-[420px] rounded-none sm:rounded-[36px] p-0 sm:p-3 bg-[#111f30] border-0 sm:border-4 border-[#243e5c] shadow-none sm:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
                <div className="hidden sm:flex absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0a1827] rounded-full z-50 items-center justify-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>
                <div className="rounded-none sm:rounded-[28px] overflow-hidden">
                  <ProofOfDeliveryScreen
                    onNavigate={setCurrentScreen}
                    onDeliveryComplete={handleDeliveryComplete}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full">
                <ProofOfDeliveryScreen
                  onNavigate={setCurrentScreen}
                  onDeliveryComplete={handleDeliveryComplete}
                />
              </div>
            )}
          </div>
        )}

        {currentScreen === 'all-artboards' && (
          <AllScreensArtboard onSelectScreen={setCurrentScreen} />
        )}
      </div>

      {/* Persistent Footer */}
      <footer className="w-full bg-[#071321] text-slate-400 border-t border-[#1E3756] py-3.5 px-6 text-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>© 2025 DMS Enterprise Logistics Suite. Firebase Cloud Firestore Backend.</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button
            onClick={() => showToast('Service Level Agreements: 99.8% On-Time Delivery Guaranteed')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Service Level Agreements
          </button>
          <span>•</span>
          <button
            onClick={() => showToast('Compliance: ISO 27001 & NDPR Certified Data Privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Compliance &amp; Security
          </button>
          <span>•</span>
          <button
            onClick={() => setIsCustomerSupportOpen(true)}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">support_agent</span>
            <span>Lagos Dispatch Desk</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentPortal('portal-select')}
            className="hover:text-white text-[#fd934c] font-semibold transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">logout</span>
            <span>Switch Portal</span>
          </button>
        </div>
      </footer>

      {/* Role & Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Customer Self-Service Orders History Modal */}
      <CustomerOrdersHistoryModal
        isOpen={isCustomerOrdersOpen}
        onClose={() => setIsCustomerOrdersOpen(false)}
        orders={orders}
        onNavigate={setCurrentScreen}
      />

      {/* Customer Live Support Dispatch Modal */}
      <CustomerSupportModal
        isOpen={isCustomerSupportOpen}
        onClose={() => setIsCustomerSupportOpen(false)}
      />
    </div>
  );
}
