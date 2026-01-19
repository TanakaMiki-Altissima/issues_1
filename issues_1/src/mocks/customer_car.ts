// 購入履歴
export type Purchases = {
  manufacturer: string;
  car_name: string;
  vehicle_inspection: Date;
};

export const mockPurchases: Purchases[] = [
  {
  manufacturer: 'NISSAN',
  car_name: 'R35',
  vehicle_inspection: new Date('2026-02-01')
  },
  {
  manufacturer: 'MAZDA',
  car_name: 'ROADSTAR',
  vehicle_inspection: new Date('2027-03-01')
  },
];