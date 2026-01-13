"use client";

import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { OpenSidebar } from "./OpenSidebar";
import { AllMenu } from "./AllMenu"; 
import { mockCustomers } from "@/mocks/customers";

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
`;

/* =====================
   main content
===================== */

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

const ResultTable = styled.div`
  margin-top: 32px;
  width: 800px;
  background: #e3f2fd; /* 薄青 */
  border-radius: 6px;
`;

const ResultRow = styled.div`
  display: grid;
  grid-template-columns: 160px 160px 200px 1fr;
  padding: 12px 16px;
  font-weight: 600;
  color: #0d47a1;
`;



/* =====================
   component
===================== */

export function UserSearchPage() {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isAllMenuVisible, setIsAllMenuVisible] = useState(false);
  type MenuKey = "purchase" | "stock" | "customer";
  const [selectedMenus, setSelectedMenus] = useState<MenuKey[]>([]);

  const [showResult, setShowResult] = useState(false);

  const handleToggleClick = () => {
  setIsAllMenuVisible(!isAllMenuVisible);


  if (!isAllMenuVisible) {
    setSelectedMenus(["purchase", "stock", "customer"]);
  } else {
    setSelectedMenus([]);
  }
};


  
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
  <ToggleButton onClick={handleToggleClick}>
            {isAllMenuVisible ? "x" : "＞"}
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

{isAllMenuVisible && (
  <AllMenu
    onClose={() => setIsAllMenuVisible(false)}
  />
)}

{hoveredMenu && (
  <OpenSidebar
    menu={hoveredMenu}
    onMouseEnter={() => setHoveredMenu(hoveredMenu)}
    onMouseLeave={() => setHoveredMenu(null)}
  />
)}

{selectedMenus.map((menu) => (
  <OpenSidebar
    key={menu}
    menu={menu}
    onMouseEnter={() => {}}
    onMouseLeave={() => {}}
  />
))}
        {/* Main */}
        <Main>
  <div>
    <SearchBox>
      <p>顧客情報の検索</p>

      <div className="search-input">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input placeholder="キーワード・電話番号で検索" />
      </div>

      <button onClick={() => setShowResult(true)}>検索</button>
    </SearchBox>

    {showResult && (
      <ResultTable>
        <ResultRow>
          <div>Croooober ID</div>
          <div>氏名</div>
          <div>電話番号</div>
          <div>住所</div>
        </ResultRow>
      
    {mockCustomers.map((customer) => (
      <ResultRow key={customer.crooooberId}>
        <div>{customer.crooooberId}</div>
        <div>{customer.name}</div>
        <div>{customer.phone}</div>
        <div>{customer.address}</div>
      </ResultRow>
    ))}
    </ResultTable>
  )}
    
  </div>
</Main>

      </Content>
    </PageWrapper>
  );
}