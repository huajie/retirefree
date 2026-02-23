/**
 * AI Provider Factory
 * Creates and manages different AI providers
 */

import { DeepSeekProvider } from './providers/deepseek'
import type { AIProvider, AIProviderType } from './types'

export function getAIProvider(providerType: AIProviderType = 'deepseek'): AIProvider {
  switch (providerType) {
    case 'deepseek':
      return new DeepSeekProvider()

    // Future providers can be added here
    // case 'claude':
    //   return new ClaudeProvider()
    // case 'openai':
    //   return new OpenAIProvider()
    // case 'gemini':
    //   return new GeminiProvider()

    default:
      console.warn(`Unknown provider: ${providerType}, falling back to DeepSeek`)
      return new DeepSeekProvider()
  }
}

/**
 * Calculate retirement advice using the configured AI provider
 */
export async function calculateRetirementAdvice(params: {
  currentAge: number
  savingsAmount: number
  monthlyExpenses: number
  riskTolerance: 'low' | 'medium' | 'high'
}, providerType: AIProviderType = 'deepseek') {
  const provider = getAIProvider(providerType)

  try {
    const response = await provider.generateAdvice(params)

    return {
      success: true,
      data: {
        ...response,
        provider: provider.name
      },
      error: null
    }
  } catch (error) {
    console.error('AI provider error:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to generate advice'
    }
  }
}
