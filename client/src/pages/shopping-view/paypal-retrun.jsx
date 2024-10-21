import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/orderSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('paymentId');
  const payerId = searchParams.get('PayerID');

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((response) => {
        if (response?.payload?.success){
          sessionStorage.removeItem('currentOrderId');
          window.location.href = '/shop/payment-success';
        }
      });
    }
  }, [dispatch, paymentId, payerId]);
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturnPage