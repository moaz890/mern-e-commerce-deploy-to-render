import { sortOptions } from '@/components/config';
import FilterProducts from '@/components/shopping-view/filter-prodcuts';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { fetchProductDetail, fetchProducts } from '@/store/shop/productsSlice';
import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductDetailDialog from '../../components/shopping-view/product-details';
import { addToCart, fetchCartItems } from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';

const ShoppingListing = () => {


  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { products, productDetail } = useSelector(state => state.shop);
  const { cartItems } = useSelector(state => state.cart)
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [ openDetailDialog, setOpenDetailDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categorySearchParam = searchParams.get("category");

  const handleSort = (value) => {
    setSort(value);
  }

  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) copyFilters[getSectionId].push(getCurrentOption);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(copyFilters);
    sessionStorage.setItem('filters', JSON.stringify(copyFilters));
  }

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetail(productId))
  }
  
  const handleAddToCart = ( productId, productTotalStock ) => {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length){
        const indexOfCurrentCartItem = getCartItems.findIndex(cartItem => cartItem.productId._id === productId);
        if (indexOfCurrentCartItem > -1){
            let getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
            if (getQuantity + 1 > productTotalStock){
                toast({
                    title: `Only ${getQuantity} quantity can be added for`,
                    variant: "destructive"
                })
                return;
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

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(filter => (
        filters[filter].map(option => (
          queryParams.append(filter, option)
        ))
      ))
      setSearchParams(queryParams);
    }
    
  }, [filters, setSearchParams])

  useEffect(() => {
    setSort("price-asc");
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || [])
  }, [categorySearchParam])

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchProducts({filterParams: filters, sortParams: sort}));
    } 
  }, [dispatch, sort, filters])


  useEffect(() => {
    if (productDetail) {
      setOpenDetailDialog(true);
    }
  }, [productDetail])
  
  return (
    <div className='grid drid-cols-1 md:grid-cols-[200px_1fr] gap-4 p-4 md:p-6'>
      <FilterProducts filters={filters} handleFilters={handleFilter}></FilterProducts>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold mr-2'>All Products</h2>
          <div className="flex items-center gap-3">
            <span className='text-muted-foreground '>{products?.length} Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center gap-1'>
                  <ArrowUpDownIcon className='h-4 w-4'/>
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map((option) => (
                      <DropdownMenuRadioItem key={option.id} value={option.id} className='cursor-pointer'>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4">
            {
              products?.length > 0 &&
              products.map((product) => (
                <ShoppingProductTile 
                  handleGetProductDetails={handleGetProductDetails} key={product._id} product={product}
                  handleAddToCart={handleAddToCart}
                  ></ShoppingProductTile>
              ))
            }
        </div>
      </div>
      <ProductDetailDialog open={openDetailDialog} setOpen={setOpenDetailDialog} productDetail={productDetail}></ProductDetailDialog>
    </div>
  )
}

export default ShoppingListing;
