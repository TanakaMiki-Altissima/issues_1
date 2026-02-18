'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type Props = {
  inputKeyword: string;
  onInputKeywordChange: (v: string) => void;
  onSearch: () => void;

  fromDay: number | '';
  toDay: number | '';
  onFromDayChange: (v: number | '') => void;
  onToDayChange: (v: number | '') => void;
  days: number[];

  selectedCarName: string;
  carNameOptions: string[];
  onCarChange: (v: string) => void;

  totalCount: number;

  onlyWithComment: boolean;
  onOnlyWithCommentChange: (v: boolean) => void;
};

export function TimelineFilterBar({
  inputKeyword,
  onInputKeywordChange,
  onSearch,
  fromDay,
  toDay,
  onFromDayChange,
  onToDayChange,
  days,
  selectedCarName,
  carNameOptions,
  onCarChange,
  totalCount,
  onlyWithComment,
  onOnlyWithCommentChange,
}: Props) {
  return (
    <>
      {/* 上段：検索・絞り込み */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 border-b border-gray-300">
        {/* 左：キーワード */}
        <div className="flex justify-center gap-3 w-full md:w-auto">
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="キーワードで検索"
              value={inputKeyword}
              onChange={(e) => onInputKeywordChange(e.target.value)}
              className="w-full sm:w-[280px] pl-9 pr-2 py-2 rounded bg-gray-100 text-gray-600 outline-none"
            />
          </div>
          <button className="px-5 py-2 rounded bg-blue-700 text-white whitespace-nowrap" onClick={onSearch}>
            検索
          </button>
        </div>

        {/* 中央：日付 */}
        <div className="flex items-center gap-2 mx-auto">
          <select
            value={fromDay}
            onChange={(e) => onFromDayChange(e.target.value ? Number(e.target.value) : '')}
            className="w-[140px] px-3 py-2 border rounded text-sm"
          >
            <option value=""></option>
            {days.map((d) => (
              <option key={d} value={d}>
                9月{d}日
              </option>
            ))}
          </select>

          <span>〜</span>

          <select
            value={toDay}
            onChange={(e) => onToDayChange(e.target.value ? Number(e.target.value) : '')}
            className="w-[140px] px-3 py-2 border rounded text-sm"
          >
            <option value=""></option>
            {days.map((d) => (
              <option key={d} value={d}>
                9月{d}日
              </option>
            ))}
          </select>
        </div>

        {/* 右：登録車 */}
        <div className="flex justify-center w-full md:w-auto md:ml-auto">
          <select
            value={selectedCarName}
            onChange={(e) => onCarChange(e.target.value)}
            className="w-[220px] px-3 py-2 border rounded text-sm"
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

      {/* 下段：件数・チェック */}
      <div className="flex items-center gap-6 p-4 border-b border-gray-300">
        <p className="text-sm text-gray-700">{totalCount} 件</p>

        <label className="flex items-center gap-2 ml-auto text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={onlyWithComment}
            onChange={(e) => onOnlyWithCommentChange(e.target.checked)}
          />
          メモ付きのみ
        </label>
      </div>
    </>
  );
}
