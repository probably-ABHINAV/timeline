"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import {
  Heart,
  MapPin,
  Music,
  Play,
  Pause,
  Volume2,
  Sparkles,
  Camera,
  MessageCircle,
  Star,
  Feather,
  Clock,
  Coffee,
  Moon,
  Car,
  Lightbulb,
  Target,
  Calendar,
  Users,
  ArrowDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const timelineEvents = [
  {
    id: 1,
    year: "2022",
    title: "First Meeting",
    date: "June 2022",
    description:
      "We both arrived at JPHS Jaipur in 11th grade, yet fate placed us in separate tuition centers…until one day you unexpectedly showed up in my accounts class. Between scribbled notes and shared glances, I discovered that the sweetest moments happen when paths accidentally converge.",
    image: "/placeholder.svg?height=600&width=800",
    location: "JPHS Jaipur (Different Tuition Classes)",
    quote: '"True magic lies in unplanned encounters—when two worlds collide in the quiet hum of a classroom."',
    color: "from-rose-300 via-pink-400 to-rose-500",
    icon: Clock,
    memories: [
      "Scribbled notes and shared glances",
      "The day you unexpectedly showed up",
      "Quiet hum of the classroom",
    ],
    weather: "The beginning of everything",
    song: "Serendipity - BTS",
  },
  {
    id: 2,
    year: "2023",
    title: "First Official Date",
    date: "October 2023",
    description:
      "Finally, that whispered invitation became our first date. Over steaming cups at Chai Kapi, we exchanged shy smiles that soon grew into endless conversation, each latte swirl mirroring the flutter in my heart.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Chai Kapi Café",
    quote: '"A single café table can become sacred ground when every word feels like poetry."',
    color: "from-amber-300 via-orange-400 to-red-400",
    icon: Coffee,
    memories: ["Steaming cups and shy smiles", "Endless conversation", "Latte swirls and heart flutters"],
    weather: "Warm autumn evening",
    song: "Perfect - Ed Sheeran",
  },
  {
    id: 3,
    year: "2023",
    title: "Confession of Feelings",
    date: "Late October 2023",
    description:
      "You'd planned to tell me at the farewell rally, but beneath the soft glow of our phone screens, you whispered 'I like you.' My reply—barely more than two letters—sealed our secret: we were falling in love.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Midnight Chat",
    quote: '"Sometimes love blooms in moonlit conversations, unbound by calendars or plans."',
    color: "from-indigo-400 via-purple-500 to-pink-500",
    icon: Moon,
    memories: ["Soft glow of phone screens", "Whispered 'I like you'", "Two letters that changed everything"],
    weather: "Moonlit midnight magic",
    song: "Say You Won't Let Go - James Arthur",
  },
  {
    id: 4,
    year: "2023",
    title: 'Farewell Rally "Car Drive"',
    date: "December 2023",
    description:
      "Under a crisp December sky, we climbed into a ribbon‑draped car for the farewell drive—roses on the dashboard, our laughter echoing among cheering friends. As the engine roared, your hand found mine, and in that stolen touch, I knew we were unstoppable together.",
    image: "/placeholder.svg?height=600&width=800",
    location: "School Farewell Rally",
    quote: '"In a world full of goodbyes, our goodbye was a promise to keep driving forward—hand in hand."',
    color: "from-red-400 via-pink-500 to-rose-600",
    icon: Car,
    memories: ["Ribbon-draped car", "Roses on the dashboard", "Your hand finding mine"],
    weather: "Crisp December sky",
    song: "Drive - The Cars",
  },
  {
    id: 5,
    year: "2024",
    title: "The Proposal",
    date: "19 January 2024",
    description:
      "I led you to a hidden courtyard aglow with lanterns and soft melodies. Kneeling beneath the paper‑lantern canopy, I asked you to share every tomorrow with me. Your 'yes' hung in the air like the warmest spotlight on our story.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Lantern‑Lit Garden",
    quote: '"Forever begins under gentle lights and hopeful hearts."',
    color: "from-yellow-400 via-amber-500 to-orange-600",
    icon: Lightbulb,
    memories: ["Hidden courtyard aglow", "Paper-lantern canopy", "Your 'yes' in the air"],
    weather: "Gentle lights and hope",
    song: "Marry Me - Train",
  },
  {
    id: 6,
    year: "2024",
    title: "WTP Mall Bowling Date",
    date: "Late January 2024",
    description:
      "We traded lanterns for bowling balls, but the real victory was seeing your face light up at every cheerful cheer—even when my gutters stole the show. Your laughter became my favorite soundtrack.",
    image: "/placeholder.svg?height=600&width=800",
    location: "WTP Mall",
    quote: "\"Love is the loudest cheer when life's shots don't always hit the mark.\"",
    color: "from-blue-400 via-cyan-500 to-teal-600",
    icon: Target,
    memories: ["Trading lanterns for bowling balls", "Your face lighting up", "Laughter as my soundtrack"],
    weather: "Playful indoor adventure",
    song: "Good as Hell - Lizzo",
  },
  {
    id: 7,
    year: "2024",
    title: "Fun Kingdom Adventure",
    date: "February 2024",
    description:
      "Cotton candy kisses, carousel spins, and sunset Ferris wheel rides—every ride felt like a new chapter of joy. Holding your hand at the summit, I watched your eyes sparkle brighter than the park's neon lights.",
    image: "/placeholder.svg?height=600&width=800",
    location: "Fun Kingdom Amusement Park",
    quote: '"Every adventure is more vibrant when shared with the one who holds your heart."',
    color: "from-pink-400 via-purple-500 to-indigo-600",
    icon: Sparkles,
    memories: ["Cotton candy kisses", "Carousel spins", "Eyes sparkling brighter than neon"],
    weather: "Sunset magic and neon dreams",
    song: "Adventure of a Lifetime - Coldplay",
  },
]

// Optimized Floating Hearts (completely SSR safe)
function OptimizedFloatingHearts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float-heart opacity-20"
          style={{
            left: `${20 + i * 20}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + i * 3}s`,
          }}
        >
          <Heart className="w-4 h-4 fill-current text-pink-300" />
        </div>
      ))}
    </div>
  )
}

// Love Statistics Component
function LoveStatistics() {
  const stats = [
    { number: "7", label: "Magical Moments", icon: Sparkles },
    { number: "2+", label: "Years Together", icon: Calendar },
    { number: "∞", label: "Love Multiplier", icon: Heart },
    { number: "1", label: "Perfect Match", icon: Users },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-pink-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// Interactive Love Meter
function LoveMeter() {
  const [loveLevel, setLoveLevel] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoveLevel(100)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-serif text-gray-900 mb-2">Love Meter</h3>
        <p className="text-gray-600">Measuring our connection...</p>
      </div>

      <div className="relative">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${loveLevel}%` }}
            transition={{ delay: 3, duration: 2, ease: "easeOut" }}
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text">
            {loveLevel}%
          </span>
          <p className="text-sm text-gray-600 mt-1">Pure Love Detected! 💕</p>
        </div>
      </div>
    </motion.div>
  )
}

// Romantic Quote Carousel
function RomanticQuoteCarousel() {
  const quotes = [
    "Every love story is beautiful, but ours is my favorite",
    "You are my today and all of my tomorrows",
    "In your arms, I found my home",
    "Love is not just looking at each other, it's looking in the same direction",
    "You make my heart smile in ways I never knew possible",
  ]

  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10 backdrop-blur-sm rounded-3xl p-8 border border-pink-200/50 max-w-4xl mx-auto mb-12"
    >
      <div className="text-center">
        <Feather className="w-8 h-8 text-pink-500 mx-auto mb-4" />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed"
          >
            "{quotes[currentQuote]}"
          </motion.p>
        </AnimatePresence>
        <div className="flex justify-center space-x-2 mt-6">
          {quotes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentQuote ? "bg-pink-500 w-8" : "bg-pink-300"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Timeline Preview Component
function TimelinePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200 max-w-5xl mx-auto mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif text-gray-900 mb-4">Journey Highlights</h3>
        <p className="text-gray-600">A glimpse into our beautiful story</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {timelineEvents.map((event, index) => {
          const IconComponent = event.icon
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5 + index * 0.1, duration: 0.5 }}
              className="text-center group cursor-pointer"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-900 mb-1">{event.year}</div>
              <div className="text-xs text-gray-600 leading-tight">{event.title}</div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// Enhanced Hero Section with Maximum Creativity
function CreativeHeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 200])
  const opacity = useTransform(scrollY, [0, 600], [1, 0])
  const [mounted, setMounted] = useState(false)

  const heroTexts = [
    "Our Love Story",
    "A Journey of Hearts",
    "From JPHS to Forever",
    "Written in the Stars",
    "Two Hearts, One Story",
  ]

  const [currentText, setCurrentText] = useState(0)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [heroTexts.length])

  const handleScrollToNext = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
    }
  }

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={mounted ? { y, opacity } : {}}
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100">
        {/* Simplified floating elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse opacity-20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            >
              <div className="w-3 h-3 bg-pink-400 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl w-full">
        {/* Main Title with Creative Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="relative h-32 md:h-40 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentText}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 90 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg"
              >
                {heroTexts[currentText]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-4 mb-12"
          >
            <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed">
              From JPHS classrooms to forever promises
            </p>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our beautiful journey together, written in moments of pure magic ✨
            </p>
          </motion.div>
        </motion.div>

        {/* Love Statistics */}
        <LoveStatistics />

        {/* Romantic Quote Carousel */}
        <RomanticQuoteCarousel />

        {/* Timeline Preview */}
        <TimelinePreview />

        {/* Love Meter */}
        <LoveMeter />

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
          className="space-y-8 mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white px-20 py-8 text-2xl rounded-full shadow-2xl border-0 transition-all duration-500 hover:scale-105 hover:shadow-pink-500/25 group"
            onClick={handleScrollToNext}
          >
            Begin Our Journey
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="ml-4 group-hover:scale-110 transition-transform duration-300"
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
          </Button>

          {/* Decorative Hearts */}
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 4, duration: 0.6 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                className="text-pink-400"
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center space-y-2 text-pink-500"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// Optimized Timeline Event Component
function OptimizedTimelineEvent({ event, index }: { event: (typeof timelineEvents)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const isEven = index % 2 === 0
  const [showMemories, setShowMemories] = useState(false)

  const IconComponent = event.icon

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-32 ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Connecting Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-pink-300 to-transparent hidden lg:block" />

      {/* Year Badge */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 -translate-y-12 z-20 hidden lg:block"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div
          className={`w-24 h-24 rounded-full bg-gradient-to-br ${event.color} flex flex-col items-center justify-center shadow-xl border-4 border-white`}
        >
          <IconComponent className="w-8 h-8 text-white mb-1" />
          <span className="text-white font-bold text-xs">{event.year}</span>
        </div>
      </motion.div>

      {/* Image Section */}
      <div className="flex-1 max-w-lg relative group">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm hover:shadow-pink-500/20 transition-all duration-500">
            <div className="relative h-80 lg:h-96 overflow-hidden">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <button
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                onClick={() => setShowMemories(!showMemories)}
              >
                <Camera className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-4 left-4">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </Card>

          {/* Memory Cards */}
          <AnimatePresence>
            {showMemories && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute -bottom-6 left-0 right-0 z-10 space-y-3"
              >
                {event.memories.map((memory, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-100"
                  >
                    <p className="text-sm text-gray-700 italic flex items-center">
                      <Sparkles className="w-4 h-4 text-pink-400 mr-2 flex-shrink-0" />
                      {memory}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="flex-1 max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -60 : 60 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center lg:text-left space-y-8"
        >
          <h3 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">{event.title}</h3>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-gray-600">
            <div className="flex items-center bg-pink-50 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 mr-2 text-pink-500" />
              <span className="font-medium">{event.location}</span>
            </div>
            <div className="flex items-center bg-rose-50 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 mr-2 text-rose-500" />
              <span className="font-medium">{event.date}</span>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>

          <blockquote className="relative">
            <div
              className={`bg-gradient-to-r ${event.color} p-8 rounded-3xl text-white shadow-xl relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <Feather className="w-8 h-8 mb-4 opacity-80" />
              <p className="text-xl font-serif italic leading-relaxed relative z-10">{event.quote}</p>
            </div>
          </blockquote>

          <div className="flex items-center justify-center lg:justify-start gap-3 bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-2xl">
            <Music className="w-5 h-5 text-pink-500" />
            <span className="text-gray-700 font-medium italic">"{event.song}"</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Interactive Journey Map (SSR Safe)
function InteractiveJourneyMap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const locations = [
    { id: 1, x: 25, y: 35, name: "JPHS Jaipur", event: "First Meeting", icon: Clock },
    { id: 2, x: 45, y: 25, name: "Chai Kapi Café", event: "First Official Date", icon: Coffee },
    { id: 3, x: 35, y: 55, name: "Midnight Chat", event: "Confession of Feelings", icon: Moon },
    { id: 4, x: 65, y: 40, name: "School Farewell Rally", event: "Car Drive", icon: Car },
    { id: 5, x: 20, y: 65, name: "Lantern-Lit Garden", event: "The Proposal", icon: Lightbulb },
    { id: 6, x: 60, y: 20, name: "WTP Mall", event: "Bowling Date", icon: Target },
    { id: 7, x: 75, y: 60, name: "Fun Kingdom", event: "Adventure", icon: Sparkles },
  ]

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background Hearts */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-serif text-gray-900 mb-8 bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent">
            Our Journey Map
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Click on the locations to relive our precious moments together across the beautiful city of Jaipur
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="relative h-[500px] bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 rounded-3xl overflow-hidden shadow-2xl border border-pink-200"
          >
            {/* Animated Path */}
            <svg className="absolute inset-0 w-full h-full">
              <motion.path
                d={`M ${locations[0].x}% ${locations[0].y}% ${locations.map((loc) => `L ${loc.x}% ${loc.y}%`).join(" ")}`}
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8,4"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 4, delay: 0.8 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="50%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>

            {/* Location Markers */}
            {locations.map((location, index) => {
              const IconComponent = location.icon
              return (
                <motion.div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedLocation(selectedLocation === location.id ? null : location.id)}
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 rounded-full" />
                      <IconComponent className="w-7 h-7 text-white relative z-10" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-pink-600 shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedLocation === location.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
                      >
                        <div className="bg-white rounded-2xl p-4 shadow-2xl border border-pink-200 whitespace-nowrap">
                          <p className="font-bold text-gray-900 text-lg">{location.name}</p>
                          <p className="text-pink-600 font-medium">{location.event}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

// Enhanced Music Section (SSR Safe)
function EnhancedMusicSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [mounted, setMounted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  const playlist = [
    { title: "Serendipity", artist: "BTS", mood: "First Meeting", color: "from-rose-400 to-pink-500" },
    { title: "Perfect", artist: "Ed Sheeran", mood: "First Date", color: "from-amber-400 to-orange-500" },
    {
      title: "Say You Won't Let Go",
      artist: "James Arthur",
      mood: "Confession",
      color: "from-indigo-400 to-purple-500",
    },
    { title: "Drive", artist: "The Cars", mood: "Farewell Rally", color: "from-red-400 to-pink-500" },
    { title: "Marry Me", artist: "Train", mood: "The Proposal", color: "from-yellow-400 to-amber-500" },
    { title: "Good as Hell", artist: "Lizzo", mood: "Bowling Fun", color: "from-blue-400 to-cyan-500" },
    { title: "Adventure of a Lifetime", artist: "Coldplay", mood: "Fun Kingdom", color: "from-pink-400 to-purple-500" },
  ]

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Romantic Background */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{
                x: Math.random() * 1200,
                y: Math.random() * 800,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, Math.random() * 800],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-serif text-white mb-8">Our Soundtrack</h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            The melodies that soundtrack our beautiful love story
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12">
              {/* Music Visualizer */}
              <div className="flex justify-center mb-12">
                <div className="flex items-end space-x-2 h-24">
                  {[...Array(25)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 bg-gradient-to-t from-pink-500 via-rose-400 to-red-400 rounded-full"
                      animate={
                        isPlaying
                          ? {
                              height: [8, Math.random() * 70 + 20, 8],
                            }
                          : { height: 8 }
                      }
                      transition={{
                        duration: 0.6,
                        repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Current Song Display */}
              <motion.div
                className="text-center mb-12"
                key={currentSong}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`bg-gradient-to-r ${playlist[currentSong].color} p-8 rounded-3xl mb-6`}>
                  <h3 className="text-3xl font-bold text-white mb-3">{playlist[currentSong].title}</h3>
                  <p className="text-white/90 text-lg mb-2">{playlist[currentSong].artist}</p>
                  <p className="text-white/80 italic">{playlist[currentSong].mood}</p>
                </div>
              </motion.div>

              {/* Controls */}
              <div className="flex justify-center items-center space-x-8 mb-12">
                <Button
                  onClick={() => setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length)}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-14 h-14"
                  size="sm"
                >
                  ⏮
                </Button>

                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>

                <Button
                  onClick={() => setCurrentSong((prev) => (prev + 1) % playlist.length)}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full w-14 h-14"
                  size="sm"
                >
                  ⏭
                </Button>
              </div>

              {/* Playlist */}
              <div className="space-y-3">
                {playlist.map((song, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      currentSong === index
                        ? "bg-white/25 border-2 border-pink-400 shadow-lg"
                        : "bg-white/10 hover:bg-white/15"
                    }`}
                    onClick={() => setCurrentSong(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-bold text-lg">{song.title}</p>
                        <p className="text-white/70">{song.artist}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-pink-300 italic font-medium">{song.mood}</p>
                        {currentSong === index && (
                          <motion.div
                            className="flex space-x-1 mt-2 justify-end"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-1 h-4 bg-pink-400 rounded-full"
                                animate={isPlaying ? { height: [4, 16, 4] } : {}}
                                transition={{
                                  duration: 0.8,
                                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}

// Enhanced Voice Message (SSR Safe)
function EnhancedVoiceMessage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.section
      ref={ref}
      className="py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Hearts */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-6xl font-serif text-gray-900 mb-8 bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent">
            A Secret Message
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Click the heart to unlock a special birthday message filled with love just for you
          </p>
        </motion.div>

        <motion.div
          className="relative inline-block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsPlaying(!isPlaying)
              setShowMessage(true)
            }}
          >
            {/* Pulsing Rings */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-pink-400/30"
                animate={
                  isPlaying
                    ? {
                        scale: [1, 1.8, 2.2],
                        opacity: [0.8, 0.4, 0],
                      }
                    : { scale: 1, opacity: 0 }
                }
                transition={{
                  duration: 2.5,
                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                  delay: i * 0.5,
                }}
              />
            ))}

            {/* Main Heart Button */}
            <div className="w-48 h-48 bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={isPlaying ? { scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] } : {}}
                transition={{ duration: 1.5, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0 }}
              />

              {isPlaying ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center space-x-3">
                  <Volume2 className="w-16 h-16 text-white" />
                  <div className="flex space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-12 bg-white rounded-full"
                        animate={{ height: [12, 24, 12] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <Heart className="w-24 h-24 text-white fill-current" />
              )}
            </div>
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ delay: 0.5 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-12">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                    <div className="flex justify-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <p className="text-gray-800 text-xl leading-relaxed italic mb-8 text-center">
                      "Happy Birthday, my dearest love! From that first day in accounts class at JPHS to our magical
                      adventures at Fun Kingdom, every moment with you has been a precious gift. You've turned my world
                      into a beautiful story filled with chai dates, midnight confessions, and lantern-lit promises.
                      Thank you for being my heart, my home, my everything. Here's to another year of adventures,
                      laughter, and endless love. I love you more than words could ever express. ❤️"
                    </p>

                    <div className="flex items-center justify-center space-x-4 text-pink-600">
                      <Star className="w-6 h-6 fill-current" />
                      <span className="text-lg font-medium">With all my love, always and forever</span>
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

// Spectacular Birthday Finale (SSR Safe)
function SpectacularBirthdayFinale() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [mounted, setMounted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isInView && mounted) {
      const confettiTimer = setTimeout(() => setShowConfetti(true), 1000)
      const fireworksTimer = setTimeout(() => setShowFireworks(true), 2000)
      return () => {
        clearTimeout(confettiTimer)
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
      transition={{ duration: 1 }}
    >
      {/* Animated Stars Background */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * 1200,
                y: Math.random() * 800,
                opacity: Math.random(),
              }}
              animate={{
                opacity: [Math.random(), 1, Math.random()],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {/* Confetti */}
      {showConfetti && mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 ${
                ["bg-yellow-400", "bg-pink-400", "bg-rose-400", "bg-red-400", "bg-orange-400"][i % 5]
              } rounded-full`}
              initial={{
                x: Math.random() * 1200,
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.8 + 0.5,
              }}
              animate={{
                y: 820,
                rotate: 360,
                x: Math.random() * 1200,
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                ease: "easeOut",
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>
      )}

      {/* Fireworks */}
      {showFireworks && mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 1200,
                y: Math.random() * 480 + 160,
              }}
            >
              {[...Array(16)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-3 h-3 bg-yellow-300 rounded-full"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((j * 22.5 * Math.PI) / 180) * 120,
                    y: Math.sin((j * 22.5 * Math.PI) / 180) * 120,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4 + Math.random() * 0.8,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-6xl">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
          animate={isInView ? { scale: 1, opacity: 1, rotateY: 0 } : { scale: 0.5, opacity: 0, rotateY: -180 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <motion.h1
            className="text-8xl md:text-9xl lg:text-[12rem] font-serif text-white mb-12 drop-shadow-2xl"
            animate={{
              textShadow: ["0 0 30px #f472b6", "0 0 60px #ec4899", "0 0 30px #f472b6"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Happy Birthday!
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-3xl md:text-4xl text-white/90 font-light mb-16 drop-shadow-lg"
          >
            Here's to another year of our beautiful love story
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="space-y-12"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20 shadow-2xl">
            <motion.p
              className="text-white text-2xl md:text-3xl leading-relaxed italic mb-12"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 2 }}
            >
              "From JPHS classrooms to Fun Kingdom adventures, from chai dates to lantern-lit proposals - every moment
              with you has been a treasure, every day a new adventure. Thank you for being my partner, my best friend,
              and my greatest love. You've made my life a beautiful story, and I can't wait to create countless more
              chapters together. Happy Birthday, my darling! Here's to forever and always."
            </motion.p>

            <motion.div
              className="flex justify-center space-x-8"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
            >
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 20, -20, 0],
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                >
                  <Heart className="w-12 h-12 text-pink-300 fill-current" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 3 }}
            className="text-white/80 text-xl"
          >
            <p>With all my love, today and always ❤️</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default function OptimizedLoveStoryTimeline() {
  return (
    <div className="relative">
      <OptimizedFloatingHearts />

      <CreativeHeroSection />

      <section className="py-24 bg-gradient-to-b from-pink-50 via-rose-50 to-red-50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-7xl font-serif text-gray-900 mb-12 bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto leading-relaxed">
              From JPHS Jaipur to Fun Kingdom adventures, every love story is unique, but ours is written in the stars.
              Follow along as we relive the moments that brought us together.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-pink-300 via-rose-400 to-red-500 hidden lg:block opacity-40" />
            {timelineEvents.map((event, index) => (
              <OptimizedTimelineEvent key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      <InteractiveJourneyMap />
      <EnhancedMusicSection />
      <EnhancedVoiceMessage />
      <SpectacularBirthdayFinale />
    </div>
  )
}
