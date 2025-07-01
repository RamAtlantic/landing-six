"use client"

import type React from "react"

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  href?: string
  children: React.ReactNode
  className?: string
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ variant = "primary", href, children, className, ...props }) => {
  const buttonClasses = `px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${className} ${
    variant === "primary"
      ? "bg-brand-green text-[#212121] hover:bg-brand-green/90"
      : "bg-gray-600 text-white hover:bg-gray-500"
  }`

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    )
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export default LoadingButton
