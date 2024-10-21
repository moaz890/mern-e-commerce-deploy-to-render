import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/form'
import { addressFormControls } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, fetchAddresses, updateAddress } from '@/store/shop/addressSlice'
import AddressCard from './address-card'
import { useToast } from '@/hooks/use-toast'

const initialFormData = {
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: '',
}

const Address = ({ currentAddress, setCurrentAddress }) => {
  const [formData, setFormData] = React.useState(initialFormData);
  const [editAddress, setEditAddress] = React.useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addresses } = useSelector((state) => state.address);
  const { toast } = useToast();


  const handleDeleteAddress = (address) => {
    dispatch(deleteAddress({userId: user?.id, addressId: address?._id}))
    .then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddresses(user?.id));
        toast({
          title: "Address Deleted Successfully",
          variant: "success"
        })
        if (editAddress === address?._id ) {
          setEditAddress(null);
          setFormData(initialFormData);
        }
      }
    })
  }

  const handleManageAddress = (e) => {
    e.preventDefault();

    editAddress !== null ?
    dispatch(updateAddress({userId: user?.id, addressId: editAddress, formData: formData}))
    .then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddresses(user?.id));
        setFormData(initialFormData);
        setEditAddress(null);
        toast({
          title: "Address Updated Successfully",
          variant: "success"
        })
      }
    })
    :
    addresses.length < 3 ?
    dispatch(addAddress({
      ...formData,
      userId: user?.id
    })).then((data) => {
      if(data?.payload?.success) {
        dispatch(fetchAddresses(user?.id));
        setFormData(initialFormData);
        toast({
          title: "Address Added Successfully",
          variant: "success"
        })
      }
    })
    :
    toast({
      title: "You can add only 3 addresses",
      variant: "destructive"
    })
  }

  const handleEditAddress = (address) => {
    setEditAddress(address?._id);
    setFormData({
      ...formData,
      address: address?.address,
      city: address?.city,
      phone: address?.phone,
      pincode: address?.pincode,
      notes: address?.notes,
    });
  }

  useEffect(() => {
    dispatch(fetchAddresses(user?.id))
  }, [dispatch, user?.id]);

  

  return (
    <Card>
      <div className='mb-5 p-3 grid-cols-1 grid sm:grid-cols-2'>
        {
          addresses?.map((address, index) => (
            <AddressCard key={index} addressInfo={address}
              currentAddress={currentAddress}
              handleDeleteAddress={handleDeleteAddress} 
              handleEditAddress={handleEditAddress}
              setCurrentAddress={setCurrentAddress}
              />
          ))
        }
      </div>
      <CardHeader>
        <CardTitle className='text-left'>{editAddress === null ? 'Add New Address': 'Edit Address'}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={editAddress === null ? "Add Address": "Edit Address"}
          onSubmit={handleManageAddress}
        ></Form>
      </CardContent>
    </Card>    
  )
}

export default Address