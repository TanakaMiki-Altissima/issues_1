// Testing Libraryの便利なマッチャー（toBeInTheDocumentなど）をimport
// これにより、expect(element).toBeInTheDocument() のような
// DOM要素用の便利なアサーション（検証）が使えるようになる
import '@testing-library/jest-dom'

// グローバルなテスト設定をここに書くことができる
// 例：モックの設定、テスト環境の初期化など

// console.errorを無効化（テスト中の不要なエラーログを抑制）
// 本来はwarningだが、テスト時は静かにしたい場合の例
// global.console = {
//   ...console,
//   error: jest.fn(),
//   warn: jest.fn(),
// }
