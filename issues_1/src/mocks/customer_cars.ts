export type CustomerCar = {
  id: string;
  ownerId: string;
  manufacturer: string;
  car_name: string;
  vehicle_inspection: string;
  image?: string;
};

export const mockCustomer_cars: CustomerCar[] = [
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
    ownerId: '32323343022332',
    manufacturer: 'MAZDA',
    car_name: 'ROADSTAR',
    vehicle_inspection: '2027-03-01',
    image: 'kaden_camera_compact.png',
  },
];
