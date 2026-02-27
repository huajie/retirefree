'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'

interface PlaidLinkProps {
  onSuccess: () => void
  onExit?: () => void
  className?: string
  children?: React.ReactNode
}

/**
 * PlaidLink Component
 * Launches Plaid Link to connect bank accounts
 */
export function PlaidLink({
  onSuccess,
  onExit,
  className,
  children,
}: PlaidLinkProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch link token from API
  const createLinkToken = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/plaid/create-link-token', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create link token')
      }

      setLinkToken(data.link_token)
    } catch (err: any) {
      console.error('Error creating link token:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Create link token on component mount
  useEffect(() => {
    createLinkToken()
  }, [createLinkToken])

  // Handle successful connection
  const handleOnSuccess = useCallback(
    async (public_token: string, metadata: any) => {
      try {
        setLoading(true)

        // Exchange public token for access token
        const response = await fetch('/api/plaid/exchange-public-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ public_token }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to connect account')
        }

        // Call success callback
        onSuccess()
      } catch (err: any) {
        console.error('Error exchanging token:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
    [onSuccess]
  )

  // Handle user exit
  const handleOnExit = useCallback(() => {
    onExit?.()
  }, [onExit])

  // Initialize Plaid Link
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: handleOnSuccess,
    onExit: handleOnExit,
  })

  // Handle button click
  const handleClick = useCallback(() => {
    if (ready && !loading) {
      open()
    }
  }, [ready, loading, open])

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={!ready || loading}
        className={className}
      >
        {loading
          ? 'Connecting...'
          : children || '+ Connect Bank Account'}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
