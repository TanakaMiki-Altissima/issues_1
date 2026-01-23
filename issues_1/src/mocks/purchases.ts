// 購入履歴
export type Purchases = {
  ownerId: string;
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comment: string;
};

export const mockPurchases: Purchases[] = [
  {
    ownerId: '12345678901234',
    date: '2022.9.26',
    car_name: 'インプレッサスポーツ',
    title: 'GOODYEAR EAGLE REVSPEC RS-02 205/55R16',
    price: '13,138',
    store_name: 't店舗1(検証用直営1)',
    comment: 'コメント',
  },
   {
    ownerId: '12345678901234',
    date: '2022.9.10',
    car_name: 'インプレッサスポーツ',
    title: 'GOODYEAR EAGLE REVSPEC RS-02 205/55R16',
    price: '13,111',
    store_name: 't店舗1(検証用直営1)',
    comment: '',
  },
  {
    ownerId: '32323343022332',
    date: '2022.9.9',
    car_name: '',
    title: 'GOODYEAR EAGLE REVSPEC RS-02 205/55R16 2',
    price: '2,500',
    store_name: 't店舗2(検証用直営2)',
    comment: '',
  },
  {
    ownerId: '12345678901234',
    date: '2022.9.9',
    car_name: 'インプレッサスポーツ',
    title: 'GOODYEAR EAGLE REVSPEC RS-02 205/55R16 4',
    price: '2,500',
    store_name: 't店舗3(検証用直営3)',
    comment: '',
  },
  {
    ownerId: '12345678901234',
    date: '2022.9.26',
    car_name: 'インプレッサスポーツ',
    title: 'GOODYEAR EAGLE REVSPEC RS-02 205/55R16 5',
    price: '13,138',
    store_name: 't店舗1(検証用直営1)',
    comment: '',
  },
];
