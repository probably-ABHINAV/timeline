"use client"

import { useEffect, useRef, useState, useCallback } from "react"
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
  Share2,
  Download,
  Eye,
  EyeOff,
  Maximize,
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
    date: "July 12, 2022",
    location: "Tuition Center, Jaipur",
    content: [
      "It was July 12th, 2022. Jaipur was new, unfamiliar, buzzing with unknown faces. And then, I saw you.",
      "In a place neither of us were supposed to be — a tuition center that wasn't yours, but still, somehow became ours.",
      "Two outsiders in a new city, from Beawar and Salasar — maybe that's why we noticed each other first.",
      "And just like that, something shifted. Without a word, without a reason — you became a thought that refused to leave.",
    ],
    color: "from-rose-300 via-pink-400 to-rose-500",
    bgColor: "from-pink-50 via-rose-50 to-pink-100",
    icon: Clock,
    mood: "Serendipitous",
    song: "Serendipity - BTS",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop&crop=center",
    memories: ["Unfamiliar faces", "Two outsiders", "A thought that refused to leave"],
    weather: "Warm June afternoon",
    heartbeat: 72,
    voiceNote: "The moment I first saw you, time stopped...",
    emotion: "Wonder",
    soundtrack: "https://open.spotify.com/track/example1",
  },
  {
    id: 2,
    chapter: "Chapter 2",
    title: "Friends, Almost Enemies, and Something More",
    subtitle: "12:56 AM - The message that changed everything",
    date: "July 31st, 2023",
    location: "Late Night Messages",
    content: [
      "From conversations in school… to misunderstandings that turned us into strangers…",
      "From being apart… to late-night thoughts where I'd wonder if you were okay.",
      "And then came your birthday — July 31st, 2023.",
      "I waited till 12:56 AM, heart racing, words trembling. I sent a message — flirty, heartfelt, hoping we could restart.",
      "And you didn't walk away.",
    ],
    color: "from-amber-300 via-orange-400 to-red-400",
    bgColor: "from-amber-50 via-orange-50 to-red-100",
    icon: MessageCircle,
    mood: "Hopeful Reconnection",
    song: "Perfect - Ed Sheeran",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center",
    memories: ["Heart racing", "Words trembling", "You didn't walk away"],
    weather: "Midnight silence",
    heartbeat: 95,
    voiceNote: "12:56 AM... I was so nervous typing that message...",
    emotion: "Hope",
    soundtrack: "https://open.spotify.com/track/example2",
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
      "You once said: 'I am a one man lady.'",
      "I smiled quietly — because I knew you were already it for me.",
      "Then came the night I confessed. And you did too — even though you'd planned to tell me at farewell.",
      "Love was never loud with us. It just… bloomed.",
    ],
    color: "from-indigo-400 via-purple-500 to-pink-500",
    bgColor: "from-indigo-50 via-purple-50 to-pink-100",
    icon: Heart,
    mood: "Blooming Love",
    song: "Say You Won't Let Go - James Arthur",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop&crop=center",
    memories: ["Daily chats", "Deep secrets", "Love just bloomed"],
    weather: "Gentle evening breeze",
    heartbeat: 88,
    voiceNote: "The night we both confessed... magic happened...",
    emotion: "Pure Love",
    soundtrack: "https://open.spotify.com/track/example3",
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
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop&crop=center",
    memories: ["Hands brushed", "That laugh", "Pure electricity"],
    weather: "Cozy café warmth",
    heartbeat: 102,
    voiceNote: "That first kiss... I still get butterflies thinking about it...",
    emotion: "Electric",
    soundtrack: "https://open.spotify.com/track/example4",
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
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop&crop=center",
    memories: ["Decorated room", "A flower waited", "Your eyes said yes"],
    weather: "Perfect January evening",
    heartbeat: 120,
    voiceNote: "The moment you said yes... my heart exploded with joy...",
    emotion: "Euphoria",
    soundtrack: "https://open.spotify.com/track/example5",
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
    image: "https://images.unsplash.com/photo-1503457574462-bd27bf96e4d9?w=800&h=600&fit=crop&crop=center",
    memories: ["Empty swings", "You won at Tekken", "Our fingerprints everywhere"],
    weather: "Sunny adventure day",
    heartbeat: 85,
    voiceNote: "Every adventure with you feels like magic...",
    emotion: "Adventure",
    soundtrack: "https://open.spotify.com/track/example6",
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
    memories: ["You made me a CV", "Never stopped believing", "10 minutes were home"],
    weather: "Stressful but supported",
    heartbeat: 78,
    voiceNote: "Your support meant everything to me...",
    emotion: "Gratitude",
    soundtrack: "https://open.spotify.com/track/example7",
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
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&crop=center",
    memories: ["Bouquet surprise", "We danced", "The necklace I still feel"],
    weather: "Room lit with love",
    heartbeat: 110,
    voiceNote: "When you proposed to me... I knew you were forever...",
    emotion: "Bliss",
    soundtrack: "https://open.spotify.com/track/example8",
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
    image: "https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?w=800&h=600&fit=crop&crop=center",
    memories: ["You planned my birthday", "I disappointed you", "Love doesn't end in silence"],
    weather: "Storm clouds",
    heartbeat: 65,
    voiceNote: "I'm sorry for the pain I caused... but I never stopped loving you...",
    emotion: "Redemption",
    soundtrack: "https://open.spotify.com/track/example9",
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
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop&crop=center",
    memories: ["Every day I tried", "By God's grace", "You're my future"],
    weather: "New dawn breaking",
    heartbeat: 92,
    voiceNote: "Thank you for giving us another chance... I love you, Beboo...",
    emotion: "Forever",
    soundtrack: "https://open.spotify.com/track/example10",
  },
]

// Fixed floating elements with stable positions
function EnhancedFloatingElements() {
  const [mounted, setMounted] = useState(false)
  const [elements] = useState(() => {
    // Generate stable positions on component initialization
    return {
      hearts: Array.from({ length: 8 }, (_, i) => ({
        id: i,
        initialX: (i * 12.5) % 100,
        initialY: 100 + (i * 10),
        scale: 0.5 + (i % 3) * 0.25,
        duration: 15 + (i % 5) * 2,
        delay: i * 2,
      })),
      sparkles: Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: (i * 8.33) % 100,
        top: (i * 13.7) % 100,
        duration: 4 + (i % 3),
        delay: i * 0.5,
      })),
      notes: Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: 10 + i * 15,
        top: 20 + (i % 3) * 25,
        duration: 6 + (i % 2) * 2,
        delay: i * 1.5,
      })),
    }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" role="presentation" aria-hidden="true">
      {/* Optimized Floating Hearts */}
      {elements.hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className="absolute"
          initial={{
            x: `${heart.initialX}vw`,
            y: heart.initialY + "vh",
            rotate: 0,
            scale: heart.scale,
          }}
          animate={{
            y: `-10vh`,
            rotate: 360,
            x: `${(heart.initialX + 20) % 100}vw`,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          <Heart className="w-4 h-4 fill-current text-pink-300/40" />
        </motion.div>
      ))}

      {/* Optimized Floating Sparkles */}
      {elements.sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute"
          style={{
            left: `sparkle.left + "%",
            top: `sparkle.top + "%",
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
          }}
        >
          <Sparkles className="w-3 h-3 text-pink-400/30" />
        </motion.div>
      ))}

      {/* Optimized Music Notes */}
      {elements.notes.map((note) => (
        <motion.div
          key={`note-${note.id}`}
          className="absolute text-purple-300/20"
          style={{
            left: `note.left + "%",
            top: `note.top + "%",
          }}
          animate={{
            y: [-20, -40, -20],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: note.duration,
            repeat: Infinity,
            delay: note.delay,
          }}
        >
          <Music className="w-5 h-5" />
        </motion.div>
      ))}
    </div>
  )
}

// Enhanced Music Player with better controls
function AdvancedMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/music/sample.mp3"); // Replace with actual audio path
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error("Playback error:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (val: number) => {
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-black text-white rounded-2xl shadow-lg w-[300px]">
      <div className="flex justify-between items-center">
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => changeVolume(Number(e.target.value))}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => {
          const seekTime = (Number(e.target.value) / 100) * (audioRef.current?.duration || 0);
          if (audioRef.current) audioRef.current.currentTime = seekTime;
          setProgress(Number(e.target.value));
        }}
        className="w-full mt-2"
      />
    </div>
  );
}

// Enhanced Cinematic Hero Section
function CinematicHero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 800], [1, 0])
  const scale = useTransform(scrollY, [0, 800], [1, 1.1])
  const [mounted, setMounted] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [showStats, setShowStats] = useState(false)

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

    const statsTimer = setTimeout(() => setShowStats(true), 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(statsTimer)
    }
  }, [])

  const handleScrollToStory = useCallback(() => {
    if (typeof window !== "undefined") {
      const vh = window.innerHeight || 800
      window.scrollTo({ top: vh, behavior: "smooth" })
    }
  }, [])

  const stats = [
    { number: "10", label: "Chapters", icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { number: "1.9", label: "Years", icon: Calendar, color: "from-green-500 to-green-600" },
    { number: "∞", label: "Memories", icon: Heart, color: "from-pink-500 to-pink-600" },
    { number: "1", label: "Love Story", icon: Star, color: "from-yellow-500 to-yellow-600" },
  ]

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background with better performance */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100"
        style={mounted ? { scale, y } : {}}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1920&h=1080&fit=crop&crop=center')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </motion.div>

      {/* Optimized Particle System */}
      {mounted && (
        <div className="absolute inset-0" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400/30 rounded-full"
              style={{
                left: `(i * 3.33) % 100 + "%",
                top: `(i * 7.14) % 100 + "%",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -100, -200],
              }}
              transition={{
                duration: 8 + (i % 4),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-7xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* Main Title with improved animation */}
          <div className="relative h-40 md:h-48 flex items-center justify-center mb-12">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentQuote}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -100, rotateX: 90 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold"
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

          {/* Enhanced Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-6 mb-16"
          >
            <motion.p
              className="text-2xl md:text-3xl text-gray-700 font-light italic leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              "From Beawar and Salasar to Jaipur... from strangers to soulmates"
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Scroll down to experience our love story unfold, chapter by chapter, moment by moment, heartbeat by
              heartbeat 💕
            </motion.p>
          </motion.div>

          {/* Enhanced Love Statistics with better animations */}
          <AnimatePresence>
            {showStats && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              >
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200/50 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="space-y-8"
          >
            <Button
              size="lg"
              onClick={handleScrollToStory}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white px-16 py-6 text-xl rounded-full shadow-2xl border-0 transition-all duration-500 hover:scale-105 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              Begin Our Story
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-4 group-hover:scale-110 transition-transform duration-300"
              >
                <BookOpen className="w-6 h-6" />
              </motion.div>
            </Button>

            {/* Decorative Hearts with improved performance */}
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              {Array.from({ length: 7 }, (_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
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
        transition={{ delay: 3.5 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
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
    </section>
  )
}

// Enhanced Story Chapter with better performance and features
function EnhancedStoryChapter({ chapter, index }: { chapter: (typeof storyChapters)[0]; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const isEven = index % 2 === 0
  const [showMemories, setShowMemories] = useState(false)
  const [showVoiceNote, setShowVoiceNote] = useState(false)
  const [heartbeatActive, setHeartbeatActive] = useState(false)
  const [imageFullscreen, setImageFullscreen] = useState(false)

  const IconComponent = chapter.icon

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const handleShareChapter = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && navigator.share) {
        navigator.share({
          title: `${chapter.title} - Our Love Story`,
          text: chapter.subtitle,
          url: `${window.location.href}#chapter-${chapter.id}`,
        }).catch(err => console.log('Share cancelled'))
      }
    } catch (error) {
      console.log('Share not supported')
    }
  }, [chapter])

  const handleDownloadImage = useCallback(() => {
    // In a real app, this would download the chapter image
    console.log(`Downloading image for ${chapter.title}`)
  }, [chapter.title])

  return (
    <motion.section
      id={`chapter-${chapter.id}`}
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

        {/* Optimized floating elements */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `(i * 12.5) % 100 + "%",
              top: `(i * 17.5) % 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + (i % 3),
              repeat: Infinity,
              delay: i * 0.5,
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
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <IconComponent className="w-10 h-10 text-white relative z-10" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.p
                      className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 }}
                    >
                      {chapter.chapter}
                    </motion.p>
                    <motion.h2
                      className="text-3xl lg:text-5xl font-serif text-gray-900 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ delay: 0.5 }}
                    >
                      {chapter.title}
                    </motion.h2>
                    <motion.p
                      className="text-lg text-gray-600 italic mt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.6 }}
                    >
                      {chapter.subtitle}
                    </motion.p>
                  </div>
                </div>

                {/* Enhanced Metadata with better responsiveness */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <motion.div
                    className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-pink-200/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                    <span className="truncate max-w-[120px]">{chapter.location}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-rose-200/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-4 h-4 mr-2 text-rose-500" />
                    <span className="truncate max-w-[100px]">{chapter.date}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-purple-200/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Music className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="truncate max-w-[100px]">{chapter.mood}</span>
                  </motion.div>
                  <motion.button
                    className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-red-200/50 hover:bg-red-50 transition-colors"
                    onClick={() => setHeartbeatActive(!heartbeatActive)}
                    whileHover={{ scale: 1.05 }}
                    aria-label={`${heartbeatActive ? 'Stop' : 'Start'} heartbeat animation`}
                  >
                    <motion.div
                      animate={heartbeatActive ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.6, repeat: heartbeatActive ? Infinity : 0 }}
                    >
                      <Heart className="w-4 h-4 mr-2 text-red-500 fill-current" />
                    </motion.div>
                    {chapter.heartbeat} BPM
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Story Content with better readability */}
              <div className="space-y-6">
                {chapter.content.map((paragraph, pIndex) => (
                  <motion.div
                    key={pIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.6 + pIndex * 0.1 }}
                    className="relative"
                  >
                    <motion.p
                      className="text-base md:text-lg text-gray-700 leading-relaxed font-light italic pl-8 relative"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Quote className="w-5 h-5 text-pink-400 absolute left-0 top-0 flex-shrink-0" />
                      {paragraph}
                    </motion.p>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Interactive Elements */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {/* Memories Button */}
                  <motion.button
                    onClick={() => setShowMemories(!showMemories)}
                    className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-pink-200/50 hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-expanded={showMemories}
                    aria-label="Toggle memories view"
                  >
                    <Camera className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-gray-700 text-sm">Memories</span>
                    <motion.div animate={{ rotate: showMemories ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ArrowDown className="w-4 h-4 text-gray-500" />
                    </motion.div>
                  </motion.button>

                  {/* Voice Note Button */}
                  <motion.button
                    onClick={() => setShowVoiceNote(!showVoiceNote)}
                    className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-purple-200/50 hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-expanded={showVoiceNote}
                    aria-label="Toggle voice note"
                  >
                    <Mic className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-gray-700 text-sm">Voice Note</span>
                    {showVoiceNote && (
                      <div className="flex space-x-1" aria-hidden="true">
                        {Array.from({ length: 3 }, (_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-3 bg-purple-400 rounded-full"
                            animate={{ height: [3, 12, 3] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.button>

                  {/* Share Button */}
                  <motion.button
                    onClick={handleShareChapter}
                    className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Share this chapter"
                  >
                    <Share2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-gray-700 text-sm">Share</span>
                  </motion.button>
                </div>

                {/* Enhanced Song Reference */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className={`bg-gradient-to-r ${chapter.color} p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transform: "translate(50%, -50%)" }}
                  />
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Headphones className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-bold text-base">Chapter Soundtrack</p>
                      <p className="text-white/90 italic text-lg">"{chapter.song}"</p>
                      <p className="text-white/70 text-sm mt-1">Perfect for this moment</p>
                    </div>
                    {chapter.soundtrack && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20 p-2"
                        aria-label="Open in Spotify"
                      >
                        <Music className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Expandable Memories with better layout */}
              <AnimatePresence>
                {showMemories && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    {chapter.memories.map((memory, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-100"
                      >
                        <p className="text-gray-700 italic flex items-center text-base">
                          <Sparkles className="w-4 h-4 text-pink-400 mr-3 flex-shrink-0" />
                          {memory}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Voice Note Display */}
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
                        <p className="text-gray-800 italic text-base">"{chapter.voiceNote}"</p>
                        <div className="flex items-center space-x-2 mt-3">
                          <div className="flex space-x-1" aria-hidden="true">
                            {Array.from({ length: 15 }, (_, i) => (
                              <div
                                key={i}
                                className="w-1 bg-purple-400 rounded-full"
                                style={{ height: `${Math.random() * 16 + 4}px` }}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">0:15</span>
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
                <div className="relative h-80 lg:h-[400px] overflow-hidden">
                  <Image
                    src={chapter.image || "/placeholder.svg"}
                    alt={`${chapter.title} - ${chapter.subtitle}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Enhanced Overlays */}
                  <div className="absolute top-4 left-4">
                    <motion.div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <span className="text-white font-bold text-xl">{chapter.id}</span>
                    </motion.div>
                  </div>

                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.button
                      onClick={() => setImageFullscreen(true)}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30 hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      aria-label="View image fullscreen"
                    >
                      <Maximize className="w-4 h-4 text-white" />
                    </motion.button>
                    <motion.button
                      onClick={handleDownloadImage}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30 hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      aria-label="Download image"
                    >
                      <Download className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>

                  {/* Weather and Emotion Indicator */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 space-y-2">
                      <p className="text-gray-900 font-bold text-center text-base italic">"{chapter.mood}"</p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <span>🌤️</span>
                          <span className="truncate">{chapter.weather}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>💖</span>
                          <span className="truncate">{chapter.emotion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Enhanced Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full opacity-60"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-rose-400 rounded-full opacity-40"
                animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {imageFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setImageFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={chapter.image || "/placeholder.svg"}
                alt={`${chapter.title} - Fullscreen`}
                width={800}
                height={600}
                className="rounded-lg shadow-2xl max-w-full max-h-full object-contain"
              />
              <Button
                onClick={() => setImageFullscreen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
                aria-label="Close fullscreen"
              >
                ✕
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

// Enhanced Final Chapter with better effects
function SpectacularFinalChapter() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const [showMessage, setShowMessage] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [fireworkPositions] = useState(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: 20 + (i * 8) % 60,
      y: 20 + (i * 13) % 40,
      delay: i * 0.3,
    }))
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isInView && mounted) {
      const messageTimer = setTimeout(() => setShowMessage(true), 2000)
      const fireworksTimer = setTimeout(()=> setShowFireworks(true), 3000)
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
        <div className="absolute inset-0" aria-hidden="true">
          {Array.from({ length: 100 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `(i * 3.7) % 100 + "%",
                top: `(i * 7.13) % 100 + "%",
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: (i % 10) * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* Optimized Fireworks */}
      {showFireworks && mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {fireworkPositions.map((firework) => (
            <motion.div
              key={firework.id}
              className="absolute"
              style={{
                left: `firework.x + "%",
                top: `firework.y + "%",
              }}
            >
              {Array.from({ length: 16 }, (_, j) => (
                <motion.div
                  key={j}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ["#ff6b9d", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"][j % 5],
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((j * 22.5 * Math.PI) / 180) * (60 + Math.random() * 40),
                    y: Math.sin((j * 22.5 * Math.PI) / 180) * (60 + Math.random() * 40),
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 0.5,
                    delay: firework.delay + Math.random() * 0.5,
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
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-16 drop-shadow-2xl"
            animate={{
              textShadow: [
                "0 0 30px #f472b6, 0 0 60px #ec4899, 0 0 90px #dc2626",
                "0 0 60px #ec4899, 0 0 90px #f43f5e, 0 0 120px #f59e0b",
                "0 0 30px #f472b6, 0 0 60px #ec4899, 0 0 90px #dc2626",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
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
              className="text-2xl md:text-3xl text-white/90 font-light italic leading-relaxed max-w-4xl mx-auto"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "This website is not a gift. It's a mirror of everything we've been, survived, and still dream of."
            </motion.p>
            <motion.p
              className="text-xl md:text-2xl text-white/80 font-light"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
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
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-2xl max-w-5xl mx-auto"
              >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <div className="flex justify-center mb-8">
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center relative overflow-hidden"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <Heart className="w-10 h-10 text-white fill-current relative z-10" />
                    </motion.div>
                  </div>

                  <motion.p
                    className="text-white text-xl md:text-2xl leading-relaxed italic mb-8 max-w-4xl mx-auto"
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
                    className="flex items-center justify-center space-x-4 text-pink-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Star className="w-6 h-6 fill-current" />
                    <span className="text-lg font-medium">With all my love, always and forever</span>
                    <Star className="w-6 h-6 fill-current" />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="flex justify-center space-x-3 mt-16"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 3, type: "spring", stiffness: 200 }}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.8, 1],
                  rotate: [0, 360],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                <Heart className="w-8 h-8 text-pink-300 fill-current" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Error Boundary Component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Error caught by boundary:', event.error)
      setHasError(true)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.log('Promise rejection handled:', event.reason)
      event.preventDefault()
      // Don't set error state for minor rejections
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100">
        <div className="text-center space-y-4">
          <Heart className="w-16 h-16 text-pink-500 mx-auto" />
          <h2 className="text-2xl font-serif text-gray-800">Something went wrong with our love story</h2>
          <button 
            onClick={() => setHasError(false)}
            className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Main Component
export default function UltimateRomanticLoveStory() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 flex items-center justify-center z-50">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            className="text-2xl font-serif text-gray-700"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Our Love Story...
          </motion.h2>
        </motion.div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen" role="main">
        <EnhancedFloatingElements />
        <AdvancedMusicPlayer />

        <CinematicHero />

        {storyChapters.map((chapter, index) => (
          <EnhancedStoryChapter key={chapter.id} chapter={chapter} index={index} />
        ))}

        <SpectacularFinalChapter />
      </div>
    </ErrorBoundary>
  )
}