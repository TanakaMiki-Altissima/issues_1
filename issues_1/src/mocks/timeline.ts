// timeline.ts
import { mockPurchases } from './purchases';
import { mockInspections } from './inspections';
import { mockWorks } from './works';
import { mockReservations } from './reservations';
import { mockConsideration } from './consideration';

type PurchaseComment = {
  id: string;
  datetime: string;
  storeName: string;
  staffName: string;
  body: string;
};

// 共通フィールド
type BaseTimelineItem = {
  id: string;
  ownerId: string;
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comments?: PurchaseComment[];
};

export type TimelineItem =
  | (BaseTimelineItem & { type: 'purchase' })
  | (BaseTimelineItem & { type: 'inspection' })
  | (BaseTimelineItem & { type: 'work' })
  | (BaseTimelineItem & { type: 'reservation' })
  | (BaseTimelineItem & { type: 'consideration' });

const parseDate = (date: string) => new Date(date.replace(/\./g, '-'));

/* =====================
   各タイムライン変換
===================== */
export const purchaseTimeline: TimelineItem[] = mockPurchases.map((p) => ({
  ...p,
  type: 'purchase' as const,
}));
export const inspectionTimeline: TimelineItem[] = mockInspections.map((i, index) => ({
  id: `inspection-${index}`,
  type: 'inspection' as const,
  ...i,
}));

export const workTimeline: TimelineItem[] = mockWorks.map((w, index) => ({
  id: `work-${index}`,
  type: 'work' as const,
  ...w,
}));

export const reservationTimeline: TimelineItem[] = mockReservations.map((r, index) => ({
  id: `reservation-${index}`,
  type: 'reservation' as const,
  ...r,
}));

export const considerationTimeline: TimelineItem[] = mockConsideration.map((c, index) => ({
  id: `consideration-${index}`,
  type: 'consideration' as const,
  ...c,
}));

export const mockTimeline: TimelineItem[] = [
  ...purchaseTimeline,
  ...inspectionTimeline,
  ...workTimeline,
  ...reservationTimeline,
  ...considerationTimeline,
].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
