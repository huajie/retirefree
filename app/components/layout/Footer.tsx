import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl font-bold text-[#1E3A8A]">RetireFree</span>
            </div>
            <p className="text-[#4B5563] text-base">
              AI-powered retirement withdrawal guidance for peace of mind.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-[#4B5563] hover:text-[#2563EB]">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-[#4B5563] hover:text-[#2563EB]">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#calculator" className="text-[#4B5563] hover:text-[#2563EB]">
                  Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#faq" className="text-[#4B5563] hover:text-[#2563EB]">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="mailto:support@retirefree.app" className="text-[#4B5563] hover:text-[#2563EB]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-[#4B5563] hover:text-[#2563EB]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#4B5563] hover:text-[#2563EB]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#D1D5DB] text-center text-[#6B7280] text-sm">
          <p>© 2026 RetireFree. All rights reserved.</p>
          <p className="mt-2 text-xs">
            RetireFree provides educational information only. This is not financial advice.
            Consult a licensed advisor for personalized recommendations.
          </p>
        </div>
      </div>
    </footer>
  )
}
