'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SpendingChart } from '@/components/SpendingChart'
import { format } from 'date-fns'

interface CategoryData {
  category: string
  amount: number
  count: number
}

interface TransactionSummary {
  totalSpent: number
  totalIncome: number
  netCashFlow: number
  byCategory: CategoryData[]
}

interface Transaction {
  id: string
  transaction_date: string
  amount: number
  merchant_name: string
  category_primary: string
  category_detailed: string
  pending: boolean
  financial_accounts: {
    account_name: string
  }
}

interface SpendingClientProps {
  hasAccounts: boolean
  lastSync: any
  summary: TransactionSummary | null
  recentTransactions: Transaction[]
  calculatorMonthlyExpenses: number | null
  dateRange: {
    start: string
    end: string
  }
}

export function SpendingClient({
  hasAccounts,
  lastSync,
  summary,
  recentTransactions,
  calculatorMonthlyExpenses,
  dateRange,
}: SpendingClientProps) {
  const router = useRouter()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const response = await fetch('/api/plaid/sync-transactions', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to sync transactions')
      }

      const result = await response.json()
      console.log('Sync result:', result)

      // Refresh the page to show new data
      router.refresh()
    } catch (error) {
      console.error('Error syncing transactions:', error)
      alert('Failed to sync transactions. Please try again.')
    } finally {
      setIsSyncing(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MMM d, yyyy')
  }

  // No accounts connected
  if (!hasAccounts) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-[#2563EB] hover:text-[#1E40AF] text-sm font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">My Spending</h1>

        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#2563EB]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#1E3A8A] mb-2">
              Connect Your Accounts
            </h2>
            <p className="text-[#4B5563] mb-6 max-w-md mx-auto">
              Connect your bank accounts to automatically track your spending and see where
              your money goes.
            </p>
            <Link href="/dashboard/accounts">
              <Button>Connect Accounts</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  // No transactions synced yet
  if (!lastSync || !summary) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-[#2563EB] hover:text-[#1E40AF] text-sm font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">My Spending</h1>

        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#2563EB]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#1E3A8A] mb-2">
              Sync Your Transactions
            </h2>
            <p className="text-[#4B5563] mb-6 max-w-md mx-auto">
              Sync your transactions to see where your money goes over the last 90 days.
            </p>
            <Button onClick={handleSync} disabled={isSyncing}>
              {isSyncing ? 'Syncing...' : 'Sync Transactions'}
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Calculate monthly average
  const monthlyAverage = Math.round((summary.totalSpent / 3) * 100) / 100

  // Compare to calculator
  const hasCalculatorData = calculatorMonthlyExpenses && calculatorMonthlyExpenses > 0
  const variance = hasCalculatorData
    ? monthlyAverage - calculatorMonthlyExpenses
    : null
  const variancePercent = hasCalculatorData
    ? ((variance! / calculatorMonthlyExpenses) * 100).toFixed(0)
    : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-[#2563EB] hover:text-[#1E40AF] text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1E3A8A]">My Spending</h1>
          <p className="text-[#4B5563] mt-1">
            Last 90 Days • {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
          </p>
        </div>
        <Button onClick={handleSync} disabled={isSyncing} size="sm">
          {isSyncing ? 'Syncing...' : '↻ Sync Transactions'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="text-sm text-[#4B5563] mb-1">Total Spent (90 days)</div>
          <div className="text-3xl font-bold text-[#1E3A8A]">
            {formatCurrency(summary.totalSpent)}
          </div>
        </Card>

        <Card>
          <div className="text-sm text-[#4B5563] mb-1">Monthly Average</div>
          <div className="text-3xl font-bold text-[#1E3A8A]">
            {formatCurrency(monthlyAverage)}
          </div>
        </Card>

        <Card>
          <div className="text-sm text-[#4B5563] mb-1">Total Income (90 days)</div>
          <div className="text-3xl font-bold text-[#10B981]">
            {formatCurrency(summary.totalIncome)}
          </div>
        </Card>
      </div>

      {/* Comparison Alert */}
      {hasCalculatorData && variance !== null && Math.abs(variance) > 100 && (
        <Card className="mb-8 border-l-4 border-[#F59E0B] bg-[#FFFBEB]">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-[#F59E0B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#92400E] mb-1">
                {variance > 0 ? 'Spending More Than Expected' : 'Spending Less Than Expected'}
              </h3>
              <p className="text-sm text-[#78350F]">
                You're spending about {formatCurrency(monthlyAverage)}/month, but your
                calculator shows {formatCurrency(calculatorMonthlyExpenses)}/month. That's{' '}
                {formatCurrency(Math.abs(variance))} {variance > 0 ? 'over' : 'under'} (
                {Math.abs(Number(variancePercent))}%).
              </p>
              <Link
                href="/#calculator"
                className="text-sm text-[#2563EB] hover:text-[#1E40AF] font-medium mt-2 inline-block"
              >
                Update Calculator →
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Spending by Category */}
      {summary.byCategory.length > 0 && (
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-[#1E3A8A] mb-6">
            Spending by Category
          </h2>
          <SpendingChart data={summary.byCategory} />

          <div className="mt-8 space-y-3">
            {summary.byCategory.slice(0, 8).map((category) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-[#1E3A8A]">{category.category}</div>
                  <div className="text-sm text-[#4B5563]">{category.count} transactions</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-[#1E3A8A]">
                    {formatCurrency(category.amount)}
                  </div>
                  <div className="text-sm text-[#4B5563]">
                    {((category.amount / summary.totalSpent) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <Card>
          <h2 className="text-xl font-semibold text-[#1E3A8A] mb-6">
            Recent Transactions ({recentTransactions.length})
          </h2>
          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between py-3 border-b border-[#E5E7EB] last:border-0"
              >
                <div className="flex-1">
                  <div className="font-medium text-[#1E3A8A]">{txn.merchant_name}</div>
                  <div className="text-sm text-[#4B5563]">
                    {formatDate(txn.transaction_date)} • {txn.category_primary}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-semibold ${
                      txn.amount < 0 ? 'text-[#EF4444]' : 'text-[#10B981]'
                    }`}
                  >
                    {txn.amount < 0 ? '-' : '+'}
                    {formatCurrency(Math.abs(txn.amount))}
                  </div>
                  {txn.pending && (
                    <div className="text-xs text-[#F59E0B]">Pending</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {lastSync && (
        <div className="text-center text-sm text-[#6B7280] mt-6">
          Last synced: {formatDate(lastSync.last_synced_at)}
        </div>
      )}
    </div>
  )
}
