'use client'

import {
  Shield, Cookie, ListFilter, Scissors, Copy, Merge,
  StickyNote, Globe, ImagePlus, FileSearch, UserSearch,
  Smile, Filter, FileText, LayoutGrid, Code,
  ScanFace, IdCard, Image, Mail,
} from 'lucide-react'

import { MotionPreset } from '@/components/ui/motion-preset'
import { Marquee } from '@/components/ui/marquee'

const tools = [
  { icon: Shield, name: '2FA Generator' },
  { icon: Cookie, name: 'Log In by Cookie' },
  { icon: ListFilter, name: 'Account Filter' },
  { icon: Scissors, name: 'Split Data' },
  { icon: Copy, name: 'Remove Duplicates' },
  { icon: Merge, name: 'Filter & Merge' },
  { icon: StickyNote, name: 'Online Notepad' },
  { icon: Globe, name: 'IP Checker' },
  { icon: ImagePlus, name: 'Batch Watermark' },
  { icon: FileSearch, name: 'Check Duplicates' },
  { icon: UserSearch, name: 'Find Facebook ID' },
  { icon: Smile, name: 'Facebook Icons' },
  { icon: Filter, name: 'Filter Text' },
  { icon: FileText, name: 'Check Content' },
  { icon: LayoutGrid, name: 'All Tools' },
  { icon: Code, name: 'Bookmarklets' },
  { icon: ScanFace, name: 'Check Live UID' },
  { icon: IdCard, name: 'Fake ID Generator' },
  { icon: Image, name: 'Random Face' },
  { icon: Mail, name: 'Getnada Reader' },
]

const row1 = tools.slice(0, 10)
const row2 = tools.slice(10, 20)

export function ToolsIllustration({ className }: { className?: string }) {
  return (
    <div className={`relative w-full ${className ?? ''}`}>
      <MotionPreset
        component='p'
        fade
        slide={{ direction: 'down', offset: 50 }}
        delay={0.8}
        transition={{ duration: 0.5 }}
        className='text-muted-foreground mb-3'
      >
        Powering productivity with <strong>20+ free tools</strong>
      </MotionPreset>

      <MotionPreset
        fade
        slide={{ direction: 'down', offset: 50 }}
        delay={0.9}
        transition={{ duration: 0.5 }}
        className='relative'
      >
        <div className='from-background pointer-events-none absolute inset-y-0 left-0 z-1 w-15 bg-gradient-to-r via-85% to-transparent' />
        <div className='from-background pointer-events-none absolute inset-y-0 right-0 z-1 w-15 bg-gradient-to-l via-85% to-transparent' />
        <div className='flex flex-col gap-3'>
          <Marquee duration={30} gap={2} pauseOnHover>
            {row1.map((tool) => {
              const Icon = tool.icon
              return (
                <span key={tool.name} className='text-muted-foreground flex items-center gap-1.5 text-sm font-medium whitespace-nowrap'>
                  <Icon className='size-3.5' />
                  {tool.name}
                </span>
              )
            })}
          </Marquee>
          <Marquee duration={30} gap={2} pauseOnHover reverse>
            {row2.map((tool) => {
              const Icon = tool.icon
              return (
                <span key={tool.name} className='text-muted-foreground flex items-center gap-1.5 text-sm font-medium whitespace-nowrap'>
                  <Icon className='size-3.5' />
                  {tool.name}
                </span>
              )
            })}
          </Marquee>
        </div>
      </MotionPreset>
    </div>
  )
}
