import ShoppingCart from '@/components/shadcn-studio/blocks/shopping-cart-02/shopping-cart-02'
import { Button } from '@/components/ui/button'

const ShoppingCartPage = () => {
  return (
    <div className='flex h-dvh items-start justify-center p-8'>
      <ShoppingCart
        defaultOpen
        trigger={
          <Button variant='outline'>
            <span>Open Cart</span>
          </Button>
        }
      />
    </div>
  )
}

export default ShoppingCartPage
