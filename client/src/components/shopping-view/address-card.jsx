import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({ currentAddress, addressInfo, handleDeleteAddress, handleEditAddress, setCurrentAddress }) => {
  return (
    <Card className={`cursor-pointer text-left ${currentAddress?._id === addressInfo?._id ? 'border-2 border-primary' : ''}`}
      onClick={setCurrentAddress ? () => setCurrentAddress(addressInfo): null}
      >
        <CardContent className='grid gap-4 p-4'>
            <Label>Address: {addressInfo?.address}</Label>
            <Label>City: {addressInfo?.city}</Label>
            <Label>Pincode: {addressInfo?.pincode}</Label>
            <Label>Phone: {addressInfo?.phone}</Label>
            <Label>Notes: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className='flex justify-between items-center p-3'>
          <Button
            onClick={() => handleEditAddress(addressInfo)}
          >Edit</Button>
          <Button
            onClick={() => handleDeleteAddress(addressInfo)}
          >Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard