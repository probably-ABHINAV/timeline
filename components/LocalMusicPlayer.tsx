'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Maximize,
  Eye,
  EyeOff,
  Headphones,
  RotateCcw,
  RotateCw,
  Music,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'

interface Track {
  id: number
  name: string
  artist: string
  file: string
  duration?: number
  chapter: string
}

interface LocalMusicPlayerProps {
  currentChapter?: number
  onTrackChange?: (track: Track) => void
}

const tracks: Track[] = [
  {
    id: 1,
    name: "That First Glimpse",
    artist: "Our Love Story",
    file: "/audio/chapter%201_1753863313697.mp3",
    chapter: "Chapter 1",
  },
  {
    id: 2,
    name: "Friends, Almost Enemies",
    artist: "Our Love Story",
    file: "/audio/chapter%202_1753863313698.mp3",
    chapter: "Chapter 2",
  },
  {
    id: 3,
    name: "Best Friends Who Fell In Love",
    artist: "Our Love Story",
    file: "/audio/chapter%203_1753863313698.mp3",
    chapter: "Chapter 3",
  },
  {
    id: 4,
    name: "First Touches, First Cafés",
    artist: "Our Love Story",
    file: "/audio/chapter%204_1753863313699.mp3",
    chapter: "Chapter 4",
  },
  {
    id: 5,
    name: "The Day I Proposed",
    artist: "Our Love Story",
    file: "/audio/chapter%205_1753863313699.mp3",
    chapter: "Chapter 5",
  },
  {
    id: 6,
    name: "Fun Kingdom Adventures",
    artist: "Our Love Story",
    file: "/audio/chapter%206_1753863313699.mp3",
    chapter: "Chapter 6",
  },
  {
    id: 7,
    name: "Talks, Exams, and Little Things",
    artist: "Our Love Story",
    file: "/audio/chapter%207_1753863313700.mp3",
    chapter: "Chapter 7",
  },
  {
    id: 8,
    name: "When You Proposed To Me",
    artist: "Our Love Story",
    file: "/audio/chapter%208_1753863313700.mp3",
    chapter: "Chapter 8",
  },
  {
    id: 9,
    name: "Where I Broke",
    artist: "Our Love Story",
    file: "/audio/chapter%209_1753863313701.mp3",
    chapter: "Chapter 9",
  },
  {
    id: 10,
    name: "And We Began Again",
    artist: "Our Love Story",
    file: "/audio/chapter%2010_1753863313701.mp3",
    chapter: "Chapter 10",
  },
]

export default function LocalMusicPlayer({ currentChapter, onTrackChange }: LocalMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<'none' | 'one' | 'all'>('none')
  const [visualizerData, setVisualizerData] = useState<number[]>(Array.from({ length: 32 }, () => Math.random() * 100))
  const [showPlaylist, setShowPlaylist] = useState(false)

  // Audio context and analyzer for visualizer
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyzerRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  // Update current track when chapter changes
  useEffect(() => {
    if (currentChapter && currentChapter !== currentTrack.id) {
      const track = tracks.find(t => t.id === currentChapter)
      if (track) {
        playSpecificTrack(track)
      }
    }
  }, [currentChapter])

  // Initialize audio context for visualizer
  useEffect(() => {
    const initAudioContext = async () => {
      try {
        if (!audioContextRef.current && audioRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
          const source = audioContextRef.current.createMediaElementSource(audioRef.current)
          analyzerRef.current = audioContextRef.current.createAnalyser()
          analyzerRef.current.fftSize = 64

          source.connect(analyzerRef.current)
          analyzerRef.current.connect(audioContextRef.current.destination)

          dataArrayRef.current = new Uint8Array(analyzerRef.current.frequencyBinCount)
        }
      } catch (error) {
        console.log('Audio context initialization failed:', error)
      }
    }

    if (isPlaying) {
      initAudioContext()
    }
  }, [isPlaying])

  // Visualizer animation
  useEffect(() => {
    let animationId: number

    const updateVisualizer = () => {
      if (analyzerRef.current && dataArrayRef.current && isPlaying) {
        analyzerRef.current.getByteFrequencyData(dataArrayRef.current)
        setVisualizerData(Array.from(dataArrayRef.current))
      } else if (!isPlaying) {
        // Fallback animation when not playing
        setVisualizerData(prev => prev.map(() => Math.random() * 20))
      }
      animationId = requestAnimationFrame(updateVisualizer)
    }

    if (isPlaying || !analyzerRef.current) {
      updateVisualizer()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPlaying])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (audio) {
      setCurrentTime(audio.currentTime)
      if (!isDragging) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
  }

  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (audio) {
      setDuration(audio.duration)
    }
  }

  const handleSeek = (newTime: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = newTime
      setCurrentTime(newTime)
      setProgress((newTime / duration) * 100)
    }
  }

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * duration
    handleSeek(newTime)
  }

  const handleSkipForward = () => {
    const audio = audioRef.current
    if (audio) {
      const newTime = Math.min(audio.currentTime + 10, duration)
      handleSeek(newTime)
    }
  }

  const handleSkipBackward = () => {
    const audio = audioRef.current
    if (audio) {
      const newTime = Math.max(audio.currentTime - 10, 0)
      handleSeek(newTime)
    }
  }

  // Play/pause handler
  const handlePlayPause = async () => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    setIsLoading(true)
    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        // Resume audio context if suspended
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Audio play error:', error)
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Skip forward
  const handleNext = () => {
    let nextIndex
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * tracks.length)
    } else {
      nextIndex = (tracks.findIndex(t => t.id === currentTrack.id) + 1) % tracks.length
    }
    playSpecificTrack(tracks[nextIndex])
  }

  // Skip backward
  const handlePrevious = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id)
    let prevIndex
    if (shuffle) {
      prevIndex = Math.floor(Math.random() * tracks.length)
    } else {
      prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1
    }
    playSpecificTrack(tracks[prevIndex])
  }

  // Format time
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Play specific track
  const playSpecificTrack = async (track: Track) => {
    setCurrentTrack(track)
    onTrackChange?.(track)
    setIsLoading(true)

    // Small delay to ensure audio element updates
    setTimeout(async () => {
      const audio = audioRef.current
      if (audio) {
        try {
          audio.load()
          await audio.play()
          setIsPlaying(true)
        } catch (error) {
          console.error('Error playing track:', error)
          setIsPlaying(false)
        } finally {
          setIsLoading(false)
        }
      }
    }, 100)
  }

  // Handle track end
  const handleEnded = () => {
    if (repeat === 'one') {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else if (repeat === 'all' || shuffle) {
      handleNext()
    } else {
      setIsPlaying(false)
    }
  }

  if (isHidden) {
    return (
      <>
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button
            onClick={() => setIsHidden(false)}
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full p-3 shadow-2xl"
            aria-label="Show music player"
          >
            <Music className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* Keep audio element rendered even when hidden */}
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.file}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            onError={(e) => {
              console.error('Audio loading error:', e)
              setIsPlaying(false)
              setIsLoading(false)
            }}
            onLoadStart={() => {
              console.log('Loading audio:', currentTrack.file)
              setIsLoading(true)
            }}
            onCanPlay={() => {
              console.log('Audio can play')
              setIsLoading(false)
            }}
            preload="metadata"
            crossOrigin="anonymous"
          />
        )}
      </>
    )
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 right-4 z-50"
      style={{ maxWidth: 'calc(100vw - 2rem)', maxHeight: 'calc(100vh - 2rem)' }}
    >
      <Card className="bg-white/95 backdrop-blur-xl border border-pink-200/50 shadow-2xl overflow-hidden">
        <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'w-96' : 'w-80'}`} style={{ maxWidth: 'calc(100vw - 2rem)' }}>
          {/* Compact Player Header */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 flex-1 min-w-0 pr-2">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center relative overflow-hidden flex-shrink-0"
                  animate={isPlaying ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Headphones className="w-5 h-5 text-white" />
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 truncate leading-tight">{currentTrack.name}</p>
                  <p className="text-xs text-gray-600 truncate leading-tight">{currentTrack.chapter}</p>
                </div>
              </div>
              <div className="flex items-center space-x-0.5 flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className="p-1 h-7 w-7 hover:bg-pink-100"
                  aria-label="Toggle playlist"
                >
                  <Music className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 h-7 w-7 hover:bg-pink-100"
                  aria-label="Toggle expanded view"
                >
                  <Maximize className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsHidden(true)}
                  className="p-1 h-7 w-7 hover:bg-pink-100"
                  aria-label="Hide player"
                >
                  <EyeOff className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Enhanced Progress Bar with Seek */}
            <div className="space-y-1 mb-2">
              <div className="w-full px-1">
                <Slider
                  value={[progress]}
                  onValueChange={(value) => {
                    setIsDragging(true)
                    setProgress(value[0])
                  }}
                  onValueCommit={(value) => {
                    setIsDragging(false)
                    handleProgressChange(value)
                  }}
                  max={100}
                  step={0.1}
                  className="w-full cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Enhanced Main Controls */}
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShuffle(!shuffle)}
                className={`p-1 h-7 w-7 transition-colors ${shuffle ? "text-pink-500" : "text-gray-600 hover:text-gray-900"}`}
                aria-label="Toggle shuffle"
              >
                <Shuffle className="w-3 h-3" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handlePrevious}
                className="p-1 h-7 w-7 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Previous track"
              >
                <SkipBack className="w-3 h-3" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleSkipBackward}
                className="p-1 h-7 w-7 text-gray-600 hover:text-gray-900 transition-colors relative"
                aria-label="Skip backward 10 seconds"
                title="Skip backward 10s"
              >
                <SkipBack className="w-3 h-3" />
                <span className="absolute -bottom-0.5 -right-0.5 text-[8px] font-bold">10</span>
              </Button>

              <Button
                size="sm"
                onClick={handlePlayPause}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mx-2"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleSkipForward}
                className="p-1 h-7 w-7 text-gray-600 hover:text-gray-900 transition-colors relative"
                aria-label="Skip forward 10 seconds"
                title="Skip forward 10s"
              >
                <SkipForward className="w-3 h-3" />
                <span className="absolute -bottom-0.5 -right-0.5 text-[8px] font-bold">10</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleNext}
                className="p-1 h-7 w-7 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Next track"
              >
                <SkipForward className="w-3 h-3" />
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setRepeat(repeat === 'none' ? 'all' : repeat === 'all' ? 'one' : 'none')}
                className={`p-1 h-7 w-7 relative transition-colors ${repeat !== 'none' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:text-gray-900'}`}
                aria-label={`Repeat: ${repeat}`}
              >
                <Repeat className="w-3 h-3" />
                {repeat === 'one' && (
                  <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[8px] rounded-full w-3 h-3 flex items-center justify-center">1</span>
                )}
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 h-7 w-7"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              </Button>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                className="flex-1"
                aria-label="Volume"
              />
              <span className="text-xs text-gray-500 w-6 text-center">{isMuted ? 0 : volume}</span>
            </div>
          </div>

          {/* Expanded View */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-200 p-3 bg-gradient-to-br from-pink-50 to-rose-50 overflow-hidden"
              >
                {/* Audio Visualizer */}
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Audio Visualizer</h4>
                  <div className="flex items-end justify-center space-x-1 h-12 bg-gray-900 rounded-lg p-2">
                    {visualizerData.slice(0, 20).map((value, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-t from-pink-500 to-rose-400 rounded-sm"
                        style={{ width: '2px' }}
                        animate={{ height: `${Math.max(2, (value / 255) * 32)}px` }}
                        transition={{ duration: 0.1 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Track Info */}
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 truncate">{currentTrack.name}</p>
                  <p className="text-xs text-gray-600 truncate">{currentTrack.artist}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{currentTrack.chapter}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Playlist */}
          <AnimatePresence>
            {showPlaylist && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-200 overflow-hidden"
                style={{ maxHeight: 'calc(100vh - 12rem)' }}
              >
                <div className="p-2">
                  <h4 className="text-xs font-medium text-gray-700 mb-2 px-1">Playlist</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-gray-100">
                    {tracks.map((track) => (
                      <motion.button
                        key={track.id}
                        onClick={() => playSpecificTrack(track)}
                        className={`w-full text-left p-2 rounded-lg hover:bg-pink-50 transition-colors ${
                          currentTrack.id === track.id ? 'bg-pink-100 border border-pink-200' : 'hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {track.id}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 truncate leading-tight">{track.name}</p>
                            <p className="text-xs text-gray-600 truncate leading-tight">{track.chapter}</p>
                          </div>
                          {currentTrack.id === track.id && isPlaying && (
                            <div className="flex space-x-0.5 flex-shrink-0">
                              {Array.from({ length: 3 }, (_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-0.5 bg-pink-500 rounded-full"
                                  animate={{ height: [3, 8, 3] }}
                                  transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hidden Audio Element */}
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.file}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            onError={(e) => {
              console.error('Audio loading error:', e)
              setIsPlaying(false)
              setIsLoading(false)
            }}
            onLoadStart={() => {
              console.log('Loading audio:', currentTrack.file)
              setIsLoading(true)
            }}
            onCanPlay={() => {
              console.log('Audio can play')
              setIsLoading(false)
            }}
            preload="metadata"
            crossOrigin="anonymous"
          />
        )}
      </Card>
    </motion.div>
  )
}
// The code has been updated to include timeline seek functionality, advanced controls, and enhanced UI components, addressing the user's request.