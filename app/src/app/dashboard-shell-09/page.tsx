import type { ComponentType } from 'react'

import {
  ActivityIcon,
  BellIcon,
  ChevronRightIcon,
  CircleSmallIcon,
  Clock8Icon,
  FacebookIcon,
  FileWarningIcon,
  FoldersIcon,
  InfoIcon,
  InstagramIcon,
  LanguagesIcon,
  LayoutDashboardIcon,
  LinkedinIcon,
  ListTodoIcon,
  MoreVerticalIcon,
  SearchIcon,
  SquareCheckBigIcon,
  TrendingUpIcon,
  TriangleAlertIcon,
  TwitterIcon,
  UsersIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import ActivityDialog from '@/components/shadcn-studio/blocks/dialog-activity'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import ProjectTimelineCard from '@/components/shadcn-studio/blocks/chart-project-timeline'
import WeeklyOverviewCard from '@/components/shadcn-studio/blocks/chart-weekly-overview'
import ConversionRateCard from '@/components/shadcn-studio/blocks/chart-conversion-rate'
import PerformanceCard from '@/components/shadcn-studio/blocks/chart-performance'
import UpgradeYourPlanCard from '@/components/shadcn-studio/blocks/widget-upgrade-your-plan'
import UserDatatable, { type Item } from '@/components/shadcn-studio/blocks/datatable-user'

import LogoSvg from '@/assets/svg/logo'

type MenuSubItem = {
  label: string
  href: string
  badge?: string
}

type MenuItem = {
  icon?: ComponentType
  label: string
} & (
  | {
      href: string
      badge?: string
      items?: never
    }
  | { href?: never; badge?: never; items: MenuSubItem[] }
)

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboardIcon,
    label: 'Dashboard',
    href: '#'
  }
]

const pagesItems: MenuItem[] = [
  {
    icon: TrendingUpIcon,
    label: 'Project progress',
    href: '#'
  },
  {
    icon: SquareCheckBigIcon,
    label: 'Key milestone',
    href: '#'
  },
  {
    icon: TriangleAlertIcon,
    label: 'Overdue task',
    href: '#'
  },
  {
    icon: UsersIcon,
    label: 'Team list with roles',
    href: '#'
  },
  {
    icon: FoldersIcon,
    label: 'File manager',
    href: '#'
  },
  {
    icon: Clock8Icon,
    label: 'Recent updates',
    href: '#',
    badge: '3'
  },
  {
    icon: ListTodoIcon,
    label: 'Milestones',
    href: '#'
  },
  {
    icon: InfoIcon,
    label: 'Deadlines',
    href: '#'
  }
]

const completedProjectsItems: MenuItem[] = [
  {
    label: 'Website redesign crop',
    href: '#'
  },
  {
    label: 'Mobile App Launch - TaskPro',
    href: '#'
  },
  {
    label: 'Internal Tool for HRMS',
    href: '#'
  },
  {
    label: 'Marketing Campaign',
    href: '#'
  },
  {
    label: 'Feedback System Integration',
    href: '#'
  },
  {
    label: 'Cybersecurity Audit',
    href: '#'
  }
]

// Chart data
const conversionRateChartData = [
  { month: 'January', conversion: 240 },
  { month: 'February', conversion: 270 },
  { month: 'March', conversion: 380 },
  { month: 'April', conversion: 230 },
  { month: 'May', conversion: 450 },
  { month: 'June', conversion: 570 },
  { month: 'July', conversion: 310 }
]

// Conversion data
const conversionData = [
  {
    title: 'Impressions',
    stat: '12.2K Visits',
    trend: 'up',
    percentageChange: 20.3
  },
  {
    title: 'Added to cart',
    stat: '32 product in cart',
    trend: 'up',
    percentageChange: 6.3
  },
  {
    title: 'Checkout',
    stat: '15 Product checkout',
    trend: 'down',
    percentageChange: 9.56
  },
  {
    title: 'Purchased',
    stat: '12 orders',
    trend: 'up',
    percentageChange: 2.62
  }
]

// User data for datatable
const userData: Item[] = [
  {
    id: '1',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
    fallback: 'JA',
    user: 'Jack Alfredo',
    email: 'jack.alfredo@shadcnstudio.com',
    role: 'maintainer',
    plan: 'enterprise',
    billing: 'auto-debit',
    status: 'active'
  },
  {
    id: '2',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    fallback: 'SM',
    user: 'Sarah Mitchell',
    email: 'sarah.mitchell@company.com',
    role: 'admin',
    plan: 'enterprise',
    billing: 'auto-debit',
    status: 'active'
  },
  {
    id: '3',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'RC',
    user: 'Robert Chen',
    email: 'robert.chen@startup.io',
    role: 'editor',
    plan: 'team',
    billing: 'manual-paypal',
    status: 'pending'
  },
  {
    id: '4',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
    fallback: 'EW',
    user: 'Emily Wilson',
    email: 'emily.wilson@freelance.com',
    role: 'author',
    plan: 'basic',
    billing: 'manual-cash',
    status: 'inactive'
  },
  {
    id: '5',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'DG',
    user: 'David Garcia',
    email: 'david.garcia@agency.net',
    role: 'subscriber',
    plan: 'company',
    billing: 'auto-debit',
    status: 'active'
  },
  {
    id: '6',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'LT',
    user: 'Lisa Thompson',
    email: 'lisa.thompson@design.co',
    role: 'editor',
    plan: 'team',
    billing: 'manual-paypal',
    status: 'active'
  },
  {
    id: '7',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    fallback: 'MA',
    user: 'Michael Anderson',
    email: 'michael.anderson@tech.com',
    role: 'maintainer',
    plan: 'enterprise',
    billing: 'auto-debit',
    status: 'pending'
  },
  {
    id: '8',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
    fallback: 'JR',
    user: 'Jessica Rodriguez',
    email: 'jessica.rodriguez@startup.com',
    role: 'author',
    plan: 'basic',
    billing: 'manual-cash',
    status: 'active'
  },
  {
    id: '9',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
    fallback: 'CB',
    user: 'Christopher Brown',
    email: 'chris.brown@corporate.org',
    role: 'admin',
    plan: 'company',
    billing: 'auto-debit',
    status: 'inactive'
  },
  {
    id: '10',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
    fallback: 'AD',
    user: 'Amanda Davis',
    email: 'amanda.davis@marketing.io',
    role: 'subscriber',
    plan: 'basic',
    billing: 'manual-paypal',
    status: 'active'
  },
  {
    id: '11',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
    fallback: 'JJ',
    user: 'James Johnson',
    email: 'james.johnson@development.com',
    role: 'maintainer',
    plan: 'team',
    billing: 'auto-debit',
    status: 'pending'
  },
  {
    id: '12',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
    fallback: 'MW',
    user: 'Maria Williams',
    email: 'maria.williams@creative.net',
    role: 'editor',
    plan: 'company',
    billing: 'manual-cash',
    status: 'active'
  },
  {
    id: '13',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
    fallback: 'RT',
    user: 'Ryan Taylor',
    email: 'ryan.taylor@studio.com',
    role: 'author',
    plan: 'enterprise',
    billing: 'auto-debit',
    status: 'inactive'
  },
  {
    id: '14',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png',
    fallback: 'NK',
    user: 'Nicole Kim',
    email: 'nicole.kim@digital.agency',
    role: 'subscriber',
    plan: 'team',
    billing: 'manual-paypal',
    status: 'active'
  },
  {
    id: '15',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
    fallback: 'AL',
    user: 'Andrew Lee',
    email: 'andrew.lee@consulting.biz',
    role: 'admin',
    plan: 'enterprise',
    billing: 'auto-debit',
    status: 'pending'
  },
  {
    id: '16',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
    fallback: 'SM',
    user: 'Stephanie Martinez',
    email: 'stephanie.martinez@media.com',
    role: 'editor',
    plan: 'basic',
    billing: 'manual-cash',
    status: 'active'
  },
  {
    id: '17',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png',
    fallback: 'KW',
    user: 'Kevin White',
    email: 'kevin.white@innovation.co',
    role: 'maintainer',
    plan: 'company',
    billing: 'auto-debit',
    status: 'inactive'
  },
  {
    id: '18',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
    fallback: 'RH',
    user: 'Rachel Harris',
    email: 'rachel.harris@solutions.org',
    role: 'author',
    plan: 'team',
    billing: 'manual-paypal',
    status: 'active'
  },
  {
    id: '19',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-19.png',
    fallback: 'BT',
    user: 'Brian Turner',
    email: 'brian.turner@platform.io',
    role: 'subscriber',
    plan: 'enterprise',
    billing: 'auto-debit',
    status: 'pending'
  },
  {
    id: '20',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-20.png',
    fallback: 'CM',
    user: 'Catherine Moore',
    email: 'catherine.moore@ventures.com',
    role: 'admin',
    plan: 'basic',
    billing: 'manual-cash',
    status: 'active'
  },
  {
    id: '21',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-21.png',
    fallback: 'TN',
    user: 'Thomas Nelson',
    email: 'thomas.nelson@design.studio',
    role: 'editor',
    plan: 'enterprise',
    billing: 'auto-debit',
    status: 'active'
  },
  {
    id: '22',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-22.png',
    fallback: 'SP',
    user: 'Sophie Parker',
    email: 'sophie.parker@freelance.pro',
    role: 'author',
    plan: 'team',
    billing: 'manual-paypal',
    status: 'inactive'
  },
  {
    id: '23',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-23.png',
    fallback: 'AR',
    user: 'Alexander Reed',
    email: 'alex.reed@innovation.labs',
    role: 'maintainer',
    plan: 'company',
    billing: 'manual-cash',
    status: 'pending'
  },
  {
    id: '24',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-24.png',
    fallback: 'MG',
    user: 'Maya Gonzalez',
    email: 'maya.gonzalez@creative.agency',
    role: 'subscriber',
    plan: 'basic',
    billing: 'auto-debit',
    status: 'active'
  },
  {
    id: '25',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-25.png',
    fallback: 'JS',
    user: 'Jordan Smith',
    email: 'jordan.smith@tech.solutions',
    role: 'admin',
    plan: 'enterprise',
    billing: 'manual-paypal',
    status: 'pending'
  }
]

const SidebarGroupedMenuItems = ({ data, groupLabel }: { data: MenuItem[]; groupLabel?: string }) => {
  return (
    <SidebarGroup>
      {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {data.map(item =>
            item.items ? (
              <Collapsible className='group/collapsible' key={item.label}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.label}>
                      {item.icon ? <item.icon /> : <CircleSmallIcon className='fill-current/40 stroke-current/30' />}
                      <span>{item.label}</span>
                      <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map(subItem => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton className='justify-between' asChild>
                            <a href={subItem.href}>
                              {subItem.label}
                              {subItem.badge && (
                                <span className='bg-primary/10 flex h-5 min-w-5 items-center justify-center rounded-full text-xs'>
                                  {subItem.badge}
                                </span>
                              )}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton tooltip={item.label} asChild>
                  <a href={item.href}>
                    {item.icon ? <item.icon /> : <CircleSmallIcon className='fill-current/40 stroke-current/30' />}
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
                {item.badge && <SidebarMenuBadge className='bg-primary/10 rounded-full'>{item.badge}</SidebarMenuBadge>}
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const DashboardShell = () => {
  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <Sidebar collapsible='icon'>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size='lg' className='gap-2.5 !bg-transparent [&>svg]:size-8' asChild>
                  <a href='#'>
                    <LogoSvg className='[&_rect]:fill-sidebar [&_rect:first-child]:fill-primary' />
                    <span className='text-xl font-semibold'>Project</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroupedMenuItems data={menuItems} />
            <SidebarGroupedMenuItems data={pagesItems} groupLabel='Pages' />
            <SidebarGroupedMenuItems data={completedProjectsItems} groupLabel='Completed Projects' />
          </SidebarContent>
          <SidebarFooter className='[[data-state=collapsed]_&]:hidden'>
            <div className='relative flex flex-col gap-4 overflow-hidden rounded-md border p-4'>
              <svg
                width='157'
                height='136'
                viewBox='0 0 157 136'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute top-0 left-0 blur-xl'
              >
                <g opacity='0.5' filter='url(#filter0_f_16461_129124)'>
                  <circle cx='56.5' cy='41' r='60' fill='var(--primary)' fillOpacity='0.4' />
                </g>
                <defs>
                  <filter
                    id='filter0_f_16461_129124'
                    x='-43.5'
                    y='-59'
                    width='200'
                    height='200'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'
                  >
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                    <feGaussianBlur stdDeviation='20' result='effect1_foregroundBlur_16461_129124' />
                  </filter>
                </defs>
              </svg>
              <div className='z-1 flex justify-between gap-4'>
                <Avatar className='rounded-sm shadow-lg'>
                  <AvatarFallback className='bg-sidebar rounded-sm'>
                    <FileWarningIcon className='size-4' />
                  </AvatarFallback>
                </Avatar>
                <MoreVerticalIcon />
              </div>
              <div className='z-1 flex items-center justify-between gap-4'>
                <div className='whitespace-nowrap'>
                  <p className='mb-2 text-sm'>Pending Approvals</p>
                  <p className='text-xl font-semibold'>13</p>
                </div>
                <div className='*:data-[slot=avatar]:ring-background flex -space-x-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale'>
                  <Avatar>
                    <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' alt='John Doe' />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png' alt='Fanny Hansen' />
                    <AvatarFallback>FH</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png' alt='Todd Payne' />
                    <AvatarFallback>TP</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png'
                      alt='Cecilia Manning'
                    />
                    <AvatarFallback>CM</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='bg-card sticky top-0 z-50 border-b'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='[&_svg]:!size-5' />
                <Separator orientation='vertical' className='hidden !h-4 sm:block' />
                <SearchDialog
                  trigger={
                    <>
                      <Button variant='ghost' className='hidden !bg-transparent px-1 py-0 font-normal sm:block'>
                        <div className='text-muted-foreground hidden items-center gap-1.5 text-sm sm:flex'>
                          <SearchIcon />
                          <span>Type to search...</span>
                        </div>
                      </Button>
                      <Button variant='ghost' size='icon' className='sm:hidden'>
                        <SearchIcon />
                        <span className='sr-only'>Search</span>
                      </Button>
                    </>
                  }
                />
              </div>
              <div className='flex items-center gap-1.5'>
                <LanguageDropdown
                  trigger={
                    <Button variant='ghost' size='icon'>
                      <LanguagesIcon />
                    </Button>
                  }
                />
                <ActivityDialog
                  trigger={
                    <Button variant='ghost' size='icon'>
                      <ActivityIcon />
                    </Button>
                  }
                />
                <NotificationDropdown
                  trigger={
                    <Button variant='ghost' size='icon' className='relative'>
                      <BellIcon />
                      <span className='bg-destructive absolute top-2 right-2.5 size-2 rounded-full' />
                    </Button>
                  }
                />
                <ProfileDropdown
                  trigger={
                    <Button variant='ghost' className='h-full p-0 font-normal sm:pr-1'>
                      <Avatar className='size-9.5 rounded-md'>
                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className='hidden flex-col items-start gap-0.5 lg:flex'>
                        <span className='text-sm font-medium'>John Doe</span>
                        <span className='text-muted-foreground text-xs'>Admin</span>
                      </div>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>
          <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
            <div className='grid grid-cols-6 gap-6'>
              {/* Project Timeline */}
              <ProjectTimelineCard className='col-span-full 2xl:col-span-4' />

              {/* Weekly Overview */}
              <WeeklyOverviewCard className='col-span-full lg:col-span-3 2xl:col-span-2' />

              {/* Conversion Rate */}
              <ConversionRateCard
                title='Conversion rate'
                subTitle='Compared to last month'
                totalConversion={92.8}
                conversionTrend='up'
                percentageChange={6.3}
                conversionData={conversionData}
                chartData={conversionRateChartData}
                className='col-span-full lg:col-span-3 2xl:col-span-2'
              />

              {/* Upgrade your plan */}
              <UpgradeYourPlanCard className='col-span-full lg:col-span-3 2xl:col-span-2' />

              {/* Performance */}
              <PerformanceCard className='col-span-full lg:col-span-3 2xl:col-span-2' />

              {/* User Datatable */}
              <Card className='col-span-full py-0 shadow-none'>
                <UserDatatable data={userData} />
              </Card>
            </div>
          </main>
          <footer>
            <div className='text-muted-foreground mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
              <p className='text-sm text-balance max-sm:text-center'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='text-primary'>
                  shadcn/studio
                </a>
                , Made for better web design
              </p>
              <div className='flex items-center gap-5'>
                <a href='#'>
                  <FacebookIcon className='size-4' />
                </a>
                <a href='#'>
                  <InstagramIcon className='size-4' />
                </a>
                <a href='#'>
                  <LinkedinIcon className='size-4' />
                </a>
                <a href='#'>
                  <TwitterIcon className='size-4' />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default DashboardShell
