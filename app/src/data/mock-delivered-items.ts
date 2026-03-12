import type { ProductType } from '@/data/mock-products'
import { mockOrderItems, mockOrders } from '@/data/mock-orders'

/** Matches deliveredItemStatusEnum in DB */
export type DeliveredItemStatus = 'active' | 'inactive' | 'banned' | 'expired'

/** Matches delivered_item table — no customerId (join through order) */
export type MockDeliveredItem = {
  id: string
  orderId: string
  orderItemId?: string
  productType: ProductType
  /** Primary identifier shown to user (BM ID, profile UID, ad account ID, etc.) */
  uid?: string
  /** JSONB credentials as parsed Record */
  credentials?: Record<string, string>
  status: DeliveredItemStatus
  deliveredAt: string
  warrantyUntil: string
  createdAt: string
  updatedAt: string
  /** Optional admin/delivery note */
  note?: string
}

export const mockDeliveredItems: MockDeliveredItem[] = [
  // ORD-001: cust-001 — agency_account + bm + profile + page (completed)
  {
    id: 'del-001',
    orderId: 'ORD-001',
    orderItemId: 'item-001',
    productType: 'agency_account',
    uid: '9876543210123456',
    credentials: {
      bmId: '9876543210123456',
      name: 'GoAds Agency Main',
      inviteLink: 'https://business.facebook.com/settings/requests/9876543210123456',
    },
    status: 'active',
    deliveredAt: '2026-03-03T10:00:00Z',
    warrantyUntil: '2026-03-10T10:00:00Z',
    createdAt: '2026-03-03T10:00:00Z',
    updatedAt: '2026-03-03T10:00:00Z',
    note: 'High limit BM, handle with care',
  },
  {
    id: 'del-002',
    orderId: 'ORD-001',
    orderItemId: 'item-002',
    productType: 'bm',
    uid: '1234567890123456',
    credentials: {
      bmId: '1234567890123456',
      name: 'BM Clean #1',
      inviteLink: 'https://business.facebook.com/settings/requests/1234567890123456',
    },
    status: 'active',
    deliveredAt: '2026-03-03T10:30:00Z',
    warrantyUntil: '2026-03-10T10:30:00Z',
    createdAt: '2026-03-03T10:30:00Z',
    updatedAt: '2026-03-03T10:30:00Z',
  },
  // ORD-001 extra: profile items for cust-001
  {
    id: 'del-001b',
    orderId: 'ORD-001',
    orderItemId: 'item-001',
    productType: 'profile',
    uid: '100071234567890',
    credentials: {
      password: 'SecureP@ss1',
      twoFa: 'ABCWY3DPEHPK3PXP',
      email: 'cust001.p1@tempmail.com',
      passEmail: 'EmailP@ss1',
      cookie: 'datr=abc123xyz',
    },
    status: 'active',
    deliveredAt: '2026-03-03T11:00:00Z',
    warrantyUntil: '2026-03-10T11:00:00Z',
    createdAt: '2026-03-03T11:00:00Z',
    updatedAt: '2026-03-03T11:00:00Z',
  },
  {
    id: 'del-001c',
    orderId: 'ORD-001',
    orderItemId: 'item-001',
    productType: 'profile',
    uid: '100082345678901',
    credentials: {
      password: 'Another@Pass2',
      email: 'cust001.p2@tempmail.com',
      passEmail: 'EmailP@ss2',
    },
    status: 'inactive',
    deliveredAt: '2026-03-03T11:30:00Z',
    warrantyUntil: '2026-03-10T11:30:00Z',
    createdAt: '2026-03-03T11:30:00Z',
    updatedAt: '2026-03-03T11:30:00Z',
  },
  {
    id: 'del-001d',
    orderId: 'ORD-001',
    orderItemId: 'item-001',
    productType: 'profile',
    uid: '100093456789012',
    credentials: {
      password: 'Banned@Pass3',
      twoFa: 'ZBCWY3DPEHPK3PXP',
      email: 'cust001.p3@tempmail.com',
      passEmail: 'EmailP@ss3',
    },
    status: 'banned',
    deliveredAt: '2026-03-04T08:00:00Z',
    warrantyUntil: '2026-03-11T08:00:00Z',
    createdAt: '2026-03-04T08:00:00Z',
    updatedAt: '2026-03-04T08:00:00Z',
    note: 'Banned — warranty replacement pending',
  },
  // ORD-001 extra: page items for cust-001
  {
    id: 'del-001e',
    orderId: 'ORD-001',
    orderItemId: 'item-002',
    productType: 'page',
    uid: '112233445566778',
    credentials: {
      pageId: '112233445566778',
      link: 'https://www.facebook.com/testpage112233',
      name: 'GoAds Test Page',
      holdingId: '9876543210123456',
    },
    status: 'active',
    deliveredAt: '2026-03-04T09:00:00Z',
    warrantyUntil: '2026-03-11T09:00:00Z',
    createdAt: '2026-03-04T09:00:00Z',
    updatedAt: '2026-03-04T09:00:00Z',
  },
  {
    id: 'del-001f',
    orderId: 'ORD-001',
    orderItemId: 'item-002',
    productType: 'page',
    uid: '223344556677889',
    credentials: {
      pageId: '223344556677889',
      link: 'https://www.facebook.com/testpage223344',
      name: 'Media Ads Page #2',
    },
    status: 'active',
    deliveredAt: '2026-03-04T09:30:00Z',
    warrantyUntil: '2026-03-11T09:30:00Z',
    createdAt: '2026-03-04T09:30:00Z',
    updatedAt: '2026-03-04T09:30:00Z',
  },
  // ORD-004: cust-004 — 3x bm (completed)
  {
    id: 'del-003',
    orderId: 'ORD-004',
    orderItemId: 'item-006',
    productType: 'bm',
    uid: '4567890123456789',
    credentials: {
      bmId: '4567890123456789',
      name: 'BM Aged 2024 #1',
      inviteLink: 'https://business.facebook.com/settings/requests/4567890123456789',
    },
    status: 'active',
    deliveredAt: '2026-02-20T09:00:00Z',
    warrantyUntil: '2026-02-27T09:00:00Z',
    createdAt: '2026-02-20T09:00:00Z',
    updatedAt: '2026-02-20T09:00:00Z',
  },
  {
    id: 'del-004',
    orderId: 'ORD-004',
    orderItemId: 'item-006',
    productType: 'bm',
    uid: '5678901234567890',
    credentials: {
      bmId: '5678901234567890',
      name: 'BM Aged 2024 #2',
      inviteLink: 'https://business.facebook.com/settings/requests/5678901234567890',
    },
    status: 'expired',
    deliveredAt: '2026-02-21T10:00:00Z',
    warrantyUntil: '2026-02-28T10:00:00Z',
    createdAt: '2026-02-21T10:00:00Z',
    updatedAt: '2026-02-21T10:00:00Z',
  },
  {
    id: 'del-005',
    orderId: 'ORD-004',
    orderItemId: 'item-006',
    productType: 'bm',
    uid: '6789012345678901',
    credentials: {
      bmId: '6789012345678901',
      name: 'BM Aged 2024 #3',
      inviteLink: 'https://business.facebook.com/settings/requests/6789012345678901',
    },
    status: 'active',
    deliveredAt: '2026-02-22T14:00:00Z',
    warrantyUntil: '2026-03-01T14:00:00Z',
    createdAt: '2026-02-22T14:00:00Z',
    updatedAt: '2026-02-22T14:00:00Z',
  },
  // ORD-008: cust-006 — 5x profile (completed)
  {
    id: 'del-006',
    orderId: 'ORD-008',
    orderItemId: 'item-011',
    productType: 'profile',
    uid: '100012345678901',
    credentials: {
      password: 'Abc@12345',
      twoFa: 'JBSWY3DPEHPK3PXP',
      email: 'profile1@tempmail.com',
      passEmail: 'Email@2024',
    },
    status: 'active',
    deliveredAt: '2026-02-21T09:00:00Z',
    warrantyUntil: '2026-02-28T09:00:00Z',
    createdAt: '2026-02-21T09:00:00Z',
    updatedAt: '2026-02-21T09:00:00Z',
  },
  {
    id: 'del-007',
    orderId: 'ORD-008',
    orderItemId: 'item-011',
    productType: 'profile',
    uid: '100023456789012',
    credentials: {
      password: 'Xyz@67890',
      twoFa: 'KBSWY3DPEHPK3PXP',
      email: 'profile2@tempmail.com',
      passEmail: 'Email@2024',
    },
    status: 'active',
    deliveredAt: '2026-02-21T09:30:00Z',
    warrantyUntil: '2026-02-28T09:30:00Z',
    createdAt: '2026-02-21T09:30:00Z',
    updatedAt: '2026-02-21T09:30:00Z',
  },
  {
    id: 'del-008',
    orderId: 'ORD-008',
    orderItemId: 'item-011',
    productType: 'profile',
    uid: '100034567890123',
    credentials: {
      password: 'Def@11223',
      email: 'profile3@tempmail.com',
      passEmail: 'Email@2024',
    },
    status: 'inactive',
    deliveredAt: '2026-02-21T10:00:00Z',
    warrantyUntil: '2026-02-28T10:00:00Z',
    createdAt: '2026-02-21T10:00:00Z',
    updatedAt: '2026-02-21T10:00:00Z',
  },
  {
    id: 'del-009',
    orderId: 'ORD-008',
    orderItemId: 'item-011',
    productType: 'profile',
    uid: '100045678901234',
    credentials: {
      password: 'Ghi@33445',
      twoFa: 'LBSWY3DPEHPK3PXP',
      email: 'profile4@tempmail.com',
      passEmail: 'Email@2024',
    },
    status: 'banned',
    deliveredAt: '2026-02-22T08:00:00Z',
    warrantyUntil: '2026-03-01T08:00:00Z',
    createdAt: '2026-02-22T08:00:00Z',
    updatedAt: '2026-02-22T08:00:00Z',
    note: 'Banned — warranty replacement pending',
  },
  {
    id: 'del-010',
    orderId: 'ORD-008',
    orderItemId: 'item-011',
    productType: 'profile',
    uid: '100056789012345',
    credentials: {
      password: 'Jkl@55667',
      email: 'profile5@tempmail.com',
      passEmail: 'Email@2024',
    },
    status: 'active',
    deliveredAt: '2026-02-22T08:30:00Z',
    warrantyUntil: '2026-03-01T08:30:00Z',
    createdAt: '2026-02-22T08:30:00Z',
    updatedAt: '2026-02-22T08:30:00Z',
  },
  // ORD-010: cust-008 — 2x agency + 1x google (delivered)
  {
    id: 'del-011',
    orderId: 'ORD-010',
    orderItemId: 'item-013',
    productType: 'agency_account',
    uid: '7890123456789012',
    credentials: {
      bmId: '7890123456789012',
      name: 'Agency Account #1',
      inviteLink: 'https://business.facebook.com/settings/requests/7890123456789012',
    },
    status: 'active',
    deliveredAt: '2026-03-07T10:00:00Z',
    warrantyUntil: '2026-03-14T10:00:00Z',
    createdAt: '2026-03-07T10:00:00Z',
    updatedAt: '2026-03-07T10:00:00Z',
  },
  {
    id: 'del-012',
    orderId: 'ORD-010',
    orderItemId: 'item-013',
    productType: 'agency_account',
    uid: '8901234567890123',
    credentials: {
      bmId: '8901234567890123',
      name: 'Agency Account #2',
      inviteLink: 'https://business.facebook.com/settings/requests/8901234567890123',
    },
    status: 'active',
    deliveredAt: '2026-03-07T10:30:00Z',
    warrantyUntil: '2026-03-14T10:30:00Z',
    createdAt: '2026-03-07T10:30:00Z',
    updatedAt: '2026-03-07T10:30:00Z',
  },
  {
    id: 'del-013',
    orderId: 'ORD-010',
    orderItemId: 'item-014',
    productType: 'google_agency',
    uid: 'GAds-001-WL',
    credentials: {
      adAccountId: 'GAds-001-WL',
    },
    status: 'active',
    deliveredAt: '2026-03-07T11:00:00Z',
    warrantyUntil: '2026-03-14T11:00:00Z',
    createdAt: '2026-03-07T11:00:00Z',
    updatedAt: '2026-03-07T11:00:00Z',
  },
]

/**
 * Get delivered items scoped to a customer (via order join).
 * Replaces direct customerId filtering from old schema.
 */
export function getDeliveredItemsForCustomer(
  customerId: string,
): MockDeliveredItem[] {
  const customerOrderIds = mockOrders
    .filter((o) => o.customerId === customerId)
    .map((o) => o.id)
  return mockDeliveredItems.filter((d) => customerOrderIds.includes(d.orderId))
}

/** Get product name for a delivered item via orderItem lookup */
export function getProductNameForItem(item: MockDeliveredItem): string {
  const orderItem = mockOrderItems.find((oi) => oi.id === item.orderItemId)
  return orderItem?.productName ?? item.productType
}
