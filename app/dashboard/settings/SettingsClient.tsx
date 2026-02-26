'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SettingsClientProps {
  userEmail: string
  connectedAccountsCount: number
  connectedAccounts: Array<{ id: string; institution_name: string }>
}

export default function SettingsClient({
  userEmail,
  connectedAccountsCount,
  connectedAccounts
}: SettingsClientProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE') {
      alert('Please type DELETE to confirm')
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch('/api/user/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Account deleted successfully. ${data.plaidTokensRevoked} bank connection(s) revoked.`)
        router.push('/')
      } else {
        const error = await response.json()
        alert(`Failed to delete account: ${error.error}`)
        setIsDeleting(false)
      }
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('An error occurred while deleting your account. Please try again or contact support.')
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Account Information */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-lg">{userEmail}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Connected Accounts</label>
            <p className="text-lg">{connectedAccountsCount} bank account(s) connected</p>
            {connectedAccounts.length > 0 && (
              <ul className="mt-2 space-y-1">
                {connectedAccounts.map((account) => (
                  <li key={account.id} className="text-sm text-gray-600">
                    • {account.institution_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
        <div className="space-y-3">
          <div>
            <a
              href="/privacy"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              View Privacy Policy →
            </a>
          </div>
          <div>
            <a
              href="/terms"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              View Terms of Service →
            </a>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-red-900">Danger Zone</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
            <p className="text-sm text-red-800 mb-4">
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>

            <div className="space-y-2 text-sm text-red-800 mb-4">
              <p><strong>What will be deleted:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your account and login credentials</li>
                <li>All calculator inputs and retirement plans</li>
                <li>All connected bank accounts ({connectedAccountsCount} connection{connectedAccountsCount !== 1 ? 's' : ''})</li>
                <li>All transaction history and spending analysis</li>
                <li>All personal information and settings</li>
              </ul>

              {connectedAccountsCount > 0 && (
                <p className="mt-3 font-semibold">
                  ⚠️ Your {connectedAccountsCount} Plaid connection{connectedAccountsCount !== 1 ? 's' : ''} will be immediately revoked.
                  RetireFree will no longer have access to your financial accounts.
                </p>
              )}
            </div>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
              >
                Delete Account
              </button>
            ) : (
              <div className="bg-white p-4 rounded border-2 border-red-300">
                <p className="font-semibold mb-3 text-red-900">
                  Are you absolutely sure?
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  Type <span className="font-mono font-bold">DELETE</span> to confirm account deletion:
                </p>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE"
                  className="border-2 border-gray-300 rounded px-3 py-2 w-full mb-4"
                  disabled={isDeleting}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={confirmText !== 'DELETE' || isDeleting}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? 'Deleting...' : 'Permanently Delete Account'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setConfirmText('')
                    }}
                    disabled={isDeleting}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
