
const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1'

export interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{ name: string }>
  preview_url?: string
  external_urls: {
    spotify: string
  }
  duration_ms: number
  album: {
    images: Array<{
      url: string
      height: number
      width: number
    }>
  }
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  tracks: {
    items: Array<{
      track: SpotifyTrack
    }>
  }
}

class SpotifyAPI {
  private accessToken: string | null = null
  private clientId: string
  private clientSecret: string

  constructor() {
    this.clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || ''
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || ''
    
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('spotify_access_token') || null
    }
    
    // Only warn in development
    if (process.env.NODE_ENV === 'development') {
      if (!this.clientId) {
        console.warn('NEXT_PUBLIC_SPOTIFY_CLIENT_ID is not set')
      }
      if (!this.clientSecret) {
        console.warn('SPOTIFY_CLIENT_SECRET is not set')
      }
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.accessToken
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code: string): Promise<string> {
    const response = await fetch('/api/spotify/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })

    if (!response.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const data = await response.json()
    this.accessToken = data.access_token
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('spotify_access_token', data.access_token)
      if (data.refresh_token) {
        localStorage.setItem('spotify_refresh_token', data.refresh_token)
      }
    }

    return data.access_token
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (!this.accessToken) {
      throw new Error('No Spotify access token available')
    }

    const response = await fetch(`${SPOTIFY_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getPlaylist(playlistId: string): Promise<SpotifyPlaylist> {
    return this.makeRequest(`/playlists/${playlistId}`)
  }

  async getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
    const playlist = await this.getPlaylist(playlistId)
    return playlist.tracks.items.map(item => item.track)
  }

  async searchTracks(query: string, limit: number = 10): Promise<SpotifyTrack[]> {
    const response = await this.makeRequest(
      `/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`
    )
    return response.tracks.items
  }

  async getUserPlaylists(limit: number = 20): Promise<any[]> {
    const response = await this.makeRequest(`/me/playlists?limit=${limit}`)
    return response.items
  }

  async getCurrentUser(): Promise<any> {
    return this.makeRequest('/me')
  }

  // Get authentication URL for Spotify OAuth
  getAuthUrl(): string {
    if (typeof window === 'undefined') return ''
    
    // Use the correct Replit domain format
    const origin = window.location.origin
    const redirectUri = encodeURIComponent(`${origin}/auth/spotify/callback`)
    const scopes = encodeURIComponent('streaming user-read-playback-state user-modify-playback-state user-read-email user-read-private')
    const state = Math.random().toString(36).substring(7)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('spotify_oauth_state', state)
    }
    
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}`
  }
}

export const spotifyAPI = new SpotifyAPI()

// Hook for using Spotify in components
export function useSpotify() {
  const playTrack = async (trackId: string) => {
    if (window.Spotify && window.Spotify.Player) {
      // Use Spotify Web Playback SDK to play track
      const player = window.Spotify.Player.getInstance()
      if (player) {
        await player.resume()
      }
    }
  }

  const pauseTrack = async () => {
    if (window.Spotify && window.Spotify.Player) {
      const player = window.Spotify.Player.getInstance()
      if (player) {
        await player.pause()
      }
    }
  }

  return {
    playTrack,
    pauseTrack,
    spotifyAPI,
  }
}

// Extend Window interface for Spotify Web Playback SDK
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: {
      Player: new (options: {
        name: string
        getOAuthToken: (cb: (token: string) => void) => void
        volume?: number
      }) => {
        addListener: (event: string, callback: (data: any) => void) => void
        removeListener: (event: string, callback?: (data: any) => void) => void
        connect: () => Promise<boolean>
        disconnect: () => void
        getCurrentState: () => Promise<any>
        setName: (name: string) => Promise<void>
        setVolume: (volume: number) => Promise<void>
        pause: () => Promise<void>
        resume: () => Promise<void>
        togglePlay: () => Promise<void>
        seek: (position: number) => Promise<void>
        previousTrack: () => Promise<void>
        nextTrack: () => Promise<void>
        activateElement: () => Promise<void>
      }
    }
  }
}
