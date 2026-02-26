'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlaidLinkWithConsentWithConsent } from '@/components/PlaidLinkWithConsentWithConsent'

interface Account {
  id: string
  account_name: string
  account_type: string
  account_subtype: string | null
  current_balance: number
  available_balance: number | null
  last_synced_at: string | null
  plaid_items?: {
    id: string
    institution_name: string
  }
}

interface ConnectedItem {
  id: string
  institution_name: string
}

interface AccountsClientProps {
  accounts: Account[]
  totalBalance: number
  investmentBalance: number
  cashBalance: number
  connectedItems: ConnectedItem[]
}

export function AccountsClient({
  accounts,
  totalBalance,
  investmentBalance,
  cashBalance,
  connectedItems,
}: AccountsClientProps) {
  const router = useRouter()
  const [syncing, setSyncing] = useState(false)
  const [removingItemId, setRemovingItemId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSync = async () => {
    try {
      setSyncing(true)
      setError(null)

      const response = await fetch('/api/plaid/sync-accounts', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync accounts')
      }

      // Refresh the page to show updated balances
      router.refresh()
    } catch (err: any) {
      console.error('Error syncing accounts:', err)
      setError(err.message)
    } finally {
      setSyncing(false)
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to disconnect this bank? All associated accounts will be removed.')) {
      return
    }

    try {
      setRemovingItemId(itemId)
      setError(null)

      const response = await fetch('/api/plaid/remove-item', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id: itemId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove connection')
      }

      // Refresh the page
      router.refresh()
    } catch (err: any) {
      console.error('Error removing item:', err)
      setError(err.message)
    } finally {
      setRemovingItemId(null)
    }
  }

  const handlePlaidSuccess = () => {
    // Refresh the page to show new accounts
    router.refresh()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatAccountType = (type: string, subtype: string | null) => {
    if (subtype) {
      return subtype.charAt(0).toUpperCase() + subtype.slice(1).replace('_', ' ')
    }
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const getLastSyncedText = (lastSynced: string | null) => {
    if (!lastSynced) return 'Never synced'

    const date = new Date(lastSynced)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`
    return `${Math.floor(diffMins / 1440)} days ago`
  }

  const mostRecentSync = accounts.reduce((latest, account) => {
    if (!account.last_synced_at) return latest
    if (!latest) return account.last_synced_at
    return new Date(account.last_synced_at) > new Date(latest)
      ? account.last_synced_at
      : latest
  }, null as string | null)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Accounts</h1>
          <p className="text-gray-600">
            Manage your connected financial accounts
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Portfolio</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(totalBalance)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Investment Accounts</p>
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(investmentBalance)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Cash Accounts</p>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(cashBalance)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            {mostRecentSync ? (
              <>Last updated: {getLastSyncedText(mostRecentSync)}</>
            ) : (
              <>No accounts synced yet</>
            )}
          </div>
          <div className="flex gap-3">
            <PlaidLinkWithConsent
              onSuccess={handlePlaidSuccess}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {accounts.length > 0 && (
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {syncing ? 'Syncing...' : '↻ Sync All'}
              </button>
            )}
          </div>
        </div>

        {/* Accounts List */}
        {accounts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🏦</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Accounts Connected
            </h2>
            <p className="text-gray-600 mb-6">
              Connect your bank and investment accounts to automatically track your retirement savings
            </p>
            <PlaidLinkWithConsent
              onSuccess={handlePlaidSuccess}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Connect Your First Account
            </PlaidLinkWithConsent>
          </div>
        ) : (
          <div className="space-y-6">
            {connectedItems.map((item) => {
              const itemAccounts = accounts.filter(
                (account) => account.plaid_items?.id === item.id
              )

              return (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.institution_name}
                    </h3>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={removingItemId === item.id}
                      className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                    >
                      {removingItemId === item.id ? 'Removing...' : 'Disconnect'}
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {itemAccounts.map((account) => (
                      <div
                        key={account.id}
                        className="px-6 py-4 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {account.account_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatAccountType(account.account_type, account.account_subtype)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {formatCurrency(Number(account.current_balance) || 0)}
                          </p>
                          {account.available_balance != null && (
                            <p className="text-sm text-gray-600">
                              Available: {formatCurrency(Number(account.available_balance))}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your accounts are synced securely through Plaid.
            Click "Sync All" to update your balances. Your data is encrypted and never shared.
          </p>
        </div>
      </div>
    </div>
  )
}
