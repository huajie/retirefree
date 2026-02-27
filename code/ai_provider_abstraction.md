# AI Provider Abstraction Layer

## Overview

This document describes the provider abstraction architecture that allows RetireFree to switch between different AI providers (DeepSeek, Claude, OpenAI, Gemini) with minimal code changes.

**Primary Provider**: DeepSeek (85-93% cost savings vs Claude/OpenAI)
**Fallback Providers**: Claude, OpenAI, Gemini

---

## Architecture Pattern

**Strategy Pattern**: Define a common interface, implement multiple providers, select at runtime via configuration.

---

## Core Interface

### File: `packages/shared/ai/types.ts`

```typescript
/**
 * Core AI provider interface that all providers must implement
 */
export interface AIProvider {
  /** Provider name (e.g., "deepseek", "claude", "openai") */
  name: string;

  /** Generate retirement withdrawal advice */
  generateAdvice(params: CalculationParams): Promise<AIResponse>;

  /** Estimate cost for a calculation (for analytics) */
  estimateCost(inputTokens: number, outputTokens: number): number;

  /** Health check to verify API key and connectivity */
  healthCheck(): Promise<boolean>;
}

/**
 * Input parameters for retirement calculation
 */
export interface CalculationParams {
  age: number;
  retirementAge?: number; // Optional, defaults to 65
  savings: number;
  monthlyExpenses: number;
  riskTolerance: 'low' | 'medium' | 'high';
  additionalIncome?: number; // Social Security, pension, etc.
  inflationRate?: number; // Optional override, defaults to 3%
}

/**
 * AI provider response
 */
export interface AIResponse {
  /** Recommended monthly withdrawal amount */
  withdrawalAmount: number;

  /** AI confidence level (0-1) */
  confidence: number;

  /** Plain English advice for the user */
  advice: string;

  /** Detailed reasoning (for display or debugging) */
  reasoning: string;

  /** Token usage for cost tracking */
  usage: {
    inputTokens: number;
    outputTokens: number;
    estimatedCost: number;
  };

  /** Response time in milliseconds */
  responseTimeMs: number;
}

/**
 * Provider configuration
 */
export interface ProviderConfig {
  provider: 'deepseek' | 'claude' | 'openai' | 'gemini';
  apiKey: string;
  fallbackProvider?: 'deepseek' | 'claude' | 'openai' | 'gemini';
  timeout?: number; // Request timeout in ms
  maxRetries?: number;
}
```

---

## Provider Implementations

### 1. DeepSeek Provider (Primary)

**File**: `packages/shared/ai/providers/deepseek.ts`

```typescript
import { AIProvider, CalculationParams, AIResponse } from '../types';

export class DeepSeekProvider implements AIProvider {
  name = 'deepseek';
  private apiKey: string;
  private baseUrl = 'https://api.deepseek.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateAdvice(params: CalculationParams): Promise<AIResponse> {
    const startTime = Date.now();

    const prompt = this.buildPrompt(params);

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3, // Lower for more consistent financial advice
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseTimeMs = Date.now() - startTime;

    // Parse structured response
    const result = this.parseResponse(data.choices[0].message.content);

    return {
      ...result,
      usage: {
        inputTokens: data.usage.prompt_tokens,
        outputTokens: data.usage.completion_tokens,
        estimatedCost: this.estimateCost(
          data.usage.prompt_tokens,
          data.usage.completion_tokens
        ),
      },
      responseTimeMs,
    };
  }

  estimateCost(inputTokens: number, outputTokens: number): number {
    // DeepSeek pricing: $0.27 per 1M input, $1.10 per 1M output
    const inputCost = (inputTokens / 1_000_000) * 0.27;
    const outputCost = (outputTokens / 1_000_000) * 1.10;
    return inputCost + outputCost;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: { 'Authorization': `Bearer ${this.apiKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private buildPrompt(params: CalculationParams): string {
    return `Calculate a safe retirement withdrawal strategy for:
- Current age: ${params.age}
- Retirement age: ${params.retirementAge || 65}
- Total savings: $${params.savings.toLocaleString()}
- Monthly expenses: $${params.monthlyExpenses.toLocaleString()}
- Risk tolerance: ${params.riskTolerance}
${params.additionalIncome ? `- Additional monthly income: $${params.additionalIncome}` : ''}

Provide your response in JSON format:
{
  "withdrawalAmount": <monthly withdrawal amount>,
  "confidence": <0-1>,
  "advice": "<plain English advice>",
  "reasoning": "<detailed explanation>"
}`;
  }

  private parseResponse(content: string): Omit<AIResponse, 'usage' | 'responseTimeMs'> {
    // Extract JSON from markdown code blocks if present
    const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) ||
                      content.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const parsed = JSON.parse(jsonMatch[1]);
    return {
      withdrawalAmount: parsed.withdrawalAmount,
      confidence: parsed.confidence,
      advice: parsed.advice,
      reasoning: parsed.reasoning,
    };
  }
}

const SYSTEM_PROMPT = `You are a retirement planning expert. Calculate safe withdrawal rates using:
1. 4% rule as baseline (adjusted for age)
2. Longevity risk (assume living to 95)
3. Market volatility buffer based on risk tolerance
4. Inflation adjustment (3% annual)

Be conservative with low risk tolerance, balanced with medium, slightly aggressive with high.
Always return valid JSON with all required fields.`;
```

---

### 2. Claude Provider (Fallback/Premium)

**File**: `packages/shared/ai/providers/claude.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { AIProvider, CalculationParams, AIResponse } from '../types';

export class ClaudeProvider implements AIProvider {
  name = 'claude';
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateAdvice(params: CalculationParams): Promise<AIResponse> {
    const startTime = Date.now();

    const prompt = this.buildPrompt(params);

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      temperature: 0.3,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseTimeMs = Date.now() - startTime;
    const content = response.content[0].type === 'text' ? response.content[0].text : '';

    const result = this.parseResponse(content);

    return {
      ...result,
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        estimatedCost: this.estimateCost(
          response.usage.input_tokens,
          response.usage.output_tokens
        ),
      },
      responseTimeMs,
    };
  }

  estimateCost(inputTokens: number, outputTokens: number): number {
    // Claude pricing: $3 per 1M input, $15 per 1M output
    const inputCost = (inputTokens / 1_000_000) * 3;
    const outputCost = (outputTokens / 1_000_000) * 15;
    return inputCost + outputCost;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'test' }],
      });
      return true;
    } catch {
      return false;
    }
  }

  private buildPrompt(params: CalculationParams): string {
    // Same as DeepSeek
    return `Calculate a safe retirement withdrawal strategy for:
- Current age: ${params.age}
- Retirement age: ${params.retirementAge || 65}
- Total savings: $${params.savings.toLocaleString()}
- Monthly expenses: $${params.monthlyExpenses.toLocaleString()}
- Risk tolerance: ${params.riskTolerance}
${params.additionalIncome ? `- Additional monthly income: $${params.additionalIncome}` : ''}

Provide your response in JSON format:
{
  "withdrawalAmount": <monthly withdrawal amount>,
  "confidence": <0-1>,
  "advice": "<plain English advice>",
  "reasoning": "<detailed explanation>"
}`;
  }

  private parseResponse(content: string): Omit<AIResponse, 'usage' | 'responseTimeMs'> {
    const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) ||
                      content.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const parsed = JSON.parse(jsonMatch[1]);
    return {
      withdrawalAmount: parsed.withdrawalAmount,
      confidence: parsed.confidence,
      advice: parsed.advice,
      reasoning: parsed.reasoning,
    };
  }
}

const SYSTEM_PROMPT = `You are a retirement planning expert. Calculate safe withdrawal rates using:
1. 4% rule as baseline (adjusted for age)
2. Longevity risk (assume living to 95)
3. Market volatility buffer based on risk tolerance
4. Inflation adjustment (3% annual)

Be conservative with low risk tolerance, balanced with medium, slightly aggressive with high.
Always return valid JSON with all required fields.`;
```

---

### 3. OpenAI Provider

**File**: `packages/shared/ai/providers/openai.ts`

```typescript
import OpenAI from 'openai';
import { AIProvider, CalculationParams, AIResponse } from '../types';

export class OpenAIProvider implements AIProvider {
  name = 'openai';
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateAdvice(params: CalculationParams): Promise<AIResponse> {
    const startTime = Date.now();

    const prompt = this.buildPrompt(params);

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1500,
      response_format: { type: 'json_object' }, // Force JSON output
    });

    const responseTimeMs = Date.now() - startTime;
    const content = response.choices[0].message.content || '{}';

    const parsed = JSON.parse(content);

    return {
      withdrawalAmount: parsed.withdrawalAmount,
      confidence: parsed.confidence,
      advice: parsed.advice,
      reasoning: parsed.reasoning,
      usage: {
        inputTokens: response.usage?.prompt_tokens || 0,
        outputTokens: response.usage?.completion_tokens || 0,
        estimatedCost: this.estimateCost(
          response.usage?.prompt_tokens || 0,
          response.usage?.completion_tokens || 0
        ),
      },
      responseTimeMs,
    };
  }

  estimateCost(inputTokens: number, outputTokens: number): number {
    // GPT-4o pricing: $2.50 per 1M input, $10 per 1M output
    const inputCost = (inputTokens / 1_000_000) * 2.50;
    const outputCost = (outputTokens / 1_000_000) * 10;
    return inputCost + outputCost;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.client.models.retrieve('gpt-4o');
      return true;
    } catch {
      return false;
    }
  }

  private buildPrompt(params: CalculationParams): string {
    return `Calculate a safe retirement withdrawal strategy for:
- Current age: ${params.age}
- Retirement age: ${params.retirementAge || 65}
- Total savings: $${params.savings.toLocaleString()}
- Monthly expenses: $${params.monthlyExpenses.toLocaleString()}
- Risk tolerance: ${params.riskTolerance}
${params.additionalIncome ? `- Additional monthly income: $${params.additionalIncome}` : ''}

Provide your response in JSON format:
{
  "withdrawalAmount": <monthly withdrawal amount>,
  "confidence": <0-1>,
  "advice": "<plain English advice>",
  "reasoning": "<detailed explanation>"
}`;
  }
}

const SYSTEM_PROMPT = `You are a retirement planning expert. Calculate safe withdrawal rates using:
1. 4% rule as baseline (adjusted for age)
2. Longevity risk (assume living to 95)
3. Market volatility buffer based on risk tolerance
4. Inflation adjustment (3% annual)

Be conservative with low risk tolerance, balanced with medium, slightly aggressive with high.
Always return valid JSON with all required fields.`;
```

---

### 4. Gemini Provider

**File**: `packages/shared/ai/providers/gemini.ts`

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider, CalculationParams, AIResponse } from '../types';

export class GeminiProvider implements AIProvider {
  name = 'gemini';
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateAdvice(params: CalculationParams): Promise<AIResponse> {
    const startTime = Date.now();

    const model = this.client.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = this.buildPrompt(params);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const content = response.text();

    const responseTimeMs = Date.now() - startTime;

    const parsed = this.parseResponse(content);

    // Gemini doesn't provide token counts in free tier, estimate
    const inputTokens = Math.ceil(prompt.length / 4);
    const outputTokens = Math.ceil(content.length / 4);

    return {
      ...parsed,
      usage: {
        inputTokens,
        outputTokens,
        estimatedCost: this.estimateCost(inputTokens, outputTokens),
      },
      responseTimeMs,
    };
  }

  estimateCost(inputTokens: number, outputTokens: number): number {
    // Gemini pricing: $1.25 per 1M input, $5 per 1M output
    const inputCost = (inputTokens / 1_000_000) * 1.25;
    const outputCost = (outputTokens / 1_000_000) * 5;
    return inputCost + outputCost;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-1.5-pro' });
      await model.generateContent('test');
      return true;
    } catch {
      return false;
    }
  }

  private buildPrompt(params: CalculationParams): string {
    return `${SYSTEM_PROMPT}

Calculate a safe retirement withdrawal strategy for:
- Current age: ${params.age}
- Retirement age: ${params.retirementAge || 65}
- Total savings: $${params.savings.toLocaleString()}
- Monthly expenses: $${params.monthlyExpenses.toLocaleString()}
- Risk tolerance: ${params.riskTolerance}
${params.additionalIncome ? `- Additional monthly income: $${params.additionalIncome}` : ''}

Provide your response in JSON format:
{
  "withdrawalAmount": <monthly withdrawal amount>,
  "confidence": <0-1>,
  "advice": "<plain English advice>",
  "reasoning": "<detailed explanation>"
}`;
  }

  private parseResponse(content: string): Omit<AIResponse, 'usage' | 'responseTimeMs'> {
    const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) ||
                      content.match(/(\{[\s\S]*\})/);

    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const parsed = JSON.parse(jsonMatch[1]);
    return {
      withdrawalAmount: parsed.withdrawalAmount,
      confidence: parsed.confidence,
      advice: parsed.advice,
      reasoning: parsed.reasoning,
    };
  }
}

const SYSTEM_PROMPT = `You are a retirement planning expert. Calculate safe withdrawal rates using:
1. 4% rule as baseline (adjusted for age)
2. Longevity risk (assume living to 95)
3. Market volatility buffer based on risk tolerance
4. Inflation adjustment (3% annual)

Be conservative with low risk tolerance, balanced with medium, slightly aggressive with high.
Always return valid JSON with all required fields.`;
```

---

## Provider Factory

**File**: `packages/shared/ai/provider-factory.ts`

```typescript
import { AIProvider, ProviderConfig } from './types';
import { DeepSeekProvider } from './providers/deepseek';
import { ClaudeProvider } from './providers/claude';
import { OpenAIProvider } from './providers/openai';
import { GeminiProvider } from './providers/gemini';

export class ProviderFactory {
  /**
   * Create an AI provider instance based on configuration
   */
  static create(config: ProviderConfig): AIProvider {
    switch (config.provider) {
      case 'deepseek':
        return new DeepSeekProvider(config.apiKey);
      case 'claude':
        return new ClaudeProvider(config.apiKey);
      case 'openai':
        return new OpenAIProvider(config.apiKey);
      case 'gemini':
        return new GeminiProvider(config.apiKey);
      default:
        throw new Error(`Unknown provider: ${config.provider}`);
    }
  }

  /**
   * Create provider with automatic fallback
   */
  static createWithFallback(
    primary: ProviderConfig,
    fallback?: ProviderConfig
  ): AIProviderWithFallback {
    const primaryProvider = this.create(primary);
    const fallbackProvider = fallback ? this.create(fallback) : undefined;

    return new AIProviderWithFallback(primaryProvider, fallbackProvider);
  }
}

/**
 * Wrapper that adds fallback logic
 */
class AIProviderWithFallback implements AIProvider {
  name: string;

  constructor(
    private primary: AIProvider,
    private fallback?: AIProvider
  ) {
    this.name = `${primary.name}${fallback ? `+${fallback.name}` : ''}`;
  }

  async generateAdvice(params: any): Promise<any> {
    try {
      return await this.primary.generateAdvice(params);
    } catch (error) {
      if (this.fallback) {
        console.warn(`Primary provider ${this.primary.name} failed, using fallback ${this.fallback.name}`);
        return await this.fallback.generateAdvice(params);
      }
      throw error;
    }
  }

  estimateCost(inputTokens: number, outputTokens: number): number {
    return this.primary.estimateCost(inputTokens, outputTokens);
  }

  async healthCheck(): Promise<boolean> {
    const primaryHealthy = await this.primary.healthCheck();
    if (primaryHealthy) return true;

    if (this.fallback) {
      return await this.fallback.healthCheck();
    }

    return false;
  }
}
```

---

## API Route Integration

**File**: `apps/web/app/api/calculate/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { ProviderFactory } from '@retirewise/shared/ai';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const CalculationSchema = z.object({
  age: z.number().min(18).max(100),
  savings: z.number().min(0),
  monthlyExpenses: z.number().min(0),
  riskTolerance: z.enum(['low', 'medium', 'high']),
});

export async function POST(request: Request) {
  try {
    // Parse and validate input
    const body = await request.json();
    const params = CalculationSchema.parse(body);

    // Check authentication
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create AI provider (reads from env vars)
    const provider = ProviderFactory.create({
      provider: (process.env.AI_PROVIDER as any) || 'deepseek',
      apiKey: getApiKey(process.env.AI_PROVIDER || 'deepseek'),
    });

    // Generate advice
    const result = await provider.generateAdvice(params);

    // Save to database
    await supabase.from('calculations').insert({
      user_id: user.id,
      current_age: params.age,
      savings_amount: params.savings,
      monthly_expenses: params.monthlyExpenses,
      calculated_withdrawal: result.withdrawalAmount,
      ai_provider: provider.name,
      ai_advice: result.advice,
      ai_reasoning: result.reasoning,
      platform: request.headers.get('x-platform') || 'web',
    });

    // Track usage for analytics
    await supabase.from('ai_provider_usage').insert({
      provider: provider.name,
      input_tokens: result.usage.inputTokens,
      output_tokens: result.usage.outputTokens,
      estimated_cost: result.usage.estimatedCost,
      response_time_ms: result.responseTimeMs,
    });

    return NextResponse.json({
      success: true,
      data: {
        withdrawalAmount: result.withdrawalAmount,
        advice: result.advice,
        confidence: result.confidence,
      },
    });
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { error: 'Calculation failed' },
      { status: 500 }
    );
  }
}

function getApiKey(provider: string): string {
  switch (provider) {
    case 'deepseek':
      return process.env.DEEPSEEK_API_KEY!;
    case 'claude':
      return process.env.CLAUDE_API_KEY!;
    case 'openai':
      return process.env.OPENAI_API_KEY!;
    case 'gemini':
      return process.env.GEMINI_API_KEY!;
    default:
      throw new Error(`No API key configured for provider: ${provider}`);
  }
}
```

---

## Environment Variables

**File**: `.env.local` (development)

```bash
# Primary AI provider
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=sk-xxx

# Fallback providers (optional)
CLAUDE_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx
GEMINI_API_KEY=xxx

# Feature flags
ENABLE_PROVIDER_FALLBACK=true
ALLOW_USER_PROVIDER_SELECTION=false
```

**File**: `apps/web/.env.example`

```bash
# AI Configuration
AI_PROVIDER=deepseek # deepseek, claude, openai, gemini
DEEPSEEK_API_KEY=

# Optional: Fallback providers
# CLAUDE_API_KEY=
# OPENAI_API_KEY=
# GEMINI_API_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
RESEND_API_KEY=
```

---

## Switching Providers

### Method 1: Environment Variable

```bash
# Change in .env.local
AI_PROVIDER=claude
CLAUDE_API_KEY=sk-ant-xxx
```

Restart the Next.js dev server, no code changes needed.

### Method 2: Database-Driven (Future Enhancement)

```typescript
// Store provider preference per user
const userProvider = await supabase
  .from('user_settings')
  .select('ai_provider')
  .eq('user_id', user.id)
  .single();

const provider = ProviderFactory.create({
  provider: userProvider.data.ai_provider || 'deepseek',
  apiKey: getApiKey(userProvider.data.ai_provider),
});
```

### Method 3: A/B Testing

```typescript
// Randomly assign provider for testing
const providers: Array<'deepseek' | 'claude'> = ['deepseek', 'claude'];
const randomProvider = providers[Math.floor(Math.random() * providers.length)];

const provider = ProviderFactory.create({
  provider: randomProvider,
  apiKey: getApiKey(randomProvider),
});
```

---

## Cost Monitoring Dashboard

**File**: `apps/web/app/api/admin/ai-costs/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();

  // Aggregate costs by provider
  const { data } = await supabase
    .from('ai_provider_usage')
    .select('provider, estimated_cost, created_at')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  const costsByProvider = data?.reduce((acc, row) => {
    acc[row.provider] = (acc[row.provider] || 0) + row.estimated_cost;
    return acc;
  }, {} as Record<string, number>);

  return NextResponse.json({
    last30Days: costsByProvider,
    total: Object.values(costsByProvider || {}).reduce((a, b) => a + b, 0),
  });
}
```

---

## Testing

**File**: `packages/shared/ai/__tests__/providers.test.ts`

```typescript
import { describe, test, expect } from '@jest/globals';
import { DeepSeekProvider } from '../providers/deepseek';

describe('DeepSeekProvider', () => {
  test('should calculate retirement advice', async () => {
    const provider = new DeepSeekProvider(process.env.DEEPSEEK_API_KEY!);

    const result = await provider.generateAdvice({
      age: 62,
      savings: 500000,
      monthlyExpenses: 3500,
      riskTolerance: 'medium',
    });

    expect(result.withdrawalAmount).toBeGreaterThan(0);
    expect(result.confidence).toBeGreaterThan(0);
    expect(result.advice).toBeTruthy();
    expect(result.usage.estimatedCost).toBeLessThan(0.01); // Should be < 1 cent
  });

  test('should estimate costs correctly', () => {
    const provider = new DeepSeekProvider('test-key');

    const cost = provider.estimateCost(500, 1500);

    // 500 input * $0.27/1M + 1500 output * $1.10/1M = $0.00165
    expect(cost).toBeCloseTo(0.00165, 5);
  });
});
```

---

## Migration Plan

### Phase 1: Current State (Using Claude)
- RetireFree currently uses Claude API
- Cost: ~$10-20 per 100 calculations

### Phase 2: Add Abstraction Layer (Week 1)
1. Create `packages/shared/ai/` folder structure
2. Implement provider interface and DeepSeek provider
3. Update `/api/calculate` route to use factory
4. Keep Claude as fallback initially

### Phase 3: Switch to DeepSeek (Week 2)
1. Change `AI_PROVIDER=deepseek` in environment
2. Monitor quality and costs for 1 week
3. Compare responses side-by-side

### Phase 4: Remove Claude (Week 3+)
1. Once confident in DeepSeek quality
2. Remove Claude API key to save costs
3. Keep abstraction layer for future flexibility

---

## Summary

**Benefits:**
- ✅ 85-93% cost reduction (DeepSeek vs Claude/OpenAI)
- ✅ Easy switching between providers (1 env var change)
- ✅ Built-in fallback mechanism
- ✅ Cost tracking and monitoring
- ✅ Future-proof for new AI models

**Estimated Savings:**
- Month 1: $10-20 → $2-5 (saves $8-15)
- Year 1: $120-240 → $24-60 (saves $96-180)

**Implementation Time**: 3-4 hours to build abstraction layer + migrate existing code.
