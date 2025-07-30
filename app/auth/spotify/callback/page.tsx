
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { spotifyAPI } from '@/lib/spotify'
import { Suspense } from 'react'

function SpotifyCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const handleCallback = async () => {
      // Ensure we're on the client side
      if (typeof window === 'undefined') return

      const code = searchParams.get('code')
      const state = searchParams.get('state')
      const error = searchParams.get('error')

      if (error) {
        setStatus('error')
        setError(`Spotify authorization failed: ${error}`)
        return
      }

      // Verify state parameter for security
      const storedState = localStorage.getItem('spotify_oauth_state')
      if (state !== storedState) {
        setStatus('error')
        setError('Invalid state parameter - possible CSRF attack')
        return
      }

      if (!code) {
        setStatus('error')
        setError('No authorization code received')
        return
      }

      try {
        await spotifyAPI.exchangeCodeForToken(code)
        setStatus('success')
        
        // Clean up stored state
        if (typeof window !== 'undefined') {
          localStorage.removeItem('spotify_oauth_state')
        }
        
        // Redirect back to main page after successful authentication
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } catch (err) {
        console.error('Spotify authentication error:', err)
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Failed to authenticate with Spotify')
        
        // Redirect to home page after error display
        setTimeout(() => {
          router.push('/')
        }, 5000)
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Connecting to Spotify...
            </h2>
            <p className="text-gray-600">Please wait while we authenticate your account.</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-green-600 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Successfully Connected!
            </h2>
            <p className="text-gray-600">Redirecting you back to the story...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-red-600 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Connection Failed
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Return to Story
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function SpotifyCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading...
          </h2>
        </div>
      </div>
    }>
      <SpotifyCallbackContent />
    </Suspense>
  )
}

// Force dynamic rendering to prevent prerender errors
export const dynamic = 'force-dynamic'
