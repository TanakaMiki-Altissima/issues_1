"use client";

import styled from "styled-components";

const AllMenuWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 240px;
  height: 100%;
  border-right: 1px solid #ddd;
  padding: 16px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #1565c0;
`;

const MenuSection = styled.div`
  margin-top: 40px;
`;

const MenuItem = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

interface AllMenuProps {
  menu?: string | null;
  onClose: () => void;
}

export function AllMenu({ menu, onClose }: AllMenuProps) {
  return (
    <AllMenuWrapper>
      <CloseButton onClick={onClose}>✕</CloseButton>
      <MenuSection>
        {menu === "purchase" && (
          <>
          <MenuItem>新規買取査定</MenuItem>
          <MenuItem>買取契約の締結</MenuItem>
          <MenuItem>仮入庫前一覧</MenuItem>
          <MenuItem>査定ランク編集</MenuItem>
          </>
        )}
        {menu === "stock" && (
          <>
            <MenuItem>入庫サブメニュー</MenuItem>
            <MenuItem>入庫サブメニュー</MenuItem>
          </>
        )}
        {menu === "customer" && (
          <>
            <MenuItem>新規顧客情報</MenuItem>
            <MenuItem>Croooober ID検索</MenuItem>
          </>
        )}
      </MenuSection>
    </AllMenuWrapper>
  );
}