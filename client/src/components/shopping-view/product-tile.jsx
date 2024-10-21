import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { brandOptionsMap, categoryOptionsMap } from '../config'

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddToCart }) => {
  return (
    <Card className='w-full max-w-sm mx-auto'>
        <div onClick={() => handleGetProductDetails(product?._id)}>
            <div className='relative'>
                <img src={product.image} alt={product.title} 
                    className='w-full h-[300px] object-cover rounded-t-lg'
                />
                {product?.totalStock === 0 ? (
                    <Badge className={'absolute top-2 right-2 bg-red-500 hover:bg-red-600'}>Out Of Stock</Badge>   
                ) : 
                    product?.totalStock < 10 ? <Badge className={'absolute top-2 left-2 bg-red-500 hover:bg-red-600'}>{`Only ${product?.totalStock} items left`}</Badge>
                    :
                    product?.salePrice ? (
                        <Badge className={'absolute top-2 left-2 bg-red-500 hover:bg-red-600'}>Sale</Badge>
                    ) : null
                    // <Badge className={'absolute top-2 right-2 bg-green-500 hover:bg-green-600'}>{`${product?.totalStock} left`}</Badge>   
                }
            </div>
            <CardContent className='p-4'>
                <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                <div className='flex items-center justify-between mb-2'>
                    <span className='text-sm text-muted-foreground'>{categoryOptionsMap[product?.category]}</span>
                    <span className='text-sm text-muted-foreground'>{brandOptionsMap[product?.brand]}</span>
                </div>
                <div className='flex items-center justify-between mb-2'>
                    <span className={`${product?.salePrice ? 'line-through': ''} text-lg font-semibold text-primary`}>{product?.price}</span>
                    {product?.salePrice && (
                        <span className='text-lg font-semibold text-primary'>{product?.salePrice}</span>
                    )}
                </div>
            </CardContent>
        </div>
        <CardFooter>
            <Button className='w-full'
                disabled={product?.totalStock === 0}
                onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            >Add To Cart</Button>
        </CardFooter>
    </Card>
  )
}

export default ShoppingProductTile