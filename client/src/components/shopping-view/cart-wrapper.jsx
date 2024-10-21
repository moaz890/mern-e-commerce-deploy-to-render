import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemsContent from './cart-items-content'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, fetchCartItems, updateCartItems } from '@/store/shop/cartSlice'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const CartWrapper = ({ cartItems, setOpenCartSheet }) => {

    const { user } = useSelector(state => state.auth);
    const { products } = useSelector(state => state.shop);
    const { isLoading } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    
    const handleDeleteCartItem = (item) => {
        console.log(item, 'item');
        dispatch(deleteCartItem({
            userId: user?.id,
            productId: item?.productId?._id
        })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Product Deleted Successfully"
                })
                dispatch(fetchCartItems(user?.id))
            }
        })
    }

    
    const handleUpdateQuantity = (item, actionType) => {
        if (actionType === 'plus'){

            let getCartItems = cartItems || [];
            if (getCartItems.length){
                const indexOfCurrentCartItem = getCartItems.findIndex(cartItem => cartItem.productId === item?.productId);
                const indexOfCurrentProduct = products.findIndex((product) => product._id === item?.productId._id);
                const productTotalStock = products[indexOfCurrentProduct]?.totalStock; 
                
                if (indexOfCurrentCartItem > -1){
                    let getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
                    if (getQuantity + 1 > productTotalStock){
                        toast({
                            title: `Only ${getQuantity} quantity can be added for`,
                            variant: "destructive"
                        })
                        return;
                    }
                }
            }
        }
        dispatch(updateCartItems({
            userId: user?.id,
            productId: item?.productId?._id,
            quantity: actionType === 'plus' ? item?.quantity + 1 : item?.quantity - 1
        })).then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Product Updated Successfully"
                })
                dispatch(fetchCartItems(user?.id))
            }
        })
    }

  return (
    <SheetContent>
        <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {
            !isLoading ?
            <Fragment>

                <div className='mt-8 space-y-4'>
                    {
                        cartItems && cartItems.length > 0 &&
                        cartItems.map(item => (
                            <CartItemsContent key={item._id} 
                                item={item} 
                                handleDeleteCartItem={handleDeleteCartItem}
                                handleUpdateQuantity={handleUpdateQuantity}
                                
                                />
                        ))
                    }
                </div>
                <div className='mt-8 space-y-4'>
                    <div className="flex justify-between">
                        <span className='font-bold'>Total</span>
                        <span className='font-bold'>
                            ${
                                cartItems && cartItems.length > 0 &&
                                cartItems.reduce((acc, item) => {
                                    return acc + (item?.productId?.salePrice > 0 ? item?.productId?.salePrice : item?.productId?.price ) * item?.quantity
                                }, 0) || 0
                            }   
                        </span>
                    </div>
                </div>
                <Button className='w-full mt-5'
                    onClick={() => {
                        setOpenCartSheet(false);
                        navigate('/shop/checkout')
                    }}
                >Checkout</Button>
            </Fragment>
            :
            <Skeleton className={'w-full h-full'} />
        }
    </SheetContent>
  )
}

export default CartWrapper