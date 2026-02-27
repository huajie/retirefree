/**
 * DeepSeek AI Provider
 * Primary AI provider for cost-effective retirement calculations
 */

import OpenAI from 'openai'
import type { AIProvider, CalculationParams, AIResponse } from '../types'

export class DeepSeekProvider implements AIProvider {
  name = 'deepseek'
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: 'https://api.deepseek.com',
    })
  }

  async generateAdvice(params: CalculationParams): Promise<AIResponse> {
    const { currentAge, savingsAmount, monthlyExpenses, riskTolerance } = params

    const prompt = this.buildPrompt(params)

    try {
      const completion = await this.client.chat.completions.create({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a retirement planning expert who provides clear, personalized advice on safe withdrawal strategies. Always provide specific numbers and actionable guidance.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      })

      const response = completion.choices[0].message.content || ''
      return this.parseResponse(response, params)
    } catch (error) {
      console.error('DeepSeek API error:', error)
      throw new Error('Failed to generate retirement advice')
    }
  }

  private buildPrompt(params: CalculationParams): string {
    const { currentAge, savingsAmount, monthlyExpenses, riskTolerance } = params

    const lifeExpectancy = 90 // Conservative estimate
    const yearsInRetirement = lifeExpectancy - currentAge
    const totalNeeded = monthlyExpenses * 12 * yearsInRetirement

    return `I need help planning my retirement withdrawals. Here are my details:

Current Age: ${currentAge}
Total Retirement Savings: $${savingsAmount.toLocaleString()}
Monthly Expenses: $${monthlyExpenses.toLocaleString()}
Risk Tolerance: ${riskTolerance}

Please provide:
1. A recommended SAFE monthly withdrawal amount (considering my risk tolerance)
2. Your confidence level in this recommendation (as a percentage)
3. Specific advice on how to manage my withdrawals
4. Reasoning behind your recommendation

Format your response as JSON with these fields:
{
  "withdrawalAmount": <number>,
  "confidence": <number between 0-100>,
  "advice": "<clear, actionable advice in 2-3 sentences>",
  "reasoning": "<detailed explanation of your calculation>"
}

Important considerations:
- Life expectancy: approximately ${lifeExpectancy} years
- Years in retirement: ${yearsInRetirement} years
- Total estimated need: $${totalNeeded.toLocaleString()}
- Use the 4% rule as a baseline but adjust for risk tolerance
- Factor in inflation (3% average)
- Consider market volatility
- ${riskTolerance === 'low' ? 'Be conservative - prioritize safety' : riskTolerance === 'high' ? 'Can be more aggressive with withdrawals' : 'Balanced approach between safety and spending'}

Provide ONLY the JSON response, no additional text.`
  }

  private parseResponse(response: string, params: CalculationParams): AIResponse {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }

      const parsed = JSON.parse(jsonMatch[0])

      // Validate and sanitize the response
      const withdrawalAmount = Number(parsed.withdrawalAmount) || this.calculateFallbackWithdrawal(params)
      const confidence = Math.min(100, Math.max(0, Number(parsed.confidence) || 75))
      const advice = parsed.advice || 'Consult with a financial advisor for personalized advice.'
      const reasoning = parsed.reasoning || 'Calculation based on standard withdrawal strategies.'

      return {
        withdrawalAmount,
        confidence,
        advice,
        reasoning
      }
    } catch (error) {
      console.error('Failed to parse DeepSeek response:', error)
      // Fallback to rule-based calculation
      return this.generateFallbackResponse(params)
    }
  }

  private calculateFallbackWithdrawal(params: CalculationParams): number {
    const { savingsAmount, riskTolerance } = params

    // Adjusted 4% rule based on risk tolerance
    const baseRate = riskTolerance === 'low' ? 0.035 : riskTolerance === 'high' ? 0.045 : 0.04
    const annualWithdrawal = savingsAmount * baseRate
    return Math.round(annualWithdrawal / 12)
  }

  private generateFallbackResponse(params: CalculationParams): AIResponse {
    const withdrawalAmount = this.calculateFallbackWithdrawal(params)
    const { riskTolerance } = params

    return {
      withdrawalAmount,
      confidence: 70,
      advice: `Based on your ${riskTolerance} risk tolerance, a monthly withdrawal of $${withdrawalAmount.toLocaleString()} follows conservative retirement planning guidelines. Monitor your spending and adjust quarterly.`,
      reasoning: `This recommendation uses an adjusted withdrawal rate strategy. For ${riskTolerance} risk tolerance, we apply a ${riskTolerance === 'low' ? '3.5%' : riskTolerance === 'high' ? '4.5%' : '4%'} annual withdrawal rate, which historically has provided a high probability of success over 30+ years.`
    }
  }

  estimateCost(inputTokens: number, outputTokens: number): number {
    // DeepSeek pricing: $0.27 per million input tokens, $1.10 per million output tokens
    const inputCost = (inputTokens / 1000000) * 0.27
    const outputCost = (outputTokens / 1000000) * 1.10
    return inputCost + outputCost
  }
}
