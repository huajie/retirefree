import { NextRequest, NextResponse } from 'next/server'
import { calculatorSchema } from '@/lib/utils/validations'
import { calculateRetirementAdvice } from '@/lib/ai/provider-factory'

/**
 * POST /api/calculate
 * Calculate retirement withdrawal advice using AI
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validation = calculatorSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: 'Invalid input data',
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { currentAge, savingsAmount, monthlyExpenses, riskTolerance } = validation.data

    // Call AI provider
    const result = await calculateRetirementAdvice({
      currentAge,
      savingsAmount,
      monthlyExpenses,
      riskTolerance: riskTolerance || 'medium',
    })

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          error: result.error || 'Failed to calculate advice',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      error: null,
    })
  } catch (error) {
    console.error('Calculate API error:', error)
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
