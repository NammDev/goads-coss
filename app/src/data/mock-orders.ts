export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'cancelled'
  | 'refunded'

export type OrderItem = {
  productId: string
  productName: string
  productType: string
  quantity: number
  unitPrice: number
}

export type MockOrder = {
  id: string
  /** Reference to mock customer id */
  customerId: string
  customerName: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  /** ISO date strings */
  createdAt: string
  updatedAt: string
  notes: string
}

export const mockOrders: MockOrder[] = [
  {
    id: 'ORD-001',
    customerId: 'cust-001',
    customerName: 'Nguyen Van A',
    items: [
      { productId: 'prod-001', productName: 'Premium Setup', productType: 'agency', quantity: 1, unitPrice: 5_000_000 },
      { productId: 'prod-003', productName: 'Business Manager', productType: 'bm', quantity: 2, unitPrice: 1_000_000 },
    ],
    totalAmount: 7_000_000,
    status: 'paid',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-03T14:30:00Z',
    notes: 'Customer requested high BM limit',
  },
  {
    id: 'ORD-002',
    customerId: 'cust-002',
    customerName: 'Tran Thi B',
    items: [
      { productId: 'prod-002', productName: 'Agency Account', productType: 'agency', quantity: 1, unitPrice: 2_000_000 },
    ],
    totalAmount: 2_000_000,
    status: 'shipped',
    createdAt: '2026-02-28T09:00:00Z',
    updatedAt: '2026-03-05T11:00:00Z',
    notes: '',
  },
  {
    id: 'ORD-003',
    customerId: 'cust-003',
    customerName: 'Le Hoang C',
    items: [
      { productId: 'prod-005', productName: 'Google Whitelisted', productType: 'google', quantity: 1, unitPrice: 3_000_000 },
      { productId: 'prod-004', productName: 'Meta Assets Bundle', productType: 'asset', quantity: 1, unitPrice: 500_000 },
    ],
    totalAmount: 3_500_000,
    status: 'pending',
    createdAt: '2026-03-10T08:00:00Z',
    updatedAt: '2026-03-10T08:00:00Z',
    notes: '',
  },
  {
    id: 'ORD-004',
    customerId: 'cust-004',
    customerName: 'Pham Quoc D',
    items: [
      { productId: 'prod-003', productName: 'Business Manager', productType: 'bm', quantity: 3, unitPrice: 1_000_000 },
    ],
    totalAmount: 3_000_000,
    status: 'completed',
    createdAt: '2026-02-15T14:00:00Z',
    updatedAt: '2026-02-25T16:00:00Z',
    notes: 'All 3 BMs delivered',
  },
  {
    id: 'ORD-005',
    customerId: 'cust-001',
    customerName: 'Nguyen Van A',
    items: [
      { productId: 'prod-006', productName: 'TikTok Verified', productType: 'tiktok', quantity: 1, unitPrice: 2_500_000 },
    ],
    totalAmount: 2_500_000,
    status: 'processing',
    createdAt: '2026-03-08T10:00:00Z',
    updatedAt: '2026-03-09T09:00:00Z',
    notes: '',
  },
  {
    id: 'ORD-006',
    customerId: 'cust-005',
    customerName: 'Vo Minh E',
    items: [
      { productId: 'prod-002', productName: 'Agency Account', productType: 'agency', quantity: 2, unitPrice: 2_000_000 },
      { productId: 'prod-007', productName: 'BM Aged 2024', productType: 'bm', quantity: 1, unitPrice: 1_500_000 },
    ],
    totalAmount: 5_500_000,
    status: 'confirmed',
    createdAt: '2026-03-09T11:00:00Z',
    updatedAt: '2026-03-09T15:00:00Z',
    notes: 'Awaiting payment',
  },
  {
    id: 'ORD-007',
    customerId: 'cust-006',
    customerName: 'Dang Thi F',
    items: [
      { productId: 'prod-008', productName: 'Facebook Profile Warmed', productType: 'profile', quantity: 5, unitPrice: 300_000 },
    ],
    totalAmount: 1_500_000,
    status: 'completed',
    createdAt: '2026-02-20T09:00:00Z',
    updatedAt: '2026-02-22T10:00:00Z',
    notes: '',
  },
  {
    id: 'ORD-008',
    customerId: 'cust-008',
    customerName: 'Hoang Thi H',
    items: [
      { productId: 'prod-001', productName: 'Premium Setup', productType: 'agency', quantity: 2, unitPrice: 5_000_000 },
      { productId: 'prod-005', productName: 'Google Whitelisted', productType: 'google', quantity: 1, unitPrice: 3_000_000 },
    ],
    totalAmount: 13_000_000,
    status: 'paid',
    createdAt: '2026-03-05T13:00:00Z',
    updatedAt: '2026-03-06T10:00:00Z',
    notes: 'Agency partner, preferential pricing',
  },
  {
    id: 'ORD-009',
    customerId: 'cust-004',
    customerName: 'Pham Quoc D',
    items: [
      { productId: 'prod-006', productName: 'TikTok Verified', productType: 'tiktok', quantity: 2, unitPrice: 2_500_000 },
    ],
    totalAmount: 5_000_000,
    status: 'cancelled',
    createdAt: '2026-03-02T10:00:00Z',
    updatedAt: '2026-03-04T08:00:00Z',
    notes: 'Cancelled due to plan change',
  },
  {
    id: 'ORD-010',
    customerId: 'cust-010',
    customerName: 'Ly Thi K',
    items: [
      { productId: 'prod-002', productName: 'Agency Account', productType: 'agency', quantity: 1, unitPrice: 2_000_000 },
      { productId: 'prod-003', productName: 'Business Manager', productType: 'bm', quantity: 1, unitPrice: 1_000_000 },
      { productId: 'prod-004', productName: 'Meta Assets Bundle', productType: 'asset', quantity: 2, unitPrice: 500_000 },
    ],
    totalAmount: 4_000_000,
    status: 'processing',
    createdAt: '2026-03-07T16:00:00Z',
    updatedAt: '2026-03-08T09:00:00Z',
    notes: '',
  },
  {
    id: 'ORD-011',
    customerId: 'cust-002',
    customerName: 'Tran Thi B',
    items: [
      { productId: 'prod-007', productName: 'BM Aged 2024', productType: 'bm', quantity: 2, unitPrice: 1_500_000 },
    ],
    totalAmount: 3_000_000,
    status: 'pending',
    createdAt: '2026-03-11T08:00:00Z',
    updatedAt: '2026-03-11T08:00:00Z',
    notes: '',
  },
  {
    id: 'ORD-012',
    customerId: 'cust-006',
    customerName: 'Dang Thi F',
    items: [
      { productId: 'prod-001', productName: 'Premium Setup', productType: 'agency', quantity: 1, unitPrice: 5_000_000 },
    ],
    totalAmount: 5_000_000,
    status: 'refunded',
    createdAt: '2026-02-10T12:00:00Z',
    updatedAt: '2026-02-18T14:00:00Z',
    notes: 'Refunded due to product issue',
  },
]
