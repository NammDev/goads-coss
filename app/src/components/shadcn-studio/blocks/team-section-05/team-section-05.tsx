import { FacebookIcon, GithubIcon, InstagramIcon, TwitterIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { MotionPreset } from '@/components/ui/motion-preset'
import { SectionHeader } from '@/components/section-header'

type TeamMember = {
  image: string
  alt: string
  name: string
  role: string
  description: string
  socialLinks: {
    facebook: string
    twitter: string
    github: string
    instagram: string
  }
}[]

const Team = ({ teamMembers }: { teamMembers: TeamMember }) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-[1416px] px-4 lg:px-6'>
        <SectionHeader
          label='Our Team'
          labelVariant='uppercase'
          heading='Get to Know the Team Powering Our Success!'
          description='A dedicated group of innovators, strategists, and creators working together to drive excellence.'
          descriptionClassName='max-w-none text-xl'
          className='mb-12 sm:mb-16 lg:mb-24'
        />

        {/* Team Members */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {teamMembers.map((member, index) => (
            <MotionPreset
              key={index}
              fade
              blur
              slide={{ direction: 'up' }}
              delay={0.9 + index * 0.15}
              transition={{ duration: 0.85 }}
            >
              <Card className='h-full gap-0 overflow-hidden py-0 shadow-none transition-shadow duration-300 hover:shadow-md lg:flex-row'>
                <CardContent className='px-0 max-lg:max-h-55 lg:w-66'>
                  <img src={member.image} alt={member.alt} className='size-full object-cover lg:rounded-l-xl' />
                </CardContent>
                <div className='flex grow-1 flex-col justify-between'>
                  <CardHeader className='gap-5 pt-6 pb-5'>
                    <div className='flex items-center justify-between gap-2'>
                      <CardTitle className='text-xl'>{member.name}</CardTitle>
                      <span className='text-muted-foreground'>{member.role}</span>
                    </div>
                    <CardDescription className='text-base'>{member.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className='mx-6 gap-3 border-t border-dashed px-0 !pt-5 pb-6'>
                    <Button
                      size='icon'
                      asChild
                      className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 size-7'
                    >
                      <a href={member.socialLinks.facebook}>
                        <FacebookIcon className='size-4.5' />
                        <span className='sr-only'>Facebook profile</span>
                      </a>
                    </Button>
                    <Button
                      size='icon'
                      asChild
                      className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 size-7'
                    >
                      <a href={member.socialLinks.twitter}>
                        <TwitterIcon className='size-4.5' />
                        <span className='sr-only'>Twitter profile</span>
                      </a>
                    </Button>
                    <Button
                      size='icon'
                      asChild
                      className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 size-7'
                    >
                      <a href={member.socialLinks.github}>
                        <GithubIcon className='size-4.5' />
                        <span className='sr-only'>GitHub profile</span>
                      </a>
                    </Button>
                    <Button
                      size='icon'
                      asChild
                      className='bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 size-7'
                    >
                      <a href={member.socialLinks.instagram}>
                        <InstagramIcon className='size-4.5' />
                        <span className='sr-only'>Instagram profile</span>
                      </a>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
