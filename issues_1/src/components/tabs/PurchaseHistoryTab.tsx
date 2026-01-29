'use client';
import { TimelineItem } from '@/mocks/timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useState, useMemo } from 'react';
import { Pagination } from '@/components/layout/Pagination';
import { TimelineFilterBar } from '@/components/FilterBar';
import Link from 'next/link';

type Props = {
  items: Extract<TimelineItem, { type: 'purchase' }>[];
  itemsPerPage?: number;
};

export function PurchaseHistoryTab({ items, itemsPerPage = 5 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  // 総ページ数を計算
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / itemsPerPage));
  }, [items.length, itemsPerPage]);

  // 現在のページに表示するアイテムを計算
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  if (items.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-500">購入履歴がありません</p>
      </div>
    );
  }

  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [fromDay, setFromDay] = useState<number | ''>('');
  const [toDay, setToDay] = useState<number | ''>('');
  const [onlyWithComment, setOnlyWithComment] = useState(false);
  const [selectedCarName, setSelectedCarName] = useState('');

  const septemberDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const carNameOptions = useMemo(() => Array.from(new Set(items.map((i) => i.car_name).filter(Boolean))), [items]);

  const filteredItems = useMemo(() => {
    let list = items;

    if (onlyWithComment) {
      list = list.filter((item) => Array.isArray((item as any).comments) && item.comment.length > 0);
    }

    if (searchKeyword) {
      list = list.filter((item) => item.title?.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    return list;
  }, [items, onlyWithComment, searchKeyword]);

  return (
    <div className="p-4">
      <div className="space-y-3">
        <TimelineFilterBar
          inputKeyword={inputKeyword}
          onInputKeywordChange={setInputKeyword}
          onSearch={() => setSearchKeyword(inputKeyword)}
          fromDay={fromDay}
          toDay={toDay}
          onFromDayChange={setFromDay}
          onToDayChange={setToDay}
          days={septemberDays}
          selectedCarName={selectedCarName}
          carNameOptions={carNameOptions}
          onCarChange={setSelectedCarName}
          totalCount={filteredItems.length}
          onlyWithComment={onlyWithComment}
          onOnlyWithCommentChange={setOnlyWithComment}
        />
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-300">
            {/* ===== 左:画像 ===== */}
            <div className="relative w-14 h-14 flex-shrink-0">
              <img src="/car_white.png" alt="gazou" className="w-full h-full object-contain bg-blue-100" />

              {/* コメントありアイコン */}
              {item.comment && (
                <FontAwesomeIcon icon={faMessage} className="absolute -top-4 -right-4 text-orange-400 fa-2x" />
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

                <Link href={`/purchase/${item.id}`} className="text-gray-400 hover:text-gray-600">
                  ＞
                </Link>
              </div>
            </div>
          </div>
        ))}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
