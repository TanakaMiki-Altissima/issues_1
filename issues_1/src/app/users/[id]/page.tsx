'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserDetailsSide } from '@/components/layout/UserDetailsSide';
import { TimelineFilterBar } from '@/components/FilterBar';
import { Tabs } from '@/components/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faComment, faStar, faWrench, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faClock, faChartBar } from '@fortawesome/free-regular-svg-icons';
import { Pagination } from '@/components/layout/Pagination';
import { PurchaseHistoryTab } from '@/components/tabs/PurchaseHistoryTab';
import { ReservationTab } from '@/components/tabs/ReservationTab';
import { mockTimeline } from '@/mocks/timeline';
import Link from 'next/link';

function hasComments(item: unknown): item is { comments: { id: string }[] } {
  return typeof item === 'object' && item !== null && 'comments' in item && Array.isArray((item as any).comments);
}

export default function UserDetailsPage() {
  const [activeTab, setActiveTab] = useState('top');

  const params = useParams<{ id: string }>();
  const customerId = params.id;

  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const [fromDay, setFromDay] = useState<number | ''>('');
  const [toDay, setToDay] = useState<number | ''>('');

  const pathname = usePathname();

  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  // ★ sessionStorageから削除IDを読み込む
  useEffect(() => {
    const deletedId = sessionStorage.getItem('deletedPurchaseId');

    if (deletedId) {
      setDeletedIds(new Set([deletedId]));
      sessionStorage.removeItem('deletedPurchaseId');
    }
  }, [pathname]);

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
    { id: 'reservation', label: '作業予約', color: 'purple', icon: faWrench },
    { id: 'work', label: '作業履歴', color: 'purple', icon: faClock },
  ] as const;

  const [onlyWithComment, setOnlyWithComment] = useState(false);

  const [selectedCarName, setSelectedCarName] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTimeline = useMemo(() => {
    let list = mockTimeline;

    // ★ 削除されたIDを除外
    list = list.filter((item) => !deletedIds.has(item.id));

    list = list.filter((item) => item.ownerId === customerId);

    // 「メモ付きのみ」にチェックが入っている場合
    if (onlyWithComment) {
      list = list.filter((item) => 'comments' in item && Array.isArray(item.comments) && item.comments.length > 0);
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
  }, [
    customerId,
    mockTimeline,
    activeTab,
    onlyWithComment,
    searchKeyword,
    fromDay,
    toDay,
    selectedCarName,
    deletedIds,
  ]);

  const carNameOptions = useMemo(() => {
    return Array.from(
      new Set(mockTimeline.map((item) => item.car_name).filter((name): name is string => !!name && name.trim() !== '')),
    );
  }, [mockTimeline]);

  const paginatedTimeline = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTimeline.slice(start, start + itemsPerPage);
  }, [filteredTimeline, currentPage, itemsPerPage]);

  const purchaseTimeline = useMemo(() => {
    return filteredTimeline.filter((item) => item.type === 'purchase');
  }, [filteredTimeline]);

  const reservationTimeline = useMemo(() => {
    return filteredTimeline.filter((item) => item.type === 'reservation');
  }, [filteredTimeline]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredTimeline.length / itemsPerPage));
  }, [filteredTimeline.length, itemsPerPage]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredTimeline.length / itemsPerPage));

    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [filteredTimeline.length, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* PC専用 Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex flex-1 overflow-hidden">
          <div className="hidden md:block">
            <UserDetailsSide customerId={customerId} />
          </div>

          {/* ===== 右カラム ===== */}
          <div className="flex-1 md:ml-6 min-w-0 overflow-x-hidden">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

            {/* タブ別コンテンツ */}
            <div className="md:mt-6">
              {activeTab === 'top' && (
                <>
                  <div className="flex items-center p-4 border-b-2 border-gray-300">
                    <h2 className="text-xl font-semibold md:mb-6">取引履歴</h2>
                  </div>

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
                    totalCount={filteredTimeline.length}
                    onlyWithComment={onlyWithComment}
                    onOnlyWithCommentChange={setOnlyWithComment}
                  />

                  <div className="p-4">
                    <div className="space-y-3">
                      {paginatedTimeline.map((item) => {
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
                              <img
                                src="/car_white.png"
                                alt="gazou"
                                className="w-full h-full object-contain bg-blue-100"
                              />

                              {/* コメントありアイコン */}
                              {hasComments(item) && item.comments.length > 0 && (
                                <FontAwesomeIcon
                                  icon={faMessage}
                                  className="absolute -top-4 -right-4 text-orange-400 fa-2x"
                                />
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
                            <div className="md:w-24">
                              {item.type === 'purchase' && (
                                <span className="bg-yellow-100 text-sm font-medium">購入履歴</span>
                              )}
                              {item.type === 'work' && (
                                <span className="bg-purple-100 text-sm font-medium">作業履歴</span>
                              )}
                              {item.type === 'inspection' && (
                                <span className="bg-green-100 text-sm font-medium">査定履歴</span>
                              )}
                              {item.type === 'reservation' && (
                                <span className="bg-purple-100 text-sm font-medium">作業予約</span>
                              )}
                              {item.type === 'consideration' && (
                                <span className="bg-yellow-100 text-sm font-medium">検討中パーツ</span>
                              )}
                            </div>

                            {/* ===== タイトル ===== */}
                            <div className="md:flex-1">
                              {'title' in item && <p className="font-medium">{item.title}</p>}
                            </div>

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
                </>
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

              {activeTab === 'purchase' && <PurchaseHistoryTab items={purchaseTimeline} />}

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

              {activeTab === 'reservation' && <ReservationTab items={reservationTimeline} />}

              {activeTab === 'work' && (
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-4">作業履歴</h2>
                  <p>作業履歴内容</p>
                </div>
              )}
            </div>

            {/* モバイル用（下部固定） */}
            <div className="md:hidden w-full bg-white  mt-4 border-t border-gray-300 z-40">
              <UserDetailsSide customerId={customerId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
