import { useSelector } from 'react-redux'
import { Badge } from '../ui/badge'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

const ShoppingOrderDetails = ({ orderDetails}) => {
    const { user } = useSelector(state => state.auth)    
    return (
      <DialogContent className='sm:max-w-[600px]'>
          <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                      <p className='font-medium'>Order Id</p>
                      <Label>{orderDetails?._id}</Label>
                  </div>
                  <div className="flex items-center justify-between">
                      <p className='font-medium'>{orderDetails?.orderDate.split("T")[0]}</p>
                      <Label>123456</Label>
                  </div>
                  <div className="flex items-center justify-between">
                      <p className='font-medium'>Total </p>
                      <Label>${orderDetails?.amount}</Label>
                  </div>
                  <div className="flex items-center justify-between">
                      <p className='font-medium'>Payment Method </p>
                      <Label>{orderDetails?.paymentMethod}</Label>
                  </div>
                  <div className="flex items-center justify-between">
                      <p className='font-medium'>Payment Status </p>
                      <Label>{orderDetails?.paymentStatus}</Label>
                  </div>
                  <div className="flex items-center justify-between">
                      <p className='font-medium'>Order Status</p>
                      <Label>
                        <Badge className={`${orderDetails?.orderStatus === 'confirmed' ? 
                            'bg-green-500' :
                             orderDetails?.orderStatus === 'rejected' ?
                             'bg-red-600'
                             :'bg-black'} px-3 py-1`}>
                          {orderDetails?.orderStatus}
                        </Badge>
                      </Label>
                  </div>
              </div>
              <Separator />
              <div className="grid gap-2">
                  <div className='font-medium'>Order Details</div>
                  <ul className='grid gap-3'>
                      {
                        orderDetails?.cartItems?.map((item, index) => (
                            <li key={index} className='flex items-center justify-between'>
                                <span>{item?.title}</span>
                                <span>{item?.quantity}</span>
                                <span>${item?.salePrice > 0 ? item?.salePrice: item?.price}</span>
                            </li>
                        ))
                      }
                  </ul>
              </div>
              <div className="grid gap-4">
                  <div className='font-medium'>Shipping Info</div>
                  <div className='grid gap-0.5 text-muted-foreground'>
                      <span>{user?.userName}</span>
                      <span>{orderDetails?.addressInfo?.address}</span>
                      <span>{orderDetails?.addressInfo?.city}</span>
                      <span>{orderDetails?.addressInfo?.pincode}</span>
                      <span>{orderDetails?.addressInfo?.phone}</span>
                      <span>{orderDetails?.addressInfo?.notes}</span>
                  </div>
              </div>
          </div>
      </DialogContent>
    )
}

export default ShoppingOrderDetails