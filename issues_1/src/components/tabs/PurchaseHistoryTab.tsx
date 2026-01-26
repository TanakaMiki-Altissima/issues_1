'use client';
import { TimelineItem } from '@/mocks/timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

type Props = {
  items: Extract<TimelineItem, { type: 'purchase' }>[];
};

export function PurchaseHistoryTab({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-500">購入履歴がありません</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-300">
            {/* ===== 左:画像 ===== */}
            <div className="relative w-14 h-14 flex-shrink-0">
              <img src="/car_white.png" alt="gazou" className="w-full h-full object-contain bg-blue-100" />
              
              {/* コメントありアイコン */}
              {item.comment && (
                <FontAwesomeIcon
                  icon={faMessage}
                  className="absolute -top-4 -right-4 text-orange-400 fa-2x"
                />
              )}
            </div>

            {/* ===== 日付 & 車種 ===== */}
            <div className="w-40">
              <p className="text-sm text-gray-500">{item.date}</p>
              {item.car_name ? (
                <p className="text-sm text-gray-800">{item.car_name}</p>
              ) : (
                <p className="text-sm text-red-600">未設定</p>
              )}
            </div>

            {/* ===== 履歴種別 ===== */}
            <div className="w-24">
              <span className="bg-yellow-100 text-sm font-medium">購入履歴</span>
            </div>

            {/* ===== タイトル ===== */}
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
            </div>

            {/* ===== 右端:価格 / 店舗 ===== */}
            <div className="flex items-center gap-3 whitespace-nowrap">
              {/* 金額 */}
              <p className="text-gray-500">¥{item.price}</p>

              {/* 店舗名 + ＞ */}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>{item.store_name}</span>
                <span className="text-gray-400">＞</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}