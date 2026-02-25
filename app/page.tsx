import type { Metadata } from "next"
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Calculator } from '@/components/Calculator'

export const metadata: Metadata = {
  title: "AI-Powered Retirement Withdrawal Calculator - Free Trial",
  description: "Retire free from financial worry. Calculate your optimal retirement withdrawal strategy with AI guidance. Get personalized spending recommendations for just $15/month. Try our free calculator now - no signup required.",
  alternates: {
    canonical: "https://retirefree.app",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#EFF6FF] to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A8A] mb-6">
              Finally, Stop Worrying About Running Out of Money
            </h1>
            <p className="text-xl md:text-2xl text-[#4B5563] mb-8 leading-relaxed">
              You've worked hard for 30+ years. Now it's time to actually enjoy your retirement—without constantly second-guessing every purchase or losing sleep over your bank balance.
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
              Sound Familiar?
            </h2>
            <div className="space-y-6 text-lg text-[#4B5563] leading-relaxed">
              <p>
                You check your retirement account balance... again. Is it enough? Can you afford that trip to see the grandkids? What if there's another market crash?
              </p>
              <p>
                Maybe you skip the nice restaurant because you're not sure if you should be spending that money. Or you say "no" to helping your kids, even though you'd love to, because what if YOU need it later?
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
                Here's the thing: you're not broke. You've probably got decent savings. The problem is, nobody's given you a straight answer about how much you can actually spend without screwing up your future.
              </p>
              <p>
                That "4% rule" everyone talks about? Yeah, it was invented in 1994. Your situation is unique—your age, your expenses, your health, today's market. Cookie-cutter advice doesn't cut it anymore.
              </p>
              <p>
                Sure, you could hire a financial advisor. If you've got an extra $5,000+ a year lying around. (Ironic, right?)
              </p>
              <p className="text-xl font-semibold text-[#1E3A8A]">
                There's gotta be a better way.
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
              What If Someone Just Told You the Answer?
            </h2>
            <p className="text-xl text-[#4B5563] leading-relaxed">
              That's exactly what RetireFree does. You tell us your age, how much you've saved, and what you spend each month. Our AI does the math—the really complicated, market-tested, inflation-adjusted math—and gives you one simple number: <strong>"Here's how much you can safely spend this month."</strong>
            </p>
            <p className="text-xl text-[#4B5563] mt-4 font-semibold">
              No confusing jargon. No $5,000 advisor fees. Just $15/month for peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <CardTitle>Actually Sleep Through the Night Again</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4B5563]">
                  Remember what 8 hours of uninterrupted sleep feels like? Our AI keeps tabs on the market, adjusts for inflation, factors in your life expectancy—all the stuff that keeps you up at 3am—and tells you if you're still on track. You can finally stop refreshing your bank app at midnight.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-[#2563EB] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>Set It and Forget It (Almost)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4B5563]">
                  Punch in your numbers once. That's it. Every month, you get a simple update: "Yep, you're good to spend $X this month" or "Hey, markets are wonky—maybe dial it back to $Y for now." No spreadsheets. No calculator. No PhD in finance required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-[#D97706] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎉</span>
                </div>
                <CardTitle>Book the Damn Trip Already</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4B5563]">
                  You've been dreaming about that Alaska cruise for years. Or finally visiting your daughter in California. Or just being able to take the grandkids out for ice cream without calculating if you can "afford" it. When you know the numbers add up, you stop feeling guilty and start actually living. That's the whole point, right?
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
              Financial advisors charge $5,000+ a year. That's a hundred bucks a week.<br />
              We're talking less than a couple of fancy coffees. Seriously.
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
                  Join the retirees who've finally stopped obsessing over their bank balance and started enjoying life.
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
                Yes. We use the same encryption your bank uses. Your data is locked down tight—encrypted coming and going. We don't sell your info to anyone (seriously, who does that?). And if you ever want out, disconnect anytime. It's your data.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">How is this different from a financial advisor?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Financial advisors do a lot—estate planning, tax strategies, the whole nine yards. We do one thing really well: tell you how much you can safely spend right now. If you've already got an advisor, great—we'll complement what they do. If you don't want to drop $5,000 a year on one, we've got you covered for 15 bucks a month.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">What if my situation changes?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Life happens. Maybe you inherit some money from Aunt Betty. Maybe you need a new roof. Maybe the market tanks (again). Just update your numbers and boom—you've got a fresh recommendation. The AI adjusts automatically. No need to schedule a meeting with some guy in a suit.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">Can I cancel anytime?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Yep. One click and you're out. No phone calls. No "are you sure?" guilt trips. No contracts. You'll have access until the end of your billing period, and then that's it. We're not gonna make you jump through hoops.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">How does the AI work?</h3>
              <p className="text-[#4B5563] leading-relaxed">
                Think of it like a really smart financial calculator that's studied every market crash, boom, and bust since forever. It takes your age, savings, and expenses, runs them through thousands of "what if" scenarios (like, what if there's another 2008?), and figures out how much you can spend without going broke at 95. Then it keeps updating as things change. Pretty neat, right?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#EFF6FF] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-6">
            Look, You've Earned This
          </h2>
          <p className="text-xl text-[#4B5563] mb-8 leading-relaxed">
            You worked your whole life for this moment. You deserve to enjoy it without the constant anxiety about money. Let us handle the math. You go live your life.
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
