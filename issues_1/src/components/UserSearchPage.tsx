"use client";

import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { OpenSidebar } from "./OpenSidebar";

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
  position: relative;
`;

/* =====================
   sidebar
===================== */

const Sidebar = styled.aside`
  width: 49px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SquareBox = styled.div`
  width: 49px;
  height: 49px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  justify-content: center;
`;

const ToggleButton = styled.button`
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  color: #1565c0; 
  cursor: pointer;
  margin: 10px 0;
`;

const MenuTitle = styled.h3`
  margin: 0;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
`;

const MenuGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 3px;
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
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  
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
      <Sidebar
      onMouseLeave={() => setHoveredMenu(null)}
      >
  <ToggleButton>
    ＞
  </ToggleButton>

  <MenuGroup onMouseEnter={() => setHoveredMenu("purchase")}>
  <SquareBox>
    <MenuTitle>買取査定</MenuTitle>
  </SquareBox>
</MenuGroup>

<MenuGroup onMouseEnter={() => setHoveredMenu("stock")}>
  <SquareBox>
    <MenuTitle>入庫</MenuTitle>
  </SquareBox>
</MenuGroup>

<MenuGroup onMouseEnter={() => setHoveredMenu("customer")}>
  <SquareBox>
    <MenuTitle>顧客情報</MenuTitle>
  </SquareBox>
</MenuGroup>

</Sidebar>

{hoveredMenu && (
  <OpenSidebar
    menu={hoveredMenu}
    onMouseEnter={() => setHoveredMenu(hoveredMenu)}
    onMouseLeave={() => setHoveredMenu(null)}
  />
)}
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