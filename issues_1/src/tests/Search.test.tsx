
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserSearchPage } from '../components/UserSearchPage';

describe('UserSearchPage', () => {
  test('サイドバー上部の＞をクリックすると AllMenu が表示される', () => {
    render(<UserSearchPage />);
    const openButton = screen.getByText('＞');
    fireEvent.click(openButton);
    expect(screen.getByText('新規買取査定')).toBeInTheDocument();
    expect(screen.getByText('買取契約の締結')).toBeInTheDocument();
    expect(screen.getByText('仮入庫前一覧')).toBeInTheDocument();
    expect(screen.getByText('査定ランク編集')).toBeInTheDocument();
    expect(screen.getAllByText('入庫サブメニュー').length).toBeGreaterThan(0);
    expect(screen.getByText('新規顧客情報')).toBeInTheDocument();
    expect(screen.getByText('Croooober ID検索')).toBeInTheDocument();
  });

  test('サイドバーの「買取査定」に hover すると OpenSidebar が表示される', async () => {
    const user = userEvent.setup();

    render(<UserSearchPage />);

    const purchaseMenu = screen.getByText('買取査定');

    await user.hover(purchaseMenu);

    expect(screen.getByText('新規買取査定')).toBeInTheDocument();
    expect(screen.getByText('買取契約の締結')).toBeInTheDocument();
  });

  test('サイドバーの「入庫」に hover すると OpenSidebar が表示される', async () => {
    const user = userEvent.setup();

    render(<UserSearchPage />);

    const stockMenu = screen.getByText('入庫');
    await user.hover(stockMenu);

    expect(screen.getAllByText('入庫サブメニュー').length).toBeGreaterThan(0);
  });

  test('サイドバーの「顧客情報」に hover すると OpenSidebar が表示される', async () => {
    const user = userEvent.setup();

    render(<UserSearchPage />);

    const customerMenu = screen.getByText('顧客情報');
    await user.hover(customerMenu);

    expect(screen.getByText('新規顧客情報')).toBeInTheDocument();
    expect(screen.getByText('Croooober ID検索')).toBeInTheDocument();
  });

  //   test('顧客を選択すると決定ボタンが有効になる', () => {
  //   expect(true).toBe(true);
  // });
});
