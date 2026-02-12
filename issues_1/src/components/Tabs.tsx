'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type Tab = {
  id: string;
  label: string;
  color: string;
  icon: IconDefinition;
};

type Props = {
  tabs: readonly Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
};

const tabColorMap: Record<string, string> = {
  blue: 'bg-blue-100',
  red: 'bg-red-100',
  yellow: 'bg-yellow-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
};

const textColorMap: Record<string, string> = {
  blue: 'text-blue-600',
  red: 'text-red-600',
  yellow: 'text-yellow-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
};

const bgColorMap: Record<string, string> = {
  blue: 'bg-blue-100',
  red: 'bg-red-100',
  yellow: 'bg-yellow-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
};

export function Tabs({ tabs, activeTab, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      {/* スマホ・タブレット用 */}
      <div className="md:hidden border-b border-gray-300">
        <div className="flex justify-between items-center px-4 py-2">
          {/* 現在のタブ名表示 */}
          <span className="font-semibold">{tabs.find((t) => t.id === activeTab)?.label}</span>

          {/* ハンバーガーボタン */}
          <button onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>

        {/* 開いたときのメニュー */}
        {isOpen && (
          <div className="flex flex-col bg-white border-t border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onChange(tab.id);
                  setIsOpen(false);
                }}
                className="px-4 py-3 text-left hover:bg-gray-100"
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PC用（md以上） */}
      <div className="hidden md:flex gap-1 font-semibold">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
              flex-1 px-4 py-1 relative
              ${isActive ? `bg-white ${textColorMap[tab.color]}` : bgColorMap[tab.color]}
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
    </div>
  );
}
