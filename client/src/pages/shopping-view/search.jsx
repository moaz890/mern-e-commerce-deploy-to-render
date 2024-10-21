import ProductDetailDialog from '@/components/shopping-view/product-details';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast';
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice';
import { fetchProductDetail } from '@/store/shop/productsSlice';
import { resetSearchResults, searchProducts } from '@/store/shop/searchSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchProductsPage = () => {

    const [keyword, setKeyword] = useState("");
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchResults } = useSelector((state) => state.search);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { productDetail } = useSelector(state => state.shop);
    const dispatch = useDispatch();

    const handleAddToCart = ( productId, productTotalStock ) => {
        let getCartItems = cartItems.items || [];
        if (getCartItems.length){
          const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === productId);
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

    const handleGetProductDetails = (productId) => {
        dispatch(fetchProductDetail(productId))
    }

    useEffect(() => {
        if(keyword.trim() !== '' && keyword.trim().length >= 3){
            setTimeout(() => {
                setSearchParams(new URLSearchParams('?keyword='+keyword))
                dispatch(searchProducts(keyword))
            }, 1000)
        }else{
            setSearchParams(new URLSearchParams('?keyword='+keyword))
            dispatch(resetSearchResults())
        }
            
    }, [keyword])

    useEffect(() => {
        if (productDetail) {
            setOpenDetailsDialog(true);
        }
    }, [productDetail])
  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
        <div className="flex justify-center mb-8">
            <div className="w-full flex items-center">
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='Search Products'
                    className='py-6'
                />
            </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
                (searchResults?.length > 0 && 
                searchResults?.map((product) => (
                    <ShoppingProductTile key={product?._id} product={product} handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails}/>
                ))) || <h2 className='text-5xl font-extrabold'>No Search Results For Your Query</h2>
            }
        </div>
        <ProductDetailDialog 
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            productDetail={productDetail}
        />
    </div>
  )
}

export default SearchProductsPage