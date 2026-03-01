import Link from 'next/link'
import { Metadata } from 'next'
import { Calculator } from '@/components/Calculator'

export const metadata: Metadata = {
  title: 'Retirement Withdrawal Calculator - Free AI-Powered Tool | RetireFree',
  description: 'Free retirement calculator using Monte Carlo simulation. Get personalized withdrawal recommendations based on your portfolio, age, and spending. No signup required. Try now!',
  keywords: 'retirement calculator, retirement withdrawal calculator, monte carlo retirement calculator, safe withdrawal rate calculator, retirement planning calculator, ai retirement calculator',
  openGraph: {
    title: 'Free Retirement Withdrawal Calculator - AI-Powered',
    description: 'Calculate your safe retirement withdrawal rate with advanced Monte Carlo simulation. Free to use, no signup required.',
    type: 'website',
  }
}

export default function CalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'RetireFree Retirement Calculator',
    description: 'Free AI-powered retirement withdrawal calculator with Monte Carlo simulation',
    url: 'https://retirefree.app/calculator',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency': 'USD',
      description: 'Free calculator, no signup required'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600">Home</Link> / Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Retirement Withdrawal Calculator
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Calculate your safe withdrawal rate with AI-powered Monte Carlo simulation. Get personalized recommendations based on YOUR portfolio, age, and spending needs.
          </p>
        </header>

        {/* Calculator Component */}
        <div className="mb-16">
          <Calculator />
        </div>

        {/* Educational Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mt-12 mb-6">How This Calculator Works</h2>

          <p className="text-lg">
            Unlike simple calculators that just divide your savings by 30 years, our AI-powered tool uses <strong>Monte Carlo simulation</strong>—the same method used by professional financial advisors.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">What Is Monte Carlo Simulation?</h3>

          <p>
            Think of it like this: Instead of assuming your portfolio grows 7% every year (it won't), we run <strong>10,000 different scenarios</strong> with realistic market ups and downs.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
            <p className="font-semibold text-lg mb-2">Plain English:</p>
            <p>We test what happens if you retire right before a market crash (like 2008), during a bull market (like 2024), or anywhere in between. Then we tell you the withdrawal rate that works in <strong>90%+ of scenarios</strong>.</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Why This Matters</h3>

          <p>The <strong>order of returns</strong> matters more than average returns.</p>

          <div className="bg-gray-50 p-6 rounded-lg my-8">
            <p className="font-semibold mb-4">Example: Same Average Return, Different Outcomes</p>
            <p className="mb-2"><strong>Retiree A:</strong> Retires in 2000 (before crash)</p>
            <ul className="mb-4">
              <li>$1M portfolio, 4% withdrawal ($40K/year)</li>
              <li>First 3 years: -10%, -15%, -8%</li>
              <li className="text-red-700 font-semibold">Portfolio depleted by 2015</li>
            </ul>
            <p className="mb-2"><strong>Retiree B:</strong> Retires in 2010 (after crash)</p>
            <ul className="mb-4">
              <li>$1M portfolio, 4% withdrawal ($40K/year)</li>
              <li>First 3 years: +15%, +18%, +12%</li>
              <li className="text-green-700 font-semibold">Portfolio grows to $1.5M by 2025</li>
            </ul>
            <p className="font-semibold">Same 7% average return. Completely different results!</p>
          </div>

          <p>
            Our calculator accounts for this "<strong>sequence of returns risk</strong>" by testing thousands of different return sequences.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">What Makes Our Calculator Different</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-4">1. Uses Current 2026 Market Data</h3>
          <p>
            Most calculators use the old 4% rule from 1994. That rule assumed:
          </p>
          <ul>
            <li>Bond yields of 7-8% (now: 4-4.5%)</li>
            <li>Stock P/E ratios of 15x (now: 22-25x)</li>
            <li>30-year retirements (many need 40+ years)</li>
          </ul>
          <p>
            <strong>Our calculator adjusts for today's reality.</strong> That's why we typically recommend 3.3-3.8% instead of 4%.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">2. Accounts for Your Specific Situation</h3>
          <p>Your safe withdrawal rate depends on:</p>
          <ul>
            <li><strong>Your age:</strong> 65-year-old vs 55-year-old needs different rates</li>
            <li><strong>Portfolio allocation:</strong> 80% stocks vs 50% stocks = different risk</li>
            <li><strong>Other income:</strong> Social Security changes everything</li>
            <li><strong>Spending flexibility:</strong> Can you cut 10% in a crash?</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4">3. Factors in Inflation</h3>
          <p>
            Your $4,000/month spending today becomes $6,500/month in 20 years (assuming 2.5% inflation). We adjust for this automatically.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Understanding Your Results</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-4">What Does "90% Success Rate" Mean?</h3>

          <p>
            It means in <strong>9 out of 10 historical scenarios</strong>, your portfolio lasted your entire retirement with this withdrawal rate.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-8">
            <p className="font-semibold">Should you aim for 100% success?</p>
            <p className="mt-2">Not necessarily! A 100% success rate means you're being <em>too conservative</em>—you could have spent more and enjoyed your retirement more.</p>
            <p className="mt-2">Financial advisors typically recommend 85-95% success rate. It's a balance between safety and actually living your life.</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Adjusting Your Withdrawal Rate</h3>

          <p>The calculator gives you a <strong>starting point</strong>. You can adjust based on:</p>

          <ul>
            <li><strong>Lower rate (more conservative):</strong> If you have no other income, can't cut spending, or just want extra security</li>
            <li><strong>Higher rate (more aggressive):</strong> If you have Social Security, pension, or can reduce spending 10-20% in bad markets</li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-6">Common Questions</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Why is my rate lower than 4%?</h3>
          <p>
            The 4% rule worked historically, but current market conditions (high valuations, lower bond yields) suggest 3.3-3.8% is safer for retirements starting in 2026.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">What if markets crash right after I retire?</h3>
          <p>
            This is exactly what Monte Carlo simulation tests for! The recommended rate already accounts for the worst-case scenarios (like retiring in 2000 or 2007).
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Should I use the same rate every year?</h3>
          <p>
            No! Smart retirees use <strong>dynamic withdrawal strategies</strong>:
          </p>
          <ul>
            <li>If markets crash 20%: Cut spending 10% temporarily</li>
            <li>If markets boom: You can spend a bit more</li>
            <li>Adjust based on portfolio performance</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
            <p className="font-semibold text-lg mb-2">💡 Pro Tip:</p>
            <p>Our <strong>$15/month service</strong> gives you updated withdrawal recommendations every month based on how your portfolio performs. No more guessing!</p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Beyond the Calculator: What's Next?</h2>

          <p>Once you know your safe withdrawal rate, here's what to do:</p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">1. Decide Which Accounts to Withdraw From</h3>
          <p>
            Order matters! Withdraw from taxable accounts first, then Traditional IRA/401k, then Roth IRA last.
          </p>
          <p className="text-blue-600 font-semibold">
            <Link href="/401k-withdrawal">Learn the optimal withdrawal order →</Link>
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">2. Plan for Required Minimum Distributions (RMDs)</h3>
          <p>
            At age 73, you must start withdrawing from Traditional 401k/IRA. This affects your strategy.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">3. Build a Cash Buffer</h3>
          <p>
            Keep 1-2 years of expenses in cash/money market. During crashes, use this instead of selling stocks at a loss.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">4. Review Annually</h3>
          <p>
            Your safe withdrawal rate isn't set in stone. Review every year and adjust if:
          </p>
          <ul>
            <li>Your portfolio grows significantly</li>
            <li>Markets crash</li>
            <li>Your expenses change</li>
            <li>You add other income sources (Social Security, part-time work)</li>
          </ul>

          {/* CTA */}
          <div className="bg-blue-600 text-white rounded-lg p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">
              Get Monthly Updates on Your Safe Withdrawal Rate
            </h3>
            <p className="mb-6">
              Stop re-calculating every month. RetireFree monitors your portfolio and adjusts your withdrawal recommendations automatically. $15/month, cancel anytime.
            </p>
            <Link
              href="/pricing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              Start 7-Day Free Trial →
            </Link>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">Real-World Example</h2>

          <div className="bg-gray-50 p-8 rounded-lg my-8">
            <p className="font-semibold mb-4">Meet John, Age 64</p>
            <ul className="space-y-2 mb-6">
              <li><strong>Portfolio:</strong> $750,000</li>
              <li><strong>Allocation:</strong> 60% stocks, 40% bonds</li>
              <li><strong>Monthly expenses:</strong> $3,500 ($42K/year)</li>
              <li><strong>Social Security:</strong> $2,200/month (starts at 67)</li>
              <li><strong>Spending flexibility:</strong> Can cut 15% if needed</li>
            </ul>
            <p className="font-semibold mb-2">Calculator Results:</p>
            <p className="mb-4">
              Safe withdrawal rate: <strong>3.7%</strong> ($27,750/year = $2,312/month)
            </p>
            <p className="font-semibold mb-2">John's Strategy:</p>
            <ul className="space-y-2">
              <li><strong>Age 64-67:</strong> Withdraw $2,312/month from portfolio (3.7% rate)</li>
              <li><strong>Age 67+:</strong> Social Security ($2,200) + Portfolio ($1,300) = $3,500 total</li>
              <li><strong>Effective portfolio rate after SS:</strong> Only 2.1% needed!</li>
            </ul>
            <p className="text-green-700 font-semibold mt-4">
              Result: John's $750K portfolio will likely grow, not shrink, because he only needs to withdraw 2.1% after Social Security kicks in.
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Bottom Line</h2>

          <p className="text-lg">
            This calculator gives you a <strong>personalized, data-driven</strong> withdrawal rate based on YOUR situation and current market conditions—not generic 1994 advice.
          </p>

          <p className="text-lg">
            Use it to:
          </p>
          <ul className="text-lg">
            <li>Find your safe starting withdrawal rate</li>
            <li>Understand how market conditions affect your plan</li>
            <li>Compare different scenarios (retiring now vs 2 years from now)</li>
            <li>Make informed decisions about when you can afford to retire</li>
          </ul>

          <p className="text-lg font-semibold bg-yellow-50 p-4 rounded-lg mt-8">
            🎯 Knowledge is power. Knowing you can safely withdraw $3,200/month vs guessing lets you actually <em>enjoy</em> your retirement instead of worrying about every purchase.
          </p>

          {/* Related Resources */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Related Resources</h3>
            <div className="space-y-4">
              <Link href="/blog/safe-withdrawal-rate-calculator" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <h4 className="font-semibold text-lg text-blue-600">How to Calculate Your Safe Withdrawal Rate →</h4>
                <p className="text-gray-600 text-sm mt-1">Detailed guide on personalizing your withdrawal strategy</p>
              </Link>
              <Link href="/blog/4-percent-rule-2026" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <h4 className="font-semibold text-lg text-blue-600">Is the 4% Rule Still Safe in 2026? →</h4>
                <p className="text-gray-600 text-sm mt-1">Expert analysis of safe withdrawal rates in current market conditions</p>
              </Link>
              <Link href="/401k-withdrawal" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <h4 className="font-semibold text-lg text-blue-600">401k Withdrawal Calculator →</h4>
                <p className="text-gray-600 text-sm mt-1">Optimize which accounts to withdraw from first</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
