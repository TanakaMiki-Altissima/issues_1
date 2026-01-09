// Jest設定ファイル - テストの実行方法を定義
const nextJest = require('next/jest')

// Next.jsの設定を読み込む関数を作成
// './' は現在のディレクトリのnext.config.jsを参照
const createJestConfig = nextJest({
  dir: './',
})

// カスタムJest設定オブジェクト
const customJestConfig = {
  // セットアップファイルを指定（テスト実行前に読み込まれる）
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // テスト環境をブラウザ環境（jsdom）に設定
  // デフォルトのNode.js環境ではなく、DOM操作が可能な環境を使用
  testEnvironment: 'jest-environment-jsdom',
  
  // テストファイルを探すディレクトリを指定
  testPathIgnorePatterns: [
    '<rootDir>/.next/',      // Next.jsのビルドファイルを除外
    '<rootDir>/node_modules/' // node_modulesを除外
  ],
  
  // ファイル拡張子のエイリアス設定
  moduleNameMapping: {
    // CSS modulesやSCSSファイルをモック化
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    
    // 通常のCSSファイルもモック化（テスト時にはスタイルは不要）
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
}

// Next.jsの設定とカスタム設定を統合してexport
module.exports = createJestConfig(customJestConfig)
