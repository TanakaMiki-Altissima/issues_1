export function Sidebar() {
  return (
<aside
          className="w-[49px] border-r border-gray-300 flex flex-col items-center"
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <button onClick={handleToggleClick} className="my-2 text-[18px] text-blue-700 cursor-pointer">
            ＞
          </button>

          <MenuButton title="買取査定" onHover={() => setHoveredMenu('purchase')} />

          <MenuButton title="入庫" onHover={() => setHoveredMenu('stock')} />

          <MenuButton title="顧客情報" onHover={() => setHoveredMenu('customer')} />
        </aside>
   );
}