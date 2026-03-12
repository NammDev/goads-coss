import type { ProductType } from '@/data/mock-products'

/** Matches orderStatusEnum in DB */
export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'delivered'
  | 'completed'
  | 'cancelled'

/** Matches order_item table */
export type MockOrderItem = {
  id: string
  orderId: string
  productId: string
  productName: string
  productType: ProductType
  quantity: number
  /** Unit price as string (matches DB numeric field) */
  unitPrice: string
}

/** Matches orders table */
export type MockOrder = {
  id: string
  orderNumber: number
  customerId: string
  customerName: string
  /** Total as string (matches DB numeric field) */
  totalAmount: string
  currency: string
  status: OrderStatus
  paymentMethod?: 'crypto' | 'wise' | 'paypal' | 'other'
  notes?: string
  paymentDate?: string
  deliveredAt?: string
  createdAt: string
  updatedAt: string
}

export const mockOrders: MockOrder[] = [
  {
    id: 'ORD-001',
    orderNumber: 1,
    customerId: 'cust-001',
    customerName: 'Nguyen Van A',
    totalAmount: '200.00',
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'crypto',
    paymentDate: '2026-03-02T10:00:00Z',
    deliveredAt: '2026-03-03T14:30:00Z',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-04T10:00:00Z',
    notes: 'Customer requested high BM limit',
  },
  {
    id: 'ORD-002',
    orderNumber: 2,
    customerId: 'cust-002',
    customerName: 'Tran Thi B',
    totalAmount: '120.00',
    currency: 'USD',
    status: 'delivered',
    paymentMethod: 'wise',
    paymentDate: '2026-02-28T10:00:00Z',
    deliveredAt: '2026-03-05T11:00:00Z',
    createdAt: '2026-02-28T09:00:00Z',
    updatedAt: '2026-03-05T11:00:00Z',
  },
  {
    id: 'ORD-003',
    orderNumber: 3,
    customerId: 'cust-003',
    customerName: 'Le Hoang C',
    totalAmount: '225.00',
    currency: 'USD',
    status: 'pending',
    createdAt: '2026-03-10T08:00:00Z',
    updatedAt: '2026-03-10T08:00:00Z',
  },
  {
    id: 'ORD-004',
    orderNumber: 4,
    customerId: 'cust-004',
    customerName: 'Pham Quoc D',
    totalAmount: '240.00',
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'paypal',
    paymentDate: '2026-02-16T10:00:00Z',
    deliveredAt: '2026-02-20T14:00:00Z',
    createdAt: '2026-02-15T14:00:00Z',
    updatedAt: '2026-02-25T16:00:00Z',
    notes: 'All 3 BMs delivered',
  },
  {
    id: 'ORD-005',
    orderNumber: 5,
    customerId: 'cust-001',
    customerName: 'Nguyen Van A',
    totalAmount: '150.00',
    currency: 'USD',
    status: 'processing',
    paymentMethod: 'crypto',
    paymentDate: '2026-03-09T10:00:00Z',
    createdAt: '2026-03-08T10:00:00Z',
    updatedAt: '2026-03-09T09:00:00Z',
  },
  {
    id: 'ORD-006',
    orderNumber: 6,
    customerId: 'cust-001',
    customerName: 'Nguyen Van A',
    totalAmount: '80.00',
    currency: 'USD',
    status: 'paid',
    paymentMethod: 'wise',
    paymentDate: '2026-03-11T10:00:00Z',
    createdAt: '2026-03-11T09:00:00Z',
    updatedAt: '2026-03-11T10:00:00Z',
    notes: 'Awaiting processing',
  },
  {
    id: 'ORD-007',
    orderNumber: 7,
    customerId: 'cust-005',
    customerName: 'Vo Minh E',
    totalAmount: '440.00',
    currency: 'USD',
    status: 'processing',
    paymentMethod: 'crypto',
    paymentDate: '2026-03-09T12:00:00Z',
    createdAt: '2026-03-09T11:00:00Z',
    updatedAt: '2026-03-09T15:00:00Z',
  },
  {
    id: 'ORD-008',
    orderNumber: 8,
    customerId: 'cust-006',
    customerName: 'Dang Thi F',
    totalAmount: '125.00',
    currency: 'USD',
    status: 'completed',
    paymentMethod: 'paypal',
    paymentDate: '2026-02-20T10:00:00Z',
    deliveredAt: '2026-02-21T09:00:00Z',
    createdAt: '2026-02-20T09:00:00Z',
    updatedAt: '2026-02-22T10:00:00Z',
  },
  {
    id: 'ORD-009',
    orderNumber: 9,
    customerId: 'cust-004',
    customerName: 'Pham Quoc D',
    totalAmount: '300.00',
    currency: 'USD',
    status: 'cancelled',
    createdAt: '2026-03-02T10:00:00Z',
    updatedAt: '2026-03-04T08:00:00Z',
    notes: 'Cancelled due to plan change',
  },
  {
    id: 'ORD-010',
    orderNumber: 10,
    customerId: 'cust-008',
    customerName: 'Hoang Thi H',
    totalAmount: '440.00',
    currency: 'USD',
    status: 'delivered',
    paymentMethod: 'wise',
    paymentDate: '2026-03-06T10:00:00Z',
    deliveredAt: '2026-03-07T10:00:00Z',
    createdAt: '2026-03-05T13:00:00Z',
    updatedAt: '2026-03-07T11:00:00Z',
    notes: 'Agency partner, preferential pricing',
  },
  {
    id: 'ORD-011',
    orderNumber: 11,
    customerId: 'cust-002',
    customerName: 'Tran Thi B',
    totalAmount: '200.00',
    currency: 'USD',
    status: 'pending',
    createdAt: '2026-03-11T08:00:00Z',
    updatedAt: '2026-03-11T08:00:00Z',
  },
  {
    id: 'ORD-012',
    orderNumber: 12,
    customerId: 'cust-001',
    customerName: 'Nguyen Van A',
    totalAmount: '120.00',
    currency: 'USD',
    status: 'pending',
    createdAt: '2026-03-12T08:00:00Z',
    updatedAt: '2026-03-12T08:00:00Z',
  },
]

/** Separate order items array (matches order_item table) */
export const mockOrderItems: MockOrderItem[] = [
  { id: 'item-001', orderId: 'ORD-001', productId: 'prod-001', productName: 'Meta Agency Account', productType: 'agency_account', quantity: 1, unitPrice: '120.00' },
  { id: 'item-002', orderId: 'ORD-001', productId: 'prod-002', productName: 'Business Manager', productType: 'bm', quantity: 1, unitPrice: '80.00' },
  { id: 'item-003', orderId: 'ORD-002', productId: 'prod-001', productName: 'Meta Agency Account', productType: 'agency_account', quantity: 1, unitPrice: '120.00' },
  { id: 'item-004', orderId: 'ORD-003', productId: 'prod-005', productName: 'Google Whitelisted Account', productType: 'google_agency', quantity: 1, unitPrice: '200.00' },
  { id: 'item-005', orderId: 'ORD-003', productId: 'prod-004', productName: 'Facebook Profile Warmed', productType: 'profile', quantity: 1, unitPrice: '25.00' },
  { id: 'item-006', orderId: 'ORD-004', productId: 'prod-002', productName: 'Business Manager', productType: 'bm', quantity: 3, unitPrice: '80.00' },
  { id: 'item-007', orderId: 'ORD-005', productId: 'prod-006', productName: 'TikTok Agency Account', productType: 'tiktok_agency', quantity: 1, unitPrice: '150.00' },
  { id: 'item-008', orderId: 'ORD-006', productId: 'prod-002', productName: 'Business Manager', productType: 'bm', quantity: 1, unitPrice: '80.00' },
  { id: 'item-009', orderId: 'ORD-007', productId: 'prod-001', productName: 'Meta Agency Account', productType: 'agency_account', quantity: 2, unitPrice: '120.00' },
  { id: 'item-010', orderId: 'ORD-007', productId: 'prod-003', productName: 'BM Aged 2024', productType: 'bm', quantity: 2, unitPrice: '100.00' },
  { id: 'item-011', orderId: 'ORD-008', productId: 'prod-004', productName: 'Facebook Profile Warmed', productType: 'profile', quantity: 5, unitPrice: '25.00' },
  { id: 'item-012', orderId: 'ORD-009', productId: 'prod-006', productName: 'TikTok Agency Account', productType: 'tiktok_agency', quantity: 2, unitPrice: '150.00' },
  { id: 'item-013', orderId: 'ORD-010', productId: 'prod-001', productName: 'Meta Agency Account', productType: 'agency_account', quantity: 2, unitPrice: '120.00' },
  { id: 'item-014', orderId: 'ORD-010', productId: 'prod-005', productName: 'Google Whitelisted Account', productType: 'google_agency', quantity: 1, unitPrice: '200.00' },
  { id: 'item-015', orderId: 'ORD-011', productId: 'prod-003', productName: 'BM Aged 2024', productType: 'bm', quantity: 2, unitPrice: '100.00' },
  { id: 'item-016', orderId: 'ORD-012', productId: 'prod-001', productName: 'Meta Agency Account', productType: 'agency_account', quantity: 1, unitPrice: '120.00' },
]
