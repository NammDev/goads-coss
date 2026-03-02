const CommitItem = ({ message }: { message: string }) => {
  return (
    <div className='relative space-y-2'>
      <svg
        width='20'
        height='11'
        viewBox='0 0 20 11'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0.5 -left-7'
      >
        <rect width='20' height='11' fill='var(--card)' />
        <path
          d='M12.5 5.5C12.5 6.88071 11.3807 8 10 8C8.61929 8 7.5 6.88071 7.5 5.5M12.5 5.5C12.5 4.11929 11.3807 3 10 3C8.61929 3 7.5 4.11929 7.5 5.5M12.5 5.5H17.5M7.5 5.5H2.5'
          stroke='var(--border)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <div className='text-xs'>{message}</div>
      <div className='bg-muted flex items-center gap-2 rounded-sm p-1.5'>
        <img
          src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/github-icon.png?width=20&format=auto'
          alt='GitHub Logo'
          className='size-5 shrink-0 dark:invert'
        />
        <div className='flex-1 space-y-1.5'>
          <div className='bg-card-foreground h-0.75 w-full max-w-20 rounded-full' />
          <div className='bg-muted-foreground h-0.75 w-full max-w-12.5 rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default CommitItem
