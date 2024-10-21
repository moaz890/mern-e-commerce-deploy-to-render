import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { deleteProduct, fetchProducts } from '@/store/admin/productSlice'
import { useToast } from '@/hooks/use-toast'

const ProductTile = ({ product, setFormData, setCurrentEditedId, setOpenCreateProductDialog }) => {
    const dispatch = useDispatch();
    const { toast } = useToast();

    return (
    <Card className='w-full max-w-sm mx-auto'>
        <div className='relative'>
            <img src={ product?.image} 
            alt={product?.title} 
            className='w-full h-[300px] object-cover rounded-t-lg'
            />
        </div>
        <CardContent>
            <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
            <div className='flex justify-between items-center mb-2'>
                <span className={`text-lg font-semibold text-primary ${product?.salePrice > 0 ? 'line-through' : ''}`}>${product?.price}</span>
                {
                    product?.salePrice > 0 &&
                    <span className='text-sm font-medium text-red-500'>{product?.salePrice}</span>
                }
            </div>
        </CardContent>
        <CardFooter className='flex justify-between items-center'>
            <Button 
                onClick={() => {
                    setOpenCreateProductDialog(true);
                    setCurrentEditedId(product?._id);
                    setFormData(product);
                }}
            >Edit</Button>
            <Button onClick={() => {
                dispatch(deleteProduct(product?._id))
                .then((data) =>{
                    toast({
                        title: 'Product Deleted Successfully',
                        variant: 'success'
                    })
                    dispatch(fetchProducts())
                })            
            }}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default ProductTile