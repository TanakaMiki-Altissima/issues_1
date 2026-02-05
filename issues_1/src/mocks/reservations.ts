// 作業予約
export type Reservations = {
  ownerId: string;
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comment: string;
  time: string;
  content: string;
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
    time: '11:00',
    content: '買取予約',
  },
  {
    ownerId: '12345678901234',
    date: '2026.3.01',
    car_name: 'インプレッサスポーツ',
    title: 'TITLE',
    price: '3,333',
    store_name: 't店舗1(検証用直営1)',
    comment: 'コメント',
    time: '12:30',
    content: '買取予約',
  },
];
