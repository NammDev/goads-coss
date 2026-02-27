import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-02/testimonials-component-02'
import type { TestimonialItem } from '@/components/shadcn-studio/blocks/testimonials-component-02/testimonials-component-02'

const testimonials: TestimonialItem[] = [
  {
    name: 'Eleanor Pena',
    handle: '@BerryB777',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=48&height=48&format=auto',
    rating: 5,
    title: 'Seamless Integration',
    content:
      'shadcn/studio has made my development process so much easier! The components are intuitive and blend perfectly with Tailwind CSS.',
    platformName: 'G2',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/g2-logo.png?width=22&height=22&format=auto'
  },
  {
    name: 'Darlene Robertson',
    handle: '@LatentHQ',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=48&height=48&format=auto',
    rating: 5,
    title: 'Incredible Support',
    content:
      'The support team behind shadcn/studio is fantastic! They helped me with integration issues quickly and efficiently.',
    platformName: 'Trustpilot',
    platformImage:
      'https://cdn.shadcnstudio.com/ss-assets/brand-logo/trustpilot-icon.png?width=22&height=22&format=auto'
  },
  {
    name: 'Esther Howard',
    handle: '@oxtuggs',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'Fantastic Component Library',
    content:
      'shadcn/studio is a fantastic tool for any developer using Shadcn UI. The components are not only beautiful but also functional!',
    platformName: 'Twitter',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=22&height=22&format=auto'
  },
  {
    name: 'Floyd Miles',
    handle: '@Athar',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'Game Changer for Developers',
    content:
      'Using shadcn/studio has transformed the way I build applications. The ease of use and flexibility is unmatched!',
    platformName: 'Twitter',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=22&height=22&format=auto'
  },
  {
    name: 'Brad Hanna',
    handle: '@Marko',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'Perfect for Rapid Development',
    content:
      'shadcn/studio has significantly sped up my development process. The pre-built components are perfect for rapid prototyping!',
    platformName: 'Twitter',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=22&height=22&format=auto'
  },
  {
    name: 'Cody Fisher',
    handle: '@BerryB777',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=48&height=48&format=auto',
    rating: 5,
    title: 'Effortless Design',
    content:
      'shadcn/studio has made designing my web applications effortless. The components are easy to customize and integrate seamlessly!',
    platformName: 'G2',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/g2-logo.png?width=22&height=22&format=auto'
  },
  {
    name: 'Theresa Webb',
    handle: '@inverse_hq',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'Highly Recommended',
    content:
      "The attention to detail in shadcn/studio's components is impressive. It saves me so much time and effort in my projects!",
    platformName: 'Trustpilot',
    platformImage:
      'https://cdn.shadcnstudio.com/ss-assets/brand-logo/trustpilot-icon.png?width=22&height=22&format=auto'
  },
  {
    name: 'Dianne Russell',
    handle: '@mukherjee',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=48&height=48&format=auto',
    rating: 5,
    title: 'Exceptional User Experience',
    content:
      'shadcn/studio has truly elevated my projects! The components are not only easy to use but also enhance the overall user experience.',
    platformName: 'Trustpilot',
    platformImage:
      'https://cdn.shadcnstudio.com/ss-assets/brand-logo/trustpilot-icon.png?width=22&height=22&format=auto'
  },
  {
    name: 'Kathryn Murphy',
    handle: '@stap',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=48&height=48&format=auto',
    rating: 4.5,
    title: 'A Must-Have for Tailwind Users',
    content:
      'shadcn/studio is a must-have for anyone working with Shadcn UI. The library is well-organized and offers outstanding flexibility!',
    platformName: 'Twitter',
    platformImage: 'https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png?width=22&height=22&format=auto'
  }
]

const TestimonialsComponentPage = () => {
  return <TestimonialsComponent testimonials={testimonials} />
}

export default TestimonialsComponentPage
