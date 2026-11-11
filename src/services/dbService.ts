import {
  ShipmentOrder,
  Courier,
  CustomerAccount,
  NotificationItem,
  DeliveryException,
  PaymentRecord,
  AuditLog,
  SupportTicket,
  UserProfile,
} from '../types/logistics';
import {
  INITIAL_ORDERS,
  INITIAL_COURIERS,
  INITIAL_CUSTOMERS,
  INITIAL_NOTIFICATIONS,
  CURRENT_USER,
} from '../data/logisticsData';

const STORAGE_KEYS = {
  ORDERS: 'logicore_orders',
  COURIERS: 'logicore_couriers',
  CUSTOMERS: 'logicore_customers',
  EXCEPTIONS: 'logicore_exceptions',
  PAYMENTS: 'logicore_payments',
  NOTIFICATIONS: 'logicore_notifications',
  AUDIT_LOGS: 'logicore_audit_logs',
  SUPPORT_TICKETS: 'logicore_support_tickets',
  CURRENT_USER: 'logicore_current_user',
};

export const INITIAL_EXCEPTIONS: DeliveryException[] = [
  {
    id: 'exc-1',
    orderTrackingNo: '#DMS-TRK-98402',
    customerName: 'MedPlus Pharmaceuticals',
    driverName: 'David Adeleke',
    reason: 'Customer Unavailable',
    description: 'Consignee clinic reception closed upon arrival at 12:45. Phone reachable but requested evening delivery window.',
    reportedAt: 'Oct 24, 12:48 WAT',
    status: 'Investigating',
    assignedAdmin: 'Olusegun Ola',
    resolutionNotes: 'Dispatched SMS confirmation to clinic director; rescheduled to 17:00 shift.',
    updatedAt: 'Oct 24, 13:15 WAT',
  },
  {
    id: 'exc-2',
    orderTrackingNo: '#DMS-TRK-98380',
    customerName: 'Jumia Market',
    driverName: 'Amina Bello',
    reason: 'Vehicle Breakdown',
    description: 'Flat tire near Apapa Port flyover during linehaul transit.',
    reportedAt: 'Oct 24, 13:30 WAT',
    status: 'Reassigned',
    assignedAdmin: 'Olusegun Ola',
    resolutionNotes: 'Relief dispatch bike #LG-442 rerouted to collect manifest packages.',
    updatedAt: 'Oct 24, 13:45 WAT',
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    orderTrackingNo: '#DMS-TRK-98421',
    customerName: 'Aliko Dangote Corp',
    amount: 8500,
    currency: 'NGN',
    paymentMethod: 'Corporate Credit Account',
    status: 'Paid',
    reference: 'PAY-DMS-8891-9921',
    date: 'Oct 24, 2024 - 14:15 WAT',
    invoiceNo: 'INV-2024-10-8891',
    receiptNo: 'REC-NGN-00918',
  },
  {
    id: 'pay-2',
    orderTrackingNo: '#DMS-TRK-98418',
    customerName: 'Standard Bank Plc',
    amount: 12400,
    currency: 'NGN',
    paymentMethod: 'Paystack',
    status: 'Paid',
    reference: 'pstk_ref_9981240992',
    date: 'Oct 24, 2024 - 13:20 WAT',
    invoiceNo: 'INV-2024-10-8812',
    receiptNo: 'REC-NGN-00912',
  },
  {
    id: 'pay-3',
    orderTrackingNo: '#DMS-TRK-98402',
    customerName: 'MedPlus Pharmaceuticals',
    amount: 15600,
    currency: 'NGN',
    paymentMethod: 'Cash on Delivery',
    status: 'Pending',
    reference: 'COD-LAG-98402',
    date: 'Oct 24, 2024 - 12:45 WAT',
    invoiceNo: 'INV-2024-10-8802',
  },
  {
    id: 'pay-4',
    orderTrackingNo: '#DMS-TRK-98399',
    amount: 6200,
    customerName: 'Konga Logistics',
    currency: 'NGN',
    paymentMethod: 'Flutterwave',
    status: 'Pending',
    reference: 'flw_tx_0099412',
    date: 'Oct 24, 2024 - 14:38 WAT',
    invoiceNo: 'INV-2024-10-8799',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: 'Oct 24, 14:40:12 WAT',
    userName: 'Olusegun Ola',
    userRole: 'Super Administrator',
    action: 'SYSTEM_AUDIT_LOGIN',
    recordId: 'SESSION_ROOT',
    details: 'User authenticated from Lagos Ops HQ IP with Level 5 Superadmin privileges.',
    category: 'Auth',
  },
  {
    id: 'log-2',
    timestamp: 'Oct 24, 14:22:05 WAT',
    userName: 'Emeka Okonkwo',
    userRole: 'Driver',
    action: 'WAYBILL_STATUS_UPDATE',
    recordId: '#DMS-TRK-98421',
    details: 'Driver updated status to "In Transit" via GPS mobile stack on Lekki-Epe expressway.',
    category: 'Order',
  },
  {
    id: 'log-3',
    timestamp: 'Oct 24, 13:58:33 WAT',
    userName: 'Tunde Bakare',
    userRole: 'Driver',
    action: 'PROOF_OF_DELIVERY_CONFIRMED',
    recordId: '#DMS-TRK-98418',
    details: 'Digital signature and physical handover photo captured at Kingsway Tower.',
    category: 'Driver',
  },
  {
    id: 'log-4',
    timestamp: 'Oct 24, 13:20:19 WAT',
    userName: 'Automated Gateway',
    userRole: 'System Dispatcher',
    action: 'PAYMENT_CONFIRMED_WEBHOOK',
    recordId: 'pstk_ref_9981240992',
    details: 'Paystack webhook verified ₦12,400 settlement for Standard Bank Plc.',
    category: 'Payment',
  },
  {
    id: 'log-5',
    timestamp: 'Oct 24, 12:48:00 WAT',
    userName: 'David Adeleke',
    userRole: 'Driver',
    action: 'DELIVERY_EXCEPTION_LOGGED',
    recordId: '#DMS-TRK-98402',
    details: 'Reported Customer Unavailable at Lekki Phase 2 Clinic with priority incident ticket #exc-1.',
    category: 'Exception',
  },
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-8812',
    customerName: 'Standard Bank Plc (Folake Balogun)',
    customerEmail: 'folake.balogun@stanbicibtc.com',
    orderTrackingNo: '#DMS-TRK-98421',
    subject: 'Request gate security pass pre-notification',
    description: 'Please inform courier to mention Chief Security Officer at Gate 2 reception.',
    category: 'Address Correction',
    status: 'In Progress',
    createdAt: 'Oct 24, 13:45 WAT',
    updatedAt: 'Oct 24, 14:02 WAT',
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        senderName: 'Folake Balogun',
        text: 'Please inform courier to mention Chief Security Officer at Gate 2 reception.',
        timestamp: '13:45',
      },
      {
        id: 'msg-2',
        sender: 'agent',
        senderName: 'Olusegun Ola (Ops Dispatch)',
        text: 'Noted! We have broadcasted this security instruction directly to Tunde Bakare\'s GPS navigation HUD.',
        timestamp: '14:02',
      },
    ],
  },
  {
    id: 'TCK-8809',
    customerName: 'MedPlus Pharmaceuticals',
    customerEmail: 'c.nwosu@medplus.ng',
    orderTrackingNo: '#DMS-TRK-98402',
    subject: 'Reschedule cold-chain delivery for 17:00 WAT',
    description: 'Clinic staff will be available for cold-chain bay receiving by 5:00 PM.',
    category: 'Delayed Delivery',
    status: 'Open',
    createdAt: 'Oct 24, 13:00 WAT',
    updatedAt: 'Oct 24, 13:00 WAT',
    messages: [
      {
        id: 'msg-3',
        sender: 'customer',
        senderName: 'Dr. Chidi Nwosu',
        text: 'Clinic staff will be available for cold-chain bay receiving by 5:00 PM.',
        timestamp: '13:00',
      },
    ],
  },
];

// Helper for local storage retrieval with default fallback
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(`Failed to load from storage key ${key}:`, e);
  }
  return defaultValue;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save to storage key ${key}:`, e);
  }
}

export const dbService = {
  // Orders
  getOrders: (): ShipmentOrder[] => loadFromStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS),
  saveOrders: (orders: ShipmentOrder[]) => saveToStorage(STORAGE_KEYS.ORDERS, orders),
  addOrder: (order: ShipmentOrder) => {
    const orders = [order, ...dbService.getOrders()];
    dbService.saveOrders(orders);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'ORDER_CREATED',
      recordId: order.trackingNo,
      details: `New order for ${order.customer} generated and routed to dispatch.`,
      category: 'Order',
    });
    return orders;
  },
  deleteOrder: (trackingNo: string) => {
    const updated = dbService.getOrders().filter((o) => o.trackingNo !== trackingNo);
    dbService.saveOrders(updated);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'ORDER_DELETED',
      recordId: trackingNo,
      details: `Order ${trackingNo} removed from operational queue.`,
      category: 'Order',
    });
    return updated;
  },
  completeDelivery: (trackingId: string) => {
    const orders = dbService.getOrders().map((o) =>
      o.trackingNo === trackingId
        ? {
            ...o,
            status: 'Delivered' as const,
            statusVariant: 'delivered' as const,
            eta: 'Delivered (Verified POD)',
            timestamp: 'Just now',
          }
        : o
    );
    dbService.saveOrders(orders);
    dbService.addAuditLog({
      userName: 'Tunde Bakare',
      userRole: 'Driver',
      action: 'PROOF_OF_DELIVERY_CONFIRMED',
      recordId: trackingId,
      details: `Waybill ${trackingId} successfully completed and verified via POD.`,
      category: 'Driver',
    });
    return orders;
  },
  assignOrder: (trackingNo: string, courierName: string, initials: string) => {
    const orders = dbService.getOrders().map((o) =>
      o.trackingNo === trackingNo
        ? {
            ...o,
            courier: courierName,
            courierInitials: initials,
            status: 'In Transit' as const,
            statusVariant: 'transit' as const,
          }
        : o
    );
    dbService.saveOrders(orders);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'ORDER_ASSIGNED',
      recordId: trackingNo,
      details: `Waybill ${trackingNo} assigned to courier ${courierName}.`,
      category: 'Order',
    });
    return orders;
  },

  // Couriers / Drivers
  getCouriers: (): Courier[] => loadFromStorage(STORAGE_KEYS.COURIERS, INITIAL_COURIERS),
  saveCouriers: (couriers: Courier[]) => saveToStorage(STORAGE_KEYS.COURIERS, couriers),
  addCourier: (newCourier: Courier) => {
    const updated = [newCourier, ...dbService.getCouriers()];
    dbService.saveCouriers(updated);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'COURIER_ONBOARDED',
      recordId: newCourier.id,
      details: `Driver ${newCourier.name} (${newCourier.phone}) onboarded to fleet.`,
      category: 'Driver',
    });
    return updated;
  },
  deleteCourier: (id: string) => {
    const updated = dbService.getCouriers().filter((c) => c.id !== id);
    dbService.saveCouriers(updated);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'COURIER_DELETED',
      recordId: id,
      details: `Courier ${id} deleted from fleet registry.`,
      category: 'Driver',
    });
    return updated;
  },

  // Customers
  getCustomers: (): CustomerAccount[] => loadFromStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS),
  saveCustomers: (customers: CustomerAccount[]) => saveToStorage(STORAGE_KEYS.CUSTOMERS, customers),
  addCustomer: (newCustomer: CustomerAccount) => {
    const updated = [newCustomer, ...dbService.getCustomers()];
    dbService.saveCustomers(updated);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'CUSTOMER_ONBOARDED',
      recordId: newCustomer.id,
      details: `Corporate client ${newCustomer.name} onboarded.`,
      category: 'Customer',
    });
    return updated;
  },
  deleteCustomer: (id: string) => {
    const updated = dbService.getCustomers().filter((c) => c.id !== id);
    dbService.saveCustomers(updated);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'CUSTOMER_DELETED',
      recordId: id,
      details: `Customer account ${id} deleted.`,
      category: 'Customer',
    });
    return updated;
  },

  // Exceptions
  getExceptions: (): DeliveryException[] => loadFromStorage(STORAGE_KEYS.EXCEPTIONS, INITIAL_EXCEPTIONS),
  saveExceptions: (exceptions: DeliveryException[]) => saveToStorage(STORAGE_KEYS.EXCEPTIONS, exceptions),
  addException: (exception: DeliveryException) => {
    const updated = [exception, ...dbService.getExceptions()];
    dbService.saveExceptions(updated);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'EXCEPTION_CREATED',
      recordId: exception.id,
      details: `Problem reported for order ${exception.orderTrackingNo}: ${exception.reason}`,
      category: 'Exception',
    });
    return updated;
  },
  updateException: (exception: DeliveryException) => {
    const updated = dbService.getExceptions().map((e) => (e.id === exception.id ? exception : e));
    dbService.saveExceptions(updated);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'EXCEPTION_UPDATED',
      recordId: exception.id,
      details: `Exception ${exception.id} status changed to ${exception.status}.`,
      category: 'Exception',
    });
    return updated;
  },

  // Payments
  getPayments: (): PaymentRecord[] => loadFromStorage(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS),
  savePayments: (payments: PaymentRecord[]) => saveToStorage(STORAGE_KEYS.PAYMENTS, payments),
  updatePayment: (payment: PaymentRecord) => {
    const updated = dbService.getPayments().map((p) => (p.id === payment.id ? payment : p));
    dbService.savePayments(updated);
    dbService.addAuditLog({
      userName: dbService.getCurrentUser().name,
      userRole: dbService.getCurrentUser().role,
      action: 'PAYMENT_UPDATED',
      recordId: payment.id,
      details: `Payment reference ${payment.reference} updated to ${payment.status}.`,
      category: 'Payment',
    });
    return updated;
  },

  // Notifications
  getNotifications: (): NotificationItem[] => loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS),
  saveNotifications: (notifications: NotificationItem[]) => saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications),
  markAllNotificationsAsRead: () => {
    const updated = dbService.getNotifications().map((n) => ({ ...n, read: true }));
    dbService.saveNotifications(updated);
    return updated;
  },
  clearAllNotifications: () => {
    dbService.saveNotifications([]);
    return [];
  },
  dismissNotification: (id: string) => {
    const updated = dbService.getNotifications().filter((n) => n.id !== id);
    dbService.saveNotifications(updated);
    return updated;
  },

  // Audit Logs
  getAuditLogs: (): AuditLog[] => loadFromStorage(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS),
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const logs = loadFromStorage<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' WAT',
    };
    const updated = [newLog, ...logs];
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, updated);
    return updated;
  },

  // Support Tickets
  getSupportTickets: (): SupportTicket[] => loadFromStorage(STORAGE_KEYS.SUPPORT_TICKETS, INITIAL_SUPPORT_TICKETS),
  saveSupportTickets: (tickets: SupportTicket[]) => saveToStorage(STORAGE_KEYS.SUPPORT_TICKETS, tickets),

  // User Profile / Auth
  getCurrentUser: (): UserProfile => loadFromStorage(STORAGE_KEYS.CURRENT_USER, CURRENT_USER),
  saveCurrentUser: (user: UserProfile) => saveToStorage(STORAGE_KEYS.CURRENT_USER, user),
  updateCurrentUser: (user: UserProfile) => {
    dbService.saveCurrentUser(user);
    dbService.addAuditLog({
      userName: user.name,
      userRole: user.role,
      action: 'USER_PROFILE_UPDATED',
      recordId: user.id || 'usr-root',
      details: `User profile modified: ${user.name} (${user.email}).`,
      category: 'Auth',
    });
    return user;
  },

  // Check if demo data exists
  hasDemoData: (): boolean => {
    const couriers = dbService.getCouriers();
    const orders = dbService.getOrders();
    return couriers.some((c) => c.isDemo) || orders.some((o) => o.isDemo);
  },

  // Delete All Demo Data
  deleteAllDemoData: () => {
    const orders = dbService.getOrders().filter((o) => !o.isDemo);
    const couriers = dbService.getCouriers().filter((c) => !c.isDemo);
    const customers = dbService.getCustomers().filter((c) => !c.isDemo);
    dbService.saveOrders(orders);
    dbService.saveCouriers(couriers);
    dbService.saveCustomers(customers);

    dbService.addAuditLog({
      userName: 'Olusegun Ola',
      userRole: 'Super Administrator',
      action: 'DELETE_ALL_DEMO_ACCOUNTS',
      recordId: 'ALL_DEMO_ENTITIES',
      details: 'All pre-seeded demonstration couriers and shipments were permanently purged from database.',
      category: 'System',
    });

    return { orders, couriers, customers };
  },

  // Restore demo seed
  restoreDemoData: () => {
    saveToStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    saveToStorage(STORAGE_KEYS.COURIERS, INITIAL_COURIERS);
    saveToStorage(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
    saveToStorage(STORAGE_KEYS.EXCEPTIONS, INITIAL_EXCEPTIONS);
    saveToStorage(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    saveToStorage(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    saveToStorage(STORAGE_KEYS.SUPPORT_TICKETS, INITIAL_SUPPORT_TICKETS);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, CURRENT_USER);
  },

  // Reset to default seed
  resetToDefault: () => {
    dbService.restoreDemoData();
  },
};
