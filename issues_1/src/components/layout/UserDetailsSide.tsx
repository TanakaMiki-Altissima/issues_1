'use client';

import { useState } from 'react';
import { mockCustomers } from '@/mocks/customers';
import { mockCustomer_cars } from '@/mocks/customer_cars';

type Props = {
  customerId: string;
};

export function UserDetailsSide({ customerId }: Props) {
  const customer = mockCustomers.find((c) => c.crooooberId === customerId);

  if (!customer) {
    return <p>顧客が見つかりません</p>;
  }

  const isWithinOneMonth = (inspectionDate: Date) => {
    const today = new Date();
    const diffTime = inspectionDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 30 && diffDays >= 0;
  };

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(customer.name);

  const customerCars = mockCustomer_cars.filter((car) => car.ownerId === customerId);

  return (
    <div className="h-full border-r border-gray-300">
      {/* 氏名・愛車・ボタン */}
      <div className="w-[300px] h-full border-r border-gray-300">
        <div className="space-y-1 pt-4 mb-6 bg-blue-100 h-[130px] text-center">
          <div className="inline-block transform italic">
            <strong>Croooober ID</strong>
          </div>
          <br />
          <strong>{customer.crooooberId}</strong>
          <div className="text-center">
            {isEditingName ? (
              <input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                className="border border-gray-300 rounded px-2 py-1 text-center"
                autoFocus
              />
            ) : (
              <>
                <p>
                  <strong>{editedName}</strong>さま
                </p>
                <button onClick={() => setIsEditingName(true)} className="text-blue-600 text-sm hover:underline">
                  編集
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-4 border-b border-gray-300">
          <h3 className="text-xl font-semibold mb-4">愛車一覧</h3>

          {customerCars.length === 0 ? (
            <p>登録されている車はありません</p>
          ) : (
            <div className="space-y-4">
              {customerCars.map((car) => (
                <div key={car.id} className="flex items-center gap-4 ">
                  {/* ===== 画像を左 ===== */}
                  {car.image && <img src={`/${car.image}`} alt={car.car_name} className="w-15 h-15 object-contain" />}

                  {/* ===== テキストを右 ===== */}
                  <div>
                    <p className="text-sm text-gray-500">{car.manufacturer}</p>
                    <h4 className="text-lg font-medium">{car.car_name}</h4>
                    {isWithinOneMonth(new Date(car.vehicle_inspection)) && (
                      <p className="text-blue-600 text-sm font-medium">車検まであと1ヶ月です</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 flex flex-col items-center gap-5">
          <button
            className="
                    w-60
                    px-6 py-2
                    rounded
                    bg-white
                    text-blue-700
                    border border-blue-700
                    hover:bg-blue-50
                  "
          >
            新規見積もり
          </button>

          <button
            className="
                    w-60
                    px-6 py-2
                    rounded
                    bg-white
                    text-blue-700
                    border border-blue-700
                    hover:bg-blue-50
                  "
          >
            新規買取査定
          </button>

          <button
            className="
                    w-60
                    px-6 py-2
                    rounded
                    bg-white
                    text-blue-700
                    border border-blue-700
                    hover:bg-blue-50
                  "
          >
            新規作業予約
          </button>
        </div>
      </div>
    </div>
  );
}
