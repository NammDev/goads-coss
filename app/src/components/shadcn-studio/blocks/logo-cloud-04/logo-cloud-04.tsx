import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { Marquee } from '@/components/ui/marquee'
import { MotionPreset } from '@/components/ui/motion-preset'

type brandLogos = {
  image: string
  name: string
}

const LogoCloud = ({ brandLogos }: { brandLogos: brandLogos[] }) => {
  return (
    <section className='bg-muted py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 space-y-4 text-center sm:mb-16 lg:mb-24'>
          <MotionPreset fade slide={{ direction: 'down', offset: 50 }} blur transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='text-sm font-normal'>
              Our Valued Clients
            </Badge>
          </MotionPreset>

          <MotionPreset
            component='h2'
            className='text-2xl font-semibold md:text-3xl lg:text-4xl'
            fade
            slide={{ direction: 'down', offset: 50 }}
            blur
            transition={{ duration: 0.5 }}
            delay={0.3}
          >
            Building the future with industry leaders
          </MotionPreset>

          <MotionPreset
            component='p'
            className='text-muted-foreground text-xl'
            fade
            blur
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5 }}
            delay={0.6}
          >
            Join 50,000+ companies transforming their industries with us.
          </MotionPreset>
        </div>

        <div className='relative'>
          <div className='from-muted pointer-events-none absolute inset-y-0 left-0 z-1 w-35 bg-gradient-to-r to-transparent' />
          <div className='from-muted pointer-events-none absolute inset-y-0 right-0 z-1 w-35 bg-gradient-to-l to-transparent' />
          <div className='w-full overflow-hidden'>
            <Marquee pauseOnHover duration={20} gap={1.5}>
              {brandLogos.slice(0, 7).map((logo, index) => (
                <Card key={index} className='rounded-lg border-none shadow-md'>
                  <CardContent className='flex flex-col items-center px-9'>
                    <img src={logo.image} alt={logo.name} className='h-6' />
                  </CardContent>
                </Card>
              ))}
            </Marquee>
          </div>
          <div className='w-full overflow-hidden'>
            <Marquee pauseOnHover duration={20} gap={1.5} reverse>
              {brandLogos.slice(7).map((logo, index) => (
                <Card key={index} className='rounded-lg border-none shadow-md'>
                  <CardContent className='flex flex-col items-center px-9'>
                    <img src={logo.image} alt={logo.name} className='h-6' />
                  </CardContent>
                </Card>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoCloud
