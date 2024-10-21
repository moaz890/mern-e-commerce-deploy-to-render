import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, resetOrderDetailsForAdmin } from '@/store/admin/orderSlice'
import { Dialog } from '../ui/dialog'
import AdminOrderDetailsView from './order-details'

import { Badge } from '../ui/badge'

const AdminOrdersView = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();


  const handleFetchOrderDetails = (id) => {
    
    dispatch(getOrdersDetailsForAdmin(id))
    setOpenDetailsDialog(true)
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true)
  }, [orderDetails]);

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
              orderList?.length > 0 && orderList?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    
                      <Badge className={`px-3 py-1
                        ${order?.orderStatus === 'confirmed' ? 
                          'bg-green-500' :
                           order?.orderStatus === 'rejected' ?
                           'bg-red-600'
                           :'bg-black'}`}>
                        {order?.orderStatus}
                      </Badge>
                    
                  </TableCell>
                  <TableCell>{order?.amount}</TableCell>
                  <TableCell>                    
                    <Button
                      onClick={() => handleFetchOrderDetails(order?._id)}
                    >View</Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Dialog open={openDetailsDialog} onOpenChange={() => {
          setOpenDetailsDialog(false);
          dispatch(resetOrderDetailsForAdmin());
        }}>
          <AdminOrderDetailsView orderDetails={orderDetails} />
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default AdminOrdersView