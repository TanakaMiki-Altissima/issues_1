'use client';

import { useState } from 'react';
import { AllMenu } from '@/components/layout/AllMenu';
import { OpenSidebar } from '@/components/layout/OpenSidebar';

type MenuKey = 'purchase' | 'stock' | 'customer';

export function Sidebar() {
  const [hoveredMenu, setHoveredMenu] = useState<MenuKey | null>(null);
  const [isAllMenuVisible, setIsAllMenuVisible] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState<MenuKey[]>([]);

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

  return (
    <>
      {/* ================= Sidebar ================= */}
      <aside
        className="w-[49px] border-r border-gray-300 flex flex-col items-center"
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <button
          onClick={handleToggleClick}
          className="my-2 text-[18px] text-blue-700 cursor-pointer"
        >
          ＞
        </button>

        <MenuButton title="買取査定" onHover={() => setHoveredMenu('purchase')} />
        <MenuButton title="入庫" onHover={() => setHoveredMenu('stock')} />
        <MenuButton title="顧客情報" onHover={() => setHoveredMenu('customer')} />
      </aside>

      {/* ================= All Menu ================= */}
      {isAllMenuVisible && <AllMenu onClose={handleClose} />}

      {/* ================= Hover Sidebar ================= */}
      {!isAllMenuVisible && hoveredMenu && (
        <OpenSidebar
          menu={hoveredMenu}
          onMouseEnter={() => setHoveredMenu(hoveredMenu)}
          onMouseLeave={() => setHoveredMenu(null)}
        />
      )}
    </>
  );
}

/* ================= Menu Button ================= */

function MenuButton({
  title,
  onHover,
}: {
  title: string;
  onHover: () => void;
}) {
  return (
    <div onMouseEnter={onHover} className="flex flex-col items-center cursor-pointer">
      <div className="w-[49px] h-[49px] flex items-center justify-center border border-gray-300">
        <h3 className="text-sm text-center leading-tight p-2">
          {title}
        </h3>
      </div>
    </div>
  );
}
