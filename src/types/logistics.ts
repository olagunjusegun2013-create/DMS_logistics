export type ScreenId =
  | 'admin-dashboard'
  | 'live-tracking'
  | 'request-delivery'
  | 'track-shipment'
  | 'driver-dashboard'
  | 'driver-navigation'
  | 'proof-of-delivery'
  | 'all-artboards';

export type SuiteSection = 'operations' | 'customer' | 'driver' | 'artboards';
export type PortalType = 'portal-select' | 'admin' | 'driver' | 'customer';

export type UserRole =
  | 'Super Administrator'
  | 'Administrator'
  | 'Dispatcher'
  | 'Driver'
  | 'Customer'
  | 'super-admin'
  | 'admin'
  | 'dispatcher'
  | 'driver'
  | 'customer';

export type AdminSidebarSection =
  | 'dashboard'
  | 'orders'
  | 'assignments'
  | 'drivers'
  | 'customers'
  | 'exceptions'
  | 'payments'
  | 'notifications'
  | 'reports'
  | 'audit'
  | 'settings';

export type CustomerPortalTab = 'track' | 'orders' | 'request' | 'support' | 'profile';

export interface Courier {
  id: string;
  name: string;
  trackingCode: string;
  vehicle: string;
  avatar: string;
  speed: string;
  status: 'In Transit' | 'Picking Up' | 'Available Idle' | 'Delivering Drop-off' | 'Off Duty';
  statusColor: string;
  eta: string;
  battery: string;
  rating: number;
  phone: string;
  location: string;
  parcelsLeft: number;
  earningsToday?: number;
  completedToday?: number;
  failedToday?: number;
  isDemo?: boolean;
}

export type OrderLifecycleStatus =
  | 'Order Created'
  | 'Order Confirmed'
  | 'Driver Assigned'
  | 'Driver Accepted'
  | 'Package Picked Up'
  | 'In Transit'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Delayed'
  | 'Delivery Failed'
  | 'Delivery Rescheduled'
  | 'Cancelled'
  | 'Pending Dispatch'
  | 'Pickup Queued';

export interface ShipmentOrder {
  id?: string;
  trackingNo: string;
  type: string;
  weight: string;
  dimensions?: string;
  customer: string;
  customerEmail?: string;
  phone: string;
  senderName?: string;
  senderPhone?: string;
  origin: string;
  originDetail: string;
  destination: string;
  destinationDetail: string;
  courierId?: string;
  courierInitials: string;
  courierName: string;
  courierVehicle: string;
  timestamp: string;
  eta: string;
  status: OrderLifecycleStatus;
  statusVariant: 'transit' | 'delivered' | 'delayed' | 'pending' | 'queued' | 'failed' | 'cancelled';
  deliveryFee?: number; // NGN
  paymentStatus?: 'Paid' | 'Unpaid' | 'Pending' | 'Refunded';
  paymentMethod?: string;
  priority?: 'Express' | 'Next-Day' | 'Economy';
  specialInstructions?: string;
  isDemo?: boolean;
}

export interface CustomerAccount {
  id: string;
  name: string;
  companyName?: string;
  contactPerson: string;
  email: string;
  phone: string;
  activeOrders: number;
  totalSpend: string;
  rating: number;
  tier: 'Enterprise Platinum' | 'Corporate Gold' | 'Standard Business';
  savedAddresses?: Array<{ label: string; address: string }>;
  isDemo?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'urgent' | 'warning' | 'info' | 'success';
  channel?: 'in-app' | 'email' | 'sms' | 'whatsapp';
  recipient?: string;
  deliveryStatus?: 'Delivered' | 'Pending' | 'Failed';
  read: boolean;
  category: string;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle?: string;
  avatar?: string;
  phone: string;
  hub: string;
}

export interface DeliveryException {
  id: string;
  orderTrackingNo: string;
  customerName: string;
  driverName: string;
  reason:
    | 'Customer Unavailable'
    | 'Incorrect Delivery Address'
    | 'Recipient Refused Delivery'
    | 'Damaged Package'
    | 'Driver Unable to Reach Destination'
    | 'Delayed Delivery'
    | 'Vehicle Breakdown'
    | 'Other Delivery Complication';
  description: string;
  photoUrl?: string;
  reportedAt: string;
  status: 'Pending Review' | 'Investigating' | 'Rescheduled' | 'Reassigned' | 'Resolved' | 'Closed';
  assignedAdmin: string;
  resolutionNotes?: string;
  updatedAt?: string;
}

export interface PaymentRecord {
  id: string;
  orderTrackingNo: string;
  customerName: string;
  amount: number; // in NGN
  currency: 'NGN';
  paymentMethod: 'Paystack' | 'Flutterwave' | 'Cash on Delivery' | 'Corporate Credit Account' | 'Direct Bank Transfer';
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  reference: string;
  date: string;
  invoiceNo: string;
  receiptNo?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  recordId: string;
  details: string;
  category: 'Auth' | 'Order' | 'Driver' | 'Payment' | 'Exception' | 'System' | 'Customer';
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerEmail: string;
  orderTrackingNo?: string;
  subject: string;
  description: string;
  category:
    | 'Delayed Delivery'
    | 'Damaged Item'
    | 'Billing / Refund'
    | 'Address Correction'
    | 'Courier Inquiries'
    | 'General Assistance';
  status: 'Open' | 'In Progress' | 'Awaiting Customer' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    id: string;
    sender: 'customer' | 'agent';
    senderName: string;
    text: string;
    timestamp: string;
  }>;
}
