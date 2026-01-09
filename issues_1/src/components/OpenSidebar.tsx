"use client";

import styled from "styled-components";

const Wrapper = styled.aside`
  position: absolute;
  top: 0;
  left: 49px;
  width: 240px;
  height: 100%;
  background: #1565c0;
  color: #ffffff;
`;

const Item = styled.p`
  margin: 8px 16px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
`;


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
  return (
    <Wrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
    </Wrapper>
  );
}