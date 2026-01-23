// 作業予約
export type Reservations = {
  ownerId: string;
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comment: string;
};

export const mockReservations: Reservations[] = [
  {
    ownerId: '12345678901234',
    date: '2022.9.01',
    car_name: 'インプレッサスポーツ',
    title: 'TITLE',
    price: '3,333',
    store_name: 't店舗1(検証用直営1)',
    comment: 'コメント',
  },
];
