export const metadata = {
  title: 'Terms of Service | RetireFree',
  description: 'RetireFree Terms of Service - Terms and conditions for using our retirement planning app'
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <p className="text-gray-600 mb-8">
        <strong>Last Updated:</strong> February 26, 2026
      </p>

      <div className="prose prose-lg max-w-none">

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") constitute a legally binding agreement between you and RetireFree
            ("we," "us," or "our") regarding your use of the RetireFree retirement planning application
            and services (collectively, the "Service").
          </p>
          <p>
            By creating an account or using our Service, you agree to be bound by these Terms and our
            <a href="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</a>.
            If you do not agree to these Terms, you may not access or use the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
          <p>You must meet the following requirements to use the Service:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>You must be at least 18 years of age</li>
            <li>You must be legally capable of entering into binding contracts</li>
            <li>You must not be prohibited from using the Service under applicable laws</li>
            <li>You must provide accurate and complete information during registration</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Account Registration and Security</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Account Creation</h3>
          <p>To use the Service, you must create an account by providing:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>A valid email address</li>
            <li>A secure password</li>
            <li>Any other required information</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Account Security</h3>
          <p>You are responsible for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access or security breach</li>
            <li>Enabling two-factor authentication when available (strongly recommended)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">3.3 Account Information</h3>
          <p>
            You agree to provide accurate, current, and complete information and to update your information
            as necessary to maintain its accuracy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Financial Account Connections via Plaid</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Consent to Access</h3>
          <p>
            By connecting your financial accounts through Plaid Technologies, Inc., you authorize RetireFree to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your account balances and transaction history (read-only)</li>
            <li>Retrieve investment account information</li>
            <li>Sync transaction data for the last 90 days</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 No Transfer Authority</h3>
          <p className="font-semibold">
            We do NOT have the ability to move money, make transactions, or modify your financial accounts
            in any way. Our access is strictly read-only.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Disconnection</h3>
          <p>
            You may disconnect your financial accounts at any time from your dashboard. Disconnection
            immediately revokes our access to your financial data.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Third-Party Services</h3>
          <p>
            Plaid is a third-party service provider. Your use of Plaid is subject to Plaid's terms and
            privacy policy, available at plaid.com/legal. We are not responsible for Plaid's services
            or any issues arising from your use of Plaid.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Service Description</h2>
          <p>RetireFree provides the following features:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Retirement withdrawal calculator based on your inputs</li>
            <li>Spending analysis and categorization of your transactions</li>
            <li>Budget comparison and recommendations</li>
            <li>Account balance monitoring and alerts</li>
            <li>Personalized retirement planning insights</li>
          </ul>
        </section>

        <section className="mb-8 bg-yellow-50 border-l-4 border-yellow-500 p-6">
          <h2 className="text-2xl font-semibold mb-4">6. IMPORTANT DISCLAIMERS</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Not Financial Advice</h3>
          <p className="font-semibold text-lg">
            RetireFree provides informational tools and educational content only. Our recommendations,
            calculations, and insights are NOT financial advice, investment advice, or professional
            guidance of any kind.
          </p>
          <p>
            We are NOT registered investment advisors, financial planners, or fiduciaries. You should
            consult with qualified financial professionals before making any retirement, investment,
            or financial decisions.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 No Guarantees</h3>
          <p>
            We do not guarantee:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The accuracy, completeness, or reliability of our calculations</li>
            <li>That following our recommendations will achieve any particular financial outcome</li>
            <li>That your retirement savings will last for any specific period</li>
            <li>Investment performance or returns</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Your Responsibility</h3>
          <p>
            You are solely responsible for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>All financial decisions you make based on information from the Service</li>
            <li>Verifying the accuracy of your inputs and our calculations</li>
            <li>Evaluating whether our recommendations are appropriate for your situation</li>
            <li>Seeking professional advice for important financial decisions</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.4 Market Risks</h3>
          <p>
            Retirement planning involves risks including market volatility, inflation, longevity risk,
            and changing economic conditions. Past performance does not guarantee future results.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Acceptable Use</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.1 Permitted Use</h3>
          <p>You may use the Service only for lawful personal, non-commercial purposes.</p>

          <h3 className="text-xl font-semibold mb-3 mt-6">7.2 Prohibited Activities</h3>
          <p>You may NOT:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the Service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use automated systems (bots, scrapers) without permission</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Remove or modify any copyright, trademark, or proprietary notices</li>
            <li>Transmit viruses, malware, or malicious code</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Impersonate any person or entity</li>
            <li>Share your account credentials with others</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
          <p>
            The Service, including all content, features, functionality, software, and design, is owned
            by RetireFree and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You are granted a limited, non-exclusive, non-transferable license to access and use the
            Service for personal use only. You may not copy, modify, distribute, sell, or create
            derivative works without our written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. User Data and Privacy</h2>
          <p>
            Our collection, use, and protection of your data is governed by our
            <a href="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</a>,
            which is incorporated into these Terms by reference.
          </p>
          <p>Key points:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>We do NOT sell your financial data</li>
            <li>Your data is encrypted and securely stored</li>
            <li>You can delete your account and data at any time</li>
            <li>You own your data and can export it upon request</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Fees and Payment</h2>
          <p>
            RetireFree currently offers its Service free of charge. We reserve the right to introduce
            paid features or subscription plans in the future. If we do:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>We will provide advance notice of any pricing changes</li>
            <li>You will have the option to accept the new terms or cancel your account</li>
            <li>Existing features may remain free or become paid features</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Service Availability</h2>
          <p>
            We strive to provide reliable service, but we do not guarantee that the Service will be:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Available at all times without interruption</li>
            <li>Error-free or free from bugs</li>
            <li>Compatible with all devices or browsers</li>
            <li>Free from viruses or harmful components</li>
          </ul>
          <p>
            We may modify, suspend, or discontinue any part of the Service at any time without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.1 By You</h3>
          <p>
            You may terminate your account at any time by:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Going to Settings → Delete Account</li>
            <li>Contacting us at support@retirefree.app</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.2 By Us</h3>
          <p>
            We may suspend or terminate your account if:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>You violate these Terms</li>
            <li>You engage in fraudulent or illegal activity</li>
            <li>Your account is inactive for an extended period</li>
            <li>We are required to do so by law</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">12.3 Effect of Termination</h3>
          <p>
            Upon termination:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to the Service will end immediately</li>
            <li>Your data will be deleted according to our Privacy Policy (within 30 days)</li>
            <li>All Plaid connections will be revoked</li>
            <li>These Terms will continue to apply to past use of the Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Limitation of Liability</h2>
          <p className="font-semibold uppercase mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW:
          </p>
          <p>
            RetireFree, its affiliates, and service providers SHALL NOT BE LIABLE for any indirect,
            incidental, special, consequential, or punitive damages, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Loss of profits, revenue, or savings</li>
            <li>Loss of data or business opportunities</li>
            <li>Financial losses resulting from reliance on our Service</li>
            <li>Poor retirement planning decisions</li>
            <li>Damages arising from third-party services (including Plaid)</li>
          </ul>
          <p>
            Our total liability to you for any claims arising from use of the Service shall not exceed
            the amount you paid us in the past 12 months (currently $0).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Warranty Disclaimer</h2>
          <p className="font-semibold uppercase mb-4">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED.
          </p>
          <p>
            We disclaim all warranties, including but not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Warranties of merchantability or fitness for a particular purpose</li>
            <li>Warranties that the Service will meet your requirements</li>
            <li>Warranties of accuracy, reliability, or completeness</li>
            <li>Warranties that the Service will be uninterrupted or error-free</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">15. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless RetireFree, its affiliates, and their
            respective officers, directors, employees, and agents from any claims, liabilities, damages,
            losses, and expenses arising from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another party</li>
            <li>Financial decisions you make based on the Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">16. Dispute Resolution</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">16.1 Informal Resolution</h3>
          <p>
            Before filing a claim, you agree to contact us at legal@retirefree.app to attempt to
            resolve the dispute informally.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">16.2 Arbitration</h3>
          <p>
            Any disputes not resolved informally shall be resolved through binding arbitration in
            accordance with the American Arbitration Association rules. You waive your right to a
            jury trial or to participate in a class action lawsuit.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">16.3 Exceptions</h3>
          <p>
            Either party may seek injunctive or other equitable relief in court to prevent infringement
            of intellectual property rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">17. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State
            of [Your State], United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">18. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. If we make material changes, we will:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Update the "Last Updated" date</li>
            <li>Notify you via email or in-app notification</li>
            <li>Give you the opportunity to review the changes</li>
          </ul>
          <p>
            Your continued use of the Service after changes become effective constitutes acceptance
            of the new Terms. If you don't agree, you must stop using the Service and delete your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">19. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision
            shall be limited or eliminated to the minimum extent necessary, and the remaining provisions
            shall remain in full force and effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">20. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between
            you and RetireFree regarding use of the Service and supersede all prior agreements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">21. Contact Information</h2>
          <p>If you have questions about these Terms, please contact us:</p>
          <ul className="list-none mb-4 space-y-2">
            <li><strong>Email:</strong> legal@retirefree.app</li>
            <li><strong>Support:</strong> support@retirefree.app</li>
            <li><strong>Website:</strong> retirefree.app</li>
          </ul>
        </section>

        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <p className="font-semibold mb-2">
            By using RetireFree, you acknowledge that you have read, understood, and agree to be
            bound by these Terms of Service.
          </p>
        </div>

      </div>
    </div>
  )
}
