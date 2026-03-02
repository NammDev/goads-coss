'use client'

import { useEffect, useState } from 'react'

import { motion } from 'motion/react'

let interval: any

type Card = {
  id: number
  content: React.ReactNode
}

const CardStack = ({ items, offset }: { items?: Card[]; offset?: number }) => {
  const initialCards: Card[] = [
    {
      id: 1,
      content: (
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/craft/image-14.png'
          alt='Image 1'
          className='border-muted w-87.5 rounded-[12px] border object-cover shadow-sm'
        />
      )
    },
    {
      id: 2,
      content: (
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/craft/image-15.png'
          alt='Image 2'
          className='border-muted w-87.5 rounded-[12px] border object-cover shadow-sm'
        />
      )
    },
    {
      id: 3,
      content: (
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/craft/image-17.png'
          alt='Image 3'
          className='border-muted w-87.5 rounded-[12px] border object-cover shadow-sm'
        />
      )
    },
    {
      id: 4,
      content: (
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/template/landing-page/craft/image-16.png'
          alt='Image 4'
          className='border-muted w-87.5 rounded-[12px] border object-cover shadow-sm'
        />
      )
    }
  ]

  const CARD_OFFSET = offset || 10
  const [cards, setCards] = useState<Card[]>(items || initialCards)

  useEffect(() => {
    startFlipping()

    return () => clearInterval(interval)
  }, [])

  const getCardRotation = (id: number) => {
    if (id === 1) return 0
    if (id === 2) return 9
    if (id === 3) return -2
    if (id === 4) return 5

    return 0
  }

  const getCardTranslation = (id: number) => {
    if (id === 1) return { x: 0, y: 0 }
    if (id === 2) return { x: 0, y: 0 }
    if (id === 3) return { x: -20, y: 0 }
    if (id === 4) return { x: -10, y: -1 }

    return { x: 0, y: 0 }
  }

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards] // create a copy of the array

        newArray.unshift(newArray.pop()!) // move the last element to the front

        return newArray
      })
    }, 2200)
  }

  return (
    <div className='relative h-60 w-60 md:h-60 md:w-96'>
      {cards.map((card, index) => {
        const rotation = index === 0 ? 0 : getCardRotation(card.id)
        const translation = index === 0 ? { x: 0, y: 0 } : getCardTranslation(card.id)
        const topOffset = index * -CARD_OFFSET

        return (
          <motion.div
            key={card.id}
            className='absolute'
            style={{
              transformOrigin: 'center'
            }}
            animate={{
              top: topOffset,
              zIndex: cards.length - index,
              rotate: rotation,
              x: translation.x,
              y: translation.y
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut'
            }}
          >
            {card.content}
          </motion.div>
        )
      })}
    </div>
  )
}

export default CardStack
