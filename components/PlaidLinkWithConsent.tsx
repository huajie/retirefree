'use client'

import { useState } from 'react'
import { PlaidLink } from './PlaidLink'
import Link from 'next/link'

interface PlaidLinkWithConsentProps {
  onSuccess: () => void
  onExit?: () => void
  className?: string
  children?: React.ReactNode
}

/**
 * PlaidLink Component with Required Consent Modal
 * Shows consent agreement before launching Plaid Link
 */
export function PlaidLinkWithConsent({
  onSuccess,
  onExit,
  className,
  children,
}: PlaidLinkWithConsentProps) {
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  const handleInitialClick = () => {
    // Show consent modal first
    setShowConsentModal(true)
  }

  const handleConsentConfirm = () => {
    setConsentGiven(true)
    setShowConsentModal(false)
    // PlaidLink will automatically open since consentGiven is now true
  }

  const handleCancel = () => {
    setShowConsentModal(false)
    onExit?.()
  }

  // If consent not given, show our custom button
  if (!consentGiven) {
    return (
      <>
        <button
          onClick={handleInitialClick}
          className={className}
        >
          {children || '+ Connect Bank Account'}
        </button>

        {/* Consent Modal */}
        {showConsentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Authorization Required
                  </h2>
                  <p className="text-gray-600">
                    Please review and authorize RetireFree to access your financial data
                  </p>
                </div>

                {/* What We Access */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What We'll Access
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <div>
                        <strong>Account balances</strong> - To calculate your total retirement savings
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <div>
                        <strong>Transaction history (last 90 days)</strong> - To analyze your spending patterns
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <div>
                        <strong>Account details</strong> - To display your connected accounts
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why We Need This */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Why We Need This
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Show you exactly where your money goes each month</li>
                    <li>Compare your actual spending to your budget</li>
                    <li>Provide accurate retirement withdrawal recommendations</li>
                    <li>Alert you if your withdrawal strategy needs adjusting</li>
                  </ul>
                </div>

                {/* Security & Privacy */}
                <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🔒 Security & Privacy
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    We use <strong>Plaid</strong> (trusted by Venmo, Robinhood, and thousands of apps)
                    for secure, bank-level encryption. Your credentials are never stored on our servers.
                  </p>
                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>Read-only access</strong> - We can only VIEW your data</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>Bank-level encryption</strong> - All data is encrypted</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>You control access</strong> - Disconnect anytime from Settings</span>
                    </div>
                  </div>
                </div>

                {/* What We Cannot Do */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What We CANNOT Do
                  </h3>
                  <div className="space-y-1 text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Move money or make transactions</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Make payments or transfers</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Sell your data to third parties</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Change any account settings</span>
                    </div>
                  </div>
                </div>

                {/* Legal Links */}
                <div className="mb-6 text-sm text-gray-600">
                  <p>
                    By connecting your account, you agree to our{' '}
                    <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                    {' '}and{' '}
                    <Link href="/terms" target="_blank" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>.
                  </p>
                  <p className="mt-2">
                    Learn more about{' '}
                    <a
                      href="https://plaid.com/how-we-handle-data/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      how Plaid handles your data
                    </a>.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConsentConfirm}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
                  >
                    I Authorize
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Once consent is given, render actual PlaidLink
  return (
    <PlaidLink
      onSuccess={onSuccess}
      onExit={onExit}
      className={className}
    >
      {children}
    </PlaidLink>
  )
}
