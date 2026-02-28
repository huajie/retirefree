import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Calculate Your Safe Withdrawal Rate | RetireFree',
  description: 'Step-by-step guide to calculating a personalized safe withdrawal rate for your retirement. Includes factors to consider and free calculator tool.',
  keywords: 'safe withdrawal rate calculator, retirement planning, withdrawal strategy, Monte Carlo simulation',
  openGraph: {
    title: 'How to Calculate Your Safe Withdrawal Rate',
    description: 'Personalized approach to finding your ideal retirement withdrawal rate',
    type: 'article',
    publishedTime: '2026-02-28',
  }
}

export default function SafeWithdrawalCalculatorPage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <header className="mb-12">
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/blog" className="hover:text-blue-600">Blog</Link> / Planning Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How to Calculate Your Safe Withdrawal Rate
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <time dateTime="2026-02-28">February 28, 2026</time>
            <span>·</span>
            <span>6 min read</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            The 4% rule is a starting point, but <strong>your safe withdrawal rate depends on YOUR specific situation</strong>. Here's how to calculate a personalized rate that fits your retirement.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">What Determines YOUR Safe Withdrawal Rate?</h2>

          <p>Your safe withdrawal rate isn't one-size-fits-all. It depends on:</p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">1. Retirement Timeline</h3>
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <ul className="space-y-2">
              <li><strong>20 years:</strong> 4.5-5.0% may be safe</li>
              <li><strong>30 years:</strong> 3.5-4.0% recommended</li>
              <li><strong>40+ years:</strong> 3.0-3.5% to be conservative</li>
            </ul>
          </div>
          <p className="italic">
            Longer retirements = lower safe withdrawal rates
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">2. Portfolio Allocation</h3>
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <ul className="space-y-2">
              <li><strong>Conservative (30/70 stocks/bonds):</strong> ~3.0%</li>
              <li><strong>Balanced (60/40 stocks/bonds):</strong> ~3.5%</li>
              <li><strong>Aggressive (80/20 stocks/bonds):</strong> ~4.0%</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">3. Other Income Sources</h3>
          <p>Do you have Social Security, pension, or rental income?</p>
          <p><strong>Example:</strong></p>
          <ul>
            <li>Total needs: $60,000/year</li>
            <li>Social Security: $25,000/year</li>
            <li>From portfolio: $35,000/year</li>
            <li>If portfolio = $1M → Effective rate = 3.5%</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4">4. Current Market Valuations</h3>
          <p>Starting retirement when markets are expensive (high P/E ratios) historically requires lower withdrawal rates.</p>
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-6">
            <p><strong>2026 Update:</strong> With current valuations, most experts recommend 0.3-0.7% lower than historical averages.</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">5. Spending Flexibility</h3>
          <p>Can you cut spending during market downturns?</p>
          <ul>
            <li><strong>Fixed expenses only:</strong> Use conservative rate (3.0-3.3%)</li>
            <li><strong>Some flexibility:</strong> Can use higher rate (3.5-4.0%)</li>
            <li><strong>Very flexible:</strong> Dynamic withdrawals work well</li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-6">Step-by-Step: Calculate Your Rate</h2>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
            <h4 className="font-bold text-lg mb-4">Method 1: Quick Estimate (5 minutes)</h4>

            <p className="mb-4"><strong>Step 1:</strong> Determine your baseline</p>
            <ul className="mb-4">
              <li>30-year retirement: Start with 3.5%</li>
              <li>40-year retirement: Start with 3.0%</li>
            </ul>

            <p className="mb-4"><strong>Step 2:</strong> Adjust for your portfolio</p>
            <ul className="mb-4">
              <li>More aggressive (80%+ stocks): +0.3%</li>
              <li>More conservative (&lt;50% stocks): -0.3%</li>
            </ul>

            <p className="mb-4"><strong>Step 3:</strong> Factor in flexibility</p>
            <ul className="mb-4">
              <li>Can cut spending 10-20%: +0.3%</li>
              <li>Fixed expenses only: -0.2%</li>
            </ul>

            <p className="mb-4"><strong>Step 4:</strong> Consider other income</p>
            <ul>
              <li>Significant Social Security/pension: +0.3%</li>
              <li>No other income: -0.2%</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
            <h4 className="font-bold text-lg mb-4">Method 2: Precise Calculation (Use Our Calculator)</h4>
            <p className="mb-4">
              For a more accurate, personalized rate, use Monte Carlo simulation that accounts for:
            </p>
            <ul className="mb-4">
              <li>Your exact age and life expectancy</li>
              <li>Specific portfolio allocation</li>
              <li>Current market conditions</li>
              <li>Social Security timing</li>
              <li>Inflation assumptions</li>
              <li>Sequence of returns risk</li>
            </ul>
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
            >
              Try Our Free Calculator →
            </Link>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Real Example: Meet Sarah</h2>

          <div className="bg-gray-50 p-8 rounded-lg my-8">
            <p className="mb-4"><strong>Sarah's Situation:</strong></p>
            <ul className="space-y-2 mb-6">
              <li>Age: 62</li>
              <li>Portfolio: $800,000</li>
              <li>Social Security: $24,000/year (starts at 65)</li>
              <li>Desired spending: $50,000/year</li>
              <li>Portfolio allocation: 60/40 stocks/bonds</li>
              <li>Spending flexibility: Can cut 15% if needed</li>
            </ul>

            <p className="mb-4"><strong>Sarah's Calculation:</strong></p>
            <ol className="space-y-2 mb-6">
              <li>1. Baseline (30 years): 3.5%</li>
              <li>2. Balanced portfolio: +0%</li>
              <li>3. Has flexibility: +0.3%</li>
              <li>4. Has Social Security: +0.2%</li>
              <li>5. <strong>Total: 4.0%</strong></li>
            </ol>

            <p className="font-semibold text-green-700">
              Sarah can safely withdraw $32,000/year from her portfolio (4.0% of $800K), plus $24,000 Social Security = $56,000 total
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Common Mistakes to Avoid</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-4">❌ Mistake #1: Using the Same Rate Forever</h3>
          <p>
            Review your withdrawal rate annually. If markets crash or you live longer than expected, adjust.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">❌ Mistake #2: Ignoring Social Security</h3>
          <p>
            Don't include Social Security in your portfolio when calculating withdrawal rate. Calculate separately.
          </p>
          <div className="bg-red-50 p-4 rounded-lg my-4">
            <p className="font-semibold">Wrong:</p>
            <p>Portfolio $800K + SS $24K = $824K total, withdraw 4% = $32,960</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg my-4">
            <p className="font-semibold">Right:</p>
            <p>Portfolio $800K × 4% = $32K from portfolio + $24K SS = $56K total</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">❌ Mistake #3: Not Stress Testing</h3>
          <p>
            Run scenarios: What if stocks drop 40% year 1? What if you live to 100? What if inflation hits 6%?
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Tools to Help You</h2>

          <div className="space-y-6 my-8">
            <div className="border-l-4 border-blue-600 bg-blue-50 p-6">
              <h4 className="font-bold text-lg mb-2">RetireFree Calculator (Free)</h4>
              <p className="mb-4">
                AI-powered Monte Carlo simulation with current market data. Get your personalized safe withdrawal rate in 2 minutes.
              </p>
              <Link href="/" className="text-blue-600 font-semibold hover:underline">
                Try Calculator →
              </Link>
            </div>

            <div className="border-l-4 border-gray-400 bg-gray-50 p-6">
              <h4 className="font-bold text-lg mb-2">FIRECalc</h4>
              <p>Historical simulation tool using actual market data from 1871-present</p>
            </div>

            <div className="border-l-4 border-gray-400 bg-gray-50 p-6">
              <h4 className="font-bold text-lg mb-2">Vanguard Retirement Income Calculator</h4>
              <p>Conservative estimates from a trusted source</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Dynamic Withdrawal Strategies</h2>

          <p>Instead of a fixed percentage, consider these approaches:</p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Guardrails Method</h3>
          <ul>
            <li>Start with 4%</li>
            <li>If portfolio falls 20% from peak: Cut spending 10%</li>
            <li>If portfolio rises 20% from trough: Increase spending 10%</li>
            <li>Stay within guardrails</li>
          </ul>
          <p className="text-green-700 font-semibold">Success rate: 95%+</p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">RMD-Based Method</h3>
          <p>Use IRS Required Minimum Distribution percentages:</p>
          <ul>
            <li>Age 65: 3.9%</li>
            <li>Age 70: 4.4%</li>
            <li>Age 75: 4.7%</li>
            <li>Age 80: 5.3%</li>
          </ul>
          <p className="text-green-700 font-semibold">Benefit: You'll never run out (adjusts with portfolio)</p>

          {/* Calculator CTA */}
          <div className="bg-blue-600 text-white rounded-lg p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Calculate Your Safe Withdrawal Rate?
            </h3>
            <p className="mb-6">
              Stop guessing. Get a personalized, data-driven withdrawal rate based on YOUR situation and current market conditions.
            </p>
            <Link
              href="/"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              Try Free Calculator →
            </Link>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Bottom Line</h2>

          <p className="text-lg">
            Your safe withdrawal rate is <strong>personal</strong>. It depends on your timeline, portfolio, flexibility, and other income.
          </p>

          <p><strong>Quick Guidelines for 2026:</strong></p>
          <ul>
            <li>Conservative: 3.0-3.3%</li>
            <li>Moderate: 3.5-3.8%</li>
            <li>Aggressive: 4.0% with flexibility</li>
          </ul>

          <p className="text-lg font-semibold bg-yellow-50 p-4 rounded-lg mt-8">
            🎯 Most important: Use a calculator with Monte Carlo simulation to account for YOUR specific situation, not just historical averages.
          </p>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <p className="text-sm text-gray-600">
              <strong>About RetireFree:</strong> Our AI-powered calculator uses Monte Carlo simulation with 10,000 scenarios to find your personalized safe withdrawal rate. Free trial, no credit card required.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="space-y-4">
              <Link href="/blog/4-percent-rule-2026" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <h4 className="font-semibold text-lg text-blue-600">Is the 4% Rule Still Safe in 2026? →</h4>
              </Link>
              <Link href="/blog/retirement-withdrawal-mistakes" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <h4 className="font-semibold text-lg text-blue-600">7 Deadly Retirement Withdrawal Mistakes →</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
