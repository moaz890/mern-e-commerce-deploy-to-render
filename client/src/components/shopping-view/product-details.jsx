import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '../ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice'
import { useToast } from '@/hooks/use-toast'
import { setProductDetail } from '@/store/shop/productsSlice'
import { Label } from '../ui/label'
import StarRating from '../common/star-rating'
import { useEffect, useState } from 'react'
import { addReview, getReviews } from '@/store/shop/reviewSlice'


const ProductDetailDialog = ({ open, setOpen, productDetail }) => {

    const [reviewMessage, setReviewMessage] = useState("");
    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { toast } = useToast();
    const { cartItems } = useSelector(state => state.cart);
    const { reviews } = useSelector(state => state.review);
    const { products } = useSelector(state => state.shop);
    
    const handleRating = (getRating) => {
        setRating(getRating)
    }
    
    const handleAddToCart = ( productId ) => {
        let getCartItems = cartItems.items || [];
        if (getCartItems.length){
          const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === productId);
          const productIndex = products.findIndex(product => product._id === productId);
          const productTotalStock = products[productIndex]?.totalStock;
          if (indexOfCurrentItem > -1){
            let getQuantity = getCartItems[indexOfCurrentItem].quantity;
            if (getQuantity + 1 > productTotalStock){
              toast({
                title: `Only ${getQuantity} quantity can be added for`,
                variant: "destructive"
              })
            }
          }
        }
        dispatch(addToCart({userId: user.id, productId: productId, quantity: 1})).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchCartItems(user.id));
            toast({
              title: "Product added to cart",
              variant: "default",
              duration: 3000,
            })
          }
        })
      }

      const handleDialogFalse = () => {
        setOpen(false);
        dispatch(setProductDetail());
        setRating(0)
        setReviewMessage("");
      }

      const handleAddReview = () => {
        dispatch(addReview({
            productId: productDetail?._id,
            userId: user?.id,
            username: user?.username,
            review: reviewMessage,
            rating: rating
        })).then((data) => {
            setRating(0)
            setReviewMessage("");
            dispatch(getReviews(productDetail?._id));
            toast({
                title: "Review Was Added Successfully",
                variant: "success"
            })
        })
      }

      const reviewsAverage = reviews?.length > 0 ?
        reviews?.reduce((sum, acc) => sum + acc.rating, 0) : 0

      useEffect(() => {
        if (productDetail !== null) dispatch(getReviews(productDetail?._id))
      }, [productDetail])


  return (
    <Dialog open={open} onOpenChange={handleDialogFalse} >
        <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
            
            <div className="relative overflow-hidden rounded-lg">
                <img 
                    src={productDetail?.image} alt={productDetail?.title}  
                    width={600} 
                    height={600}
                    className ={'aspect-square w-full object-cover'}
                    />
            </div>
            <div className="">
                <div>
                    <h1 className='text-3xl font-extrabold'>{productDetail?.title}</h1>
                    <p className='text-muted-foreground mb-5 mt-4'>{productDetail?.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className={`text-3xl text-red-500 font-bold ${productDetail?.salePrice > 0 ? 'line-through': ''}`}>{productDetail?.price}</p>
                    {
                        productDetail?.salePrice > 0 &&
                        <p className='text-2xl font-bold text-muted-foreground'>{productDetail?.salePrice}</p>
                    }
                </div>
                <div className="flex items-center gap-2">
                    <StarRating rating={reviewsAverage} />
                    <span className='text-lg text-muted-foreground'>({reviewsAverage?.toFixed(2)})</span>
                </div>
                <div className='mt-5 mb-5'>
                    <Button className='w-full'
                        disabled = {productDetail?.totalStock === 0}
                        onClick={() => {
                            handleAddToCart(productDetail?._id, productDetail?.totalStock)
                        }}
                    >{`${productDetail?.totalStock === 0 ? 'Out Of Stock' :'Add To Cart' }`}</Button>
                </div>
                <Separator />
                <div className='max-h-[300px] overflow-auto'>
                    <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                    <div className='grid gap-6'>

                        {
                            reviews?.length > 0 &&
                            reviews?.map((review, index) => (
                                
                            <div className='flex gap-4' key={review?._id}>
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>{review?.username[0]?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className="flex items-center gap-2">
                                        <h3 className='font-bold'>{review?.username}</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarRating rating={review?.rating}/>
                                    </div>
                                    <p className='text-muted-foreground'>{review?.review}</p>
                                </div>
                            </div>
                            ))
                        }
                    </div>
                    <div className='mt-10 flex flex-col gap-2'>
                        <Label>Write Review</Label>
                        <div className="flex gap-0.5">
                            <StarRating rating={rating} handleRating={handleRating}/>
                        </div>
                        <Input placeholder='Write a review' 
                        value={reviewMessage} onChange={(e) => setReviewMessage(e.target.value)}
                        className='focus:outline-none' />
                        <Button className='w-full mt-3'
                            disabled={reviewMessage.trim() === ''}
                            onClick={handleAddReview}
                        >Comment</Button>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProductDetailDialog