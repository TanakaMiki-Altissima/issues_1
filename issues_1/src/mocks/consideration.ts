// 検討中パーツ

export type Consideration = {
  ownerId: string;
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comment: string;
};

export const mockConsideration: Consideration[] = [
  {
    ownerId: '98382329238838',
    date: '2022.9.21',
    car_name: 'アルト',
    title: 'TITLE',
    price: '2,222',
    store_name: 't店舗1(検証用直営1)',
    comment: '',
  },
];
