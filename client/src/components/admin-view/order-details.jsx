import { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import Form from '../common/form'
import { Badge } from '../ui/badge'
import { useDispatch } from 'react-redux'
import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, updateOrderStatus } from '@/store/admin/orderSlice'
import { useToast } from '@/hooks/use-toast'

const initialFormData = {
    orderStatus: ""
}

const AdminOrderDetailsView = ( {orderDetails} ) =>  {
    
  const[formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    dispatch(updateOrderStatus({id: orderDetails?._id, orderStatus: formData.orderStatus})).then((data) => {
        if (data?.payload?.success) {
            toast({
                title: "Order Status Updated Successfully",
                variant: "success"
            })
            dispatch(getOrdersDetailsForAdmin(orderDetails?._id))
            dispatch(getAllOrdersForAdmin())
            setFormData(initialFormData);
        }
    })
  }

  return (
    <DialogContent className='sm:max-w-[600px]' aria-describedby={"dialog-title"}>
        <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                      <p className='font-medium'>Order Id</p>
                      <Label>{orderDetails?._id}</Label>
                  </div>
                  <div className="flex items-center justify-between">
                      <p className='font-medium'>{orderDetails?.orderDate.split("T")[0]}</p>
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
                        <Badge className={`px-3 py-1 
                            ${orderDetails?.orderStatus === 'confirmed' ? 
                            'bg-green-500' :
                             orderDetails?.orderStatus === 'rejected' ?
                             'bg-red-600'
                             :'bg-black'}`}>
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
                      <span>{orderDetails?.userId?._id}</span>
                      <span>{orderDetails?.userId?.username}</span>
                      <span>{orderDetails?.userId?.email}</span>
                  </div>
              </div>
            <div>
                <Form
                    formControls={[
                        {
                            label: "Order Status",
                            componentType: "select",
                            name: "orderStatus",
                            options: [
                                {
                                    label: "Pending",
                                    value: "pending"
                                },
                                {
                                    label: "In Process",
                                    value: "inProcess"
                                },
                                {
                                    label: "In Shipping",
                                    value: "inShipping"
                                },
                                {
                                    label: 'Rejected',
                                    value: 'rejected'
                                },
                                {
                                    label: 'Confirmed',
                                    value: 'confirmed'
                                }
                            ]
                        }
                    ]}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={"Update Order Status"}
                    onSubmit={handleUpdateStatus}
                ></Form>
            </div>
          </div>
    </DialogContent>
  )
}

export default AdminOrderDetailsView