import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retirement Planning Blog | RetireFree',
  description: 'Expert guidance on retirement withdrawal strategies, the 4% rule, safe withdrawal rates, and financial independence.',
  keywords: 'retirement planning, 4% rule, safe withdrawal rate, FIRE, financial independence',
}

const blogPosts = [
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
      </div>
    </div>
  )
}
