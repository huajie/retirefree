export const metadata = {
  title: 'Privacy Policy | RetireFree',
  description: 'RetireFree Privacy Policy - How we collect, use, and protect your data',
  alternates: {
    canonical: 'https://retirefree.app/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="text-gray-600 mb-8">
        <strong>Last Updated:</strong> February 26, 2026
      </p>

      <div className="prose prose-lg max-w-none">

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            RetireFree ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our retirement
            planning application and services.
          </p>
          <p>
            By using RetireFree, you agree to the collection and use of information in accordance with this policy.
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Account Information:</strong> Email address, name, and password when you create an account</li>
            <li><strong>Retirement Inputs:</strong> Age, retirement age, savings amount, monthly expenses, and other calculator inputs you provide</li>
            <li><strong>Communications:</strong> Messages you send to our support team</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Financial Data via Plaid</h3>
          <p>
            When you choose to connect your bank or investment accounts through Plaid Technologies, Inc.,
            we collect the following financial information with your explicit consent:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Account Information:</strong> Account names, types (checking, savings, 401k, IRA, brokerage), and account numbers</li>
            <li><strong>Balance Information:</strong> Current and available balances for connected accounts</li>
            <li><strong>Transaction Data:</strong> Your transaction history for the last 90 days, including:
              <ul className="list-circle pl-6 mt-2">
                <li>Transaction amounts and dates</li>
                <li>Merchant names</li>
                <li>Automatic categorization (groceries, healthcare, travel, etc.)</li>
              </ul>
            </li>
            <li><strong>Investment Holdings:</strong> Investment account balances and asset values</li>
          </ul>
          <p className="font-semibold">
            We only have READ-ONLY access to your financial accounts. We cannot move money, make transactions,
            or make any changes to your accounts.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Usage Data:</strong> Pages visited, features used, time spent on pages</li>
            <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
            <li><strong>Cookies:</strong> Session cookies for authentication and essential functionality</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Provide Services:</strong> Calculate safe retirement withdrawal amounts based on your savings and spending</li>
            <li><strong>Spending Analysis:</strong> Analyze your transaction data to show where your money goes and compare to your budget</li>
            <li><strong>Account Management:</strong> Maintain your account and authenticate your access</li>
            <li><strong>Personalization:</strong> Provide personalized retirement recommendations based on your actual financial situation</li>
            <li><strong>Communications:</strong> Send important service updates, security alerts, and respond to your inquiries</li>
            <li><strong>Improvements:</strong> Improve our application and develop new features</li>
            <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
            <li><strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.1 We DO NOT Sell Your Data</h3>
          <p className="font-semibold text-lg">
            We will NEVER sell, rent, or share your financial data with third parties for marketing purposes.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Service Providers</h3>
          <p>We share information with trusted service providers who help us operate our application:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Plaid Technologies, Inc.:</strong> Securely connects to your financial accounts (see Plaid's Privacy Policy at plaid.com/legal)</li>
            <li><strong>Supabase:</strong> Database and authentication services (SOC 2 Type II certified)</li>
            <li><strong>Vercel:</strong> Application hosting and infrastructure (SOC 2 Type II certified)</li>
          </ul>
          <p>
            These service providers are contractually obligated to protect your data and use it only for
            providing services to us.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Legal Requirements</h3>
          <p>We may disclose your information if required by law or in response to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Valid legal processes (subpoenas, court orders)</li>
            <li>Requests from law enforcement or government agencies</li>
            <li>Protection of our rights, property, or safety</li>
            <li>Prevention of fraud or security threats</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Business Transfers</h3>
          <p>
            In the event of a merger, acquisition, or sale of assets, your information may be transferred
            to the acquiring entity. We will notify you before your information is transferred and becomes
            subject to a different privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. How We Protect Your Information</h2>
          <p>We implement industry-standard security measures to protect your data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Encryption in Transit:</strong> All data transmitted between your device and our servers uses TLS 1.3 encryption</li>
            <li><strong>Encryption at Rest:</strong> Your financial data is encrypted in our database using AES-256 encryption</li>
            <li><strong>Access Controls:</strong> Strict authentication requirements and role-based access to production systems</li>
            <li><strong>Secure Infrastructure:</strong> SOC 2 certified cloud providers (Vercel, Supabase)</li>
            <li><strong>Data Isolation:</strong> Row Level Security (RLS) policies ensure users can only access their own data</li>
            <li><strong>Regular Audits:</strong> Ongoing security monitoring and vulnerability scanning</li>
            <li><strong>Plaid Security:</strong> Bank-level security for financial connections (Plaid is SOC 2 and ISO 27001 certified)</li>
          </ul>
          <p>
            However, no method of transmission over the Internet is 100% secure. While we strive to protect
            your information, we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Privacy Rights</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Access and Portability</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Request a copy of your data in a portable format</li>
            <li>View your connected accounts and transaction data in your dashboard</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Correction</h3>
          <p>You can update your account information and calculator inputs directly in your dashboard at any time.</p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Deletion</h3>
          <p>You have the right to request deletion of your account and all associated data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Go to Settings → Delete Account</li>
            <li>All your data will be permanently deleted within 30 days</li>
            <li>Your Plaid connections will be immediately revoked</li>
            <li>Backup copies will be removed within 90 days</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.4 Disconnect Bank Accounts</h3>
          <p>You can disconnect your bank accounts at any time:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Go to Dashboard → Accounts → Disconnect</li>
            <li>This immediately revokes RetireFree's access to your financial data</li>
            <li>Your previously synced transaction data will remain until you delete your account</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.5 Marketing Communications</h3>
          <p>You can opt out of promotional emails by clicking "unsubscribe" in any marketing email.</p>

          <h3 className="text-xl font-semibold mb-3 mt-6">6.6 State-Specific Rights</h3>
          <p>
            <strong>California (CCPA):</strong> California residents have additional rights including the
            right to know what personal information we collect, the right to delete, and the right to opt-out
            of sales (though we don't sell data).
          </p>
          <p>
            <strong>European Union (GDPR):</strong> EU residents have rights including access, rectification,
            erasure, data portability, and the right to object to processing.
          </p>
          <p>
            To exercise these rights, contact us at privacy@retirefree.app
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
          <p>We retain your information as follows:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Active Accounts:</strong> Data retained while your account is active</li>
            <li><strong>Inactive Accounts:</strong> Transaction data deleted after 2 years of inactivity</li>
            <li><strong>Deleted Accounts:</strong> All data permanently deleted within 30 days of account deletion</li>
            <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
            <li><strong>Backups:</strong> Backup data purged within 90 days of account deletion</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
          <p>
            RetireFree is not intended for users under 18 years of age. We do not knowingly collect
            personal information from children. If you believe we have collected information from a child,
            please contact us immediately at privacy@retirefree.app.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
          <p>
            RetireFree is based in the United States. If you access our services from outside the U.S.,
            your information will be transferred to, stored, and processed in the United States. By using
            our services, you consent to this transfer.
          </p>
          <p>
            We use cloud providers (Vercel, Supabase) that comply with international data protection
            frameworks including GDPR.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links</h2>
          <p>
            Our application may contain links to third-party websites (e.g., Plaid). We are not responsible
            for the privacy practices of these sites. We encourage you to read their privacy policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Posting the new policy on this page</li>
            <li>Updating the "Last Updated" date</li>
            <li>Sending an email notification for material changes</li>
          </ul>
          <p>
            Your continued use of RetireFree after changes become effective constitutes acceptance of the
            updated policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
          <ul className="list-none mb-4 space-y-2">
            <li><strong>Email:</strong> privacy@retirefree.app</li>
            <li><strong>Website:</strong> retirefree.app</li>
          </ul>
          <p>
            For security issues or data breaches, contact: security@retirefree.app
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Disclaimer</h2>
          <p className="font-semibold">
            RetireFree provides informational tools for retirement planning. Our recommendations are NOT
            financial advice. We are not registered investment advisors. You should consult with a qualified
            financial professional before making retirement decisions.
          </p>
        </section>

      </div>
    </div>
  )
}
