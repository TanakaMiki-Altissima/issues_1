'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,
    faHouse,
  faComment,
  faStar,
  faWrench,
  faMessage
 } from '@fortawesome/free-solid-svg-icons';
import {
  faComment as faCommentRegular,
  faStar as faStarRegular,
  faClock,
  faChartBar,
} from '@fortawesome/free-regular-svg-icons';
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
  const [activeTab, setActiveTab] = useState('top');

  const customerCars = mockCustomer_cars.filter(
    (car) => car.ownerId === customerId
  );

  const isWithinOneMonth = (inspectionDate: Date) => {
  const today = new Date();
  const diffTime = inspectionDate.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 30 && diffDays >= 0;
  };

  const tabs = [
    { id: 'top', label: 'トップ', color: 'blue',icon: faHouse },
    { id: 'message', label: 'メッセージ', color: 'red',icon: faComment },
    { id: 'considering', label: '検討中パーツ', color: 'yellow',icon: faStar },
    { id: 'purchase', label: '購入履歴', color: 'yellow',icon: faClock },
    { id: 'assessment', label: '査定中', color: 'green',icon: faChartBar },
    { id: 'buyback', label: '買取履歴', color: 'green',icon: faClock },
    { id: 'reservation', label: '作業予約', color: 'gray',icon: faWrench },
    { id: 'work', label: '作業履歴', color: 'gray',icon: faClock },
  ];

  const getTabStyles = (tab: typeof tabs[0]) => {
    const isActive = activeTab === tab.id;
    const baseStyles = 'w-60 px-6 py-4 transition-colors';
    
    if (isActive) {
      return `${baseStyles} bg-${tab.color}-300 text-${tab.color}-900`;
    }
    
    return `${baseStyles} bg-${tab.color}-100 hover:bg-white hover:text-${tab.color}-700`;
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
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? `w-60 px-6 py-4 bg-white text-${tab.color}-700 relative`
                : `w-60 px-6 py-4 bg-${tab.color}-100 `
            }
          >
            {index === 0 && activeTab === 'top'}
            <FontAwesomeIcon icon={tab.icon} />
            <br/>
            {tab.label}
          </button>
        ))}
    </div>

    {/* タブコンテンツ */}
    <div className="mt-6">
      {/* 共通検索エリア */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-300">
        <div className="relative">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
          <input 
            placeholder="キーワードで検索" 
            className="w-[280px] pl-9 pr-2 py-2 rounded bg-gray-100 text-gray-600 outline-none"
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

      {/* タブ別コンテンツ */}
      {activeTab === 'top' && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">取引履歴</h2>
          <p>購入履歴 / 作業履歴 / タイムラインなど</p>
        </div>
      )}

      {activeTab === 'message' && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">メッセージ</h2>
          <p>メッセージ機能内容</p>
        </div>
      )}

      {activeTab === 'considering' && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">検討中パーツ</h2>
          <p>検討中パーツ内容</p>
        </div>
      )}

      {activeTab === 'purchase' && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">購入履歴</h2>
          <p>購入履歴内容</p>
        </div>
      )}

      {activeTab === 'assessment' && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">査定中</h2>
          <p>査定中内容</p>
        </div>
      )}

      {activeTab === 'buyback' && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">買取履歴</h2>
          <p>買取履歴内容</p>
        </div>
      )}

      {activeTab === 'reservation' && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">作業予約</h2>
          <p>作業予約内容</p>
        </div>
      )}

      {activeTab === 'work' && (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">作業履歴</h2>
          <p>作業履歴内容</p>
        </div>
      )}
    </div>
  </div>
    </main>
    </div>
</div>
)};