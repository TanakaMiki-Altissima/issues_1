// 作業予約
export type Reservations = {
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comment: string;
};

export const mockReservations: Reservations[] = [
  {
    date: '2022.9.29',
    car_name: 'インプレッサスポーツ',
    title: 'TITLE',
    price: '3,333',
    store_name: 't店舗1(検証用直営1)',
    comment: 'コメント',
  },
];
