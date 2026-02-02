'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserDetailsSide } from '@/components/layout/UserDetailsSide';
import { Tabs } from '@/components/Tabs';
import { mockPurchases } from '@/mocks/purchases';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faComment, faStar, faWrench, faMessage, faImage, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faClock, faChartBar } from '@fortawesome/free-regular-svg-icons';

export default function PurchaseDetailPage() {
  const params = useParams<{ id: string }>();
  const purchaseId = params.id;

  const originalPurchase = mockPurchases.find((p) => p.id === purchaseId);

  const [purchase, setPurchase] = useState(originalPurchase);
  const [editPurchase, setEditPurchase] = useState(originalPurchase);

  //   const purchase = mockPurchases.find((p) => p.id === purchaseId);

  const customerId = purchase?.ownerId;

  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  //   const [editPurchase, setEditPurchase] = useState(purchase);

  const [activeTab] = useState<'purchase'>('purchase');

  const tabs = [
    { id: 'top', label: 'トップ', color: 'blue', icon: faHouse },
    { id: 'message', label: 'メッセージ', color: 'red', icon: faComment },
    { id: 'considering', label: '検討中パーツ', color: 'yellow', icon: faStar },
    { id: 'purchase', label: '購入履歴', color: 'yellow', icon: faClock },
    { id: 'assessment', label: '査定中', color: 'green', icon: faChartBar },
    { id: 'buyback', label: '買取履歴', color: 'green', icon: faClock },
    { id: 'reservation', label: '作業予約', color: 'gray', icon: faWrench },
    { id: 'work', label: '作業履歴', color: 'gray', icon: faClock },
  ] as const;

  const getTabStyles = (tab: (typeof tabs)[0]) => {
    const baseStyles = 'w-20 px-6 py-4 transition-colors';
    return `${baseStyles} bg-${tab.color}-100 hover:bg-white hover:text-${tab.color}-700`;
  };

  const tabColorMap = {
    blue: 'bg-blue-100',
    red: 'bg-red-100',
    yellow: 'bg-yellow-100',
    green: 'bg-green-100',
    gray: 'bg-gray-100',
  } as const;

  const displayPurchase = isEditing ? editPurchase : purchase;

  const [selectedStore, setSelectedStore] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1">
          {customerId ? (
            <UserDetailsSide customerId={customerId} />
          ) : (
            <div className="w-[300px] h-full border-r border-gray-300 p-4">
              <p>購入履歴がありません</p>
            </div>
          )}
          <div className="pl-4 flex-1 ">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={() => {}} />
            <div className="border-b-2 border-gray-400">
              <h1 className="text-xl font-bold mb-4">購入履歴</h1>
            </div>

            {purchase ? (
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    {purchase.image && (
                      <img src={`/${purchase.image}`} alt={purchase.car_name} className="w-15 h-15 object-contain" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border px-2 py-1 text-sm"
                        value={editPurchase?.date ?? ''}
                        onChange={(e) => setEditPurchase({ ...editPurchase!, date: e.target.value })}
                      />
                    ) : (
                      <span className="text-sm text-gray-500">{displayPurchase?.date}/</span>
                    )}
                    {isEditing ? (
                      <input
                        className="border px-2 py-1"
                        value={editPurchase?.car_name ?? ''}
                        onChange={(e) => setEditPurchase({ ...editPurchase!, car_name: e.target.value })}
                      />
                    ) : (
                      <span className="text-sm text-gray-500">{displayPurchase?.car_name}</span>
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        className="border px-2 py-1 text-sm"
                        value={editPurchase?.store_name ?? ''}
                        onChange={(e) => setEditPurchase({ ...editPurchase!, store_name: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm text-gray-500 mb-1">{displayPurchase?.store_name}</p>
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        className="border px-2 py-1 text-sm"
                        value={editPurchase?.id ?? ''}
                        onChange={(e) => setEditPurchase({ ...editPurchase!, id: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm mb-1">{displayPurchase?.id}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-8 border-b-1 border-gray-400 p-2">
                  <div>
                    {isEditing ? (
                      <input
                        className="border px-2 py-1 w-full"
                        value={editPurchase?.title ?? ''}
                        onChange={(e) => setEditPurchase({ ...editPurchase!, title: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium">{displayPurchase?.title}</p>
                    )}
                  </div>

                  <div className="ml-auto">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border px-2 py-1 w-32"
                        value={editPurchase?.price ?? ''}
                        onChange={(e) =>
                          setEditPurchase({
                            ...editPurchase!,
                            price: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <p className="font-medium text-lg text-blue-500">¥{displayPurchase?.price}</p>
                    )}
                  </div>
                </div>
                <div className="border-b-1 border-gray-400 flex p-2">
                  <p className="text-sm text-gray-500 w-115 flex-shrink-0">メモ</p>

                  {/* 中央配置用ラッパー */}
                  <div className="flex-1 flex justify-center">
                    {/* 実体（背景を右端まで） */}
                    {isEditing ? (
                      <textarea
                        className="w-full border p-2 rounded"
                        rows={4}
                        value={editPurchase?.memo ?? ''}
                        onChange={(e) => setEditPurchase({ ...editPurchase!, memo: e.target.value })}
                      />
                    ) : (
                      <p className="w-full bg-gray-100 text-lg text-left p-2 lex-1  rounded">{displayPurchase?.memo}</p>
                    )}
                  </div>
                </div>
                <div className="border-b-1 border-gray-400 flex p-2">
                  <p className="text-sm text-gray-500 w-115 flex-shrink-0">商品URL</p>
                  {isEditing ? (
                    <input
                      className="border px-2 py-1 w-full"
                      value={editPurchase?.url ?? ''}
                      onChange={(e) => setEditPurchase({ ...editPurchase!, url: e.target.value })}
                    />
                  ) : (
                    <p className="font-medium text-lg text-blue-500 break-all">{displayPurchase?.url}</p>
                  )}
                </div>
                {purchase.car_name && (
                  <div className="border-b-1 border-gray-400 flex p-2">
                    <p className="text-sm text-gray-500 w-115 flex-shrink-0">取付車</p>
                    {isEditing ? (
                      <input
                        className="border px-2 py-1"
                        value={editPurchase?.car_name ?? ''}
                        onChange={(e) => setEditPurchase({ ...editPurchase!, car_name: e.target.value })}
                      />
                    ) : (
                      <p className="font-medium break-all">{displayPurchase?.car_name}</p>
                    )}
                  </div>
                )}
                <div className="flex flex-col items-center gap-4 py-6 border-b-1 border-gray-400">
                  <button
                    className="text-blue-500 hover:underline text-sm text-left"
                    onClick={() => {
                      setEditPurchase(purchase);
                      setIsEditing(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                    購入履歴を編集する
                  </button>
                  {isEditing && (
                    <div className="flex gap-4 justify-center py-4">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => {
                          setPurchase(editPurchase);
                          setIsEditing(false);
                        }}
                      >
                        OK
                      </button>

                      <button
                        className="px-4 py-2 bg-gray-300 rounded"
                        onClick={() => {
                          setEditPurchase(purchase); // 元に戻す
                          setIsEditing(false);
                        }}
                      >
                        キャンセル
                      </button>
                    </div>
                  )}

                  <button
                    className="text-red-500 hover:underline text-sm text-left"
                    onClick={() => {
                      const ok = window.confirm('この購入履歴を削除してもよろしいですか？');

                      if (!ok) return;

                      // 実際の削除処理はしない
                      // 一覧ページへ戻す
                      router.back();
                    }}
                  >
                    削除する
                  </button>

                  <button className="text-blue-500 hover:underline text-sm text-left" onClick={() => router.back()}>
                    ＜ 戻る
                  </button>
                </div>

                {purchase.comments && (
                  <div className="col-span-2">
                    <div className="flex items-center justify-between mb-4 border-b-1 border-gray-400">
                      <p className="text-xl font-bold">管理コメント</p>

                      <div className="flex gap-2">
                        {/* 店舗 */}
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={selectedStore}
                          onChange={(e) => setSelectedStore(e.target.value)}
                        >
                          <option value="" disabled>
                            店舗
                          </option>
                          <option value="練馬店">練馬店</option>
                        </select>

                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={selectedStaff}
                          onChange={(e) => setSelectedStaff(e.target.value)}
                        >
                          <option value="" disabled>
                            担当
                          </option>
                          <option value="後藤高志">後藤高志</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-4 m-2">
                      <div className="bg-gray-100 rounded fa-3x">
                        <FontAwesomeIcon icon={faImage} />
                      </div>
                      <div className="bg-gray-100 w-[280px] rounded">
                        <input
                          className="w-full px-2 py-1"
                          placeholder={`コメントを追加する ${selectedStore} : ${selectedStaff}`}
                        />
                      </div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                        onClick={() => {
                          console.log('send');
                        }}
                      >
                        送信
                      </button>
                    </div>

                    {purchase.comments?.map((c) => (
                      <div key={c.id} className="flex gap-4 py-4 ">
                        <div className="flex-shrink-0 pt-1">
                          <FontAwesomeIcon icon={faMessage} className="text-orange-400 fa-2x" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm text-gray-500">
                            {c.datetime} / {c.storeName} / {c.staffName}
                          </div>
                          <p className="mt-1">{c.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">購入情報が見つかりません</p>
                <p className="text-sm text-gray-600 mt-2">購入ID: {purchaseId}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
