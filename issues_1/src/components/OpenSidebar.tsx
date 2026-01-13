"use client";

type Props = {
  menu: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function OpenSidebar({
  menu,
  onMouseEnter,
  onMouseLeave,
}: Props) {
    const Item = ({ children }: { children: React.ReactNode }) => (
    <div
      className="
        w-full
        px-4 py-2
        cursor-pointer
        text-left
        flex items-center gap-2
      "
    >
       <img
      src="public/images/kaden_camera_compact.png"
      alt=""
      className="w-[1em] h-[1em]"
    />
      {children}
    </div>
  );

  return (
    <aside
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="
        absolute top-[40px] left-[49px]
        bg-white
        border border-gray-300
        flex flex-col items-center
        py-2
        min-w-[200px]
      "
    >
      {menu === "purchase" && (
        <>
          <Item>新規買取査定</Item>
          <Item>買取契約の締結</Item>
          <Item>仮入庫前一覧</Item>
          <Item>査定ランク編集</Item>
        </>
      )}

      {menu === "stock" && (
        <>
          <Item>入庫サブメニュー</Item>
          <Item>入庫サブメニュー</Item>
        </>
      )}

      {menu === "customer" && (
        <>
          <Item>新規顧客情報</Item>
          <Item>Croooober ID検索</Item>
        </>
      )}
    </aside>
  );
}
