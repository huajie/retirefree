import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retirement Planning Blog | RetireFree',
  description: 'Expert guidance on retirement withdrawal strategies, the 4% rule, safe withdrawal rates, and financial independence.',
  keywords: 'retirement planning, 4% rule, safe withdrawal rate, FIRE, financial independence',
}

const blogPosts = [
  {
    slug: 'healthcare-costs-retirement-2026',
    title: 'Healthcare Costs in Retirement 2026: The $661,812 Reality Check',
    excerpt: 'Healthcare inflation is outpacing Social Security by 2.4x in 2026. Learn how a 65-year-old couple needs $661,812 for retirement healthcare and strategies to prepare.',
    date: 'March 6, 2026',
    readTime: '12 min read',
    category: 'Healthcare & Planning'
  },
  {
    slug: 'secure-2-catch-up-contributions-2026',
    title: 'SECURE 2.0 Catch-Up Contributions 2026: The $11,250 Roth Mandate Explained',
    excerpt: 'Starting January 1, 2026: High earners ($150K+) must make catch-up contributions to Roth 401(k). Plus new $11,250 super catch-up for ages 60-63. Complete guide with examples.',
    date: 'March 6, 2026',
    readTime: '11 min read',
    category: 'Tax Planning & Legislation'
  },
  {
    slug: 'maximize-social-security-benefits-2026',
    title: 'How to Maximize Social Security Benefits in 2026: The $418,560 Decision',
    excerpt: 'Delaying Social Security from 62 to 70 can add $418,560 in lifetime benefits. Learn the strategies married couples use to maximize spousal and survivor benefits.',
    date: 'March 6, 2026',
    readTime: '14 min read',
    category: 'Social Security'
  },
  {
    slug: 'social-security-cola-2026-medicare',
    title: 'Social Security COLA 2026: How Medicare Premiums Could Steal Your Raise',
    excerpt: 'The 2.8% Social Security COLA sounds great—until you see the 9.7% Medicare Part B premium increase. Here\'s what retirees actually keep and how to protect your income.',
    date: 'March 3, 2026',
    readTime: '8 min read',
    category: 'Social Security & Medicare'
  },
  {
    slug: 'roth-conversion-strategy-2026',
    title: 'Roth Conversion Strategy 2026: Should You Convert Before Tax Rates Change?',
    excerpt: 'Tax rates may rise after 2025. Learn when Roth conversions make sense, how to avoid costly mistakes, and strategies to minimize taxes while building tax-free retirement income.',
    date: 'March 3, 2026',
    readTime: '10 min read',
    category: 'Tax Planning'
  },
  {
    slug: 'required-minimum-distribution-rmd-2026',
    title: 'Required Minimum Distribution (RMD) Calculator 2026: When to Take RMDs and How Much',
    excerpt: 'RMDs start at age 73 in 2026. Learn how to calculate yours, avoid the 25% penalty, use Qualified Charitable Distributions, and minimize taxes on forced withdrawals.',
    date: 'March 3, 2026',
    readTime: '9 min read',
    category: 'Tax Planning'
  },
  {
    slug: '4-percent-rule-2026',
    title: 'Is the 4% Rule Still Safe in 2026?',
    excerpt: 'The 4% rule has guided retirees for decades. But with high valuations and lower bond yields in 2026, is it still safe? We analyze the latest research.',
    date: 'February 28, 2026',
    readTime: '8 min read',
    category: 'Withdrawal Strategies'
  },
  {
    slug: 'safe-withdrawal-rate-calculator',
    title: 'How to Calculate Your Safe Withdrawal Rate',
    excerpt: 'Not all retirement portfolios are the same. Learn how to calculate a personalized safe withdrawal rate based on YOUR situation.',
    date: 'February 28, 2026',
    readTime: '6 min read',
    category: 'Planning Tools'
  },
  {
    slug: 'retirement-withdrawal-mistakes',
    title: '7 Deadly Retirement Withdrawal Mistakes (And How to Avoid Them)',
    excerpt: 'These common mistakes can derail your retirement. Learn what NOT to do when withdrawing from your portfolio.',
    date: 'February 28, 2026',
    readTime: '7 min read',
    category: 'Best Practices'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Retirement Planning Blog
          </h1>
          <p className="text-xl text-gray-600">
            Expert insights on safe withdrawal rates, the 4% rule, and financial independence
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{post.category}</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <span className="text-blue-600 font-semibold group-hover:underline">
                  Read More →
                </span>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-blue-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Calculate Your Safe Withdrawal Rate?
          </h3>
          <p className="mb-6">
            Try our free AI-powered retirement calculator
          </p>
          <Link
            href="/"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Try Free Calculator
          </Link>
        </div>

        {/* Sister Site Link */}
        <div className="mt-8 text-center bg-blue-50 rounded-lg p-6 border border-blue-200">
          <p className="text-gray-700 mb-3">
            Planning your retirement lifestyle?
          </p>
          <a
            href="https://where55.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline text-lg"
          >
            Explore 55+ Communities at Where55.com →
          </a>
        </div>
      </div>
    </div>
  )
}
