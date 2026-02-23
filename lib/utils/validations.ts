import { z } from 'zod'

/**
 * Validation schemas for RetireFree
 */

// Calculator input validation
export const calculatorSchema = z.object({
  currentAge: z.number()
    .min(18, 'Age must be at least 18')
    .max(100, 'Age must be less than 100'),
  savingsAmount: z.number()
    .min(1000, 'Savings must be at least $1,000')
    .max(100000000, 'Savings exceeds maximum'),
  monthlyExpenses: z.number()
    .min(100, 'Monthly expenses must be at least $100')
    .max(100000, 'Monthly expenses exceed maximum'),
  riskTolerance: z.enum(['low', 'medium', 'high']).optional().default('medium'),
})

export type CalculatorInput = z.infer<typeof calculatorSchema>

// Auth validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const signupSchema = loginSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>

// Profile update validation
export const profileSchema = z.object({
  age: z.number().min(18).max(100).optional(),
  retirementAge: z.number().min(50).max(100).optional(),
})

export type ProfileInput = z.infer<typeof profileSchema>
