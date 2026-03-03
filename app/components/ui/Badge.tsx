import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'secondary' | 'destructive' | 'outline'
}

export function Badge({
  className = '',
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    destructive: 'bg-red-100 text-red-800',
    secondary: 'bg-blue-100 text-blue-800',
    outline: 'bg-white border border-gray-300 text-gray-700'
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
