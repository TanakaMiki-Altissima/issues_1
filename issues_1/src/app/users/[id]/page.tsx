'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserDetailsSide } from '@/components/layout/UserDetailsSide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHouse, faComment, faStar, faWrench, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faClock, faChartBar } from '@fortawesome/free-regular-svg-icons';

import { mockTimeline } from '@/mocks/timeline';

export default function UserDetailsPage() {
  
  const [activeTab, setActiveTab] = useState('top');

  const params = useParams<{ id: string }>();
  const customerId = params.id;

  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [fromDay, setFromDay] = useState<number | ''>('');
  const [toDay, setToDay] = useState<number | ''>('');

  const parseDotDate = (s: string): Date | null => {
    const m = s.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    if (!m) return null;
    const y = Number(m[1]);
    const mo = Number(m[2]) - 1;
    const d = Number(m[3]);
    return new Date(y, mo, d);
  };

  const septemberDays = Array.from({ length: 30 }, (_, i) => i + 1);

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
    const isActive = activeTab === tab.id;
    const baseStyles = 'w-60 px-6 py-4 transition-colors';

    if (isActive) {
      return `${baseStyles} bg-${tab.color}-300 text-${tab.color}-900`;
    }

    return `${baseStyles} bg-${tab.color}-100 hover:bg-white hover:text-${tab.color}-700`;
  };

  const tabColorMap = {
    blue: 'bg-blue-100',
    red: 'bg-red-100',
    yellow: 'bg-yellow-100',
    green: 'bg-green-100',
    gray: 'bg-gray-100',
  } as const;

  const [onlyWithComment, setOnlyWithComment] = useState(false);

  const [selectedCarName, setSelectedCarName] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTimeline = useMemo(() => {
    let list = mockTimeline;

    list = list.filter((item) => item.ownerId === customerId);

    // 「メモ付きのみ」にチェックが入っている場合
    if (onlyWithComment) {
      list = list.filter((item) => 'comment' in item && item.comment);
    }

    if (searchKeyword.trim() !== '') {
      list = list.filter((item) => 'title' in item && item.title.toLowerCase().includes(searchKeyword.toLowerCase()));
    }

    if (fromDay || toDay) {
      list = list.filter((item) => {
        const d = parseDotDate(item.date);
        if (!d) return false;

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
  }, [customerId, mockTimeline, activeTab, onlyWithComment, searchKeyword, fromDay, toDay, selectedCarName]);

  const carNameOptions = useMemo(() => {
    return Array.from(
      new Set(mockTimeline.map((item) => item.car_name).filter((name): name is string => !!name && name.trim() !== '')),
    );
  }, [mockTimeline]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredTimeline.length / itemsPerPage));
  }, [filteredTimeline.length, itemsPerPage]);

  const paginatedTimeline = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTimeline.slice(start, start + itemsPerPage);
  }, [filteredTimeline, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1">
          <div className="flex flex-1">
            <UserDetailsSide />
          </ div>

          {/* ===== 右カラム ===== */}
          <div className="flex-1 ml-6">
            <div className="flex gap-1 font-semibold">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
        w-60 px-6 py-4
        ${isActive ? 'bg-white text-' + tab.color + '-700' : 'bg-' + tab.color + '-100'}
        relative
      `}
                  >
                    {isActive && (
                      <span
                        className={`
            absolute top-0 left-0
            h-[4px] w-full
            ${tabColorMap[tab.color]}
          `}
                      />
                    )}

                    <FontAwesomeIcon icon={tab.icon} />
                    <br />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* タブコンテンツ */}
            <div className="mt-6">

              <div className="flex items-center p-4 border-b-2 border-gray-300">
                <h2 className="text-xl font-semibold mb-6">取引履歴</h2>
              </div>
              <div className="flex items-center p-4 border-b border-gray-300">
                
                {/* ===== 左：キーワード検索 ===== */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      placeholder="キーワードで検索"
                      value={inputKeyword}
                      onChange={(e) => setInputKeyword(e.target.value)}
                      className="w-[280px] pl-9 pr-2 py-2 rounded bg-gray-100 text-gray-600 outline-none"
                    />
                  </div>

                  <button
                    className="px-5 py-2 rounded bg-blue-700 text-white"
                    onClick={() => setSearchKeyword(inputKeyword)}
                  >
                    検索
                  </button>
                </div>

                {/* ===== 中央：日付絞り込み ===== */}
                <div className="flex items-center gap-2 mx-auto">
                  <select
                    value={fromDay}
                    onChange={(e) => setFromDay(e.target.value ? Number(e.target.value) : '')}
                    className="w-[140px] px-3 py-2 border border-gray-300 rounded bg-white text-sm"
                  >
                    <option value=""></option>
                    {septemberDays.map((day) => (
                      <option key={day} value={day}>
                        9月{day}日
                      </option>
                    ))}
                  </select>

                  <span>〜</span>

                  <select
                    value={toDay}
                    onChange={(e) => setToDay(e.target.value ? Number(e.target.value) : '')}
                    className="w-[140px] px-3 py-2 border border-gray-300 rounded bg-white text-sm"
                  >
                    <option value=""></option>
                    {septemberDays.map((day) => (
                      <option key={day} value={day}>
                        9月{day}日
                      </option>
                    ))}
                  </select>
                </div>

                {/* ===== 右：登録車 ===== */}
                <div className="flex items-center gap-6 ml-auto">
                  <select
                    value={selectedCarName}
                    onChange={(e) => setSelectedCarName(e.target.value)}
                    className="w-[220px] px-3 py-2 border border-gray-300 rounded bg-white text-sm"
                  >
                    <option value="">登録車から絞り込む</option>
                    {carNameOptions.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 border-b border-gray-300">
                <p className="text-sm text-gray-700">{filteredTimeline.length} 件</p>

              <div className="flex items-center gap-6 ml-auto">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyWithComment}
                    onChange={(e) => setOnlyWithComment(e.target.checked)}
                    className="w-4 h-4"
                  />
                  メモ付きのみ
                </label>
                </div>
              </div>

              {/* タブ別コンテンツ */}
              {activeTab === 'top' && (
                <div className="p-4">
                  

                  <div className="space-y-3">
                    {paginatedTimeline.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-300">
                        {/* ===== 左：画像 ===== */}
                        <div className="relative w-14 h-14 flex-shrink-0">
                          <img src="/car_white.png" alt="gazou" className="w-full h-full object-contain bg-blue-100" />

                          {/* コメントありアイコン */}
                          {'comment' in item && item.comment && (
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
                          {item.type === 'purchase' && (
                            <span className="bg-yellow-100 text-sm font-medium">購入履歴</span>
                          )}
                          {item.type === 'work' && <span className="bg-gray-100 text-sm font-medium">作業履歴</span>}
                          {item.type === 'inspection' && (
                            <span className="bg-green-100 text-sm font-medium">査定履歴</span>
                          )}
                          {item.type === 'reservation' && (
                            <span className="bg-gray-100 text-sm font-medium">作業予約</span>
                          )}
                          {item.type === 'consideration' && (
                            <span className="bg-yellow-100 text-sm font-medium">検討中パーツ</span>
                          )}
                        </div>

                        {/* ===== タイトル ===== */}
                        <div className="flex-1">{'title' in item && <p className="font-medium">{item.title}</p>}</div>

                        {/* ===== 右端：価格 / 店舗 ===== */}
                        {'price' in item && (
                          <div className="flex items-center gap-3 whitespace-nowrap">
                            {/* 金額 */}
                            <p className="text-gray-500">¥{item.price}</p>

                            {/* 店舗名 + ＞ */}
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span>{item.store_name}</span>
                              <span className="text-gray-400 ">＞</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
                      : 'border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  前へ
                </button>

                {/* ページ番号（全文字表示） */}
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`px-3 py-1 rounded ${
                        currentPage === p
                          ? 'bg-black text-white'
                          : 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
                      : 'border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  次へ
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
