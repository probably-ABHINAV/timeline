"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import {
  Heart,
  MapPin,
  Music,
  Play,
  Pause,
  Sparkles,
  Coffee,
  MessageCircle,
  Star,
  Clock,
  Moon,
  Gift,
  BookOpen,
  Headphones,
  ArrowDown,
  Quote,
  Volume2,
  Camera,
  Mic,
  Calendar,
  VolumeX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

// Enhanced story chapters with deeper emotional content
const storyChapters = [
  {
    id: 1,
    chapter: "Chapter 1",
    title: "That First Glimpse",
    subtitle: "When destiny wore a school uniform",
    date: "June 2022",
    location: "JPHS Jaipur",
    content: [
      "It was a regular day in June. Jaipur was new, unfamiliar, buzzing with unknown faces. And then, I saw you.",
      "In a place neither of us were supposed to be — a tuition center that wasn't yours, but still, somehow became ours.",
      "Two outsiders in a new city, from Beawar and Sarasar — maybe that's why we noticed each other first.",
      "And just like that, something shifted. Without a word, without a reason — you became a thought that refused to leave.",
    ],
    color: "from-rose-300 via-pink-400 to-rose-500",
    bgColor: "from-pink-50 via-rose-50 to-pink-100",
    icon: Clock,
    mood: "Serendipitous",
    song: "Serendipity - BTS",
    image: "/placeholder.svg?height=600&width=800&text=First+Meeting+at+JPHS",
    memories: ["Unfamiliar faces", "Two outsiders", "A thought that refused to leave"],
    weather: "Warm June afternoon",
    heartbeat: 72,
    voiceNote: "The moment I first saw you, time stopped...",
  },
  {
    id: 2,
    chapter: "Chapter 2",
    title: "Friends, Almost Enemies, and Something More",
    subtitle: "12:47 AM - The message that changed everything",
    date: "July 31st, 2023",
    location: "Late Night Messages",
    content: [
      "From conversations in school… to misunderstandings that turned us into strangers…",
      "From a proposal rejected… to late-night thoughts where I'd wonder if you were okay.",
      "And then came your birthday — July 31st, 2023.",
      "I waited till 12:47 AM, heart racing, words trembling. I sent a message — flirty, heartfelt, hoping we could restart.",
      "And you didn't walk away.",
    ],
    color: "from-amber-300 via-orange-400 to-red-400",
    bgColor: "from-amber-50 via-orange-50 to-red-100",
    icon: MessageCircle,
    mood: "Hopeful Reconnection",
    song: "Perfect - Ed Sheeran",
    image: "/placeholder.svg?height=600&width=800&text=Birthday+Message+12:47+AM",
    memories: ["Heart racing", "Words trembling", "You didn't walk away"],
    weather: "Midnight silence",
    heartbeat: 95,
    voiceNote: "12:47 AM... I was so nervous typing that message...",
  },
  {
    id: 3,
    chapter: "Chapter 3",
    title: "Best Friends Who Fell In Love",
    subtitle: "Love only happens once",
    date: "Late 2023",
    location: "Daily Conversations",
    content: [
      "We became inseparable. Daily chats, deep secrets, little laughs.",
      "We weren't just talking — we were becoming.",
      "You once said: 'Love only happens once.'",
      "I smiled quietly — because I knew you were already it for me.",
      "Then came the night I confessed. And you did too — even though you'd planned to tell me at farewell.",
      "Love was never loud with us. It just… bloomed.",
    ],
    color: "from-indigo-400 via-purple-500 to-pink-500",
    bgColor: "from-indigo-50 via-purple-50 to-pink-100",
    icon: Heart,
    mood: "Blooming Love",
    song: "Say You Won't Let Go - James Arthur",
    image: "/placeholder.svg?height=600&width=800&text=Daily+Chats+and+Confessions",
    memories: ["Daily chats", "Deep secrets", "Love just bloomed"],
    weather: "Gentle evening breeze",
    heartbeat: 88,
    voiceNote: "The night we both confessed... magic happened...",
  },
  {
    id: 4,
    chapter: "Chapter 4",
    title: "First Touches, First Cafés",
    subtitle: "Electricity in every glance",
    date: "October 2023",
    location: "Chai Kapi Café",
    content: [
      "Our hands brushed. I sat next to you at Chai Kapi, our first go-to café.",
      "You'd tease me, laugh that laugh, and I'd forget everything else.",
      "That first kiss — from cheeks, to neck, to lips — wasn't just a moment. It was electricity.",
      "We had our own world tucked behind her street, in corners of cafés, in stolen glances after tuition.",
    ],
    color: "from-red-400 via-pink-500 to-rose-600",
    bgColor: "from-red-50 via-pink-50 to-rose-100",
    icon: Coffee,
    mood: "Electric Connection",
    song: "Dil-e-Baadat",
    image: "/placeholder.svg?height=600&width=800&text=Chai+Kapi+First+Kiss",
    memories: ["Hands brushed", "That laugh", "Pure electricity"],
    weather: "Cozy café warmth",
    heartbeat: 102,
    voiceNote: "That first kiss... I still get butterflies thinking about it...",
  },
  {
    id: 5,
    chapter: "Chapter 5",
    title: "The Day I Proposed",
    subtitle: "Your eyes said yes before your words",
    date: "January 19th, 2024",
    location: "My House",
    content: [
      "January 19th, 2024. My house. Your smile.",
      "Dil-e-Baadat playing in the background.",
      "The room was decorated, a flower waited, my heart was louder than my playlist.",
      "I proposed, fully, truly, in a way I could never do before.",
      "And you said yes. Not with words, but with your eyes.",
    ],
    color: "from-yellow-400 via-amber-500 to-orange-600",
    bgColor: "from-yellow-50 via-amber-50 to-orange-100",
    icon: Gift,
    mood: "Pure Joy",
    song: "Marry Me - Train",
    image: "/placeholder.svg?height=600&width=800&text=Proposal+January+19th+2024",
    memories: ["Decorated room", "A flower waited", "Your eyes said yes"],
    weather: "Perfect January evening",
    heartbeat: 120,
    voiceNote: "The moment you said yes... my heart exploded with joy...",
  },
  {
    id: 6,
    chapter: "Chapter 6",
    title: "Fun Kingdom, Games, and More Firsts",
    subtitle: "We rented the world",
    date: "February 2024",
    location: "Fun Kingdom & Beyond",
    content: [
      "You planned a non-date. Rides, empty swings, laughter echoing like we rented the world. We played Tekken. You won.",
      "We went bowling, walked museums, watched movies. Fighter. Teri Baaton Mein Ulja Jiya.",
      "Every place — WTP, Albert Hall, Elements — carries our fingerprints.",
    ],
    color: "from-blue-400 via-cyan-500 to-teal-600",
    bgColor: "from-blue-50 via-cyan-50 to-teal-100",
    icon: Sparkles,
    mood: "Adventure Together",
    song: "Adventure of a Lifetime - Coldplay",
    image: "/placeholder.svg?height=600&width=800&text=Fun+Kingdom+Adventures",
    memories: ["Empty swings", "You won at Tekken", "Our fingerprints everywhere"],
    weather: "Sunny adventure day",
    heartbeat: 85,
    voiceNote: "Every adventure with you feels like magic...",
  },
  {
    id: 7,
    chapter: "Chapter 7",
    title: "Talks, Exams, and Little Things",
    subtitle: "10 minutes of home",
    date: "Board Exam Period",
    location: "School Canteen",
    content: [
      "Boards were close, but we stayed closer. You supported me — when I didn't even know how to support myself.",
      "You made me a CV. You waited for me. You helped me choose colleges. You never stopped believing in me.",
      "I waited in the canteen just to see you for 10 minutes. And those 10 minutes were home.",
    ],
    color: "from-green-400 via-emerald-500 to-teal-600",
    bgColor: "from-green-50 via-emerald-50 to-teal-100",
    icon: BookOpen,
    mood: "Supportive Love",
    song: "Count on Me - Bruno Mars",
    image: "/placeholder.svg?height=600&width=800&text=Board+Exams+Support",
    memories: ["You made me a CV", "Never stopped believing", "10 minutes were home"],
    weather: "Stressful but supported",
    heartbeat: 78,
    voiceNote: "Your support meant everything to me...",
  },
  {
    id: 8,
    chapter: "Chapter 8",
    title: "When You Proposed To Me",
    subtitle: "The most beautiful chapter",
    date: "October 2024",
    location: "Hotel Room",
    content: [
      "October 2024 — unofficial freshers. You surprised me with a bouquet, gifts, and love in a hotel room lit with your presence.",
      "You proposed to me. You danced with me. You gifted me a necklace I still remember the feel of.",
      "In that moment, I realized: no matter how this story unfolds, you'll always be the most beautiful chapter.",
    ],
    color: "from-purple-400 via-pink-500 to-rose-600",
    bgColor: "from-purple-50 via-pink-50 to-rose-100",
    icon: Gift,
    mood: "Beautiful Surprise",
    song: "Perfect - Ed Sheeran",
    image: "/placeholder.svg?height=600&width=800&text=Your+Proposal+October+2024",
    memories: ["Bouquet surprise", "We danced", "The necklace I still feel"],
    weather: "Room lit with love",
    heartbeat: 110,
    voiceNote: "When you proposed to me... I knew you were forever...",
  },
  {
    id: 9,
    chapter: "Chapter 9",
    title: "Where I Broke… and You Still Believed",
    subtitle: "Love doesn't end in silence",
    date: "May 2025",
    location: "A Difficult Time",
    content: [
      "Then came the pain.",
      "May 2025 — I failed you.",
      "You'd done everything for me. You planned my birthday. You waited for me to rise. And I… disappointed you.",
      "You were done. I don't blame you.",
      "But I couldn't give up. Because love doesn't end in silence.",
    ],
    color: "from-gray-400 via-slate-500 to-gray-600",
    bgColor: "from-gray-50 via-slate-50 to-gray-100",
    icon: Moon,
    mood: "Learning Through Pain",
    song: "Fix You - Coldplay",
    image: "/placeholder.svg?height=600&width=800&text=Difficult+Times+May+2025",
    memories: ["You planned my birthday", "I disappointed you", "Love doesn't end in silence"],
    weather: "Storm clouds",
    heartbeat: 65,
    voiceNote: "I'm sorry for the pain I caused... but I never stopped loving you...",
  },
  {
    id: 10,
    chapter: "Chapter 10",
    title: "And We Began Again",
    subtitle: "By God's grace, you came back",
    date: "Present",
    location: "Our New Beginning",
    content: [
      "Every day, I tried. Not for guilt. Not for pride. But for us.",
      "And somehow, by God's grace, you came back.",
      "Now we rebuild. We forgive. We grow.",
      "Now we write together — not perfect pages, but honest ones.",
      "Because you're not just my Beboo — you're my lesson, my memory, my future.",
    ],
    color: "from-emerald-400 via-green-500 to-teal-600",
    bgColor: "from-emerald-50 via-green-50 to-teal-100",
    icon: Heart,
    mood: "Renewed Hope",
    song: "A Thousand Years - Christina Perri",
    image: "/placeholder.svg?height=600&width=800&text=New+Beginning+Together",
    memories: ["Every day I tried", "By God's grace", "You're my future"],
    weather: "New dawn breaking",
    heartbeat: 92,
    voiceNote: "Thank you for giving us another chance... I love you, Beboo...",
  },
]

// Enhanced Floating Elements
function EnhancedFloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Hearts */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            rotate: 0,
            scale: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            y: -100,
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
            ease: "linear",
          }}
        >
          <Heart className="w-4 h-4 fill-current text-pink-300/40" />
        </motion.div>
      ))}

      {/* Floating Sparkles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 8,
          }}
        >
          <Sparkles className="w-3 h-3 text-pink-400/30" />
        </motion.div>
      ))}

      {/* Floating Music Notes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-purple-300/20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.5,
          }}
        >
          <Music className="w-5 h-5" />
        </motion.div>
      ))}
    </div>
  )
}

// Advanced Music Player with Visualizer
function AdvancedMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const soundtrack = [
    { title: "Ambient Piano & Wind Chimes", artist: "Romantic Instrumentals", duration: "4:32" },
    { title: "Dil-e-Baadat", artist: "Instrumental Version", duration: "3:45" },
    { title: "Soft Romantic Melodies", artist: "Love Story OST", duration: "5:12" },
    { title: "Our Love Theme", artist: "Custom Composition", duration: "4:18" },
  ]

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-50 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-pink-200/50 min-w-[300px]"
    >
      <div className="space-y-4">
        {/* Current Track Display */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Headphones className="w-5 h-5 text-pink-600" />
            <span className="text-sm font-medium text-gray-700">Now Playing</span>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">{soundtrack[currentTrack].title}</h4>
          <p className="text-xs text-gray-600">{soundtrack[currentTrack].artist}</p>
        </div>

        {/* Visualizer */}
        <div className="flex justify-center items-end space-x-1 h-12">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-pink-500 via-rose-400 to-red-400 rounded-full"
              animate={
                isPlaying
                  ? {
                      height: [4, Math.random() * 40 + 8, 4],
                    }
                  : { height: 4 }
              }
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setCurrentTrack((prev) => (prev - 1 + soundtrack.length) % soundtrack.length)}
            className="w-8 h-8 p-0 text-gray-600 hover:text-pink-600"
          >
            ⏮
          </Button>

          <Button
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setCurrentTrack((prev) => (prev + 1) % soundtrack.length)}
            className="w-8 h-8 p-0 text-gray-600 hover:text-pink-600"
          >
            ⏭
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" onClick={() => setIsMuted(!isMuted)} className="w-6 h-6 p-0 text-gray-600">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-600 transition-all duration-300"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-600"
              animate={isPlaying ? { width: ["0%", "100%"] } : { width: "0%" }}
              transition={{ duration: 30, ease: "linear", repeat: isPlaying ? Number.POSITIVE_INFINITY : 0 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>0:00</span>
            <span>{soundtrack[currentTrack].duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Cinematic Hero Section
function CinematicHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 800], [1, 0])
  const scale = useTransform(scrollY, [0, 800], [1, 1.1])
  const [mounted, setMounted] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)

  const romanticQuotes = [
    "A Love That Chose Us",
    "Written in the Stars",
    "From Strangers to Soulmates",
    "Our Beautiful Beginning",
    "Forever Starts Here",
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % romanticQuotes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [romanticQuotes.length])

  const handleScrollToStory = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }
  }

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={mounted ? { y, opacity } : {}}
    >
      {/* Cinematic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100"
        style={mounted ? { scale } : {}}
      >
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Romantic+Cinematic+Background')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>

      {/* Particle System */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -100, -200],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Main Title with Cinematic Effect */}
          <div className="relative h-40 md:h-48 flex items-center justify-center mb-12">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentQuote}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -100, rotateX: 90 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold"
                style={{
                  background: "linear-gradient(135deg, #ec4899, #f43f5e, #dc2626, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 4px 8px rgba(236, 72, 153, 0.3))",
                }}
              >
                {romanticQuotes[currentQuote]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-6 mb-16"
          >
            <motion.p
              className="text-3xl md:text-4xl text-gray-700 font-light italic leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              "From Beawar and Sarasar to Jaipur... from strangers to soulmates"
            </motion.p>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Scroll down to experience our love story unfold, chapter by chapter, moment by moment, heartbeat by
              heartbeat 💕
            </motion.p>
          </motion.div>

          {/* Interactive Elements */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="space-y-12"
          >
            {/* Love Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { number: "10", label: "Chapters", icon: BookOpen },
                { number: "2+", label: "Years", icon: Calendar },
                { number: "∞", label: "Memories", icon: Heart },
                { number: "1", label: "Love Story", icon: Star },
              ].map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2 + index * 0.1, duration: 0.6 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200/50 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>

            {/* Call to Action */}
            <Button
              size="lg"
              onClick={handleScrollToStory}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white px-20 py-8 text-2xl rounded-full shadow-2xl border-0 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              Begin Our Story
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="ml-4 group-hover:scale-110 transition-transform duration-300"
              >
                <BookOpen className="w-8 h-8" />
              </motion.div>
            </Button>

            {/* Decorative Hearts */}
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
            >
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                  className="text-pink-400"
                >
                  <Heart className="w-6 h-6 fill-current" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center space-y-3 text-pink-600"
        >
          <span className="text-sm font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            Scroll to read our story
          </span>
          <div className="flex flex-col space-y-1">
            <ArrowDown className="w-5 h-5" />
            <ArrowDown className="w-4 h-4 opacity-60" />
            <ArrowDown className="w-3 h-3 opacity-30" />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// Enhanced Story Chapter with Interactive Elements
function EnhancedStoryChapter({ chapter, index }: { chapter: (typeof storyChapters)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const isEven = index % 2 === 0
  const [showMemories, setShowMemories] = useState(false)
  const [showVoiceNote, setShowVoiceNote] = useState(false)
  const [heartbeatActive, setHeartbeatActive] = useState(false)

  const IconComponent = chapter.icon

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section
      ref={ref}
      className={`relative min-h-screen flex items-center py-24 bg-gradient-to-br ${chapter.bgColor} overflow-hidden`}
      style={{ opacity }}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(244, 63, 94, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            <div className="w-2 h-2 bg-pink-400/20 rounded-full" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
        >
          {/* Enhanced Content Side */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: isEven ? -80 : 80 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -80 : 80 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-10"
            >
              {/* Enhanced Chapter Header */}
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${chapter.color} rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <IconComponent className="w-10 h-10 text-white relative z-10" />
                  </motion.div>
                  <div>
                    <motion.p
                      className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 }}
                    >
                      {chapter.chapter}
                    </motion.p>
                    <motion.h2
                      className="text-4xl lg:text-6xl font-serif text-gray-900 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ delay: 0.5 }}
                    >
                      {chapter.title}
                    </motion.h2>
                    <motion.p
                      className="text-xl text-gray-600 italic mt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.6 }}
                    >
                      {chapter.subtitle}
                    </motion.p>
                  </div>
                </div>

                {/* Enhanced Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <motion.div
                    className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-pink-200/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                    {chapter.location}
                  </motion.div>
                  <motion.div
                    className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-rose-200/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-4 h-4 mr-2 text-rose-500" />
                    {chapter.date}
                  </motion.div>
                  <motion.div
                    className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-purple-200/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Music className="w-4 h-4 mr-2 text-purple-500" />
                    {chapter.mood}
                  </motion.div>
                  <motion.button
                    className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-red-200/50 hover:bg-red-50 transition-colors"
                    onClick={() => setHeartbeatActive(!heartbeatActive)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={heartbeatActive ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.6, repeat: heartbeatActive ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <Heart className="w-4 h-4 mr-2 text-red-500 fill-current" />
                    </motion.div>
                    {chapter.heartbeat} BPM
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Story Content */}
              <div className="space-y-8">
                {chapter.content.map((paragraph, pIndex) => (
                  <motion.div
                    key={pIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.6 + pIndex * 0.2 }}
                    className="relative"
                  >
                    <motion.p
                      className="text-lg md:text-xl text-gray-700 leading-relaxed font-light italic pl-8 relative"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Quote className="w-6 h-6 text-pink-400 absolute left-0 top-0" />
                      {paragraph}
                    </motion.p>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Elements */}
              <div className="space-y-6">
                {/* Memories Button */}
                <motion.button
                  onClick={() => setShowMemories(!showMemories)}
                  className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-pink-200/50 hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Camera className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-700">View Memories</span>
                  <motion.div animate={{ rotate: showMemories ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ArrowDown className="w-4 h-4 text-gray-500" />
                  </motion.div>
                </motion.button>

                {/* Voice Note Button */}
                <motion.button
                  onClick={() => setShowVoiceNote(!showVoiceNote)}
                  className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-purple-200/50 hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mic className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-gray-700">Voice Note</span>
                  {showVoiceNote && (
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-4 bg-purple-400 rounded-full"
                          animate={{ height: [4, 16, 4] }}
                          transition={{
                            duration: 0.8,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>

                {/* Song Reference */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className={`bg-gradient-to-r ${chapter.color} p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    style={{ transform: "translate(50%, -50%)" }}
                  />
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Headphones className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <p className="font-bold text-lg">Chapter Soundtrack</p>
                      <p className="text-white/90 italic text-xl">"{chapter.song}"</p>
                      <p className="text-white/70 text-sm mt-1">Perfect for this moment</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Expandable Memories */}
              <AnimatePresence>
                {showMemories && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {chapter.memories.map((memory, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100"
                      >
                        <p className="text-gray-700 italic flex items-center text-lg">
                          <Sparkles className="w-5 h-5 text-pink-400 mr-3 flex-shrink-0" />
                          {memory}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Voice Note Display */}
              <AnimatePresence>
                {showVoiceNote && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border border-purple-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Volume2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 italic text-lg">"{chapter.voiceNote}"</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex space-x-1">
                            {[...Array(20)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1 h-6 bg-purple-400 rounded-full"
                                style={{ height: `${Math.random() * 24 + 8}px` }}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">0:15</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Enhanced Visual Side */}
          <div className="flex-1 max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative group"
              style={{ y }}
            >
              <Card className="overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-pink-500/20 transition-all duration-700">
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  <Image
                    src={chapter.image || "/placeholder.svg"}
                    alt={chapter.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Enhanced Overlays */}
                  <div className="absolute top-6 left-6">
                    <motion.div
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <span className="text-white font-bold text-2xl">{chapter.id}</span>
                    </motion.div>
                  </div>

                  <div className="absolute top-6 right-6">
                    <motion.div
                      className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Heart className="w-6 h-6 text-white fill-current" />
                    </motion.div>
                  </div>

                  {/* Weather Indicator */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 space-y-2">
                      <p className="text-gray-900 font-bold text-center text-lg italic">"{chapter.mood}"</p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <span>🌤️</span>
                        <span>{chapter.weather}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Enhanced Decorative Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-pink-400 rounded-full opacity-60"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-8 h-8 bg-rose-400 rounded-full opacity-40"
                animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute top-1/2 -right-4 w-6 h-6 bg-red-400 rounded-full opacity-50"
                animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Spectacular Final Chapter
function SpectacularFinalChapter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [showMessage, setShowMessage] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isInView && mounted) {
      const messageTimer = setTimeout(() => setShowMessage(true), 2000)
      const fireworksTimer = setTimeout(() => setShowFireworks(true), 3000)
      return () => {
        clearTimeout(messageTimer)
        clearTimeout(fireworksTimer)
      }
    }
  }, [isInView, mounted])

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Enhanced Starry Background */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}

      {/* Fireworks */}
      {showFireworks && mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.2,
              }}
            >
              {[...Array(20)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: ["#ff6b9d", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"][j % 5],
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((j * 18 * Math.PI) / 180) * (100 + Math.random() * 100),
                    y: Math.sin((j * 18 * Math.PI) / 180) * (100 + Math.random() * 100),
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: i * 0.3 + Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-7xl">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={isInView ? { scale: 1, opacity: 1, rotateY: 0 } : { scale: 0.5, opacity: 0, rotateY: -180 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <motion.h1
            className="text-7xl md:text-9xl lg:text-[12rem] font-serif text-white mb-16 drop-shadow-2xl"
            animate={{
              textShadow: [
                "0 0 30px #f472b6, 0 0 60px #ec4899, 0 0 90px #dc2626",
                "0 0 60px #ec4899, 0 0 90px #f43f5e, 0 0 120px #f59e0b",
                "0 0 30px #f472b6, 0 0 60px #ec4899, 0 0 90px #dc2626",
              ],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            Always Yours
          </motion.h1>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-12 mb-20"
          >
            <motion.p
              className="text-3xl md:text-4xl text-white/90 font-light italic leading-relaxed max-w-5xl mx-auto"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              "This website is not a gift. It's a mirror of everything we've been, survived, and still dream of."
            </motion.p>
            <motion.p
              className="text-2xl md:text-3xl text-white/80 font-light"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              And this is just the beginning.
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.8 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-16 border border-white/20 shadow-2xl max-w-6xl mx-auto"
              >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="flex justify-center mb-12">
                    <motion.div
                      className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center relative overflow-hidden"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <Heart className="w-12 h-12 text-white fill-current relative z-10" />
                    </motion.div>
                  </div>

                  <motion.p
                    className="text-white text-2xl md:text-3xl leading-relaxed italic mb-12 max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    "Happy Birthday, my dearest Beboo! From that first glimpse in Jaipur to every chapter we've written
                    together, you've been my greatest story. Thank you for choosing us, again and again. Here's to
                    forever writing our love story together. I love you more than words, more than time, more than
                    everything. ❤️"
                  </motion.p>

                  <motion.div
                    className="flex items-center justify-center space-x-6 text-pink-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Star className="w-8 h-8 fill-current" />
                    <span className="text-xl font-medium">With all my love, always and forever</span>
                    <Star className="w-8 h-8 fill-current" />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex justify-center space-x-4 mt-16"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 3, type: "spring", stiffness: 200 }}
          >
            {[...Array(13)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.8, 1],
                  rotate: [0, 360],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.4,
                }}
              >
                <Heart className="w-10 h-10 text-pink-300 fill-current" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Main Component
export default function UltimateRomanticLoveStory() {
  return (
    <div className="relative">
      <EnhancedFloatingElements />
      <AdvancedMusicPlayer />

      <CinematicHero />

      {storyChapters.map((chapter, index) => (
        <EnhancedStoryChapter key={chapter.id} chapter={chapter} index={index} />
      ))}

      <SpectacularFinalChapter />
    </div>
  )
}
