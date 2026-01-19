// 一覧取得API用
import { mockPurchases } from './purchases';
import { mockInspections } from './inspections';
import { mockWorks } from './works';
import { mockReservations } from './reservations';
import { mockConsideration } from './consideration';

export type TimelineItem =
  | {
      type: 'purchase';
      date: string;
      price: number;
    }
  | {
      type: 'inspection';
      date: string;
      rank: string;
    };