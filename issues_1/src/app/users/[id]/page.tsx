'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'next/navigation';
import { mockCustomers } from '@/mocks/customers';
import {mockCustomer_cars} from '@/mocks/customer_cars';

export default function UserDetailsPage() {
  const params = useParams<{ id: string }>();
  const customerId = params.id;

  const customer = mockCustomers.find(
    (c) => c.crooooberId === customerId
  );

  if (!customer) {
    return <p>顧客が見つかりません</p>;
  }

  const customerCars = mockCustomer_cars.filter(
    (car) => car.ownerId === customerId
  );

return (
    <div className="h-screen flex flex-col">
    <Header />
    <div className="flex flex-1">
    <Sidebar />
  <main>
    <div className="w-[300px]">
        <div className="space-y-1 mb-6 bg-blue-100 h-[130px] text-center">
          <strong>Croooober ID</strong> 
          <br/>
          <strong>{customer.crooooberId}</strong>
          <p><strong>{customer.name}</strong>さま</p>
        </div>

   <div className="p-4">
          <h3 className="text-xl font-semibold mb-4">愛車一覧</h3>

          {customerCars.length === 0 ? (
            <p>登録されている車はありません</p>
          ) : (
            <div className="space-y-4">
              {customerCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-4 "
                >
                  {/* ===== 画像を左 ===== */}
                  {car.image && (
                    <img
                      src={`/${car.image}`}
                      alt={car.car_name}
                      className="w-15 h-15 object-contain"
                    />
                  )}

                 
                  {/* ===== テキストを右 ===== */}
                  <div>
                    <p className="text-sm text-gray-500">
                      {car.manufacturer}
                    </p>
                    <h4 className="text-lg font-medium">
                      {car.car_name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      車検：
                      {new Date(car.vehicle_inspection).toLocaleDateString()}
                    </p>
                </div>
             </div>
              ))}
            </div>
          )}
        </div>
    </div>
    </main>
    </div>
</div>
)};