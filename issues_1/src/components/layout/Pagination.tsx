'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
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
            onClick={() => onPageChange(p)}
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
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
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
  );
}