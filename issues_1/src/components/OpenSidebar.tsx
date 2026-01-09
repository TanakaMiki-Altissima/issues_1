import styled from "styled-components";

const Wrapper = styled.aside`
  top: 0;
  width: 240px;
  height: 100%;
  background: #fff;
  z-index: 100;
`;

const Title = styled.h3`
  margin: 16px;
  font-size: 16px;
`;

const Item = styled.p`
  margin: 8px 16px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: #1565c0;
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
