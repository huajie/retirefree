import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '401k Withdrawal Calculator - Smart Retirement Withdrawal Strategy | RetireFree',
  description: 'Free 401k withdrawal calculator. Optimize your retirement withdrawals, minimize taxes, and plan for RMDs. Calculate the right withdrawal order for Traditional and Roth accounts.',
  keywords: '401k withdrawal calculator, 401k retirement withdrawal, traditional ira withdrawal, roth ira withdrawal strategy, rmd calculator, retirement withdrawal order',
  openGraph: {
    title: '401k Withdrawal Calculator - Optimize Your Retirement Taxes',
    description: 'Calculate the optimal 401k withdrawal strategy to minimize taxes and maximize your retirement income',
    type: 'website',
  }
}

export default function FourZeroOneKWithdrawalPage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link> / Calculators
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            401k Withdrawal Calculator
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Smart withdrawal strategies for your 401k, Traditional IRA, and Roth IRA. Minimize taxes, plan for RMDs, and make your retirement savings last.
          </p>
        </header>

        {/* Calculator CTA */}
        <div className="bg-blue-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Calculate Your Optimal 401k Withdrawal Strategy
          </h2>
          <p className="mb-6">
            Our AI-powered calculator factors in your Traditional and Roth accounts, current tax bracket, RMDs, and more to create a personalized withdrawal plan.
          </p>
          <Link
            href="/#calculator"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Try Free Calculator →
          </Link>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mt-12 mb-6">The #1 Mistake: Withdrawing from the Wrong Account First</h2>

          <p className="text-lg">
            You've got $500,000 saved across your Traditional 401k, Roth IRA, and maybe a taxable brokerage account. <strong>Which do you withdraw from first?</strong>
          </p>

          <p>
            Most retirees get this wrong—and it costs them <strong>hundreds of thousands</strong> in unnecessary taxes over a 30-year retirement.
          </p>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 my-8">
            <p className="font-semibold text-lg mb-2">❌ Common Mistake:</p>
            <p className="mb-2">"I'll withdraw from my Roth IRA first since it's tax-free!"</p>
            <p className="font-semibold text-red-700">Cost: ~$200,000 in extra taxes over 30 years</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Right Withdrawal Order (Save $200K+)</h2>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
            <p className="font-semibold text-lg mb-4">✅ Optimal Withdrawal Order:</p>
            <ol className="space-y-3">
              <li><strong>1. Required Minimum Distributions (RMDs)</strong> - You must take these first (starts at age 73)</li>
              <li><strong>2. Taxable brokerage accounts</strong> - Taxed at lower capital gains rate (0-20%)</li>
              <li><strong>3. Traditional 401k/IRA</strong> - Taxed as ordinary income (10-37%)</li>
              <li><strong>4. Roth IRA</strong> - Save for last! Tax-free growth is too valuable</li>
            </ol>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Why This Order Matters</h3>

          <p><strong>Roth IRA grows tax-free forever.</strong> Every year you leave it untouched, it compounds without taxes eating into gains.</p>

          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <p className="font-semibold mb-4">Real Example:</p>
            <p className="mb-2"><strong>Scenario:</strong> You have $200K in Roth IRA at age 65</p>
            <p className="mb-2"><strong>Option A:</strong> Withdraw from Roth first → It's gone by age 75</p>
            <p className="mb-2"><strong>Option B:</strong> Save Roth for last → Grows to $380K by age 75 (7% return)</p>
            <p className="text-green-700 font-bold mt-4">Difference: $180,000 more in retirement funds!</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Understanding Required Minimum Distributions (RMDs)</h2>

          <p>Starting at age 73, the IRS <strong>forces</strong> you to withdraw from Traditional 401k/IRA accounts.</p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">RMD Percentages by Age</h3>

          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <ul className="space-y-2">
              <li><strong>Age 73:</strong> 3.77% of account balance</li>
              <li><strong>Age 75:</strong> 4.07%</li>
              <li><strong>Age 80:</strong> 5.35%</li>
              <li><strong>Age 85:</strong> 6.76%</li>
              <li><strong>Age 90:</strong> 8.77%</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-8">
            <p className="font-semibold text-lg mb-2">⚠️ Miss an RMD?</p>
            <p className="mb-2">Penalty: <strong>50% of the amount you should have withdrawn</strong></p>
            <p className="text-sm">Example: Should have withdrawn $20K but forgot? That's a $10K penalty (plus you still owe taxes on the $20K).</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Smart RMD Planning</h3>

          <ul>
            <li><strong>Set calendar reminders</strong> for December each year</li>
            <li><strong>Consider Roth conversions</strong> in your 60s (before RMDs start)</li>
            <li><strong>Donate to charity</strong> using Qualified Charitable Distributions (QCDs) to avoid taxes</li>
            <li><strong>Use automated RMD services</strong> from Vanguard, Fidelity, Schwab</li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-6">Traditional vs Roth: Which to Tap First?</h2>

          <p>You have both Traditional and Roth accounts. Here's when to use each:</p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Withdraw from Traditional 401k/IRA When:</h3>
          <ul>
            <li>You're in a <strong>low tax bracket</strong> (10-12%)</li>
            <li>You need to fill up the lower tax brackets before Social Security kicks in</li>
            <li>You're under 73 and want to reduce future RMDs</li>
            <li>You're doing strategic Roth conversions</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Keep Roth Untouched When:</h3>
          <ul>
            <li>You have other income sources (Social Security, pension)</li>
            <li>You're already in the 22%+ tax bracket</li>
            <li>You want to leave tax-free money to heirs</li>
            <li>You expect higher taxes in the future</li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-6">Tax Bracket Management Strategy</h2>

          <p>Smart retirees "fill up" lower tax brackets each year without jumping to the next bracket.</p>

          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <p className="font-semibold mb-4">Example: Tax Bracket Optimization</p>
            <p className="mb-2"><strong>Your situation:</strong></p>
            <ul className="mb-4">
              <li>Married filing jointly</li>
              <li>Social Security: $30,000/year</li>
              <li>12% bracket ends at $89,075 (2026)</li>
            </ul>
            <p className="mb-2"><strong>Smart strategy:</strong></p>
            <p className="mb-2">Withdraw from Traditional IRA to stay under $89,075 total income</p>
            <p className="mb-2">Max withdrawal from Traditional: ~$59K (stays in 12% bracket)</p>
            <p className="text-green-700 font-semibold">Saves thousands vs withdrawing more and jumping to 22% bracket</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Common 401k Withdrawal Mistakes (And How to Avoid Them)</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Mistake #1: Forgetting About the 5-Year Rule</h3>
          <p>
            Converted Roth funds must sit for 5 years before you can withdraw them penalty-free (if you're under 59½).
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Mistake #2: Not Considering State Taxes</h3>
          <p>
            Some states don't tax retirement income. If you're in a high-tax state, this matters! California taxes all retirement withdrawals. Florida and Texas don't.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Mistake #3: Taking Too Much Too Early</h3>
          <p>
            Withdrawing large amounts in your 60s might push you into higher tax brackets. Better to spread withdrawals evenly across 30 years.
          </p>

          <div className="bg-red-50 p-6 rounded-lg my-8">
            <p className="font-semibold mb-2">Bad Strategy:</p>
            <p className="mb-2">Age 62-65: Withdraw $100K/year from Traditional IRA (24% tax bracket)</p>
            <p className="mb-2">Age 65+: Live off Social Security + taxable accounts</p>
            <p className="text-red-700 font-semibold">Result: Pay ~$24K/year in taxes unnecessarily</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg my-8">
            <p className="font-semibold mb-2">Better Strategy:</p>
            <p className="mb-2">Age 62-92: Withdraw $40K/year from Traditional IRA (12% tax bracket)</p>
            <p className="mb-2">Supplement with taxable accounts as needed</p>
            <p className="text-green-700 font-semibold">Result: Pay ~$4.8K/year in taxes → Save $19K/year!</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Real-World Case Studies</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Case Study #1: Sarah, Age 68</h3>
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <p className="mb-2"><strong>Situation:</strong></p>
            <ul className="mb-4">
              <li>Traditional 401k: $400,000</li>
              <li>Roth IRA: $150,000</li>
              <li>Taxable brokerage: $100,000</li>
              <li>Social Security: $28,000/year (starting at 70)</li>
            </ul>
            <p className="mb-2"><strong>Strategy:</strong></p>
            <ol className="mb-4">
              <li>Age 68-70: Live off taxable brokerage ($50K/year)</li>
              <li>Age 70-73: Withdraw $35K/year from Traditional 401k (fills 12% bracket)</li>
              <li>Age 73+: Take RMDs from Traditional, leave Roth growing</li>
              <li>Age 80+: Use Roth for large expenses (medical, travel)</li>
            </ol>
            <p className="text-green-700 font-semibold">Result: Pays lowest possible taxes, Roth grows to $280K by age 80</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Case Study #2: Mark & Lisa, Age 62</h3>
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <p className="mb-2"><strong>Situation:</strong></p>
            <ul className="mb-4">
              <li>Traditional 401k: $800,000 (Mark)</li>
              <li>Traditional IRA: $200,000 (Lisa)</li>
              <li>Roth IRA: $100,000 (combined)</li>
              <li>No pension, Social Security at 67</li>
            </ul>
            <p className="mb-2"><strong>Problem:</strong> Massive RMDs coming at 73 will push them into 24% bracket</p>
            <p className="mb-2"><strong>Strategy:</strong></p>
            <ol className="mb-4">
              <li>Age 62-67: Roth conversions of $50K/year (stays in 12% bracket)</li>
              <li>Convert $250K total before Social Security starts</li>
              <li>Age 73: RMDs are now $30K smaller (because Traditional account is smaller)</li>
            </ol>
            <p className="text-green-700 font-semibold">Result: Save $75,000+ in taxes over lifetime</p>
          </div>

          {/* Calculator CTA */}
          <div className="bg-blue-600 text-white rounded-lg p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">
              Get Your Personalized 401k Withdrawal Plan
            </h3>
            <p className="mb-6">
              Stop guessing. Our calculator analyzes YOUR specific situation—Traditional vs Roth balances, tax bracket, RMD timeline—and tells you exactly how much to withdraw from which account each year.
            </p>
            <Link
              href="/#calculator"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              Try Free Calculator →
            </Link>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Quick Reference: 401k Withdrawal Checklist</h2>

          <div className="bg-gray-50 p-8 rounded-lg my-8">
            <p className="font-semibold mb-4">Before You Withdraw, Ask Yourself:</p>
            <ul className="space-y-3">
              <li>☐ Am I 73 or older? (If yes, take RMD first)</li>
              <li>☐ Do I have taxable accounts to tap first?</li>
              <li>☐ What's my current tax bracket? Can I stay in it?</li>
              <li>☐ Should I convert some Traditional to Roth while in a low bracket?</li>
              <li>☐ Am I leaving my Roth untouched for maximum growth?</li>
              <li>☐ Have I considered state taxes on withdrawals?</li>
              <li>☐ Am I spreading withdrawals evenly to avoid bracket jumps?</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Bottom Line</h2>

          <p className="text-lg">
            Your 401k withdrawal strategy can make a <strong>$200,000+ difference</strong> over your retirement. The key principles:
          </p>

          <ol className="space-y-2 my-6 text-lg">
            <li><strong>1. Follow the optimal order:</strong> RMDs → Taxable → Traditional → Roth</li>
            <li><strong>2. Manage tax brackets:</strong> Don't jump to the next bracket unnecessarily</li>
            <li><strong>3. Plan for RMDs:</strong> They start at 73, ready or not</li>
            <li><strong>4. Save Roth for last:</strong> Tax-free growth is too valuable to waste</li>
          </ol>

          <p className="text-lg font-semibold bg-yellow-50 p-4 rounded-lg mt-8">
            🎯 A smart withdrawal strategy isn't about withdrawing less—it's about withdrawing <em>smarter</em> to keep more of your money.
          </p>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <p className="text-sm text-gray-600">
              <strong>About RetireFree:</strong> Our AI-powered calculator creates personalized withdrawal strategies based on YOUR Traditional and Roth balances, tax situation, and retirement timeline. Takes 2 minutes, costs $15/month, saves you thousands.
            </p>
          </div>

          {/* Related Resources */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Resources</h3>
            <div className="space-y-4">
              <Link href="/blog/retirement-withdrawal-mistakes" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <h4 className="font-semibold text-lg text-blue-600">7 Deadly Retirement Withdrawal Mistakes →</h4>
                <p className="text-gray-600 text-sm mt-1">Learn what NOT to do when withdrawing from your retirement accounts</p>
              </Link>
              <Link href="/calculator" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <h4 className="font-semibold text-lg text-blue-600">Retirement Withdrawal Calculator →</h4>
                <p className="text-gray-600 text-sm mt-1">Calculate your overall safe withdrawal rate across all accounts</p>
              </Link>
              <Link href="/blog/safe-withdrawal-rate-calculator" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <h4 className="font-semibold text-lg text-blue-600">How to Calculate Your Safe Withdrawal Rate →</h4>
                <p className="text-gray-600 text-sm mt-1">Step-by-step guide to personalizing your withdrawal rate</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
