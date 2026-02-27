'use client'

import { useEffect, useState } from 'react'

import { motion } from 'motion/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'

export type ReviewCard = {
  id: string
  avatar: string
  fallback: string
  name: string
  designation: string
  company: string
  rating: number
  message: string
}

const ReviewStack = ({ reviews: initialReviews }: { reviews: ReviewCard[] }) => {
  const [reviews, setReviews] = useState<ReviewCard[]>(initialReviews)

  useEffect(() => {
    const interval = setInterval(() => {
      setReviews(prevCards => {
        const newArray = [...prevCards]

        newArray.unshift(newArray.pop()!)

        return newArray
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative h-24.5'>
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          className='bg-card text-card-foreground absolute left-1/2 flex w-full -translate-x-1/2 flex-col rounded-xl border py-6 shadow-sm'
          style={{
            transformOrigin: 'top center'
          }}
          animate={{
            top: (index - 2) * -20 + 4,
            scale: 1 - index * 0.12,
            zIndex: reviews.length - index
          }}
          transition={{
            duration: 0.4,
            ease: 'easeInOut'
          }}
        >
          <div className='flex items-center gap-2 border-b px-6 pb-6'>
            <Avatar className='size-10'>
              <AvatarImage src={review.avatar} alt={review.name} />
              <AvatarFallback>{review.fallback}</AvatarFallback>
            </Avatar>

            <div className='space-y-0.5'>
              <p className='font-medium'>{review.name}</p>
              <p className='text-xs'>
                <span className='text-muted-foreground'>{review.designation}</span>{' '}
                <span className='font-medium'>{review.company}</span>
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-6 px-6 pt-6'>
            <Rating readOnly variant='yellow' size={24} value={review.rating} precision={0.5} />

            <p className='text-muted-foreground'>{review.message}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ReviewStack
