'use client';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserDetailsSide } from '@/components/layout/UserDetailsSide';
import { mockPurchases } from '@/mocks/purchases';

export default function PurchaseDetailPage() {
  const params = useParams<{ id: string }>();
  const purchaseId = params.id;

  const purchase = mockPurchases.find((p) => p.id === purchaseId);

  const customerId = purchase?.ownerId;

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
          <div className="p-6 flex-1 ">
            <div className="border-b-2 border-gray-400">
              <h1 className="text-xl font-bold mb-4">購入履歴</h1>
            </div>

            {purchase ? (
              <div className="space-y-4">
                <div className="">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-1">画像</p>
                      {purchase.image && (
                        <img src={`/${purchase.image}`} alt={purchase.car_name} className="w-15 h-15 object-contain" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">日付</p>
                      <p className="font-medium">{purchase.date}</p>
                    </div>
                    {purchase.car_name && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">取付車</p>
                        <p className="font-medium">{purchase.car_name}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500 mb-1">店舗</p>
                      <p className="font-medium">{purchase.store_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">管理番号</p>
                      <p className="font-medium">{purchaseId}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-1">商品名</p>
                      <p className="font-medium">{purchase.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 ">価格</p>
                      <p className="font-medium text-lg text-blue-500">¥{purchase.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">商品URL</p>
                      <p className="font-medium text-lg text-blue-500">{purchase.url}</p>
                    </div>
                    {purchase.car_name && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">取付車</p>
                        <p className="font-medium">{purchase.car_name}</p>
                      </div>
                    )}
                    {purchase.comment && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500 mb-1">管理コメント</p>
                        <p className="font-medium">{purchase.comment}</p>
                      </div>
                    )}
                  </div>
                </div>
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
