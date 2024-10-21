import { Tabs, TabsList } from '@/components/ui/tabs';
import accountImage from '../../assets/account.jpg'
import { TabsContent, TabsTrigger } from '@radix-ui/react-tabs';
import Address from '@/components/shopping-view/address';
import ShoppingOrders from '@/components/shopping-view/orders';

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img src={accountImage} alt="" 
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col items-start rounded-lg border bg-background p-6 shadow">
          <Tabs defaultValue='orders'className='w-full'>
            <TabsList className='flex gap-2'>
              <TabsTrigger value='orders'>Orders</TabsTrigger> 
              <TabsTrigger value='address'>Address</TabsTrigger> 
            </TabsList>
            <TabsContent value='orders'><ShoppingOrders /></TabsContent>
            <TabsContent value='address'><Address /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount;
