import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetails from './order-details'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUser, getOrdersDetails, resetOrderDetails } from '@/store/shop/orderSlice'
import { Badge } from '../ui/badge'

const ShoppingOrders = () => {

  const  [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.order);

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrdersDetails(orderId));
  }

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id))
  },[dispatch, user?.id]);

  console.log(orderDetails);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'></span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList?.map((order) => (
                <TableRow key={order?._id} className='text-left'>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge className={`${orderDetails?.orderStatus === 'confirmed' ? 
                            'bg-green-500' :
                             orderDetails?.orderStatus === 'rejected' ?
                             'bg-red-600'
                             :'bg-black'} px-3 py-1`}>
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order?.amount}</TableCell>
                  <TableCell>
                    
                    <Button
                      onClick={() => handleFetchOrderDetails(order?._id)}
                    >View Details</Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Dialog open={openDetailsDialog} onOpenChange={() => {
          setOpenDetailsDialog(false);
          dispatch(resetOrderDetails());
        }}>
          <ShoppingOrderDetails orderDetails={orderDetails}></ShoppingOrderDetails>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders