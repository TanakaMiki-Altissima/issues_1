// テストファイル
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ReservationTab } from '@/components/tabs/ReservationTab';

describe('ReservationTab 日付フィルタ', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-02-06T00:00:00'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const mockReservation = [
    {
      id: 'reservation-001',
      type: 'reservation' as const,
      ownerId: '12345678901234',
      date: '2022.9.01',
      car_name: 'インプレッサスポーツ',
      title: 'TITLE',
      price: '3,333',
      store_name: 't店舗1(検証用直営1)',
      comment: 'コメント',
      time: '11:00',
      content: '買取予約',
    },
    {
      id: 'reservation-002',
      type: 'reservation' as const,
      ownerId: '12345678901234',
      date: '2026.3.01',
      car_name: 'インプレッサスポーツ',
      title: 'TITLE',
      price: '3,333',
      store_name: 't店舗1(検証用直営1)',
      comment: 'コメント',
      time: '12:30',
      content: '買取予約',
    },
  ];

  test('予約一覧タブの基本要素が表示される', () => {
    render(<ReservationTab items={mockReservation} />);

    expect(screen.getByRole('heading', { name: '予約一覧' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '予約詳細' })).toBeInTheDocument();
  });

  test('初期表示では本日以降の予約のみ表示される', () => {
    render(<ReservationTab items={mockReservation} />);
    expect(screen.getByText('2026年3月1日 12:30')).toBeInTheDocument();
    expect(screen.queryByText('2022年9月1日 11:00')).not.toBeInTheDocument();
  });

  test('過去の予約も含むを押すと、両方のトグルが過去表示状態になる', async () => {
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });

    render(<ReservationTab items={mockReservation} />);

    const buttons = screen.getAllByRole('button', {
      name: '過去の予約も含む',
    });

    await user.click(buttons[0]);

    const todayOnlyButtons = screen.getAllByRole('button', {
      name: '本日以降の予約のみ',
    });

    todayOnlyButtons.forEach((btn) => {
      expect(btn).toHaveClass('bg-white');
    });

    const includePastButtons = screen.getAllByRole('button', {
      name: '過去の予約も含む',
    });

    includePastButtons.forEach((btn) => {
      expect(btn).toHaveClass('bg-black');
    });

    expect(screen.getByText('2026年3月1日 12:30')).toBeInTheDocument();
    expect(screen.getByText('2022年9月1日 11:00')).toBeInTheDocument();
  });
});
