export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-300 bg-gray-100 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <img src="/capital_u.png" alt="logo" className="w-[49px] h-[49px] object-contain bg-yellow-300" />
        <h1 className="text-base md:text-xl font-semibold">メンテナンスノート</h1>
      </div>
      <h2 className="text-sm md:text-lg font-medium">UPGARAGE練馬店</h2>
    </header>
  );
}
