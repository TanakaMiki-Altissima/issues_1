import { render, screen } from '@testing-library/react';
import { UserDetailsSide } from '../components/layout/UserDetailsSide';

jest.mock('next/navigation', () => ({
  useParams: () => ({
    id: '12345678901234',
  }),
}));
jest.mock('../mocks/customers', () => ({
  mockCustomers: [
    {
      crooooberId: '12345678901234',
      name: '山田太郎',
      phone: '09042241234',
      address: '東京都練馬区高野台1-1-1 203号室',
    },
  ],
}));

jest.mock('../mocks/customer_cars', () => ({
  mockCustomer_cars: [
    {
      id: 'car-1',
      ownerId: '12345678901234',
      manufacturer: 'NISSAN',
      car_name: 'R35',
      vehicle_inspection: '2026-02-01',
      image: 'kaden_camera_compact.png',
    },
    {
      id: 'car-2',
      ownerId: '12345678901234',
      manufacturer: 'MAZDA',
      car_name: 'ROADSTAR',
      vehicle_inspection: '2027-03-01',
      image: 'kaden_camera_compact.png',
    },
  ],
}));

describe('UserDetailsSide 表示テスト', () => {
  test('氏名が表示されている', () => {
    render(<UserDetailsSide />);
    expect(screen.getByText('山田太郎')).toBeInTheDocument();
  });

  test('愛車名が表示されている', () => {
    render(<UserDetailsSide />);
    expect(screen.getByText('R35')).toBeInTheDocument();
  });

  test('新規見積もりボタンが表示されている', () => {
    render(<UserDetailsSide />);
    expect(screen.getByRole('button', { name: '新規見積もり' })).toBeInTheDocument();
  });
});