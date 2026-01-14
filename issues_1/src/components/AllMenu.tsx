'use client';

interface AllMenuProps {
  onClose: () => void;
}

export function AllMenu({ onClose }: AllMenuProps) {
  return (
    <div
      className="
        absolute top-0
        w-[240px] h-full
        border-r border-gray-300
        p-4
        bg-white
        z-10
      "
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          // e.stopPropagation();
          onClose();
        }}
        className="
          absolute top-2 right-2
          text-[18px]
          text-blue-700
          cursor-pointer
          hover:text-blue-900
        "
        aria-label="close"
      >
        ✕
      </button>

      <div className="mt-10 space-y-6">
        {/* 買取 */}
        <div>
          <h3 className="mb-2 font-semibold text-gray-700">買取査定</h3>
          <div className="menu-item flex items-center gap-2">
            <img src="/text_kakko_kari.png" alt="" className="w-[1em] h-[1em]" />
            新規買取査定
          </div>
          <div className="menu-item flex items-center gap-2">
            <img src="/text_kakko_kari.png" alt="" className="w-[1em] h-[1em]" />
            買取契約の締結
          </div>
          <div className="menu-item flex items-center gap-2">
            <img src="/text_kakko_kari.png" alt="" className="w-[1em] h-[1em]" />
            仮入庫前一覧
          </div>
          <div className="menu-item flex items-center gap-2">
            <img src="/text_kakko_kari.png" alt="" className="w-[1em] h-[1em]" />
            査定ランク編集
          </div>
        </div>

        {/* 入庫 */}
        <div>
          <h3 className="mb-2 font-semibold text-gray-700">入庫</h3>
          <div className="menu-item flex items-center gap-2">
            <img src="/text_kakko_kari.png" alt="" className="w-[1em] h-[1em]" />
            入庫サブメニュー
          </div>
          <div className="menu-item flex items-center gap-2">
            <img src="/text_kakko_kari.png" alt="" className="w-[1em] h-[1em]" />
            入庫サブメニュー
          </div>
        </div>

        {/* 顧客 */}
        <div>
          <h3 className="mb-2 font-semibold text-gray-700">顧客情報</h3>
          <div className="menu-item flex items-center gap-2">
            <img src="/text_kakko_kari.png" alt="" className="w-[1em] h-[1em]" />
            新規顧客情報
          </div>
          <div className="menu-item flex items-center gap-2">
            <img src="/text_kakko_kari.png" alt="" className="w-[1em] h-[1em]" />
            Croooober ID検索
          </div>
        </div>
      </div>
    </div>
  );
}
