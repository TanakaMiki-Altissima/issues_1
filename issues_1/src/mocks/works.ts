// 作業履歴
export type Works = {
  ownerId: string;
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comment: string;
};

export const mockWorks: Works[] = [
  {
    ownerId: '98382329238838',
    date: '2022.9.10',
    car_name: 'アルト',
    title: 'TITLE',
    price: '2,222',
    store_name: 't店舗1(検証用直営1)',
    comment: '',
  },
  {
    ownerId: '12345678901234',
    date: '2022.9.01',
    car_name: 'インプレッサスポーツ',
    title: 'TITLE',
    price: '2,222',
    store_name: 't店舗1(検証用直営1)',
    comment: '',
  },
];
