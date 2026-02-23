import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-base font-semibold text-[#111827] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-4 text-lg bg-white border-2 rounded-md transition-colors',
            'focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-blue-300',
            'disabled:bg-[#F3F4F6] disabled:border-[#E5E7EB] disabled:cursor-not-allowed',
            error ? 'border-[#DC2626]' : 'border-[#D1D5DB]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-[#DC2626] flex items-center gap-1">
            <span>⚠</span>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-[#6B7280]">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
