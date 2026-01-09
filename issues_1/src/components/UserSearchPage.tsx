"use client";

import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

/* =====================
   layout
===================== */

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LogoImage = styled.img`
  width: 49px;
  height: 49px;
  object-fit: contain;
  background-color: #fff001;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
`;

/* =====================
   sidebar
===================== */

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? "240px" : "49px")};
  border-right: 1px solid #ddd;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
  overflow: ${({ $isOpen }) => ($isOpen ? "hidden" : "visible")};
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  color: #1565c0;
  cursor: pointer;
`;

const SquareBox = styled.div<{ $isOpen: boolean }>`
  width: 49px;
  height: 49px;
  border: ${({ $isOpen }) => ($isOpen ? "none" : "1px solid #ccc")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleAllButton = styled.button`
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  color: #1565c0; 
  cursor: pointer;
`;

const MenuSection = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
`;

const MenuTitle = styled.h3`
  margin: 0;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
`;

const MenuItem = styled.p`
  margin: 4px 0;
  padding-left: 8px;

  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const MenuItemIcon = styled.img`
  width: 14px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
  background-color: #1565c0; 
`;

const HoverMenu = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 8px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 8px 12px;
  min-width: 180px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const MenuGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* =====================
   main content
===================== */

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .search-input {
    position: relative;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #888;
    pointer-events: none;
  }

  input {
    width: 280px;
    padding: 8px 8px 8px 36px;
    border-radius: 5px;
    color: #888;
    background-color: #f5f5f5;
  }

  button {
    padding: 8px 20px;
    cursor: pointer;
    border-radius: 5px;
    background-color: #1565c0;
    color: white;
  }
`;


/* =====================
   component
===================== */

export function UserSearchPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isAllOpen, setIsAllOpen] = useState(false);

  const toggleMenu = (menu: string) => {
    if (isAllOpen) return;
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const openAllMenus = () => {
    setIsAllOpen(true);
  };

  const closeAllMenus = () => {
    setIsAllOpen(false);
    setOpenMenu(null);
  };

  const isOpen = (menu: string) =>
    isAllOpen || openMenu === menu;

  return (
    <PageWrapper>
      {/* Header */}
      <Header>
        <HeaderLeft>
          <LogoImage src="/capital_u.png" alt="logo" />
          <h1>メンテナンスノート</h1>
        </HeaderLeft>
        
        <h2>U練馬店</h2>
      </Header>

      <Content>
        {/* Sidebar */}
        <Sidebar $isOpen={isAllOpen}>

  {/* トグルボタン */}
  {!isAllOpen && (
  <SquareBox $isOpen={false}>
    <ToggleAllButton onClick={() => setIsAllOpen(true)}>
      ＞
    </ToggleAllButton>
  </SquareBox>
)}

{/* 閉じる */}
{isAllOpen && (
  <CloseButton onClick={() => setIsAllOpen(false)}>
    ×
  </CloseButton>
)}

  {/* 買取査定 */}
  <MenuGroup
  onMouseEnter={() => !isAllOpen && setOpenMenu("purchase")}
  onMouseLeave={() => !isAllOpen && setOpenMenu(null)}
>
  <SquareBox $isOpen={isAllOpen}>
    <MenuTitle>買取査定</MenuTitle>
  </SquareBox>

  {/* ▶ 展開状態：サイドバー内に表示 */}
  {isAllOpen && (
    <>
      <MenuItem>
        <MenuItemIcon src="fabric_mark_triangle.png" />
        新規買取査定
      </MenuItem>
      <MenuItem>
        <MenuItemIcon src="fabric_mark_triangle.png" />
        買取契約の締結
      </MenuItem>
      <MenuItem>
        <MenuItemIcon src="text_kakko_kari.png" />
        仮入庫前一覧
      </MenuItem>
      <MenuItem>
        <MenuItemIcon src="text_kakko_kari.png" />
        査定ランク編集
      </MenuItem>
    </>
  )}

  {/* ▶ 閉状態：右側に HoverMenu */}
  {!isAllOpen && openMenu === "purchase" && (
    <HoverMenu>
      <MenuItem>
        <MenuItemIcon src="fabric_mark_triangle.png" />
        新規買取査定
      </MenuItem>
      <MenuItem>
        <MenuItemIcon src="fabric_mark_triangle.png" />
        買取契約の締結
      </MenuItem>
      <MenuItem>
        <MenuItemIcon src="text_kakko_kari.png" />
        仮入庫前一覧
      </MenuItem>
      <MenuItem>
        <MenuItemIcon src="text_kakko_kari.png" />
        査定ランク編集
      </MenuItem>
    </HoverMenu>
  )}
</MenuGroup>



  {/* 入庫 */}
  <MenuGroup
  onMouseEnter={() => !isAllOpen && setOpenMenu("stock")}
  onMouseLeave={() => !isAllOpen && setOpenMenu(null)}
>
  <SquareBox $isOpen={isAllOpen}>
    <MenuTitle>入庫</MenuTitle>
  </SquareBox>

  {!isAllOpen && openMenu === "stock" && (
    <HoverMenu>
        <MenuItem>
  <MenuItemIcon src="text_kakko_kari.png" alt="kari_3" />
  入庫サブメニュー
</MenuItem>
<MenuItem>
  <MenuItemIcon src="text_kakko_kari.png" alt="kari_4" />
  入庫サブメニュー
</MenuItem>
    </HoverMenu>
  )}
</MenuGroup>


  {/* 顧客情報 */}
  <MenuGroup
  onMouseEnter={() => !isAllOpen && setOpenMenu("customer")}
  onMouseLeave={() => !isAllOpen && setOpenMenu(null)}
>
  <SquareBox $isOpen={isAllOpen}>
    <MenuTitle>顧客情報</MenuTitle>
  </SquareBox>

  {!isAllOpen && openMenu === "customer" && (
    <HoverMenu>
        <MenuItem>
  <MenuItemIcon src="text_kakko_kari.png" alt="kari_5" />
  新規顧客登録
</MenuItem>
<MenuItem>
  <MenuItemIcon src="text_kakko_kari.png" alt="kari_6" />
  Croooober ID検索
</MenuItem>
    </HoverMenu>
  )}
</MenuGroup>

</Sidebar>


        {/* Main */}
        <Main>
       <SearchBox>
    <p>顧客情報の検索</p>

    <div className="search-input">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
      <input
        placeholder="キーワード・電話番号で検索"
      />
    </div>

    <button>検索</button>
  </SearchBox>
</Main>
      </Content>
    </PageWrapper>
  );
}