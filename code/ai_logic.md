# RetireFree AI Logic

Complete documentation for the AI-powered retirement withdrawal calculation system using Claude API.

---

## Overview

RetireFree uses Claude 3.5 Sonnet to provide personalized retirement withdrawal recommendations based on user inputs and financial best practices. The AI analyzes multiple factors and provides both a numerical recommendation and actionable advice.

---

## Input Parameters

### Required Inputs
| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| `current_age` | integer | 18-100 | User's current age in years |
| `savings_amount` | decimal | $1,000 - $100,000,000 | Total retirement savings (all accounts) |
| `monthly_expenses` | decimal | $100 - $100,000 | Average monthly spending needs |

### Optional Inputs (for enhanced calculation)
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `retirement_age` | integer | 65 | Planned retirement age |
| `risk_tolerance` | enum | 'moderate' | Options: conservative, moderate, aggressive |
| `has_pension` | boolean | false | Whether user receives pension income |
| `pension_amount` | decimal | 0 | Monthly pension income if applicable |
| `has_social_security` | boolean | true | Whether expecting Social Security |
| `expected_ss_amount` | decimal | 0 | Expected monthly Social Security (if known) |

---

## Calculation Methodology

### 1. Core Principles

The AI calculation is based on:

- **4% Rule (adjusted)**: Traditional safe withdrawal rate of 4% annually
- **Longevity Planning**: Plans for age 95 (assumes 30+ year retirement)
- **Market Conditions**: Adjusts for historical market returns (7% average)
- **Inflation**: Factors 3% annual inflation
- **Sequencing Risk**: Considers impact of early market downturns
- **Personal Factors**: Age, risk tolerance, supplemental income

### 2. Withdrawal Rate Formula

```
Base Withdrawal Rate = 4%

Adjustments:
+ Early Retirement (before 60): -0.5% per 5 years early
+ Late Retirement (after 70): +0.5% per 5 years late
+ Conservative Risk: -0.5%
+ Aggressive Risk: +0.5%
+ High Savings (>$2M): +0.5%
+ Low Savings (<$200K): -0.5%
+ Pension/SS Income: +0.5% to 1%

Final Rate = Base + Adjustments (capped at 3% - 6%)
```

### 3. Monthly Withdrawal Calculation

```
Annual Withdrawal = Savings × Final Withdrawal Rate
Monthly Withdrawal = Annual Withdrawal ÷ 12

Example:
- Savings: $500,000
- Age: 65 (standard retirement)
- Risk: Moderate
- Final Rate: 4%
→ Annual: $20,000
→ Monthly: $1,667
```

### 4. Expense Coverage Analysis

```
Coverage Ratio = Monthly Withdrawal ÷ Monthly Expenses

Interpretation:
- <0.5: Significantly underfunded
- 0.5-0.8: Partially funded, need adjustments
- 0.8-1.2: Well-funded, sustainable
- >1.2: Comfortably funded, room for extras
```

---

## AI Prompt Structure

### System Prompt

```typescript
const SYSTEM_PROMPT = `You are a retirement planning expert with deep knowledge of:
- Safe withdrawal rates and the 4% rule
- Longevity risk and retirement duration planning
- Market volatility and sequencing risk
- Tax-efficient withdrawal strategies
- Social Security optimization
- Medicare and healthcare costs in retirement

Provide clear, actionable advice that balances financial security with quality of life.
Be realistic but encouraging. Avoid jargon.`
```

### User Prompt Template

```typescript
const buildUserPrompt = (input: CalculationInput) => `
Analyze this retirement scenario and provide a withdrawal recommendation:

USER PROFILE:
- Current Age: ${input.current_age}
- Retirement Age: ${input.retirement_age || 65}
- Total Savings: $${input.savings_amount.toLocaleString()}
- Monthly Expenses: $${input.monthly_expenses.toLocaleString()}
- Risk Tolerance: ${input.risk_tolerance || 'moderate'}
${input.has_pension ? `- Monthly Pension: $${input.pension_amount}` : ''}
${input.has_social_security ? '- Expects Social Security' : ''}

TASK:
1. Calculate a safe monthly withdrawal amount based on:
   - 4% rule (adjusted for age and risk)
   - Planning for 30+ years in retirement
   - Market conditions and inflation

2. Determine if savings are sufficient to cover expenses

3. Provide specific recommendations for:
   - Monthly withdrawal amount
   - Whether to retire now or save more
   - How to adjust spending if needed
   - Tax optimization strategies
   - Risk mitigation

RESPONSE FORMAT (JSON):
{
  "recommended_monthly_withdrawal": <number>,
  "annual_withdrawal_rate": <number as percentage>,
  "years_of_coverage": <number>,
  "coverage_assessment": "<underfunded|partially_funded|well_funded|over_funded>",
  "key_insights": [
    "<insight 1>",
    "<insight 2>",
    "<insight 3>"
  ],
  "recommendations": [
    "<specific action 1>",
    "<specific action 2>",
    "<specific action 3>"
  ],
  "risks_to_consider": [
    "<risk 1>",
    "<risk 2>"
  ],
  "confidence_level": "<low|medium|high>"
}

Be specific with numbers. Be honest about risks. Prioritize user's long-term security.
`
```

---

## API Implementation

### Complete Implementation Example

```typescript
// lib/ai/calculate.ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface CalculationInput {
  current_age: number
  savings_amount: number
  monthly_expenses: number
  retirement_age?: number
  risk_tolerance?: 'conservative' | 'moderate' | 'aggressive'
  has_pension?: boolean
  pension_amount?: number
  has_social_security?: boolean
}

interface CalculationResult {
  recommended_monthly_withdrawal: number
  annual_withdrawal_rate: number
  years_of_coverage: number
  coverage_assessment: string
  key_insights: string[]
  recommendations: string[]
  risks_to_consider: string[]
  confidence_level: string
}

export async function calculateRetirement(
  input: CalculationInput
): Promise<CalculationResult> {
  const prompt = buildUserPrompt(input)

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    temperature: 0.3, // Lower for more consistent financial advice
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  // Extract JSON from response
  const content = message.content[0].text
  const jsonMatch = content.match(/\{[\s\S]*\}/)

  if (!jsonMatch) {
    throw new Error('Failed to parse AI response')
  }

  const result = JSON.parse(jsonMatch[0]) as CalculationResult

  // Validate result
  if (!result.recommended_monthly_withdrawal || result.recommended_monthly_withdrawal < 0) {
    throw new Error('Invalid calculation result')
  }

  return result
}
```

---

## Response Format

### Example AI Response

```json
{
  "recommended_monthly_withdrawal": 2500,
  "annual_withdrawal_rate": 4.2,
  "years_of_coverage": 32,
  "coverage_assessment": "well_funded",
  "key_insights": [
    "Your $700,000 in savings can safely support $2,500/month for 32+ years at a 4.2% withdrawal rate",
    "This covers 83% of your stated $3,000 monthly expenses, leaving a $500 gap to address",
    "Starting at age 67 gives you a higher safe withdrawal rate due to shorter retirement timeline"
  ],
  "recommendations": [
    "Consider delaying full retirement by 1-2 years to close the $500/month expense gap",
    "Explore part-time work earning $500-1000/month in early retirement to reduce portfolio withdrawals",
    "Review expenses to find $500/month in cuts: consider downsizing housing or reducing discretionary spending",
    "Wait to claim Social Security until age 70 to maximize benefits (increases ~24% from age 67 to 70)",
    "Keep 2 years of expenses ($72,000) in cash/bonds to avoid selling stocks during market downturns"
  ],
  "risks_to_consider": [
    "Healthcare costs before Medicare (age 65) could be $800-1500/month for two people",
    "Early retirement market downturn (sequencing risk) could reduce safe withdrawal rate",
    "Longevity risk: 25% chance one spouse lives past 95, requiring 30+ years of funding"
  ],
  "confidence_level": "high"
}
```

---

## Edge Cases & Error Handling

### 1. Insufficient Savings

**Scenario**: Savings can't support expenses for 20+ years

```json
{
  "recommended_monthly_withdrawal": 1200,
  "coverage_assessment": "underfunded",
  "key_insights": [
    "Your $200,000 in savings can only safely support $1,200/month",
    "This covers just 40% of your $3,000 monthly expenses",
    "At current spending, savings would be depleted in ~10 years"
  ],
  "recommendations": [
    "CRITICAL: Delay retirement by 5-10 years and increase savings rate to 20%+",
    "Reduce monthly expenses to $1,500 (50% cut) to make retirement feasible",
    "Consider relocating to a lower cost-of-living area to reduce housing costs",
    "Explore part-time work in retirement to supplement withdrawals"
  ],
  "confidence_level": "high"
}
```

### 2. Very High Savings

**Scenario**: User is over-funded

```json
{
  "recommended_monthly_withdrawal": 12000,
  "coverage_assessment": "over_funded",
  "key_insights": [
    "Your $3.5M portfolio can comfortably support $12,000/month at a 4.1% rate",
    "This is 3x your stated $4,000 monthly expenses",
    "You have significant room for lifestyle upgrades or legacy planning"
  ],
  "recommendations": [
    "Consider a higher quality of life: travel, hobbies, or upgrading housing",
    "Explore tax-efficient charitable giving strategies (QCDs, donor-advised funds)",
    "Gift money to family members while alive to see the impact and reduce estate taxes",
    "Consult a financial advisor about Roth conversions in lower-income years"
  ],
  "confidence_level": "high"
}
```

### 3. Very Young Retirement (40s-50s)

**Scenario**: Early retirement needs longer horizon

```json
{
  "recommended_monthly_withdrawal": 3000,
  "annual_withdrawal_rate": 3.3,
  "years_of_coverage": 45,
  "coverage_assessment": "well_funded",
  "key_insights": [
    "Retiring at 52 requires planning for 40+ years - longer than traditional retirement",
    "Using a conservative 3.3% rate (vs 4%) to account for longer timeframe",
    "Healthcare costs until Medicare (13 years) will be significant"
  ],
  "recommendations": [
    "Budget $1,500-2,000/month for health insurance until age 65",
    "Keep at least 30% in stocks for growth over long retirement",
    "Consider a 'barbell' strategy: 2 years cash, 28% bonds, 70% stocks",
    "Plan for one-time healthcare event: keep $50,000 emergency medical fund"
  ],
  "confidence_level": "medium"
}
```

### 4. Invalid/Unrealistic Inputs

```typescript
// Validation before calling AI
const validateInput = (input: CalculationInput) => {
  if (input.current_age < 18 || input.current_age > 100) {
    throw new Error('Age must be between 18 and 100')
  }
  if (input.savings_amount < 1000) {
    throw new Error('Minimum savings amount is $1,000')
  }
  if (input.monthly_expenses < 100) {
    throw new Error('Monthly expenses seem too low')
  }
  if (input.retirement_age && input.retirement_age <= input.current_age) {
    throw new Error('Retirement age must be in the future')
  }
  // More validations...
}
```

---

## Optimization Strategies

### 1. Caching Common Scenarios

```typescript
// Cache calculations for similar inputs (optional)
const cacheKey = `${age}-${Math.round(savings/10000)}-${Math.round(expenses/100)}`
// Check cache before calling API
// Store in Redis or database with 24-hour TTL
```

### 2. Cost Optimization

- **Use streaming**: `stream: true` for progressive display
- **Shorter prompts**: Remove unnecessary context
- **Lower temperature**: 0.3 is enough, 0.7 wastes tokens
- **Max tokens**: Cap at 2048, most responses need 1000-1500
- **Retry logic**: Only retry on network errors, not invalid inputs

### 3. Response Time

- **Expected**: 3-5 seconds for calculation
- **Timeout**: Set 10-second timeout on API call
- **User feedback**: Show "Analyzing your retirement plan..." message

---

## Testing Strategy

### Test Cases

```typescript
const testCases = [
  {
    name: 'Typical 65-year-old',
    input: { current_age: 65, savings_amount: 500000, monthly_expenses: 3000 },
    expected_range: { withdrawal: [1500, 2500], rate: [3.5, 4.5] }
  },
  {
    name: 'Early retiree',
    input: { current_age: 50, savings_amount: 1000000, monthly_expenses: 4000 },
    expected_range: { withdrawal: [2500, 3500], rate: [3.0, 4.0] }
  },
  {
    name: 'Underfunded',
    input: { current_age: 65, savings_amount: 100000, monthly_expenses: 3000 },
    expected_range: { withdrawal: [300, 500], rate: [3.5, 4.0] }
  },
  {
    name: 'Over-funded',
    input: { current_age: 65, savings_amount: 5000000, monthly_expenses: 5000 },
    expected_range: { withdrawal: [15000, 20000], rate: [4.0, 5.0] }
  }
]
```

---

## API Route Implementation

```typescript
// app/api/calculate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { calculateRetirement } from '@/lib/ai/calculate'
import { z } from 'zod'

const inputSchema = z.object({
  current_age: z.number().min(18).max(100),
  savings_amount: z.number().min(1000).max(100000000),
  monthly_expenses: z.number().min(100).max(100000),
  retirement_age: z.number().optional(),
  risk_tolerance: z.enum(['conservative', 'moderate', 'aggressive']).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const supabase = createServerClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Parse and validate input
    const body = await request.json()
    const input = inputSchema.parse(body)

    // 3. Call AI calculation
    const result = await calculateRetirement(input)

    // 4. Save to database
    const { error: dbError } = await supabase
      .from('calculations')
      .insert({
        user_id: user.id,
        current_age: input.current_age,
        savings_amount: input.savings_amount,
        monthly_expenses: input.monthly_expenses,
        calculated_withdrawal: result.recommended_monthly_withdrawal,
        ai_advice: JSON.stringify(result),
      })

    if (dbError) {
      console.error('Failed to save calculation:', dbError)
      // Don't fail request, just log error
    }

    // 5. Return result
    return NextResponse.json(result)

  } catch (error) {
    console.error('Calculation error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Calculation failed' },
      { status: 500 }
    )
  }
}
```

---

## Model Configuration

### Recommended Settings

```typescript
const modelConfig = {
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 2048,
  temperature: 0.3, // Lower = more consistent
  top_p: 0.95,      // Default is fine
}
```

### Alternative Models

| Model | Use Case | Cost | Speed |
|-------|----------|------|-------|
| Claude 3.5 Sonnet | Default (best balance) | Medium | Fast |
| Claude 3 Opus | Complex scenarios | High | Slower |
| Claude 3.5 Haiku | Simple lookups | Low | Very fast |

**Recommendation**: Stick with Sonnet for MVP, consider Haiku for lookups like "what was my last calculation?"

---

## Cost Estimation

### Per Calculation

- **Input tokens**: ~800-1000 (prompt + context)
- **Output tokens**: ~1000-1500 (structured response)
- **Total**: ~2000 tokens
- **Cost**: $0.015 - $0.020 per calculation

### Monthly Projections

| Users | Calculations/User | Total Calculations | Cost |
|-------|-------------------|--------------------|------|
| 100 | 3 | 300 | $5-6 |
| 500 | 3 | 1,500 | $25-30 |
| 1,000 | 3 | 3,000 | $50-60 |

**Budget Planning**:
- First 100 users: $10-20
- Scale to 500: $30-50
- Monitor and adjust rate limits if needed

---

## Rate Limiting (Optional for MVP)

```typescript
// Free users: 3 calculations/day
// Paid users: Unlimited

const checkRateLimit = async (userId: string, isPaid: boolean) => {
  if (isPaid) return true

  const { count } = await supabase
    .from('calculations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - 86400000).toISOString())

  return (count || 0) < 3
}
```

---

## Summary

The RetireFree AI system:
- ✅ Uses industry-standard withdrawal strategies (4% rule)
- ✅ Adapts to individual circumstances
- ✅ Provides actionable, specific advice
- ✅ Handles edge cases gracefully
- ✅ Costs ~$0.02 per calculation
- ✅ Returns results in 3-5 seconds
- ✅ Type-safe with validated inputs/outputs

This creates a professional, reliable retirement planning tool that provides real value to users.
