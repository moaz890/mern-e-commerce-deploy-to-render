import Address from "@/components/shopping-view/address";
import image from "../../assets/account.jpg"
import { useDispatch, useSelector } from "react-redux";
import CartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createOrder } from "@/store/shop/orderSlice";
import { useToast } from "@/hooks/use-toast";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.order);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { toast} = useToast();
  const dispatch = useDispatch();
  
  const cartItemsAmount = 
    cartItems?.items?.length > 0 &&
    cartItems.items.reduce((acc, item) => {
        return acc + (item?.productId?.salePrice > 0 ? item?.productId?.salePrice : item?.productId?.price ) * item?.quantity
    }, 0) || 0;
  
  
  const handleInitiatePaypalPayment = () => {

    if (cartItems?.length === 0 || cartItems?.items?.length === 0) {
      toast({
        title: 'Please add items to cart',
        variant: 'destructive',
        duration: 3000,
      })
      return;
    }

    if (!currentAddress) {
      toast({
        title: 'Please select an address',
        variant: 'destructive',
        duration: 3000,
      })
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items?.map((item) => ({
        productId: item?.productId?._id,
        title: item?.productId?.title,
        image: item?.productId?.image,
        price: item?.productId?.salePrice > 0 ? item?.productId?.salePrice : item?.productId?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentAddress?._id,
        address: currentAddress?.address,
        city: currentAddress?.city,
        phone: currentAddress?.phone,
        pincode: currentAddress?.pincode,
        notes: currentAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      amount: cartItemsAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '', 
    }
    
    
    dispatch(createOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false)
      }
    })
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={image} alt="" className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mt-5 p-5">
        <Address currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />
        <div className="flex flex-col gap-4">
          {
            cartItems && cartItems.items && cartItems.items.length > 0 &&
            cartItems.items.map((item, index) => {
              return <CartItemsContent key={index} item={item} />
            }) 
            
          }
          <div className='mt-8 space-y-4'>
            <div className="flex justify-between">
                <span className='font-bold'>Total</span>
                <span className='font-bold'>
                    ${cartItemsAmount}    
                </span>
            </div>
          </div>
          <Button className='mt-4'
            onClick={handleInitiatePaypalPayment}
          >
            {
              isPaymentStart ? 'Processing Paypal Payment...' : "Checkout With Paypal"
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout;
