'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { mockCustomers } from '@/mocks/customers';
import { useRouter } from 'next/navigation';

export function UserSearchPage() {
  const [showResult, setShowResult] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);

  const handleSearch = () => {
    const keyword = searchKeyword.trim();

    const result = mockCustomers.filter((customer) => {
      return (
        customer.name.includes(keyword) ||
        customer.phone.includes(keyword) ||
        customer.address.includes(keyword) ||
        customer.crooooberId.includes(keyword)
      );
    });

    setFilteredCustomers(result);
    setShowResult(true);
    setSelectedCustomerId(null);
  };

  const router = useRouter();

  return (
    <div className="h-screen flex flex-col">
      {/* ================= Header ================= */}
      <Header />
      {/* ================= Content ================= */}
      <div className="flex flex-1 relative">
        {/* ================= Sidebar ================= */}
        <div className="flex flex-1 relative">
          <Sidebar />
          {/* ================= Main ================= */}
          <main className="flex-1 flex justify-center items-center relative px-4 md:px-0">
            <div className="w-full max-w-4xl">
              {/* Search */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                <p className="font-medium md:hidden">顧客情報の検索</p>

                {/* PC用タイトル */}
                <p className="hidden md:block font-medium">顧客情報の検索</p>

                <div className="relative w-full md:w-auto">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    placeholder="キーワード・電話番号で検索"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="
                    w-full md:w-[280px]
                    pl-9 pr-2 py-2
                    rounded
                    bg-gray-100
                    text-gray-600
                    outline-none
                    "
                  />
                </div>

                <button
                  onClick={handleSearch}
                  className="w-20 md:w-auto px-2 py-1.5 text-sm md:px-5 md:py-2 md:text-base rounded bg-blue-700 text-white"
                >
                  検索
                </button>
              </div>

              {/* Customers */}
              {showResult && (
                <div className="mt-8 w-[800px] bg-blue-100 rounded">
                  <div className="grid grid-cols-[160px_160px_200px_1fr] px-4 py-3 font-semibold">
                    <div>Croooober ID</div>
                    <div>氏名</div>
                    <div>電話番号</div>
                    <div>住所</div>
                  </div>

                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.crooooberId}
                      onClick={() => setSelectedCustomerId(customer.crooooberId)}
                      className={`
                      grid grid-cols-[160px_160px_200px_1fr]
                      px-4 py-3 cursor-pointer bg-white border-b border-gray-300
                      ${selectedCustomerId === customer.crooooberId ? 'bg-blue-50' : 'hover:bg-gray-50'}
                    `}
                    >
                      <div>{customer.crooooberId}</div>
                      <div>{customer.name}</div>
                      <div>{customer.phone}</div>
                      <div>{customer.address}</div>
                    </div>
                  ))}
                </div>
              )}

              {showResult && (
                <div className="mt-6 flex gap-6 justify-center">
                  {/* 戻る */}
                  <button
                    onClick={() => {
                      setShowResult(false);
                      setSelectedCustomerId(null);
                    }}
                    className="
                    w-48
                    px-6 py-2
                    rounded
                    bg-white
                    text-blue-700
                    border border-blue-700
                    hover:bg-blue-50
                  "
                  >
                    戻る
                  </button>

                  {/* 決定 */}
                  <button
                    disabled={!selectedCustomerId}
                    onClick={() => {
                      if (!selectedCustomerId) return;
                      router.push(`/users/${selectedCustomerId}`);
                    }}
                    className="
                    w-48
                    px-6 py-2
                    rounded
                    bg-blue-700
                    text-white
                    hover:bg-blue-800
                    disabled:cursor-not-allowed
                  "
                  >
                    決定
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
