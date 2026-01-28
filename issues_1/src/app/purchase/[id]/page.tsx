'use client';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserDetailsSide } from '@/components/layout/UserDetailsSide';
import { mockPurchases } from '@/mocks/purchases';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faMessage } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';

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
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0">
                      {purchase.image && (
                        <img src={`/${purchase.image}`} alt={purchase.car_name} className="w-15 h-15 object-contain" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
  <span className="text-sm text-gray-500">{purchase.date}/</span>
  <span className="text-sm text-gray-500">{purchase.car_name}</span>
</div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{purchase.store_name}</p>
                    </div>
                    <div>
                      <p className="text-sm mb-1">{purchaseId}</p>
                    </div>
            </div>

<div className="flex items-center gap-8 border-b-1 border-gray-400 p-2">
    <div>
      <p className="font-medium">{purchase.title}</p>
    </div>

    <div className="ml-auto">
      <p className="font-medium text-lg text-blue-500">
        ¥{purchase.price}
      </p>
    </div>
</div>
                    <div className="border-b-1 border-gray-400 flex p-2">
                      <p className="text-sm text-gray-500 w-115 flex-shrink-0">メモ</p>

  {/* 中央配置用ラッパー */}
  <div className="flex-1 flex justify-center">
    {/* 実体（背景を右端まで） */}
    <p className="w-full bg-gray-100 text-lg text-left p-2 lex-1  rounded">
      {purchase.memo}
    </p>
  </div>
  </div>
                    <div className="border-b-1 border-gray-400 flex p-2">
                      <p className="text-sm text-gray-500 w-115 flex-shrink-0">商品URL</p>
                      <p className="font-medium text-lg text-blue-500 break-all">{purchase.url}</p>
                    </div>
                    {purchase.car_name && (
                      <div className="border-b-1 border-gray-400 flex p-2">
                        <p className="text-sm text-gray-500 w-115 flex-shrink-0">取付車</p>
                        <p className="font-medium break-all">{purchase.car_name}</p>
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-4 py-6 border-b-1 border-gray-400">
  <button className="text-blue-500 hover:underline text-sm text-left">
    <FontAwesomeIcon icon={faPencil} />
    購入履歴を編集する
  </button>

  <button className="text-red-500 hover:underline text-sm text-left">
    削除する
  </button>

  <button className="text-blue-500 hover:underline text-sm text-left">
    ＜ 戻る
  </button>
</div>

                    {purchase.comments && (
                      <div className="col-span-2">
                        <div className="border-b-1 border-gray-400">
                        <p className="text-xl font-bold mb-4">管理コメント</p>
                        </div>
                        <div className="flex gap-4 m-2">
                            <div className="bg-gray-100 rounded fa-3x">
                            <FontAwesomeIcon icon={faImage} />
                        </div>
                        <div className="bg-gray-100 w-[280px] rounded">
                            <input
                      placeholder="コメントを追加する練馬店:後藤高志"
                    />
                        </div>
                        </div>
                        
                        
                        <FontAwesomeIcon
                              icon={faMessage}
                              className="text-orange-400 fa-2x"
                            />
                        {purchase.comments?.map((c) => (
  <div key={c.id} className="border-b py-2">
    <div className="text-sm text-gray-500">
      {c.datetime} / {c.storeName} / {c.staffName}
    </div>
    <p className="mt-1">{c.body}</p>
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
