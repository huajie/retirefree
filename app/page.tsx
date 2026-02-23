import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Calculator } from '@/components/Calculator'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#EFF6FF] to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A8A] mb-6">
              Retire Free from Financial Worry
            </h1>
            <p className="text-xl md:text-2xl text-[#4B5563] mb-8 leading-relaxed">
              RetireFree is your AI-powered retirement advisor that calculates your optimal withdrawal strategy—ensuring your money lasts a lifetime while you enjoy the retirement you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#calculator">
                <Button size="lg">
                  Try Our Free Calculator
                </Button>
              </Link>
              <Link href="#pricing">
                <Button variant="secondary" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] text-center mb-8">
              You've Saved for Decades. Now What?
            </h2>
            <div className="space-y-6 text-lg text-[#4B5563] leading-relaxed">
              <p>
                Retirement should be the best years of your life. But for most retirees, spending decisions feel like walking a tightrope.
              </p>
              <p>
                <strong>Spend too much</strong>, and you risk running out of money. <strong>Spend too little</strong>, and you miss out on the life you worked so hard for.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="text-center py-8">
                    <div className="text-4xl font-bold text-[#DC2626] mb-2">60%</div>
                    <p className="text-[#4B5563]">of retirees are off-track with their spending</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="text-center py-8">
                    <div className="text-4xl font-bold text-[#DC2626] mb-2">58%</div>
                    <p className="text-[#4B5563]">worry constantly about running out of money</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="text-center py-8">
                    <div className="text-4xl font-bold text-[#DC2626] mb-2">81%</div>
                    <p className="text-[#4B5563]">lose sleep over unexpected healthcare costs</p>
                  </CardContent>
                </Card>
              </div>
              <p>
                The problem isn't your savings. It's knowing how much you can safely spend <strong>today</strong> while protecting your future.
              </p>
              <p>
                Traditional advice is too simple. "Withdraw 4% per year" doesn't account for market changes, inflation, or your unique situation. And hiring a financial advisor costs $5,000 or more each year.
              </p>
              <p className="text-xl font-semibold text-[#1E3A8A]">
                There has to be a better way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="features" className="py-16 md:py-24 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">
              Meet Your AI Retirement Advisor
            </h2>
            <p className="text-xl text-[#4B5563] leading-relaxed">
              RetireFree uses advanced AI to analyze your complete financial picture—your age, savings, monthly expenses, and risk tolerance—then calculates exactly how much you can safely withdraw each month.
            </p>
            <p className="text-xl text-[#4B5563] mt-4 font-semibold">
              No more guesswork. No more $5,000+ advisor fees. Just smart, personalized guidance for $15/month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <CardTitle>Sleep Better Knowing Your Money Will Last</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4B5563]">
                  Our AI constantly monitors your accounts and adjusts your spending recommendations based on market performance, inflation, and your expected lifespan. You'll always know you're on track—no matter what happens.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>Simple, Automated Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4B5563]">
                  Connect your accounts once, and RetireFree does the rest. Every month, you'll get a simple answer: "Here's how much you can safely spend." No math required. No financial jargon. Just clear, confident guidance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-[#D97706] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎉</span>
                </div>
                <CardTitle>Finally Enjoy the Retirement You Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4B5563]">
                  Stop second-guessing every purchase. With RetireFree, you'll know exactly what you can afford—so you can spend on the things that matter without fear or guilt. Travel. Spoil the grandkids. Live the life you worked so hard for.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
              Try Our Free Retirement Calculator
            </h2>
            <p className="text-xl text-[#4B5563]">
              Get instant AI-powered withdrawal recommendations. No signup required.
            </p>
          </div>
          <Calculator />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">
              Professional Guidance at a Fraction of the Cost
            </h2>
            <p className="text-xl text-[#4B5563]">
              Financial advisors charge $5,000+ per year for retirement planning.<br />
              RetireFree gives you the same peace of mind for less than the cost of dinner out.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card variant="result">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl mb-2">$15/month</CardTitle>
                <p className="text-[#4B5563]">Start with a 7-day free trial. Cancel anytime.</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-[#059669] text-xl mt-1">✓</span>
                    <span>AI-powered spending recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#059669] text-xl mt-1">✓</span>
                    <span>Automatic monthly updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#059669] text-xl mt-1">✓</span>
                    <span>Unlimited calculations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#059669] text-xl mt-1">✓</span>
                    <span>Email and in-app support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#059669] text-xl mt-1">✓</span>
                    <span>Cancel anytime, no contracts</span>
                  </li>
                </ul>
                <Link href="/auth/signup" className="block">
                  <Button size="lg" className="w-full">
                    Start Your Free 7-Day Trial
                  </Button>
                </Link>
                <p className="text-center text-sm text-[#6B7280] mt-4">
                  Join hundreds of retirees who sleep better at night knowing their money will last.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">Is my data secure?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Yes. We use bank-level encryption to protect your information. Your data is encrypted in transit and at rest. We never sell your data to third parties. You can disconnect your accounts at any time.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">How is this different from a financial advisor?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                RetireFree focuses specifically on answering one crucial question: "How much can I safely spend?" While financial advisors offer broad services (at $5,000+ per year), RetireFree uses AI to provide ongoing spending guidance for just $15/month. Think of it as complementary to—or a more affordable alternative to—traditional advisors.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">What if my situation changes?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                That's exactly what RetireFree is designed for. If you have unexpected expenses, receive an inheritance, or markets drop, simply update your information and you'll get new recommendations instantly. The AI adapts to your changing circumstances automatically.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">Can I cancel anytime?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Absolutely. There are no contracts or commitments. If RetireFree isn't right for you, cancel with one click. You'll keep access through the end of your billing period.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">How does the AI work?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                RetireFree analyzes your financial situation against thousands of historical market scenarios to calculate a withdrawal strategy that maximizes your spending while protecting against running out of money. It considers your age, savings, expenses, and risk tolerance—then adjusts recommendations as conditions change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#EFF6FF] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">
            Ready to Stop Worrying and Start Living?
          </h2>
          <p className="text-xl text-[#4B5563] mb-8 leading-relaxed">
            Your retirement should be joyful, not stressful. Let RetireFree handle the numbers so you can focus on what matters.
          </p>
          <Link href="/auth/signup">
            <Button size="lg">
              Start Your Free 7-Day Trial
            </Button>
          </Link>
          <p className="text-[#6B7280] mt-4">No credit card required. Cancel anytime.</p>
        </div>
      </section>
    </div>
  )
}
