import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SECURE 2.0 Catch-Up Contributions 2026: The $11,250 Roth Mandate Explained | RetireFree',
  description: 'New SECURE 2.0 rules require high earners ($150K+) to make catch-up contributions to Roth 401(k) starting 2026. Plus new $11,250 super catch-up for ages 60-63. Complete guide with examples.',
  keywords: 'SECURE 2.0 Act 2026, catch-up contributions 2026, Roth catch-up contributions, 401k catch-up limit 2026, high earner retirement rules, ages 60-63 super catch-up, FICA wages limit, mandatory Roth contributions',
  openGraph: {
    title: 'SECURE 2.0 Catch-Up Contributions 2026: The Mandatory Roth Rule',
    description: 'Starting January 1, 2026: High earners ($150K+) MUST make catch-up contributions to Roth 401(k). Plus $11,250 super catch-up for ages 60-63.',
    type: 'article',
    url: 'https://retirefree.app/blog/secure-2-catch-up-contributions-2026',
    images: [
      {
        url: 'https://retirefree.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SECURE 2.0 Catch-Up Contributions 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SECURE 2.0 Catch-Up Contributions 2026: The Mandatory Roth Rule',
    description: 'New mandatory Roth catch-up rule for high earners starts January 1, 2026. Here\'s what you need to know.',
  },
}

export default function Secure2CatchUpContributions2026() {
  return (
    <article className="prose prose-slate max-w-4xl mx-auto px-4 py-12">
      <div className="not-prose mb-8">
        <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          ← Back to Blog
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        SECURE 2.0 Catch-Up Contributions 2026: The $11,250 Roth Mandate High Earners Need to Know
      </h1>

      <div className="flex items-center gap-4 text-sm text-slate-600 mb-8">
        <time dateTime="2026-03-06">March 6, 2026</time>
        <span>•</span>
        <span>11 min read</span>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <p className="text-lg font-semibold text-blue-900 mb-2">
          Starting January 1, 2026: A Major Change for High Earners
        </p>
        <p className="text-blue-800">
          If you earned more than <strong>$150,000</strong> in 2025 and you're 50 or older, your catch-up contributions to your 401(k) <strong>must now go into a Roth account</strong>. No choice. No exceptions. And if your plan doesn't offer Roth contributions, you can't make catch-up contributions at all. Here's everything you need to know about this massive change.
        </p>
      </div>

      <h2>Meet David: $175K Salary, Blindsided by New Rules</h2>

      <p>
        David, 58, is a senior engineer at a tech company earning $175,000 per year. For the past 8 years, he's been maxing out his 401(k) contributions, including the $7,500 catch-up contribution for those 50 and older. His strategy has been simple:
      </p>

      <ul>
        <li>Max out pre-tax 401(k): $23,000 (2025 limit)</li>
        <li>Add catch-up contribution: $7,500 pre-tax</li>
        <li><strong>Total annual contribution: $30,500</strong></li>
        <li><strong>Tax savings:</strong> ~$7,320 (24% tax bracket)</li>
      </ul>

      <p>
        In December 2025, David's HR department sent an email with the subject line: <em>"Important: Changes to 401(k) Catch-Up Contributions Starting 2026."</em>
      </p>

      <p>
        He almost deleted it. Thank goodness he didn't.
      </p>

      <p>
        The email explained that starting January 1, 2026, because David earned more than $150,000 in 2025, he would be <strong>required</strong> to make all catch-up contributions to his Roth 401(k) instead of his traditional pre-tax account.
      </p>

      <p>
        David's reaction: <em>"Wait, they're FORCING me to pay taxes now?"</em>
      </p>

      <p>
        Yes, David. That's exactly what's happening.
      </p>

      <h2>What Is SECURE 2.0?</h2>

      <p>
        The <strong>SECURE 2.0 Act</strong>, signed into law in December 2022, is the most sweeping retirement legislation in decades. It includes over 90 provisions designed to improve retirement security for Americans.
      </p>

      <p>
        Most of the changes are <em>good</em>:
      </p>
      <ul>
        <li>Automatic enrollment in 401(k) plans</li>
        <li>Emergency savings accounts linked to retirement plans</li>
        <li>Student loan matching (employers can match student loan payments as 401(k) contributions)</li>
        <li>Enhanced catch-up contributions for ages 60-63</li>
      </ul>

      <p>
        But there's one provision that's causing confusion—and tax headaches—for high earners: <strong>mandatory Roth catch-up contributions</strong>.
      </p>

      <h2>The New Rule: Mandatory Roth Catch-Up for High Earners</h2>

      <p>
        Here's the rule in plain English:
      </p>

      <p className="text-lg font-semibold text-slate-900 bg-slate-100 p-4 rounded">
        Starting January 1, 2026, if you earned more than $150,000 in FICA wages in the previous year (2025) and you're age 50 or older, ALL catch-up contributions to your 401(k), 403(b), or governmental 457(b) plan MUST be made to a Roth account.
      </p>

      <p>
        <a href="https://www.irs.gov/newsroom/treasury-irs-issue-final-regulations-on-new-roth-catch-up-rule-other-secure-2point0-act-provisions" target="_blank" rel="nofollow">According to the IRS final regulations</a>, this is not optional. If your plan offers Roth contributions, high earners must use them for catch-ups. If your plan doesn't offer Roth contributions, high earners cannot make catch-up contributions at all.
      </p>

      <h3>Key Details You Must Know:</h3>

      <ul>
        <li><strong>Income threshold:</strong> $150,000 in FICA wages for 2025 (originally $145,000, increased by IRS on November 13, 2025)</li>
        <li><strong>What counts as FICA wages:</strong> W-2 Box 3 wages (Social Security wages)</li>
        <li><strong>Effective date:</strong> January 1, 2026 (for calendar-year plans)</li>
        <li><strong>Who it affects:</strong> Employees age 50+ by December 31, 2026</li>
        <li><strong>What's impacted:</strong> 401(k), 403(b), governmental 457(b) plans (NOT IRAs)</li>
        <li><strong>Grace period for plans:</strong> Employers have until December 31, 2026 to implement (for calendar-year plans)</li>
      </ul>

      <h2>What Are "FICA Wages"?</h2>

      <p>
        This is where it gets tricky. The $150,000 threshold is based on <strong>FICA wages</strong>, not total compensation or adjusted gross income (AGI).
      </p>

      <p>
        <strong>FICA wages include:</strong>
      </p>
      <ul>
        <li>Base salary</li>
        <li>Bonuses</li>
        <li>Commissions</li>
        <li>Taxable fringe benefits</li>
      </ul>

      <p>
        <strong>FICA wages DO NOT include:</strong>
      </p>
      <ul>
        <li>Pre-tax 401(k) contributions</li>
        <li>HSA contributions</li>
        <li>Certain fringe benefits</li>
        <li>Qualified transportation benefits</li>
      </ul>

      <p>
        <strong>Where to find your FICA wages:</strong> Look at <strong>Box 3</strong> on your 2025 W-2 (you'll receive it in January 2026).
      </p>

      <h3>Real Example: Who's Affected?</h3>

      <table className="min-w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 px-4 py-2 text-left">Employee</th>
            <th className="border border-slate-300 px-4 py-2 text-left">Gross Salary</th>
            <th className="border border-slate-300 px-4 py-2 text-left">401(k) Contrib</th>
            <th className="border border-slate-300 px-4 py-2 text-left">FICA Wages (Box 3)</th>
            <th className="border border-slate-300 px-4 py-2 text-left">Affected?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300 px-4 py-2">Alice, 55</td>
            <td className="border border-slate-300 px-4 py-2">$180,000</td>
            <td className="border border-slate-300 px-4 py-2">$23,000</td>
            <td className="border border-slate-300 px-4 py-2">$157,000</td>
            <td className="border border-slate-300 px-4 py-2 font-semibold text-red-600">YES</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="border border-slate-300 px-4 py-2">Bob, 52</td>
            <td className="border border-slate-300 px-4 py-2">$165,000</td>
            <td className="border border-slate-300 px-4 py-2">$23,000</td>
            <td className="border border-slate-300 px-4 py-2">$142,000</td>
            <td className="border border-slate-300 px-4 py-2 font-semibold text-green-600">NO</td>
          </tr>
          <tr>
            <td className="border border-slate-300 px-4 py-2">Carol, 60</td>
            <td className="border border-slate-300 px-4 py-2">$155,000</td>
            <td className="border border-slate-300 px-4 py-2">$24,500</td>
            <td className="border border-slate-300 px-4 py-2">$130,500</td>
            <td className="border border-slate-300 px-4 py-2 font-semibold text-green-600">NO</td>
          </tr>
          <tr className="bg-slate-50">
            <td className="border border-slate-300 px-4 py-2">Dan, 58</td>
            <td className="border border-slate-300 px-4 py-2">$175,000</td>
            <td className="border border-slate-300 px-4 py-2">$30,500</td>
            <td className="border border-slate-300 px-4 py-2">$144,500</td>
            <td className="border border-slate-300 px-4 py-2 font-semibold text-green-600">NO</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Key takeaway:</strong> Alice is affected because her <em>FICA wages</em> (after 401(k) deduction) still exceed $150,000. Bob, Carol, and Dan are NOT affected because their FICA wages fall below the threshold, even though their gross salaries are high.
      </p>

      <h2>The New Catch-Up Contribution Limits for 2026</h2>

      <p>
        <a href="https://www.schwab.com/learn/story/what-to-know-about-catch-up-contributions" target="_blank" rel="nofollow">According to Charles Schwab's 2026 guide</a>, here are the contribution limits for 2026:
      </p>

      <h3>Standard 401(k) Contribution Limits (2026)</h3>

      <ul>
        <li><strong>Under age 50:</strong> $24,500</li>
        <li><strong>Age 50-59:</strong> $24,500 + $7,500 catch-up = <strong>$32,000</strong></li>
        <li><strong>Age 60-63:</strong> $24,500 + $11,250 super catch-up = <strong>$35,750</strong> ⭐</li>
        <li><strong>Age 64+:</strong> $24,500 + $7,500 catch-up = <strong>$32,000</strong></li>
      </ul>

      <h3>The "Super Catch-Up" for Ages 60-63</h3>

      <p>
        This is one of the <em>positive</em> changes from SECURE 2.0: workers ages 60-63 can contribute an <strong>extra $11,250</strong> in catch-up contributions (instead of the usual $7,500).
      </p>

      <p>
        <strong>Why this matters:</strong>
      </p>
      <ul>
        <li>Ages 60-63 are peak earning years for many professionals</li>
        <li>These are the last few years before most people retire at 65-67</li>
        <li>Extra $3,750/year can make a meaningful difference</li>
      </ul>

      <p>
        <strong>But here's the catch:</strong> If you're a high earner (over $150K FICA wages), that entire $11,250 super catch-up <strong>must go into a Roth account</strong>.
      </p>

      <h2>Roth vs. Traditional: What's the Difference?</h2>

      <p>
        If you're not familiar with Roth accounts, here's a quick primer:
      </p>

      <h3>Traditional (Pre-Tax) 401(k)</h3>
      <ul>
        <li>✅ Contributions are tax-deductible (you pay less tax now)</li>
        <li>✅ Money grows tax-deferred</li>
        <li>❌ Withdrawals in retirement are fully taxed as ordinary income</li>
        <li>❌ Required Minimum Distributions (RMDs) starting at age 73</li>
      </ul>

      <h3>Roth 401(k)</h3>
      <ul>
        <li>❌ Contributions are NOT tax-deductible (you pay full tax now)</li>
        <li>✅ Money grows tax-free</li>
        <li>✅ Withdrawals in retirement are 100% tax-free (including gains!)</li>
        <li>✅ Can roll over to Roth IRA (no RMDs)</li>
      </ul>

      <h3>Which Is Better?</h3>

      <p>
        It depends on your tax bracket now vs. your expected tax bracket in retirement.
      </p>

      <p>
        <strong>Traditional is better if:</strong>
      </p>
      <ul>
        <li>You're in a high tax bracket now (32%, 35%, 37%)</li>
        <li>You expect to be in a <em>lower</em> tax bracket in retirement</li>
        <li>You want to maximize current tax savings</li>
      </ul>

      <p>
        <strong>Roth is better if:</strong>
      </p>
      <ul>
        <li>You're in a moderate tax bracket now (22%, 24%)</li>
        <li>You expect to be in a <em>higher</em> tax bracket in retirement</li>
        <li>You want tax-free income in retirement</li>
        <li>You want to avoid RMDs</li>
      </ul>

      <h2>The Tax Hit: Real Numbers</h2>

      <p>
        Let's go back to David, our 58-year-old engineer earning $175,000.
      </p>

      <h3>Before 2026 (Pre-Tax Catch-Up)</h3>

      <ul>
        <li><strong>Gross salary:</strong> $175,000</li>
        <li><strong>401(k) contribution:</strong> $24,500 (pre-tax)</li>
        <li><strong>Catch-up contribution:</strong> $7,500 (pre-tax)</li>
        <li><strong>Total contribution:</strong> $32,000</li>
        <li><strong>Taxable income:</strong> $175,000 - $32,000 = $143,000</li>
        <li><strong>Federal tax (24% bracket):</strong> ~$21,792</li>
      </ul>

      <h3>After 2026 (Mandatory Roth Catch-Up)</h3>

      <ul>
        <li><strong>Gross salary:</strong> $175,000</li>
        <li><strong>401(k) contribution:</strong> $24,500 (pre-tax)</li>
        <li><strong>Catch-up contribution:</strong> $7,500 (<strong>Roth, not deductible</strong>)</li>
        <li><strong>Total contribution:</strong> $32,000</li>
        <li><strong>Taxable income:</strong> $175,000 - $24,500 = $150,500</li>
        <li><strong>Federal tax (24% bracket):</strong> ~$23,592</li>
      </ul>

      <p>
        <strong>Difference:</strong> David pays <strong>$1,800 more</strong> in federal taxes in 2026 due to the mandatory Roth catch-up.
      </p>

      <p>
        <strong>But wait, there's a silver lining:</strong> That $7,500 Roth contribution will grow tax-free, and David can withdraw it in retirement without paying any taxes on it—including the gains.
      </p>

      <h3>Is It Worth It?</h3>

      <p>
        Let's assume David contributes $7,500/year to his Roth catch-up from age 58 to 65 (7 years), and it grows at 7% annually.
      </p>

      <ul>
        <li><strong>Total contributions:</strong> $7,500 × 7 = $52,500</li>
        <li><strong>Value at age 65:</strong> ~$66,000 (with 7% growth)</li>
        <li><strong>Value at age 85:</strong> ~$255,000 (if left untouched)</li>
      </ul>

      <p>
        <strong>Tax savings at age 85:</strong> If David is in the 24% tax bracket in retirement, he saves $61,200 in taxes by having that $255,000 in a Roth account instead of a traditional account.
      </p>

      <p>
        Compare that to the <strong>$12,600</strong> in extra taxes he paid from ages 58-65 ($1,800/year × 7 years). He comes out <strong>$48,600 ahead</strong>.
      </p>

      <p>
        <em>So yes, the mandatory Roth catch-up might actually be a blessing in disguise.</em>
      </p>

      <h2>What If Your Plan Doesn't Offer Roth Contributions?</h2>

      <p>
        Here's the worst-case scenario: If you're a high earner and your employer's 401(k) plan <strong>does not offer Roth contributions</strong>, you <strong>cannot make catch-up contributions at all</strong> starting in 2026.
      </p>

      <p>
        <a href="https://www.employeefiduciary.com/blog/401k-catch-up-contributions" target="_blank" rel="nofollow">According to Employee Fiduciary's analysis</a>, this puts pressure on employers to add Roth options to their plans—fast.
      </p>

      <p>
        <strong>What to do if your plan doesn't offer Roth:</strong>
      </p>

      <ol>
        <li><strong>Talk to your HR department.</strong> Ask them to add a Roth option by January 1, 2026 (or ASAP if it's already 2026).</li>
        <li><strong>Max out your IRA.</strong> You can still make catch-up contributions to a traditional or Roth IRA ($8,000 limit for 2026, ages 50+).</li>
        <li><strong>Open a taxable brokerage account.</strong> Not ideal (no tax benefits), but better than nothing.</li>
      </ol>

      <h2>Strategies to Maximize Your Catch-Up Contributions</h2>

      <p>
        If you're a high earner affected by this rule, here are some strategies to consider:
      </p>

      <h3>Strategy #1: Stay Just Below the $150,000 FICA Wage Threshold</h3>

      <p>
        If you're close to $150,000 in FICA wages, you might be able to reduce your FICA wages by:
      </p>

      <ul>
        <li>Maxing out your 401(k) contributions ($24,500 in 2026)</li>
        <li>Maxing out your HSA ($8,550 for family coverage in 2026)</li>
        <li>Deferring a year-end bonus into 2026 (if your employer allows it)</li>
      </ul>

      <p>
        <strong>Example: Meet Emma, 53</strong>
      </p>

      <p>
        Emma's gross salary is $170,000. Without planning:
      </p>
      <ul>
        <li>Gross salary: $170,000</li>
        <li>401(k): $24,500</li>
        <li><strong>FICA wages: $145,500 (below $150K threshold!)</strong> ✅</li>
      </ul>

      <p>
        Emma can still make pre-tax catch-up contributions because her FICA wages are below $150,000.
      </p>

      <h3>Strategy #2: Embrace the Roth and Plan for Tax-Free Retirement Income</h3>

      <p>
        If you're over the $150,000 threshold, lean into the Roth requirement. Think of it as <strong>forced tax diversification</strong>.
      </p>

      <p>
        <strong>Why this is good:</strong>
      </p>
      <ul>
        <li>You'll have tax-free income in retirement (no RMDs on Roth IRA rollovers)</li>
        <li>Roth withdrawals don't count toward taxation of Social Security benefits</li>
        <li>Hedge against future tax increases</li>
        <li>More flexibility in retirement</li>
      </ul>

      <h3>Strategy #3: Maximize the Ages 60-63 Super Catch-Up</h3>

      <p>
        If you're between 60-63, you can contribute an extra <strong>$11,250</strong> per year. Even if it must go into a Roth account, that's a massive opportunity.
      </p>

      <p>
        <strong>Example: Meet Frank, 61</strong>
      </p>

      <p>
        Frank earns $200,000 (well above the $150K threshold). He maxes out his super catch-up:
      </p>

      <ul>
        <li>Regular 401(k): $24,500 (pre-tax)</li>
        <li>Super catch-up: $11,250 (mandatory Roth)</li>
        <li><strong>Total: $35,750</strong></li>
      </ul>

      <p>
        Over 3 years (ages 61-63), Frank contributes:
      </p>
      <ul>
        <li>$35,750 × 3 = <strong>$107,250</strong></li>
        <li>Of which $33,750 is Roth (tax-free in retirement)</li>
      </ul>

      <p>
        At age 85, that $33,750 in Roth contributions could be worth <strong>$200,000+</strong> (tax-free).
      </p>

      <h3>Strategy #4: Backdoor Roth IRA Conversions</h3>

      <p>
        Even if your 401(k) catch-up is now Roth, you can <em>also</em> do backdoor Roth IRA conversions to build even more tax-free retirement savings.
      </p>

      <p>
        <strong>How it works:</strong>
      </p>
      <ol>
        <li>Contribute $7,000 to a traditional IRA (or $8,000 if age 50+)</li>
        <li>Immediately convert it to a Roth IRA</li>
        <li>Pay taxes on the conversion (if any)</li>
        <li>Let it grow tax-free</li>
      </ol>

      <p>
        <strong>Note:</strong> If you have existing pre-tax IRA balances, this strategy is more complicated due to the pro-rata rule. Consult a tax advisor.
      </p>

      <h2>What About IRAs? Are They Affected?</h2>

      <p>
        Good news: <strong>Traditional and Roth IRAs are NOT affected</strong> by the SECURE 2.0 mandatory Roth catch-up rule.
      </p>

      <p>
        <a href="https://www.fiducientadvisors.com/blog/secure-2-0-act-roth-catch-up-contributions" target="_blank" rel="nofollow">According to Fiducient Advisors</a>, the Roth catch-up requirement only impacts employer-sponsored retirement plans (401(k), 403(b), governmental 457(b)).
      </p>

      <p>
        <strong>IRA Contribution Limits for 2026:</strong>
      </p>
      <ul>
        <li>Under age 50: $7,500</li>
        <li>Age 50+: $7,500 + $1,000 catch-up = <strong>$8,500</strong></li>
      </ul>

      <p>
        You can still choose between traditional (pre-tax) or Roth IRA contributions, regardless of your income.
      </p>

      <h2>Employer Action Required: Amend Your Plan Document</h2>

      <p>
        If you're an employer or HR professional, <strong>your 401(k) plan must be amended</strong> to comply with the new SECURE 2.0 catch-up rules.
      </p>

      <p>
        <a href="https://dhjj.com/understanding-the-new-irs-regulations-on-secure-2-0-catch-up-contributions-for-2026/" target="_blank" rel="nofollow">According to DHJJ's regulatory update</a>, here's what employers need to do:
      </p>

      <ol>
        <li><strong>Add Roth option to your plan</strong> (if you don't already have one)</li>
        <li><strong>Update payroll systems</strong> to identify high earners (FICA wages &gt; $150K)</li>
        <li><strong>Amend plan document</strong> by December 31, 2026 (for calendar-year plans)</li>
        <li><strong>Communicate changes to employees</strong> (send email, hold webinars, update FAQ)</li>
        <li><strong>Test systems</strong> to ensure catch-up contributions are properly coded as Roth for high earners</li>
      </ol>

      <p>
        <a href="https://moorecolson.com/news-insights/are-you-ready-for-the-secure-2-0-roth-catch-up-rule-in-2026/" target="_blank" rel="nofollow">Moore Colson warns</a> that plans not in compliance by December 31, 2026 risk IRS penalties and potential disqualification.
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Q: Can I make regular 401(k) contributions pre-tax and only the catch-up as Roth?</h3>
      <p>
        <strong>Yes!</strong> If you're a high earner, you can still contribute up to $24,500 (the base limit) as pre-tax or Roth—your choice. Only the catch-up portion ($7,500 or $11,250 if ages 60-63) must be Roth.
      </p>

      <h3>Q: What if I turn 50 mid-year? When can I start making catch-up contributions?</h3>
      <p>
        You can start making catch-up contributions in the year you turn 50, even if your birthday is in December. The IRS uses "attained age" (age at the end of the calendar year) for catch-up eligibility.
      </p>

      <h3>Q: What if my FICA wages are $149,000 in 2025 but $160,000 in 2026?</h3>
      <p>
        The rule looks at the <em>previous year's</em> FICA wages. So:
      </p>
      <ul>
        <li>2026 catch-up contributions: Based on 2025 FICA wages ($149K) = <strong>NOT affected</strong> (can do pre-tax)</li>
        <li>2027 catch-up contributions: Based on 2026 FICA wages ($160K) = <strong>Affected</strong> (must do Roth)</li>
      </ul>

      <h3>Q: Can I opt out of catch-up contributions altogether?</h3>
      <p>
        Yes, catch-up contributions are always optional. If you don't want to pay the extra taxes from mandatory Roth contributions, you can simply not make catch-up contributions at all. (Though this means you're leaving potential retirement savings on the table.)
      </p>

      <h3>Q: Will the $150,000 threshold adjust for inflation?</h3>
      <p>
        The law does not specify automatic inflation adjustments for the $150,000 threshold. It may be adjusted by Congress in future legislation, but for now, assume it stays at $150,000.
      </p>

      <h2>The Bottom Line: Don't Let This Catch You Off Guard</h2>

      <p>
        Here are the three key takeaways:
      </p>

      <ol>
        <li>
          <strong>Check your 2025 FICA wages (W-2 Box 3).</strong> If you're over $150,000 and age 50+, your catch-up contributions MUST go to Roth in 2026.
        </li>
        <li>
          <strong>Confirm your plan offers Roth contributions.</strong> If it doesn't, talk to HR immediately. No Roth option = no catch-up contributions for high earners.
        </li>
        <li>
          <strong>Plan for the tax hit—but embrace the long-term benefits.</strong> Paying taxes now on Roth contributions means tax-free income in retirement. That's a powerful advantage.
        </li>
      </ol>

      <h2>Calculate Your Retirement Savings with Roth Catch-Up</h2>

      <p>
        Wondering how the new Roth catch-up rules affect your overall retirement plan? Our <Link href="/calculator" className="text-emerald-600 hover:text-emerald-700 font-semibold">free retirement calculator</Link> lets you:
      </p>
      <ul>
        <li>Model Roth vs. traditional contributions</li>
        <li>See the tax impact of mandatory Roth catch-ups</li>
        <li>Calculate your retirement savings at ages 65, 70, 75, 80, 85</li>
        <li>Account for RMDs (which don't apply to Roth IRA rollovers)</li>
      </ul>

      <div className="my-12 p-8 bg-emerald-50 border border-emerald-200 rounded-lg">
        <h3 className="text-2xl font-bold text-emerald-900 mb-4">
          See How SECURE 2.0 Affects Your Retirement Plan
        </h3>
        <p className="text-emerald-800 mb-6">
          Model the mandatory Roth catch-up rule and see exactly how much you'll save in taxes over your retirement. Free calculator, no signup required.
        </p>
        <Link
          href="/calculator"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition"
        >
          Try Free Calculator →
        </Link>
      </div>

      <h2>Recommended Resources</h2>

      <p>
        Want to learn more about Roth conversions, tax planning, and retirement strategies? Here are three books we recommend (Amazon affiliate links):
      </p>

      <ul>
        <li>
          <a href="https://www.amazon.com/Retirement-Planning-Guidebook-Comprehensive-Medicare/dp/1945640030?tag=huajie-20" target="_blank" rel="nofollow">
            <strong>The Retirement Planning Guidebook</strong>
          </a> by Wade Pfau — Covers SECURE 2.0 provisions, Roth strategies, and tax-efficient withdrawals.
        </li>
        <li>
          <a href="https://www.amazon.com/Roth-Revolution-Protect-Retirement-Savings/dp/0985168811?tag=huajie-20" target="_blank" rel="nofollow">
            <strong>The Roth Revolution</strong>
          </a> by James Lange — Deep dive into Roth conversions, including advanced strategies for high earners.
        </li>
        <li>
          <a href="https://www.amazon.com/Bogleheads-Guide-Retirement-Planning/dp/1118236645?tag=huajie-20" target="_blank" rel="nofollow">
            <strong>The Bogleheads' Guide to Retirement Planning</strong>
          </a> — Comprehensive guide covering 401(k) strategies, catch-up contributions, and tax diversification.
        </li>
      </ul>

      <p className="text-sm text-slate-600 italic mt-4">
        <strong>FTC Disclosure:</strong> This article contains affiliate links. If you purchase through these links, we may earn a small commission at no additional cost to you. We only recommend products we genuinely believe will help you plan for retirement.
      </p>

      <div className="my-12 border-t border-slate-200 pt-8">
        <p className="text-sm text-slate-600">
          <strong>About the Author:</strong> This analysis was compiled by the RetireFree research team using official IRS regulations, Schwab, Fidelity, and leading ERISA attorneys' guidance on SECURE 2.0 implementation. Last updated March 6, 2026.
        </p>
      </div>

      <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-lg">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Related Articles</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/blog/roth-conversion-strategy-2026" className="text-emerald-600 hover:text-emerald-700">
              Roth Conversion Strategy for 2026: Complete Tax Guide
            </Link>
          </li>
          <li>
            <Link href="/blog/required-minimum-distribution-rmd-2026" className="text-emerald-600 hover:text-emerald-700">
              Required Minimum Distribution (RMD) Rules for 2026
            </Link>
          </li>
          <li>
            <Link href="/blog/healthcare-costs-retirement-2026" className="text-emerald-600 hover:text-emerald-700">
              Healthcare Costs in Retirement 2026: The $661,812 Reality Check
            </Link>
          </li>
        </ul>
      </div>
    </article>
  )
}
