import { SectionHeader } from '@/components/section-header'
import Features from '@/components/shadcn-studio/blocks/bento-grid-01/features'

const BentoGrid = () => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='mx-auto max-w-[1416px] space-y-12 px-4 sm:space-y-16 lg:space-y-24 lg:px-6'>
        <SectionHeader
          label='Main features'
          labelVariant='badge'
          heading='All Essentials in One Place'
          description='Everything you need to scale your ad campaigns — premium agency accounts, verified business managers, and dedicated support — all under one roof.'
          descriptionClassName='max-w-none text-xl'
        />

        {/* Feature Cards */}
        <Features />
      </div>
    </section>
  )
}

export default BentoGrid
