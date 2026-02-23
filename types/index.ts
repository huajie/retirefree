/**
 * Application-wide type definitions
 */

export interface AIResponse {
  withdrawalAmount: number
  confidence: number
  advice: string
  reasoning: string
  provider: string
}

export interface CalculationParams {
  currentAge: number
  savingsAmount: number
  monthlyExpenses: number
  riskTolerance: 'low' | 'medium' | 'high'
}

export interface CalculationResult extends AIResponse {
  id?: string
  createdAt?: string
}
