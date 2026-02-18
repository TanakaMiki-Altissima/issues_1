'use client';
import { TimelineItem } from '@/mocks/timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useState, useMemo, useEffect } from 'react';
import { Pagination } from '@/components/layout/Pagination';
import { TimelineFilterBar } from '@/components/FilterBar';
import Link from 'next/link';

type Props = {
  items: Extract<TimelineItem, { type: 'purchase' }>[];
  itemsPerPage?: number;
};

export function PurchaseHistoryTab({ items, itemsPerPage = 5 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [fromDay, setFromDay] = useState<number | ''>('');
  const [toDay, setToDay] = useState<number | ''>('');
  const [onlyWithComment, setOnlyWithComment] = useState(false);
  const [selectedCarName, setSelectedCarName] = useState('');

  const septemberDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const carNameOptions = useMemo(() => Array.from(new Set(items.map((i) => i.car_name).filter(Boolean))), [items]);

  const parseDotDate = (s?: string): Date | null => {
    if (!s) return null;
    const m = s.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  };

  // フィルタリングされたアイテムを計算
  const filteredItems = useMemo(() => {
    let list = items;

    if (onlyWithComment) {
      list = list.filter((item) => Array.isArray(item.comments) && item.comments.length > 0);
    }

    if (searchKeyword) {
      list = list.filter((item) => item.title?.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    if (searchKeyword.trim() !== '') {
      list = list.filter((item) => 'title' in item && item.title.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    if (fromDay || toDay) {
      list = list.filter((item) => {
        const d = parseDotDate(item.date);
        if (!d) return false;

        if (d.getMonth() !== 8) return false;

        // 2022年9月の日付として固定
        const day = d.getDate();

        if (fromDay && day < fromDay) return false;
        if (toDay && day > toDay) return false;

        return true;
      });
    }

    if (selectedCarName) {
      list = list.filter((item) => item.car_name === selectedCarName);
    }

    return list;
  }, [items, onlyWithComment, searchKeyword, fromDay, toDay, selectedCarName]);

  // 総ページ数を計算（フィルタリング後のアイテム数で計算）
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  }, [filteredItems.length, itemsPerPage]);

  // 現在のページに表示するアイテムを計算（フィルタリング後のアイテムから計算）
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  // フィルタが変更されたときにページを1に戻す
  useEffect(() => {
    setCurrentPage(1);
  }, [onlyWithComment, searchKeyword]);

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

        {paginatedItems.map((item) => {
          const getHref = () => {
            if (item.type === 'purchase') return `/purchase/${item.id}`;
            return null;
          };
          const href = getHref();

          const Wrapper = ({ children }: { children: React.ReactNode }) =>
            href ? (
              <Link
                href={href}
                className="flex flex-col md:flex-row md:items-center gap-4 py-3
                                         border-b border-gray-300
                                         cursor-pointer transition-colors"
              >
                {children}
              </Link>
            ) : (
              <div
                className="flex flex-col md:flex-row md:items-center gap-4 py-3
                                         border-b border-gray-300"
              >
                {children}
              </div>
            );

          return (
            <Wrapper key={item.id}>
              {/* ===== 左：画像 ===== */}
              <div className="relative w-14 h-14 flex-shrink-0">
                <img src="/car_white.png" alt="gazou" className="w-full h-full object-contain bg-blue-100" />

                {/* コメントありアイコン */}
                {item.comments && item.comments.length > 0 && (
                  <FontAwesomeIcon icon={faMessage} className="absolute -top-3 -right-3 text-orange-400 fa-2x" />
                )}
              </div>

              {/* ===== 日付 & 車種 ===== */}
              <div className="md:w-40">
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
              <div className="md:flex-1">{'title' in item && <p className="font-medium">{item.title}</p>}</div>

              {/* ===== 右端：価格 / 店舗 ===== */}
              {'price' in item && (
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  {/* 金額 */}
                  <p className="text-gray-500">¥{item.price}</p>

                  {/* 店舗名 + ＞ */}
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>{item.store_name}</span>

                    <span className="text-gray-500">＞</span>
                  </div>
                </div>
              )}
            </Wrapper>
          );
        })}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
