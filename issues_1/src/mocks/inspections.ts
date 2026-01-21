// 査定中

export type Inspections = {
  date: string;
  car_name: string;
  title: string;
  price: string;
  store_name: string;
  comment: string;
};

export const mockInspections: Inspections[] = [
  {
  date: '2022.9.26',
  car_name: 'インプレッサスポーツ',
  title: 'GOODYEAR EAGLE REVSPEC RS-02 205/55R16 3',
  price: '13,138',
  store_name: 't店舗1(検証用直営1)',
  comment: ''
  },
];