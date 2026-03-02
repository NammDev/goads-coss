import type { SVGAttributes } from 'react'

const IconBg = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width='78' height='78' viewBox='0 0 78 78' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M8 0.5H70C74.1421 0.5 77.5 3.85786 77.5 8V70C77.5 74.1421 74.1421 77.5 70 77.5H8C3.85786 77.5 0.5 74.1421 0.5 70V8L0.509766 7.61426C0.704063 3.77915 3.77915 0.704063 7.61426 0.509766L8 0.5Z'
        stroke='url(#paint0_linear_18091_71726)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_18091_71726'
          x1='39.003'
          y1='10.447'
          x2='39.05'
          y2='67.553'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' stopOpacity='0' />
          <stop offset='1' stopColor='var(--primary)' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default IconBg
