'use client';
import { TimelineItem } from '@/mocks/timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useState, useMemo } from 'react';
import { TimelineFilterBar } from '@/components/FilterBar';

type Props = {
  items: Extract<TimelineItem, { type: 'reservation' }>[];
  itemsPerPage?: number;
};

export function ReservationTab({ items, itemsPerPage = 5 }: Props) {
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [fromDay, setFromDay] = useState<number | ''>('');
  const [toDay, setToDay] = useState<number | ''>('');
  const [onlyWithComment, setOnlyWithComment] = useState(false);
  const [selectedCarName, setSelectedCarName] = useState('');

  const [showPast, setShowPast] = useState(false);

  const septemberDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const carNameOptions = useMemo(() => Array.from(new Set(items.map((i) => i.car_name).filter(Boolean))), [items]);

  const parseDotDate = (s?: string): Date | null => {
    if (!s) return null;
    const m = s.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    if (!m) return null;
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  };

  const formatJapaneseDate = (s?: string) => {
    const d = parseDotDate(s);
    if (!d) return s;

    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastReservation = (date?: string) => {
    const d = parseDotDate(date);
    if (!d) return false;

    d.setHours(0, 0, 0, 0);
    return d < today;
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

    if (!showPast) {
      list = list.filter((item) => {
        const d = parseDotDate(item.date);
        if (!d) return false;

        d.setHours(0, 0, 0, 0);
        return d >= today;
      });
    }

    return list;
  }, [items, onlyWithComment, searchKeyword, fromDay, toDay, selectedCarName, showPast]);

  if (items.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-500">予約がありません</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
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
        <div className="flex items-center p-4 border-b-2">
          <h2 className="text-xl font-semibold mb-4">予約一覧</h2>
        </div>
        <p className="p-2">ご予約が完了してから予約一覧に反映されるまで1分ほど時間がかかります。</p>
        <div className="flex items-center p-4 border-b-1 border-gray-300">
          <h2 className="text-xl font-semibold mb-4">買取予約</h2>
        </div>
        <div className="flex justify-center mb-4">
          <div className="inline-flex  p-1 justify-center gap-2 mb-4 mt-4 rounded border border-gray-300">
            <button
              onClick={() => setShowPast(false)}
              className={`px-4 py-2 rounded border whitespace-nowrap
      ${!showPast ? 'bg-black text-white text-sm' : 'bg-white text-gray-700 text-sm border-none'}
    `}
            >
              本日以降の予約のみ
            </button>

            <button
              onClick={() => setShowPast(true)}
              className={`px-4 py-2 rounded border whitespace-nowrap
      ${showPast ? 'bg-black text-white text-sm' : 'bg-white text-gray-700 text-sm border-none'}
    `}
            >
              過去の予約も含む
            </button>
          </div>
        </div>

        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col gap-3 py-4 border-b border-gray-300

    ${isPastReservation(item.date) ? 'bg-gray-100' : 'bg-white'}
  `}
          >
            {/* ===== 日付 & 作業内容 ===== */}
            <div className="md:w-40  md:mt-3 pl-2">
              <p className="text-sm">
                <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                {formatJapaneseDate(item.date)} {item.time}
              </p>
              <div className="flex flex-col md:gap-3 text-sm mt-1">
                <span className="font-bold">作業内容</span>
                <span>{item.content}</span>
              </div>
            </div>

            {/* ===== 店舗 ===== */}
            <div className="pl-2 md:w-12" />
            <div className="w-24">
              <span className="text-sm font-bold">予約店舗</span>
            </div>

            <div className="mr-6">
              <p className="text-sm text-blue-500">{item.store_name}</p>
            </div>

            {/* ===== ボタン ===== */}
            <div className="pl-2">
              <button className="text-sm px-5 py-2 md:text-md rounded bg-blue-700 text-white">予約詳細</button>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* ページネーション表示のみ */}
          <button className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">前へ</button>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded bg-black text-white cursor-not-allowed">1</button>
          </div>

          <button className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">次へ</button>
        </div>
        <div className="flex items-center p-4 border-b-1 border-gray-300">
          <h2 className="text-xl font-semibold mb-4">UPPIT(持込取付予約)</h2>
        </div>
        <div className="flex justify-center mb-4">
          <div className="inline-flex  p-1 justify-center gap-2 mb-4 mt-4 rounded border border-gray-300">
            <button
              onClick={() => setShowPast(false)}
              className={`px-4 py-2 rounded border whitespace-nowrap
      ${!showPast ? 'bg-black text-white text-sm' : 'bg-white text-gray-700 text-sm border-none'}
    `}
            >
              本日以降の予約のみ
            </button>

            <button
              onClick={() => setShowPast(true)}
              className={`px-4 py-2 rounded border whitespace-nowrap
      ${showPast ? 'bg-black text-white text-sm' : 'bg-white text-gray-700 text-sm border-none'}
    `}
            >
              過去の予約も含む
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
