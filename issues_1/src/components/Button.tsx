// Reactをimport（JSXを使用するため）
import React from 'react'

// Buttonコンポーネントのpropsの型定義
interface ButtonProps {
  children: React.ReactNode  // ボタン内に表示するテキストや要素
  onClick?: () => void       // クリック時のイベントハンドラ（オプショナル）
  disabled?: boolean         // ボタンの無効状態（オプショナル）
  variant?: 'primary' | 'secondary'  // ボタンの種類（オプショナル）
}

// Buttonコンポーネントの定義
// 分割代入でpropsを受け取り、デフォルト値も設定
const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,      // disabledのデフォルト値はfalse
  variant = 'primary'    // variantのデフォルト値は'primary'
}) => {
  // variantに応じてCSSクラスを決定
  // 三項演算子を使ってprimaryかsecondaryかで分岐
  const baseClasses = 'px-4 py-2 rounded font-medium focus:outline-none'
  const variantClasses = variant === 'primary' 
    ? 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100'
  
  return (
    <button
      // CSSクラスを結合（Template literalを使用）
      className={`${baseClasses} ${variantClasses}`}
      // onClickイベントハンドラを設定
      onClick={onClick}
      // disabled属性を設定
      disabled={disabled}
    >
      {/* propsで渡されたchildrenを表示 */}
      {children}
    </button>
  )
}

// コンポーネントをexport（他のファイルで使用可能にする）
export default Button
