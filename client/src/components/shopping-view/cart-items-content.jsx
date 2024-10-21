import { Button } from '../ui/button';
import { Minus, Plus, Trash } from 'lucide-react';


const CartItemsContent = ({ item, handleDeleteCartItem, handleUpdateQuantity }) => {
    
    
  return (
    <div className='flex items-center space-x-4'>
        <img src={item?.productId?.image} alt={item?.title} 
        className='w-16 h-16 object-cover rounded-lg'
        />
        <div className='flex-1'>
            <h3 className='font-extrabold'>{item?.productId?.title}</h3>
            <div className='flex items-center mt-1 gap-2'>
                <Button variant={'outline'} size={'icon'} className='h-86 w-8 rounded-full'
                    onClick={() => {
                        handleUpdateQuantity(item, 'minus')
                    }}
                    disabled={item?.quantity === 1}
                >
                    <Minus className='h-4 w-4' />
                    <span className='sr-only Decrease'>Decrease</span>
                </Button>
                <span className='font-semibold'>{item?.quantity}</span>
                <Button variant={'outline'} size={'icon'} className='h-86 w-8 rounded-full'
                    onClick={() => {
                        handleUpdateQuantity(item, 'plus')
                    }}
                >
                    <Plus className='h-4 w-4' />
                    <span className='sr-only'>Increase</span>
                </Button>
            </div>
        </div>
        <div className='flex items-end flex-col'>
            <div className="font-semibold">
                ${(item?.productId?.salePrice > 0 ? item?.productId?.salePrice : item?.productId?.price ) * item?.quantity}
            </div>
            <Trash className='h-4 w-4 cursor-pointer' color='red' size={20}
                onClick={() => handleDeleteCartItem(item)}
            />
        </div>
    </div>
  )
}

export default CartItemsContent