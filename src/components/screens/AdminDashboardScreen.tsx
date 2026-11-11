import React, { useState } from 'react';
import {
  LOGO_URL,
  SARAH_JENKINS_AVATAR,
  EMEKA_RACK_AVATAR,
  AMINA_RACK_AVATAR,
  DAVID_RACK_AVATAR,
  TUNDE_BAKARE_PROFILE_PIC,
  INITIAL_ORDERS,
  INITIAL_COURIERS,
  INITIAL_CUSTOMERS,
  INITIAL_NOTIFICATIONS,
  CURRENT_USER,
} from '../../data/logisticsData';
import {
  ScreenId,
  ShipmentOrder,
  Courier,
  CustomerAccount,
  NotificationItem,
  UserProfile,
  AdminSidebarSection,
  DeliveryException,
  PaymentRecord,
  AuditLog,
} from '../../types/logistics';
import { OrdersManagementSection } from '../sections/OrdersManagementSection';
import { AssignmentsSection } from '../sections/AssignmentsSection';
import { DriversManagementSection } from '../sections/DriversManagementSection';
import { CustomersSection } from '../sections/CustomersSection';
import { NotificationsSection } from '../sections/NotificationsSection';
import { ReportsAnalyticsSection } from '../sections/ReportsAnalyticsSection';
import { SettingsSection } from '../sections/SettingsSection';
import { ExceptionsSection } from '../sections/ExceptionsSection';
import { PaymentsInvoicesSection } from '../sections/PaymentsInvoicesSection';
import { AuditLogsSection } from '../sections/AuditLogsSection';

interface AdminDashboardScreenProps {
  onNavigate: (screenId: ScreenId) => void;
  orders?: ShipmentOrder[];
  couriers?: Courier[];
  customers?: CustomerAccount[];
  notifications?: NotificationItem[];
  exceptions?: DeliveryException[];
  payments?: PaymentRecord[];
  auditLogs?: AuditLog[];
  currentUser?: UserProfile;
  onUpdateUser?: (updated: UserProfile) => void;
  onDeleteOrder?: (trackingNo: string) => void;
  onDeleteCourier?: (id: string) => void;
  onDeleteCustomer?: (id: string) => void;
  onAddCourier?: (c: Courier) => void;
  onAddCustomer?: (c: CustomerAccount) => void;
  onAssignOrder?: (trackingNo: string, courierName: string, initials: string) => void;
  onUpdateException?: (exception: DeliveryException) => void;
  onAddException?: (exception: DeliveryException) => void;
  onUpdatePayment?: (payment: PaymentRecord) => void;
  onDeleteAllDemoData?: () => void;
  onRestoreDemoData?: () => void;
  onMarkAllAsRead?: () => void;
  onClearAllNotifications?: () => void;
  onDismissNotification?: (id: string) => void;
  hasDemoData?: boolean;
  activeSection?: AdminSidebarSection;
  onSelectSection?: (section: AdminSidebarSection) => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  onNavigate,
  orders,
  couriers,
  customers,
  notifications,
  exceptions,
  payments,
  auditLogs,
  currentUser,
  onUpdateUser,
  onDeleteOrder,
  onDeleteCourier,
  onDeleteCustomer,
  onAddCourier,
  onAddCustomer,
  onAssignOrder,
  onUpdateException,
  onAddException,
  onUpdatePayment,
  onDeleteAllDemoData,
  onRestoreDemoData,
  onMarkAllAsRead,
  onClearAllNotifications,
  onDismissNotification,
  hasDemoData = true,
  activeSection: activeSectionProp,
  onSelectSection,
}) => {
  const [internalSection, setInternalSection] = useState<AdminSidebarSection>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const activeSection = activeSectionProp !== undefined ? activeSectionProp : internalSection;

  const setActiveSection = (section: AdminSidebarSection) => {
    if (onSelectSection) {
      onSelectSection(section);
    } else {
      setInternalSection(section);
    }
    setMobileNavOpen(false);
  };

  const [selectedHub, setSelectedHub] = useState('All');
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const currentOrders = orders || INITIAL_ORDERS;
  const currentCouriers = couriers || INITIAL_COURIERS;
  const currentCustomers = customers || INITIAL_CUSTOMERS;
  const currentNotifications = notifications || INITIAL_NOTIFICATIONS;
  const user = currentUser || CURRENT_USER;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const handleToggleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  const filteredOrders = currentOrders.filter((order) => {
    if (statusFilter === 'In Transit' && order.status !== 'In Transit') return false;
    if (statusFilter === 'Delivered' && order.status !== 'Delivered') return false;
    if (statusFilter === 'Pending' && order.status !== 'Pending Dispatch') return false;
    if (statusFilter === 'Failed' && order.status !== 'Delayed') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.trackingNo.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.origin.toLowerCase().includes(q) ||
        order.destination.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#f8f9ff] text-[#0c1d2c] font-sans antialiased">
      {/* Mobile Sidebar Drawer Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#142b45] text-white flex flex-col justify-between shrink-0 shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <img alt="DMS Logistics Logo" className="h-7 w-auto object-contain" src={LOGO_URL} />
                  <div className="flex flex-col">
                    <span className="font-['Manrope'] text-sm text-white font-bold tracking-tight">
                      DMS Enterprise
                    </span>
                    <span className="text-[10px] text-[#b2c8e9] uppercase tracking-wider font-semibold">
                      Operations Suite
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'dashboard'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    <span>Dashboard</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('orders')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'orders'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                    <span>Orders &amp; Cargo</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#994700] text-white font-mono text-[10px]">
                    {currentOrders.length}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('request-delivery')}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-xs text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">post_add</span>
                    <span>Create Order</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('assignments')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'assignments'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">route</span>
                    <span>Delivery Assignments</span>
                  </div>
                </button>

                <button
                  onClick={() => onNavigate('live-tracking')}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-xs text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">radar</span>
                    <span>Live Telemetry Radar</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#fd934c] animate-pulse"></span>
                </button>

                <button
                  onClick={() => setActiveSection('drivers')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'drivers'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                    <span>Drivers Directory</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px]">
                    {currentCouriers.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSection('customers')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'customers'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">groups</span>
                    <span>Customers</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('exceptions')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'exceptions'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">report_problem</span>
                    <span>Exceptions</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('payments')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'payments'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                    <span>Payments &amp; Invoices</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('notifications')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'notifications'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">notifications</span>
                    <span>Notifications</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('reports')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'reports'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">analytics</span>
                    <span>Reports</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('audit')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'audit'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">history</span>
                    <span>Audit Logs</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveSection('settings')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition-colors text-left ${
                    activeSection === 'settings'
                      ? 'bg-white/10 text-white'
                      : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                    <span>Settings</span>
                  </div>
                </button>
              </nav>
            </div>

            <div className="p-3 border-t border-white/10 flex flex-col gap-2">
              <div className="px-3 py-2 rounded-lg bg-white/5 flex items-center justify-between text-xs">
                <span className="text-white">Live Fleet Sync</span>
                <span className="text-emerald-400 font-mono">Online</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Fixed Left Navigation Sidebar (Desktop w-72) */}
      <aside className="hidden lg:flex w-72 bg-[#142b45] text-white flex-col justify-between shrink-0 select-none shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-20">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Logo & Suite Header */}
          <div className="h-16 px-6 flex items-center gap-3 border-b border-white/10">
            <img alt="DMS Logistics Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
            <div className="flex flex-col">
              <span className="font-['Manrope'] text-sm text-white leading-tight font-bold tracking-tight">
                DMS Enterprise
              </span>
              <span className="text-[11px] text-[#b2c8e9] uppercase tracking-wider font-semibold">
                Suite Orchestrator
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'dashboard'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('orders')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'orders'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                <span>Orders</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#994700] text-white font-mono text-xs">
                {currentOrders.length}
              </span>
            </button>

            <button
              onClick={() => onNavigate('request-delivery')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">post_add</span>
                <span>Create Order</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('assignments')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'assignments'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">route</span>
                <span>Delivery Assignments</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('live-tracking')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">my_location</span>
                <span>Live Tracking</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#fd934c] animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveSection('drivers')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'drivers'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">badge</span>
                <span>Drivers</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-xs">
                {currentCouriers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSection('customers')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'customers'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">groups</span>
                <span>Customers</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('exceptions')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'exceptions'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">report_problem</span>
                <span>Exceptions</span>
              </div>
              {(exceptions?.filter((e) => e.status !== 'Resolved' && e.status !== 'Closed').length || 0) > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white font-mono text-xs">
                  {exceptions?.filter((e) => e.status !== 'Resolved' && e.status !== 'Closed').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSection('payments')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'payments'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                <span>Payments &amp; Invoices</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('notifications')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'notifications'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span>Notifications</span>
              </div>
              {currentNotifications.filter((n) => !n.read).length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white font-mono text-xs">
                  {currentNotifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSection('reports')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'reports'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                <span>Reports &amp; Analytics</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('audit')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'audit'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span>Audit Logs</span>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('settings')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
                activeSection === 'settings'
                  ? 'bg-white/10 text-white'
                  : 'text-[#b2c8e9] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Fleet Sync Status & Log out */}
        <div className="p-3 flex flex-col gap-2 border-t border-white/10">
          <div className="px-3 py-2 rounded-lg bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs text-white">Live Fleet Sync</span>
            </div>
            <span className="font-mono text-xs text-[#b2c8e9]">Online</span>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-[#ffdad6] hover:text-[#93000a] transition-colors text-sm">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8f9ff]">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#d3e4fa] px-3.5 sm:px-6 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-1 text-[#0c1d2c] hover:bg-[#eef4ff] rounded-lg transition-colors cursor-pointer"
              title="Open Navigation Menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <div className="flex items-center gap-2 text-xs truncate">
              <span className="text-[#43474d] hidden sm:inline">Operations</span>
              <span className="text-[#c4c6ce] hidden sm:inline">/</span>
              <span className="text-[#0c1d2c] font-semibold capitalize truncate">
                {activeSection === 'dashboard'
                  ? 'Admin Dashboard'
                  : activeSection === 'drivers'
                  ? 'Driver Fleet Management'
                  : activeSection === 'assignments'
                  ? 'Delivery Route Assignments'
                  : activeSection === 'exceptions'
                  ? 'Exceptions & Problem Resolution'
                  : activeSection === 'payments'
                  ? 'Payments & Invoices'
                  : activeSection === 'audit'
                  ? 'Security & Audit Logs'
                  : activeSection}
              </span>
            </div>
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eef4ff] text-[#43474d] font-mono text-xs">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>UTC+1 | Lagos Ops Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#43474d] text-[18px]">
                search
              </span>
              <input
                className="w-72 h-9 pl-9 pr-12 rounded-lg bg-[#f8f9ff] border border-[#c4c6ce] text-[#0c1d2c] text-xs placeholder:text-[#43474d] focus:outline-none focus:border-[#994700] transition-colors"
                placeholder="Search tracking number, customer, driver..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <kbd className="absolute right-2 px-1.5 py-0.5 rounded bg-[#daeaff] border border-[#c4c6ce] text-[#43474d] font-mono text-[10px]">
                ⌘K
              </kbd>
            </div>

            <button
              onClick={() => onNavigate('request-delivery')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#994700] hover:bg-[#6c3000] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Order</span>
            </button>

            <button
              onClick={() => setActiveSection('notifications')}
              className="relative p-2 rounded-lg text-[#43474d] hover:bg-[#eef4ff] transition-colors cursor-pointer"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {currentNotifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              )}
            </button>

            <button
              onClick={() => setActiveSection('settings')}
              className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-[#d3e4fa] hover:opacity-80 transition cursor-pointer text-left"
              title="Profile & Settings"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-[#994700]/30"
                src={SARAH_JENKINS_AVATAR}
              />
              <div className="hidden lg:flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-[#0c1d2c]">{user.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[10px] text-[#43474d] font-medium">{user.role}</span>
              </div>
            </button>
          </div>
        </header>

        {/* Dashboard Body Content */}
        {activeSection === 'dashboard' && (
        <main className="flex-1 w-full p-3.5 sm:p-6 space-y-4 sm:space-y-6">
          {/* Top Command & Filter Control Strip */}
          <div className="w-full bg-white px-3.5 sm:px-6 py-3 rounded-xl shadow-sm border border-[#e2e8f0] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#994700] animate-pulse"></span>
                <span className="font-['Manrope'] text-sm sm:text-base font-bold text-[#0c1d2c] tracking-tight">
                  Active Dispatch Operational Center
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#daeaff] text-[#43474d] font-mono text-[10px] sm:text-xs font-semibold">
                  SYS-REV: 4.19
                </span>
              </div>
              <p className="text-xs text-[#43474d] mt-0.5">
                Real-time dispatch overview, fleet utilization and shipment lifecycle tracking.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eef4ff] text-[#0c1d2c] text-xs shadow-sm cursor-pointer hover:bg-[#e4efff]">
                <span className="material-symbols-outlined text-[16px] text-[#43474d]">
                  calendar_today
                </span>
                <span className="font-medium text-[11px] sm:text-xs">Today: Oct 24, 2024</span>
                <span className="material-symbols-outlined text-[16px] text-[#43474d]">
                  arrow_drop_down
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eef4ff] text-[#0c1d2c] text-xs shadow-sm cursor-pointer hover:bg-[#e4efff]">
                <span className="material-symbols-outlined text-[16px] text-[#43474d]">hub</span>
                <span className="font-medium text-[11px] sm:text-xs">Regional Hubs (5)</span>
                <span className="material-symbols-outlined text-[16px] text-[#43474d]">
                  expand_more
                </span>
              </div>

              <button
                onClick={handleToggleSync}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e4efff] text-[#43474d] text-xs hover:text-[#0c1d2c] transition-colors cursor-pointer"
              >
                <span
                  className={`material-symbols-outlined text-[16px] text-[#994700] ${
                    isSyncing ? 'animate-spin' : ''
                  }`}
                >
                  sync
                </span>
                <span className="font-mono text-xs">Sync</span>
              </button>

              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eef4ff] text-[#0c1d2c] text-xs font-semibold hover:bg-[#e4efff] transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[16px]">ios_share</span>
                <span>Export</span>
              </button>

              <button
                onClick={() => onNavigate('live-tracking')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#994700] hover:bg-[#6c3000] text-white text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">local_shipping</span>
                <span>Dispatch Batch</span>
              </button>
            </div>
          </div>

          {/* 1. Operational KPI Metrics Grid (7 Distinct Operational Stat Cards) */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs uppercase tracking-wider text-[#43474d] font-bold">
                Key Telemetry &amp; System Health
              </h2>
              <span className="font-mono text-[11px] sm:text-xs text-[#43474d]">Last polled: 14:42:19 UTC+1</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
              {/* Card 1: Total Orders */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#43474d] uppercase tracking-wider font-semibold">
                    Total Orders
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#43474d]">
                    receipt_long
                  </span>
                </div>
                <div className="font-['Manrope'] text-2xl font-bold text-[#0c1d2c] tracking-tight">
                  2,845
                </div>
                <div className="mt-2 flex items-center justify-between text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-mono">
                  <span className="flex items-center">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span>+12.4%
                  </span>
                  <span className="text-[#43474d] text-[10px]">vs yest.</span>
                </div>
              </div>

              {/* Card 2: Pending Orders */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#994700] uppercase tracking-wider font-bold">
                    Pending
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#994700]">
                    pending_actions
                  </span>
                </div>
                <div className="font-['Manrope'] text-2xl font-bold text-[#994700] tracking-tight">
                  148
                </div>
                <div className="mt-2 flex items-center justify-between text-[#994700] bg-[#ffdbc8]/50 px-2 py-0.5 rounded text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#994700] animate-ping"></span>
                    Immediate
                  </span>
                  <span className="text-[#0c1d2c] font-semibold">Priority</span>
                </div>
              </div>

              {/* Card 3: Assigned Deliveries */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#43474d] uppercase tracking-wider font-semibold">
                    Assigned
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#43474d]">
                    assignment_turned_in
                  </span>
                </div>
                <div className="font-['Manrope'] text-2xl font-bold text-[#0c1d2c] tracking-tight">
                  312
                </div>
                <div className="mt-2 flex items-center justify-between text-[#43474d] bg-[#eef4ff] px-2 py-0.5 rounded text-xs font-mono">
                  <span>Queued</span>
                  <span className="text-[#0c1d2c] font-semibold">Pickup Ready</span>
                </div>
              </div>

              {/* Card 4: In Transit */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#5994db] uppercase tracking-wider font-bold">
                    In Transit
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#5994db]">
                    local_shipping
                  </span>
                </div>
                <div className="font-['Manrope'] text-2xl font-bold text-[#5994db] tracking-tight">
                  584
                </div>
                <div className="mt-2 flex items-center justify-between text-[#5994db] bg-[#daeaff] px-2 py-0.5 rounded text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5994db]"></span>Live Active
                  </span>
                  <span className="font-semibold">42 Fleets</span>
                </div>
              </div>

              {/* Card 5: Delivered Orders */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#43474d] uppercase tracking-wider font-semibold">
                    Delivered
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">
                    task_alt
                  </span>
                </div>
                <div className="font-['Manrope'] text-2xl font-bold text-emerald-700 tracking-tight">
                  1,765
                </div>
                <div className="mt-2 flex items-center justify-between text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-xs font-mono">
                  <span className="font-bold">98.2%</span>
                  <span>On-Time Rate</span>
                </div>
              </div>

              {/* Card 6: Delayed / Failed */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#ba1a1a] uppercase tracking-wider font-bold">
                    Delayed / Fail
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">
                    warning
                  </span>
                </div>
                <div className="font-['Manrope'] text-2xl font-bold text-[#ba1a1a] tracking-tight">
                  36
                </div>
                <div className="mt-2 flex items-center justify-between text-[#ba1a1a] bg-[#ffdad6]/60 px-2 py-0.5 rounded text-xs font-mono font-semibold">
                  <span>1.2% rate</span>
                  <span className="underline cursor-pointer">Resolve (6)</span>
                </div>
              </div>

              {/* Card 7: Active Drivers */}
              <div className="p-3.5 rounded-xl bg-white border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[#43474d] uppercase tracking-wider font-semibold">
                    Active Drivers
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-[#43474d]">
                    person_pin
                  </span>
                </div>
                <div className="font-['Manrope'] text-2xl font-bold text-[#0c1d2c] tracking-tight">
                  42
                  <span className="text-[#43474d] text-base font-normal"> / 48</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[#0c1d2c] bg-[#eef4ff] px-2 py-0.5 rounded text-xs font-mono">
                  <span className="font-bold text-[#994700]">87.5%</span>
                  <span>Capacity</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Analytics & Fleet Performance Section (2-Column Architecture) */}
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Column: Delivery Performance & Volume Trends (7 Cols) */}
            <div className="xl:col-span-7 rounded-xl bg-white p-5 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e2e8f0] gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                        Delivery Performance &amp; Shift Volume
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-[#e4efff] text-[#43474d] font-mono text-[11px]">
                        Shift Ops: 24H
                      </span>
                    </div>
                    <p className="text-xs text-[#43474d] mt-0.5">
                      Tracking on-time deliveries against exceptions across 8-hour shift windows
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-[#142b45]"></span>
                      <span className="font-medium text-[#0c1d2c]">On-Time</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-[#994700]"></span>
                      <span className="font-medium text-[#0c1d2c]">Delayed</span>
                    </div>
                  </div>
                </div>

                {/* Micro Analytics Metric Row */}
                <div className="grid grid-cols-3 gap-2 py-2 my-3 rounded-lg bg-[#eef4ff] px-3">
                  <div>
                    <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                      Avg. Transit Duration
                    </span>
                    <p className="font-['Manrope'] text-lg font-bold text-[#0c1d2c]">
                      34.2 <span className="text-xs font-normal text-[#43474d]">mins</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                      1st Attempt Success
                    </span>
                    <p className="font-['Manrope'] text-lg font-bold text-emerald-700">96.8%</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                      Consignee Satisfaction
                    </span>
                    <div className="flex items-center gap-1">
                      <p className="font-['Manrope'] text-lg font-bold text-[#0c1d2c]">4.9</p>
                      <span
                        className="material-symbols-outlined text-[16px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs text-[#43474d]">/ 5.0</span>
                    </div>
                  </div>
                </div>

                {/* Histogram Chart */}
                <div className="w-full h-52 pt-2 flex flex-col justify-end">
                  <div className="grid grid-cols-6 h-40 items-end gap-4 sm:gap-6 px-2">
                    {[
                      { time: '06:00', onTime: 48, delayed: 12, label: '320/8' },
                      { time: '09:00', onTime: 82, delayed: 16, label: '540/12' },
                      { time: '12:00', onTime: 100, delayed: 22, label: '710/18', peak: true },
                      { time: '15:00', onTime: 88, delayed: 19, label: '620/14' },
                      { time: '18:00', onTime: 64, delayed: 14, label: '450/9' },
                      { time: '21:00', onTime: 32, delayed: 6, label: '210/4' },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex flex-col items-center h-full justify-end group">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-[#0c1d2c] mb-1">
                          {bar.label}
                        </span>
                        <div className="w-full flex items-end justify-center gap-1 h-full max-h-32">
                          <div
                            className="w-1/2 bg-[#142b45] rounded-t transition-all hover:brightness-125"
                            style={{ height: `${bar.onTime}%` }}
                          />
                          <div
                            className="w-1/2 bg-[#994700] rounded-t transition-all hover:brightness-125"
                            style={{ height: `${bar.delayed}%` }}
                          />
                        </div>
                        <span
                          className={`font-mono text-xs mt-2 ${
                            bar.peak ? 'text-[#0c1d2c] font-bold' : 'text-[#43474d]'
                          }`}
                        >
                          {bar.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs text-[#43474d]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">
                    verified
                  </span>
                  <span>SLA Compliance threshold maintained above 95.0% for all zones</span>
                </div>
                <button
                  onClick={() => onNavigate('live-tracking')}
                  className="text-[#994700] hover:underline font-semibold"
                >
                  View Zone Audit →
                </button>
              </div>
            </div>

            {/* Right Column: Live Hub Dispatch & Capacity Limits (5 Cols) */}
            <div className="xl:col-span-5 rounded-xl bg-white p-5 border border-[#e2e8f0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]">
                  <div>
                    <h3 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                      Regional Hub Load &amp; Capacity
                    </h3>
                    <p className="text-xs text-[#43474d] mt-0.5">
                      Real-time parcel processing bottlenecks
                    </p>
                  </div>
                  <button className="px-2.5 py-1 rounded bg-[#e4efff] text-[#0c1d2c] text-xs font-semibold hover:bg-[#daeaff] transition-colors">
                    Rebalance Fleet
                  </button>
                </div>

                {/* Hub Breakdown List */}
                <div className="space-y-3 mt-3">
                  {/* Hub 1: Lagos Mainland */}
                  <div className="p-3 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-semibold text-[#0c1d2c]">
                          Lagos Mainland Hub (Yaba)
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#0c1d2c]">
                        920 / 1,000 pkts
                      </span>
                    </div>
                    <div className="w-full bg-[#d3e4fa] rounded-full h-2 overflow-hidden flex">
                      <div className="bg-[#142b45] h-full rounded-full" style={{ width: '92%' }} />
                    </div>
                    <div className="flex justify-between items-center mt-1.5 text-xs text-[#43474d]">
                      <span>14 Active Couriers • 4 queued</span>
                      <span className="text-[#994700] font-semibold font-mono">
                        92% (Near Capacity)
                      </span>
                    </div>
                  </div>

                  {/* Hub 2: Victoria Island */}
                  <div className="p-3 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-semibold text-[#0c1d2c]">
                          Victoria Island Hub (VI South)
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#0c1d2c]">
                        615 / 800 pkts
                      </span>
                    </div>
                    <div className="w-full bg-[#d3e4fa] rounded-full h-2 overflow-hidden flex">
                      <div
                        className="bg-[#142b45] h-full rounded-full"
                        style={{ width: '76.8%' }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1.5 text-xs text-[#43474d]">
                      <span>11 Active Couriers • Smooth transit</span>
                      <span className="text-emerald-700 font-semibold font-mono">
                        76.8% (Optimal)
                      </span>
                    </div>
                  </div>

                  {/* Hub 3: Ikeja Industrial */}
                  <div className="p-3 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
                        <span className="text-xs font-semibold text-[#0c1d2c]">
                          Ikeja Industrial Hub (Central)
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#ba1a1a]">
                        780 / 800 pkts
                      </span>
                    </div>
                    <div className="w-full bg-[#d3e4fa] rounded-full h-2 overflow-hidden flex">
                      <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: '97.5%' }} />
                    </div>
                    <div className="flex justify-between items-center mt-1.5 text-xs text-[#43474d]">
                      <span>9 Active Couriers • 8 pending batch</span>
                      <span className="text-[#ba1a1a] font-bold font-mono">
                        97.5% (Overload Warning)
                      </span>
                    </div>
                  </div>

                  {/* Hub 4: Lekki Corridor */}
                  <div className="p-3 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-semibold text-[#0c1d2c]">
                          Lekki-Epe Express Corridor
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#0c1d2c]">
                        530 / 900 pkts
                      </span>
                    </div>
                    <div className="w-full bg-[#d3e4fa] rounded-full h-2 overflow-hidden flex">
                      <div
                        className="bg-[#142b45] h-full rounded-full"
                        style={{ width: '58.8%' }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1.5 text-xs text-[#43474d]">
                      <span>8 Active Couriers • Available surplus</span>
                      <span className="text-emerald-700 font-semibold font-mono">
                        58.8% (Buffer Available)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-2.5 rounded-lg bg-[#ffdbc8]/30 border border-[#ffdbc8] flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#321300]">
                  <span className="material-symbols-outlined text-[18px]">swap_calls</span>
                  <span className="text-xs font-semibold">Auto-Route Dispatch Engine</span>
                </div>
                <span className="font-mono text-xs text-[#994700] font-bold">Dynamic Balanced</span>
              </div>
            </div>
          </section>

          {/* 3. Live Driver Activity Monitor */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#994700] text-[22px]">
                  two_wheeler
                </span>
                <h2 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                  Live Fleet Driver Activity Rack
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#142b45] text-white font-mono text-xs">
                  42 Online
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-1 rounded bg-[#e4efff] hover:bg-[#daeaff] transition-colors"
                  title="Scroll Left"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  className="p-1 rounded bg-[#e4efff] hover:bg-[#daeaff] transition-colors"
                  title="Scroll Right"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Driver 1: Emeka Okonkwo */}
              <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          alt="Emeka Okonkwo"
                          src={EMEKA_RACK_AVATAR}
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-xs font-bold text-[#0c1d2c] truncate">Emeka Okonkwo</h4>
                        <span className="font-mono text-[11px] text-[#43474d] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">two_wheeler</span>{' '}
                          LG-442-APP
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-amber-800 font-mono text-xs font-semibold">
                      <span
                        className="material-symbols-outlined text-[14px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      4.95
                    </div>
                  </div>

                  <div className="mt-3 p-2 rounded bg-[#eef4ff] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                        Current Status
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#daeaff] text-[#5994db] font-mono text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5994db]"></span> In Transit
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#0c1d2c]">
                      <span className="text-[#43474d]">Zone: Lekki Phase 1</span>
                      <span className="font-mono font-bold text-[#994700]">4 parcels left</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-[#e2e8f0]">
                  <a
                    href="tel:+2348039921104"
                    className="p-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] hover:bg-[#daeaff] transition-colors"
                    title="Call Driver"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </a>
                  <button
                    onClick={() => onNavigate('live-tracking')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#142b45] text-white text-center text-xs font-semibold hover:bg-[#002b51] transition-colors"
                  >
                    View Route
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] hover:bg-[#daeaff] transition-colors"
                    title="Reassign"
                  >
                    <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                  </button>
                </div>
              </div>

              {/* Driver 2: Tunde Bakare */}
              <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          alt="Tunde Bakare"
                          src={TUNDE_BAKARE_PROFILE_PIC}
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-amber-500 border-2 border-white"></span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-xs font-bold text-[#0c1d2c] truncate">Tunde Bakare</h4>
                        <span className="font-mono text-[11px] text-[#43474d] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            airport_shuttle
                          </span>{' '}
                          APP-882-XY
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-amber-800 font-mono text-xs font-semibold">
                      <span
                        className="material-symbols-outlined text-[14px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      4.88
                    </div>
                  </div>

                  <div className="mt-3 p-2 rounded bg-[#eef4ff] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                        Current Status
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#ffdbc8]/60 text-[#994700] font-mono text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#994700]"></span> Picking Up
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#0c1d2c]">
                      <span className="text-[#43474d]">Hub: Whse Hub A</span>
                      <span className="font-mono font-bold text-[#0c1d2c]">12 parcels manifest</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-[#e2e8f0]">
                  <a
                    href="tel:+2348034918820"
                    className="p-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] hover:bg-[#daeaff] transition-colors"
                    title="Call Driver"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </a>
                  <button
                    onClick={() => onNavigate('driver-dashboard')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#142b45] text-white text-center text-xs font-semibold hover:bg-[#002b51] transition-colors"
                  >
                    View Driver App
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] hover:bg-[#daeaff] transition-colors"
                    title="Reassign"
                  >
                    <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                  </button>
                </div>
              </div>

              {/* Driver 3: Amina Bello */}
              <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          alt="Amina Bello"
                          src={AMINA_RACK_AVATAR}
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-xs font-bold text-[#0c1d2c] truncate">Amina Bello</h4>
                        <span className="font-mono text-[11px] text-[#43474d] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">two_wheeler</span>{' '}
                          IKJ-102-KT
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-amber-800 font-mono text-xs font-semibold">
                      <span
                        className="material-symbols-outlined text-[14px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      4.92
                    </div>
                  </div>

                  <div className="mt-3 p-2 rounded bg-[#eef4ff] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                        Current Status
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Available
                        Idle
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#0c1d2c]">
                      <span className="text-[#43474d]">Zone: Ikeja Sector 2</span>
                      <span className="font-mono font-bold text-emerald-700">Awaiting Batch</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-[#e2e8f0]">
                  <a
                    href="tel:+2348028710042"
                    className="p-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] hover:bg-[#daeaff] transition-colors"
                    title="Call Driver"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </a>
                  <button
                    onClick={() => onNavigate('request-delivery')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#994700] text-white text-center text-xs font-semibold hover:bg-[#6c3000] transition-colors shadow-sm"
                  >
                    Assign Job
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] hover:bg-[#daeaff] transition-colors"
                    title="Reassign"
                  >
                    <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                  </button>
                </div>
              </div>

              {/* Driver 4: David Adeleke */}
              <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          alt="David Adeleke"
                          src={DAVID_RACK_AVATAR}
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#5994db] border-2 border-white"></span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <h4 className="text-xs font-bold text-[#0c1d2c] truncate">David Adeleke</h4>
                        <span className="font-mono text-[11px] text-[#43474d] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            airport_shuttle
                          </span>{' '}
                          VIC-301-ZZ
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-amber-800 font-mono text-xs font-semibold">
                      <span
                        className="material-symbols-outlined text-[14px] text-amber-500"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      4.79
                    </div>
                  </div>

                  <div className="mt-3 p-2 rounded bg-[#eef4ff] flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                        Current Status
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-[#daeaff] text-[#5994db] font-mono text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#994700]"></span> Delivering
                        Drop-off
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#0c1d2c]">
                      <span className="text-[#43474d]">Victoria Island Plaza</span>
                      <span className="font-mono font-bold text-[#0c1d2c]">1 parcel queued</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-[#e2e8f0]">
                  <a
                    href="tel:+2348109923811"
                    className="p-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] hover:bg-[#daeaff] transition-colors"
                    title="Call Driver"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                  </a>
                  <button
                    onClick={() => onNavigate('live-tracking')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#142b45] text-white text-center text-xs font-semibold hover:bg-[#002b51] transition-colors"
                  >
                    View Route
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] hover:bg-[#daeaff] transition-colors"
                    title="Reassign"
                  >
                    <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Recent Orders Management Table (Enterprise High-Density Grid) */}
          <section className="rounded-xl bg-white border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#e2e8f0]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                    Recent Shipment Dispatch Stream
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#daeaff] text-[#43474d] font-mono text-xs font-semibold">
                    Live Feed
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#43474d] text-[18px]">
                    filter_alt
                  </span>
                  <input
                    className="h-8 pl-9 pr-4 w-60 rounded-lg bg-[#eef4ff] text-[#0c1d2c] text-xs placeholder:text-[#43474d] focus:outline-none focus:bg-[#e4efff] transition-colors"
                    placeholder="Filter recent orders..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center rounded-lg bg-[#eef4ff] p-1 gap-1">
                  {['All', 'In Transit', 'Delivered', 'Pending', 'Failed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded text-xs transition font-semibold ${
                        statusFilter === st
                          ? 'bg-white text-[#0c1d2c] shadow-sm'
                          : 'text-[#43474d] hover:text-[#0c1d2c]'
                      }`}
                    >
                      {st === 'Failed' ? 'Failed (36)' : st}
                    </button>
                  ))}
                </div>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e4efff] text-[#0c1d2c] text-xs font-semibold hover:bg-[#daeaff] transition-colors">
                  <span className="material-symbols-outlined text-[16px]">checklist</span>
                  <span>Bulk Actions</span>
                </button>
              </div>
            </div>

            {/* High-Density Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-xs">
                <thead className="bg-[#eef4ff] text-[#43474d] uppercase font-semibold tracking-wider text-[11px] border-b border-[#e2e8f0]">
                  <tr>
                    <th className="py-3 px-4 w-10">
                      <input
                        className="rounded accent-[#994700] w-4 h-4 cursor-pointer"
                        type="checkbox"
                        checked={
                          selectedOrders.length === filteredOrders.length &&
                          filteredOrders.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders(filteredOrders.map((o) => o.trackingNo));
                          } else {
                            setSelectedOrders([]);
                          }
                        }}
                      />
                    </th>
                    <th className="py-3 px-3">Waybill / Tracking No</th>
                    <th className="py-3 px-3">Customer &amp; Contact</th>
                    <th className="py-3 px-3">Route Origin &amp; Destination</th>
                    <th className="py-3 px-3">Assigned Courier</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eef4ff] text-[#0c1d2c]">
                  {filteredOrders.map((order) => {
                    const isSelected = selectedOrders.includes(order.trackingNo);
                    const isDelayed = order.status === 'Delayed';
                    return (
                      <tr
                        key={order.trackingNo}
                        className={`hover:bg-[#eef4ff]/70 transition-colors ${
                          isDelayed ? 'bg-[#ffdad6]/20' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <input
                            className="rounded accent-[#994700] w-4 h-4 cursor-pointer"
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedOrders([...selectedOrders, order.trackingNo]);
                              } else {
                                setSelectedOrders(
                                  selectedOrders.filter((t) => t !== order.trackingNo)
                                );
                              }
                            }}
                          />
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <span
                              onClick={() => onNavigate('track-shipment')}
                              className={`font-mono text-xs font-bold cursor-pointer hover:underline ${
                                isDelayed ? 'text-[#ba1a1a]' : 'text-[#00162e]'
                              }`}
                            >
                              {order.trackingNo}
                            </span>
                            <button
                              onClick={() => handleCopy(order.trackingNo)}
                              className="text-[#43474d] hover:text-[#994700] p-0.5 rounded transition-colors"
                              title="Copy tracking code"
                            >
                              <span className="material-symbols-outlined text-[15px]">
                                {copiedCode === order.trackingNo ? 'check' : 'content_copy'}
                              </span>
                            </button>
                          </div>
                          <span
                            className={`text-[11px] block mt-0.5 ${
                              isDelayed ? 'text-[#ba1a1a]' : 'text-[#43474d]'
                            }`}
                          >
                            {order.type}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#0c1d2c]">{order.customer}</span>
                            <a
                              href={`tel:${order.phone.replace(/\s+/g, '')}`}
                              className="text-[#5994db] hover:underline font-mono text-[11px] flex items-center gap-1 mt-0.5"
                            >
                              <span className="material-symbols-outlined text-[12px]">phone</span>
                              {order.phone}
                            </a>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                              <span className="font-medium text-[#0c1d2c] truncate max-w-[140px]">
                                {order.origin}
                              </span>
                              <span className="font-mono text-[11px] text-[#43474d]">
                                {order.originDetail}
                              </span>
                            </div>
                            <span className="material-symbols-outlined text-[16px] text-[#43474d]">
                              arrow_forward
                            </span>
                            <div className="flex flex-col">
                              <span
                                className={`font-medium truncate max-w-[140px] ${
                                  isDelayed ? 'text-[#ba1a1a]' : 'text-[#0c1d2c]'
                                }`}
                              >
                                {order.destination}
                              </span>
                              <span
                                className={`font-mono text-[11px] ${
                                  isDelayed ? 'text-[#ba1a1a]' : 'text-[#43474d]'
                                }`}
                              >
                                {order.destinationDetail}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {order.courierName === 'Unassigned' ? (
                            <div className="flex items-center gap-1.5 text-[#994700]">
                              <span className="material-symbols-outlined text-[18px]">
                                person_alert
                              </span>
                              <span className="font-semibold italic">Unassigned</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-[#e4efff] flex items-center justify-center font-bold text-[11px] text-[#00162e]">
                                {order.courierInitials}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold">{order.courierName}</span>
                                <span className="font-mono text-[11px] text-[#43474d]">
                                  {order.courierVehicle}
                                </span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{order.timestamp}</span>
                            <span
                              className={`font-mono text-[11px] ${
                                order.status === 'Delivered'
                                  ? 'text-emerald-700'
                                  : isDelayed
                                  ? 'text-[#ba1a1a]'
                                  : 'text-[#43474d]'
                              }`}
                            >
                              {order.eta}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          {order.status === 'In Transit' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#daeaff] text-[#5994db] font-semibold text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#5994db] animate-pulse"></span>
                              In Transit
                            </span>
                          )}
                          {order.status === 'Delivered' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              Delivered
                            </span>
                          )}
                          {order.status === 'Delayed' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-bold text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                              Delayed: Address Issue
                            </span>
                          )}
                          {order.status === 'Pending Dispatch' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdbc8]/60 text-[#994700] font-semibold text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#994700]"></span>
                              Pending Dispatch
                            </span>
                          )}
                          {order.status === 'Pickup Queued' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e4efff] text-[#0c1d2c] font-semibold text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0c1d2c]"></span>
                              Pickup Queued
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {order.status === 'Pending Dispatch' ? (
                              <button
                                onClick={() => onNavigate('request-delivery')}
                                className="px-2 py-1 rounded bg-[#142b45] text-white text-[11px] font-semibold hover:bg-[#002b51] transition"
                              >
                                Assign
                              </button>
                            ) : isDelayed ? (
                              <button
                                onClick={() => onNavigate('live-tracking')}
                                className="px-2 py-1 rounded bg-[#994700] text-white text-[11px] font-semibold hover:bg-[#6c3000] transition"
                              >
                                Re-route
                              </button>
                            ) : (
                              <button
                                onClick={() => onNavigate('track-shipment')}
                                className="p-1 rounded text-[#43474d] hover:text-[#0c1d2c] hover:bg-[#eef4ff] transition-colors"
                                title="Quick View"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  visibility
                                </span>
                              </button>
                            )}
                            <button
                              onClick={() => onNavigate('track-shipment')}
                              className="p-1 rounded text-[#43474d] hover:text-[#0c1d2c] hover:bg-[#eef4ff] transition-colors"
                              title="Print Waybill"
                            >
                              <span className="material-symbols-outlined text-[18px]">print</span>
                            </button>
                            <button
                              className="p-1 rounded text-[#43474d] hover:text-[#0c1d2c] hover:bg-[#eef4ff] transition-colors"
                              title="More Operations"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                more_vert
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer & Pagination */}
            <div className="px-6 py-3 bg-[#eef4ff] border-t border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#43474d]">
              <div className="flex items-center gap-3">
                <span>
                  Showing <strong className="text-[#0c1d2c]">1 to 5</strong> of{' '}
                  <strong className="text-[#0c1d2c]">2,845</strong> orders
                </span>
                <div className="flex items-center gap-1">
                  <span>Rows:</span>
                  <select className="bg-white text-[#0c1d2c] rounded border border-[#c4c6ce] text-xs px-2 py-0.5 outline-none">
                    <option>5</option>
                    <option defaultValue="10">10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded bg-white text-[#43474d] hover:text-[#0c1d2c] border border-[#e2e8f0] font-medium transition">
                  Previous
                </button>
                <button className="w-7 h-7 rounded bg-[#142b45] text-white font-bold font-mono">
                  1
                </button>
                <button className="w-7 h-7 rounded bg-white text-[#0c1d2c] hover:bg-[#e4efff] border border-[#e2e8f0] font-mono transition">
                  2
                </button>
                <button className="w-7 h-7 rounded bg-white text-[#0c1d2c] hover:bg-[#e4efff] border border-[#e2e8f0] font-mono transition">
                  3
                </button>
                <span className="px-1 text-[#43474d]">...</span>
                <button className="w-7 h-7 rounded bg-white text-[#0c1d2c] hover:bg-[#e4efff] border border-[#e2e8f0] font-mono transition">
                  569
                </button>
                <button className="px-2.5 py-1 rounded bg-white text-[#43474d] hover:text-[#0c1d2c] border border-[#e2e8f0] font-medium transition">
                  Next
                </button>
              </div>
            </div>
          </section>
        </main>
        )}

        {/* Section: Orders Management */}
        {activeSection === 'orders' && (
          <OrdersManagementSection
            orders={currentOrders}
            onNavigate={onNavigate}
            onDeleteOrder={onDeleteOrder || (() => {})}
            onDeleteDemoOrders={onDeleteAllDemoData}
          />
        )}

        {/* Section: Assignments Board */}
        {activeSection === 'assignments' && (
          <AssignmentsSection
            orders={currentOrders}
            couriers={currentCouriers}
            onNavigate={onNavigate}
            onAssignOrder={onAssignOrder || (() => {})}
          />
        )}

        {/* Section: Drivers Fleet Management */}
        {activeSection === 'drivers' && (
          <DriversManagementSection
            couriers={currentCouriers}
            onNavigate={onNavigate}
            onDeleteCourier={onDeleteCourier || (() => {})}
            onDeleteAllDemoCouriers={onDeleteAllDemoData || (() => {})}
            onAddCourier={onAddCourier || (() => {})}
          />
        )}

        {/* Section: Customers Accounts Directory */}
        {activeSection === 'customers' && (
          <CustomersSection
            customers={currentCustomers}
            onNavigate={onNavigate}
            onDeleteCustomer={onDeleteCustomer || (() => {})}
            onDeleteAllDemoCustomers={onDeleteAllDemoData || (() => {})}
            onAddCustomer={onAddCustomer || (() => {})}
          />
        )}

        {/* Section: Exceptions & Problem Resolution */}
        {activeSection === 'exceptions' && (
          <ExceptionsSection
            exceptions={exceptions || []}
            onNavigate={onNavigate}
            onUpdateException={onUpdateException || (() => {})}
            onAddException={onAddException || (() => {})}
          />
        )}

        {/* Section: Payments & Freight Invoices */}
        {activeSection === 'payments' && (
          <PaymentsInvoicesSection
            payments={payments || []}
            onNavigate={onNavigate}
            onUpdatePayment={onUpdatePayment || (() => {})}
          />
        )}

        {/* Section: Central Notifications Stream */}
        {activeSection === 'notifications' && (
          <NotificationsSection
            notifications={currentNotifications}
            onNavigate={onNavigate}
            onMarkAllAsRead={onMarkAllAsRead || (() => {})}
            onClearAll={onClearAllNotifications || (() => {})}
            onDismissNotification={onDismissNotification || (() => {})}
          />
        )}

        {/* Section: Operations Analytics & SLA Reporting */}
        {activeSection === 'reports' && (
          <ReportsAnalyticsSection onNavigate={onNavigate} />
        )}

        {/* Section: Security & Compliance Audit Trail */}
        {activeSection === 'audit' && (
          <AuditLogsSection logs={auditLogs || []} onNavigate={onNavigate} />
        )}

        {/* Section: Settings & Account Management */}
        {activeSection === 'settings' && (
          <SettingsSection
            currentUser={user}
            onUpdateUser={onUpdateUser || (() => {})}
            onDeleteAllDemoData={onDeleteAllDemoData || (() => {})}
            onRestoreDemoData={onRestoreDemoData || (() => {})}
            onNavigate={onNavigate}
            hasDemoData={hasDemoData}
          />
        )}
      </div>
    </div>
  );
};
