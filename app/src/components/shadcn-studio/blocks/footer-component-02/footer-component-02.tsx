import { ArrowRightIcon } from 'lucide-react'
import { TelegramLogo, WhatsAppLogo } from '@/assets/svg/ad-platform-logos'
import { LinkedInIcon } from '@/components/site-header-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const Footer = () => {
  return (
    <footer>
      <div className='container grid grid-cols-6 gap-6 py-8 sm:gap-8 sm:py-16 md:py-24'>
        <div className='col-span-full flex flex-col items-start gap-4 lg:col-span-2'>
          <a href='/' className='text-xl font-semibold'>
            goads/agency
          </a>
          <p className='text-muted-foreground'>
            Premium Meta, Google & TikTok ad infrastructure for agencies and media buyers.
          </p>
          <p className='text-muted-foreground text-sm'>
            Support response under 2 hours.
          </p>
          <Separator className='!w-35' />
          <div className='flex items-center gap-4'>
            <a
              href='https://t.me/goads_official'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground transition-colors hover:text-foreground'
              aria-label='Telegram'
            >
              <TelegramLogo className='size-5' />
            </a>
            <a
              href='https://wa.me/84865717497'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground transition-colors hover:text-foreground'
              aria-label='WhatsApp'
            >
              <WhatsAppLogo className='size-5' />
            </a>
            <a
              href='https://www.linkedin.com/company/goads-agency-vn/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground transition-colors hover:text-foreground'
              aria-label='LinkedIn'
            >
              <LinkedInIcon className='size-5' />
            </a>
          </div>
        </div>
        <div className='col-span-full grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-4 lg:gap-8'>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Products</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='/agency-ad-account' className='hover:text-foreground transition-colors duration-300'>
                  Agency Ad Accounts
                </a>
              </li>
              <li>
                <a href='/bm' className='hover:text-foreground transition-colors duration-300'>
                  Business Managers
                </a>
              </li>
              <li>
                <a href='/profiles' className='hover:text-foreground transition-colors duration-300'>
                  Facebook Profiles
                </a>
              </li>
              <li>
                <a href='/pages' className='hover:text-foreground transition-colors duration-300'>
                  Facebook Pages
                </a>
              </li>
              <li>
                <a href='/tiktok-accounts' className='hover:text-foreground transition-colors duration-300'>
                  TikTok Accounts
                </a>
              </li>
              <li>
                <a href='/unban' className='hover:text-foreground transition-colors duration-300'>
                  Unban Services
                </a>
              </li>
              <li>
                <a href='/blue-verification' className='hover:text-foreground transition-colors duration-300'>
                  Blue Verification
                </a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='text-lg font-medium'>Resources</div>
            <ul className='text-muted-foreground space-y-3'>
              <li>
                <a href='/about' className='hover:text-foreground transition-colors duration-300'>
                  About Us
                </a>
              </li>
              <li>
                <a href='/blog' className='hover:text-foreground transition-colors duration-300'>
                  Blog
                </a>
              </li>
              <li>
                <a href='/reviews' className='hover:text-foreground transition-colors duration-300'>
                  Reviews
                </a>
              </li>
              <li>
                <a href='/tools' className='hover:text-foreground transition-colors duration-300'>
                  Free Tools
                </a>
              </li>
              <li>
                <a href='/payment' className='hover:text-foreground transition-colors duration-300'>
                  Payment Methods
                </a>
              </li>
              <li>
                <a href='/talk-to-sales' className='hover:text-foreground transition-colors duration-300'>
                  Talk to Sales
                </a>
              </li>
            </ul>
          </div>
          <div className='col-span-full flex flex-col gap-5 sm:col-span-2'>
            <div>
              <p className='mb-3 text-lg font-medium'>Stay Updated</p>
              <div className='flex gap-2'>
                <Input
                  type='email'
                  placeholder='Your email...'
                  aria-label='Email for newsletter'
                />
                <Button size='icon' type='submit' className='btn-mirror-sweep btn-secondary rounded-lg' aria-label='Subscribe'>
                  <ArrowRightIcon />
                </Button>
              </div>
            </div>
            <Separator />

            <div className='text-muted-foreground space-y-1.5 text-sm'>
              <p className='font-medium text-foreground'>Trusted by 500+ clients worldwide</p>
              <p>Meta Agency Accounts, Google Whitelisted, TikTok Verified, Business Managers</p>
              <p>7-day warranty on every account. Average support response under 2 hours.</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className='container flex flex-col items-center gap-3 py-6 sm:flex-row sm:justify-between'>
        <p className='text-center font-medium text-balance'>
          {`©${new Date().getFullYear()}`}{' '}
          <a href='/' className='link-animated'>
            GoAds
          </a>
          {' '}&ndash; Stop Losing Accounts. Start Scaling.
        </p>
        <nav className='flex gap-4 text-sm text-muted-foreground'>
          <a href='/terms-of-service' className='transition-colors hover:text-foreground'>Terms</a>
          <a href='/privacy-policy' className='transition-colors hover:text-foreground'>Privacy</a>
          <a href='/refund-policy' className='transition-colors hover:text-foreground'>Refund</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
