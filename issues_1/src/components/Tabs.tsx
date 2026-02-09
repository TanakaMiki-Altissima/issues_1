'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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
  gray: 'bg-gray-100',
};

const textColorMap: Record<string, string> = {
  blue: 'text-blue-600',
  red: 'text-red-600',
  yellow: 'text-yellow-600',
  green: 'text-green-600',
  gray: 'text-gray-600',
};

const bgColorMap: Record<string, string> = {
  blue: 'bg-blue-100',
  red: 'bg-red-100',
  yellow: 'bg-yellow-100',
  green: 'bg-green-100',
  gray: 'bg-gray-100',
};

export function Tabs({ tabs, activeTab, onChange }: Props) {
  return (
    <div className="flex gap-1 font-semibold">
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
  );
}
