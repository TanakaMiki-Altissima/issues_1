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

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(customer.name);

  const customerCars = mockCustomer_cars.filter(
    (car) => car.ownerId === customerId
  );

  const isWithinOneMonth = (inspectionDate: Date) => {
  const today = new Date();
  const diffTime = inspectionDate.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 30 && diffDays >= 0;
  };


return (
    <div className="h-screen flex flex-col">
    <Header />
    <div className="flex flex-1">
    <Sidebar />
  <main className="flex flex-1">
    <div className="h-full border-r border-gray-300">
    {/* 氏名・愛車・ボタン */}
    <div className="w-[300px] h-full border-r border-gray-300">
        <div className="space-y-1 pt-4 mb-6 bg-blue-100 h-[130px] text-center">
          <div className="inline-block transform italic">
          <strong>Croooober ID</strong> 
          </div>
          <br/>
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
      <button
        onClick={() => setIsEditingName(true)}
        className="text-blue-600 text-sm hover:underline"
      >
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
                     {isWithinOneMonth(new Date(car.vehicle_inspection)) && (
        <p className="text-blue-600 text-sm font-medium">
          車検まであと1ヶ月です
        </p>
        )}
                </div>
             </div>
              ))}
            </div>
          )}
        </div>


    <div className="pt-6 flex flex-col items-center gap-5">
        <button className="
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
    

    <button className="
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

    <button className="
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

  {/* ===== 右カラム ===== */}
  <div className="flex-1 ml-6">
    <div className="flex gap-1 font-semibold">
        <div>
        <img src="/fabric_mark_triangle.png" alt="icon1" className="w-[1em] h-[1em]" />
        <button className="
                    w-60
                    px-6 py-4
                    bg-blue-300
                    hover:bg-white
                    hover:text-blue-700
                  "
                >
                  トップ
                </button>
        </div>
        <button className="
                    w-60
                    bg-red-100
                    hover:bg-white
                    hover:text-red-700
                  "
                >
                  メッセージ
                </button>
        <button className="
                    w-60
                    bg-yellow-100
                    hover:bg-white
                    hover:text-yellow-700
                  "
                >
                  検討中パーツ
                </button>
        <button className="
                    w-60
                    bg-yellow-100
                    hover:bg-white
                    hover:text-yellow-700
                  "
                >
                  購入履歴
                </button>
        <button className="
                    w-60
                    bg-green-100
                    hover:bg-white
                    hover:text-green-700
                  "
                >
                  査定中
                </button>
        <button className="
                    w-60
                    bg-green-100
                    hover:bg-white
                    hover:text-green-700
                  "
                >
                  買取履歴
                </button>
        <button className="
                    w-60
                    bg-gray-100
                    hover:bg-white
                    hover:text-gray-700
                  "
                >
                  作業予約
                </button>
        <button className="
                    w-60
                    bg-gray-100
                    hover:bg-white
                    hover:text-gray-700
                  "
                >
                  作業履歴
                </button>
    </div>
    <div className="border-b border-gray-300" >
    <h2 className="text-xl font-semibold mb-4">取引履歴</h2>
    </div>
    <div className="flex items-center gap-4 p-4 border-b border-gray-300">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />
                <input placeholder="キーワードで検索" className="
                    w-[280px]
                    pl-9 pr-2 py-2
                    rounded
                    bg-gray-100
                    text-gray-600
                    outline-none
                    "
                />
              </div>

              <button className="px-5 py-2 rounded bg-blue-700 text-white">
                検索
              </button>
    </div>
    <div className="flex items-center gap-4 p-4 border-b border-gray-300">
        <p>件</p>
        <p>メモ付きのみ</p>
    </div>

    <p>購入履歴 / 作業履歴 / タイムラインなど</p>
  </div>
    </main>
    </div>
</div>
)};