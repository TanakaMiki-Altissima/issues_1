import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PurchaseHistoryTab } from '@/components/tabs/PurchaseHistoryTab';

// モックデータを定義
const mockPurchases = [
  {
    id: 'purchase-001',
    type: 'purchase' as const,
    ownerId: '12345678901234',
    date: '2022.9.26',
    car_name: 'インプレッサスポーツ',
    title: 'GOODYEAR EAGLE REVSPEC RS-02 205/55R16',
    price: '13,138',
    store_name: 't店舗1(検証用直営1)',
    comments: [
      {
        id: 'c-001',
        datetime: '2022-11-17 10:59',
        storeName: '練馬店',
        staffName: '後藤高志',
        body: 'お客様より初期不良のお問い合わせがありました。確認したところボルトの劣化による取り付け不良がありました。適切な対応にて納得されて完了しました。',
      },
      {
        id: 'c-002',
        datetime: '2022-11-17 10:59',
        storeName: '練馬店',
        staffName: '後藤高志',
        body: 'チャットにて対応しました',
      },
    ],
    name: 'item',
    url: 'https://example.com',
    memo: 'メモ',
    image: 'car_white.png',
  },
  {
    id: 'purchase-004',
    type: 'purchase' as const,
    ownerId: '12345678901234',
    date: '2022.9.9',
    car_name: 'インプレッサスポーツ',
    title: 'GOODYEAR EAGLE REVSPEC RS-02 205/55R16 4',
    price: '2,500',
    store_name: 't店舗3(検証用直営3)',
    comments: [],
    name: 'item',
    url: 'https://example.com',
    memo: 'メモ',
    image: 'car_white.png',
  },
];

jest.mock('next/link', () => {
  return ({ href, children }: any) => <a href={href}>{children}</a>;
});

describe('PurchaseHistoryTab', () => {
  it('items が空のとき「購入履歴がありません」と表示される', () => {
    render(<PurchaseHistoryTab items={[]} />);
    expect(screen.getByText('購入履歴がありません')).toBeInTheDocument();
  });

  it('購入履歴の一覧が表示される', () => {
    render(<PurchaseHistoryTab items={mockPurchases} />);

    // タイトル
    expect(screen.getByText('GOODYEAR EAGLE REVSPEC RS-02 205/55R16')).toBeInTheDocument();
    expect(screen.getByText('GOODYEAR EAGLE REVSPEC RS-02 205/55R16 4')).toBeInTheDocument();

    // 金額
    expect(screen.getByText('¥13,138')).toBeInTheDocument();
    expect(screen.getByText('¥2,500')).toBeInTheDocument();

    // 店舗名
    expect(screen.getByText('t店舗1(検証用直営1)')).toBeInTheDocument();
    expect(screen.getByText('t店舗3(検証用直営3)')).toBeInTheDocument();
  });

  it('購入詳細ページへのリンクが正しい', () => {
    render(<PurchaseHistoryTab items={mockPurchases} />);

    const links = screen.getAllByRole('link', { name: '＞' });
    expect(links[0]).toHaveAttribute('href', '/purchase/purchase-001');
    expect(links[1]).toHaveAttribute('href', '/purchase/purchase-004');
  });
});
