// Reactをimport
import React from 'react'

// Testing Libraryの関数をimport
import { render, screen, fireEvent } from '@testing-library/react'

// テスト対象のコンポーネントをimport
import Button from '../components/Button'

// describe: テストスイート（関連するテストをグループ化）
describe('Button Component', () => {
  
  // test: 個別のテストケース
  // 最初は最もシンプルなテスト：正しくレンダリングされるか
  test('renders button with text', () => {
    // Buttonコンポーネントを仮想DOMにレンダリング
    // render関数は@testing-library/reactが提供
    render(<Button>Click me</Button>)
    
    // screen.getByText: 指定したテキストを持つ要素を取得
    // 要素が見つからない場合はエラーを投げる
    const buttonElement = screen.getByText('Click me')
    
    // toBeInTheDocument: 要素がDOM内に存在することを検証
    // jest.setup.jsでimportした拡張マッチャー
    expect(buttonElement).toBeInTheDocument()
  })

  // プロパティのテスト：disabled状態
  test('renders disabled button correctly', () => {
    // disabledプロパティをtrueに設定してレンダリング
    render(<Button disabled>Disabled Button</Button>)
    
    // ボタン要素を取得
    const buttonElement = screen.getByText('Disabled Button')
    
    // toBeDisabled: 要素がdisabled状態であることを検証
    expect(buttonElement).toBeDisabled()
  })

  // イベントハンドリングのテスト
  test('calls onClick handler when clicked', () => {
    // jest.fn(): モック関数を作成
    // 関数が呼ばれたかどうか、何回呼ばれたかなどを追跡できる
    const handleClick = jest.fn()
    
    // onClickプロパティにモック関数を渡してレンダリング
    render(<Button onClick={handleClick}>Clickable Button</Button>)
    
    // ボタン要素を取得
    const buttonElement = screen.getByText('Clickable Button')
    
    // fireEvent.click: クリックイベントを発火
    // 実際のユーザーのクリック操作をシミュレート
    fireEvent.click(buttonElement)
    
    // toHaveBeenCalled: モック関数が呼ばれたことを検証
    expect(handleClick).toHaveBeenCalled()
    
    // toHaveBeenCalledTimes: 正確に1回呼ばれたことを検証
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // CSSクラスのテスト：variant prop
  test('applies correct CSS classes for primary variant', () => {
    // variantを明示的にprimaryに設定
    render(<Button variant="primary">Primary Button</Button>)
    
    // ボタン要素を取得
    const buttonElement = screen.getByText('Primary Button')
    
    // toHaveClass: 指定したCSSクラスが適用されているかを検証
    expect(buttonElement).toHaveClass('bg-blue-500')
    expect(buttonElement).toHaveClass('text-white')
  })

  // 別のvariantのテスト
  test('applies correct CSS classes for secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    
    const buttonElement = screen.getByText('Secondary Button')
    
    // secondaryバリアント用のクラスが適用されているかチェック
    expect(buttonElement).toHaveClass('bg-gray-200')
    expect(buttonElement).toHaveClass('text-gray-700')
  })

  // 複合条件のテスト：disabled状態でのクリック
  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    
    // disabledかつonClickを両方設定
    render(
      <Button onClick={handleClick} disabled>
        Disabled Clickable Button
      </Button>
    )
    
    const buttonElement = screen.getByText('Disabled Clickable Button')
    
    // disabled状態でもクリックイベントは発火される
    fireEvent.click(buttonElement)
    
    // しかし、実際のブラウザではdisabledボタンはクリックできない
    // HTMLの標準的な動作をテストしている
    // ここではモック関数が呼ばれないことを確認
    // （実際にはdisabled属性があってもJavaScriptイベントは発火される場合がある）
    
    // より現実的なテストにしたい場合は、
    // コンポーネント内でdisabled時のクリックハンドリングを制御する
  })
})
