'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Word widths for h1 rotating words (fixed container width per word)
const WORD_WIDTHS: Record<string, number> = {
  Templates: 251,
  Pages: 136,
  Kits: 101,
  Components: 295,
}

interface WordRotateProps {
  words: string[]
  interval?: number
}

export function WordRotate({ words, interval = 3000 }: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [words, interval])

  const currentWord = words[index]
  const width = WORD_WIDTHS[currentWord] ?? 200

  return (
    <div
      className="relative inline-block text-start transition-[width] duration-300"
      style={{ width }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          className="inline-block"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {currentWord.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

interface TypewriterProps {
  words: string[]
  typingSpeed?: number
  pauseDuration?: number
}

export function Typewriter({ words, typingSpeed = 80, pauseDuration = 2000 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const tick = () => {
      if (!isDeleting) {
        if (displayed.length < currentWord.length) {
          setDisplayed(currentWord.slice(0, displayed.length + 1))
          timeoutRef.current = setTimeout(tick, typingSpeed)
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(currentWord.slice(0, displayed.length - 1))
          timeoutRef.current = setTimeout(tick, typingSpeed / 2)
        } else {
          setIsDeleting(false)
          setWordIndex(prev => (prev + 1) % words.length)
        }
      }
    }

    timeoutRef.current = setTimeout(tick, typingSpeed)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, pauseDuration])

  return (
    <>
      <span className="text-foreground">{displayed}</span>
      <span className="bg-primary inline-block h-6 w-0.5 rounded-sm animate-pulse" />
    </>
  )
}
