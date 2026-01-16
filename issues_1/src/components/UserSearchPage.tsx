'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { OpenSidebar } from './OpenSidebar';
import { AllMenu } from './AllMenu';
import { mockCustomers } from '@/mocks/customers';

type MenuKey = 'purchase' | 'stock' | 'customer';

export function UserSearchPage() {
  const [hoveredMenu, setHoveredMenu] = useState<MenuKey | null>(null);
  const [isAllMenuVisible, setIsAllMenuVisible] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState<MenuKey[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleToggleClick = () => {
    setIsAllMenuVisible((prev) => !prev);
    setHoveredMenu(null);

    if (!isAllMenuVisible) {
      setSelectedMenus(['purchase', 'stock', 'customer']);
    } else {
      setSelectedMenus([]);
    }
  };

  const handleClose = () => {
    setIsAllMenuVisible(false);
  };

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

  return (
    <div className="h-screen flex flex-col">
      {/* ================= Header ================= */}
        <div className="h-screen flex flex-col">
  <Header />
</div>
      {/* ================= Content ================= */}
      <div className="flex flex-1 relative">
        {/* ================= Sidebar ================= */}
           <div className="flex flex-1 relative">
    <Sidebar />

        {/* ================= All Menu ================= */}
        {isAllMenuVisible && <AllMenu onClose={() => handleClose()} />}

        {/* ================= Hover Sidebar ================= */}
        {!isAllMenuVisible && hoveredMenu && (
          <OpenSidebar
            menu={hoveredMenu}
            onMouseEnter={() => setHoveredMenu(hoveredMenu)}
            onMouseLeave={() => setHoveredMenu(null)}
          />
        )}

        {/* ================= Main ================= */}
        <main className="flex-1 flex justify-center items-center relative">
          <div>
            {/* Search */}
            <div className="flex items-center gap-4">
              <p className="font-medium">顧客情報の検索</p>

              <div className="relative">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                />

                <input
                  placeholder="キーワード・電話番号で検索"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="
                    w-[280px]
                    pl-9 pr-2 py-2
                    rounded
                    bg-gray-100
                    text-gray-600
                    outline-none
                    "
                />
              </div>

              <button onClick={handleSearch} className="px-5 py-2 rounded bg-blue-700 text-white">
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
  );
}

/* ================= Menu Button ================= */

function MenuButton({ title, onHover }: { title: string; onHover: () => void }) {
  return (
    <div onMouseEnter={onHover} className="flex flex-col items-center cursor-pointer">
      <div className="w-[49px] h-[49px] flex items-center justify-center border border-gray-300">
        <h3 className="text-sm text-center leading-tight p-2">{title}</h3>
      </div>
    </div>
  );
}
