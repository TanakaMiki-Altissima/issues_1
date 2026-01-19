// 検討中パーツ

export type Consideration = {
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comment: string;
};

export const mockConsideration: Consideration[] = [
  {
  date: '2022.9.21',
  car_name: 'インプレッサスポーツ',
  title: 'TITLE',
  price: '2,222',
  store_name: 't店舗1(検証用直営1)',
  comment: ''
  },
];