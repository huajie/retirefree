/**
 * AI Provider Abstraction Layer Types
 */

export interface AIProvider {
  name: string
  generateAdvice(params: CalculationParams): Promise<AIResponse>
  estimateCost(inputTokens: number, outputTokens: number): number
}

export interface CalculationParams {
  currentAge: number
  savingsAmount: number
  monthlyExpenses: number
  riskTolerance: 'low' | 'medium' | 'high'
}

export interface AIResponse {
  withdrawalAmount: number
  confidence: number
  advice: string
  reasoning: string
}

export type AIProviderType = 'deepseek' | 'claude' | 'openai' | 'gemini'
