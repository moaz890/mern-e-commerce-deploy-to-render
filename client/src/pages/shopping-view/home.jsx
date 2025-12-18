import { Button } from "@/components/ui/button";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, Hexagon, ShirtIcon, UmbrellaIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/admin/productSlice";
import ProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { fetchProductDetail } from "@/store/shop/productsSlice";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { toast } from "@/hooks/use-toast";
import ProductDetailDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common/featureSlice";

const categoriesWithIcon = [ 
  {label: "Men",id: "men", icon: ShirtIcon },
  {label: "Women",id: "women", icon: CloudLightningIcon },
  {label: "Kids",id: "kids", icon: BabyIcon },
  {label: "Accessories",id: "accessories", icon: WatchIcon },
  {label: "Footwear",id: "footwear", icon: UmbrellaIcon },
]

const brandsWithIcon =  [
  {label: "Nike",id: "nike", icon: Hexagon},
  {label: "Adidas",id: "adidas", icon: Hexagon},
  {label: "Puma",id: "puma", icon: Hexagon},
  {label: "Levi's",id: "levi", icon: Hexagon},
  {label: "Zara",id: "zara", icon: Hexagon},
  {label: "H&M",id: "hm", icon: Hexagon}
]

const ShoppingHome = () => {
  const { user } = useSelector(state => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { images } = useSelector(state => state.feature);
  const { cartItems } = useSelector(state => state.cart)
  const [ openDetailDialog, setOpenDetailDialog] = useState(false);
  const { products, productDetail } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetail(productId))
  }
  
  const handleAddToCart = ( productId ) => {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length){
        const indexOfCurrentCartItem = getCartItems.findIndex(cartItem => cartItem.productId._id === productId);
        const indexOfCurrentProduct = products.findIndex((product) => product._id === productId);
        const productTotalStock = products[indexOfCurrentProduct]?.totalStock; 

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
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1))
    }, 3000);
    return () => clearInterval(interval);
  });


  useEffect(() => {
    dispatch(fetchProducts({ filterParams: {}, sortParams: 'price-asc'}))
  }, [dispatch]);

  const handleNavigate = (category, section) => {
   sessionStorage.removeItem("filters");
   const currentFilter = {
    [section]: [category.id]
   } 
   sessionStorage.setItem("filters", JSON.stringify(currentFilter))
   navigate(`/shop/listing?category=${category.id}&section=${section}`)
  }

  useEffect(() => {
    if (productDetail) {
      setOpenDetailDialog(true);
    }
  }, [productDetail])
  
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          images?.length > 0 && images?.map((slide, index) => (
            <img key={index} src={slide.image} alt={`Slide ${index + 1}`} className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} /> 
          ))
        }
        <Button
          variant="outline" size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-200 hover:text-gray-900"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1))}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline" size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 hover:bg-gray-200 hover:text-gray-900"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1))}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
            {
              categoriesWithIcon.map((category, index) => (
                <Card key={index} 
                  className='cursor-pointer hover:shadow-lg transition-shadow'
                  onClick={() => handleNavigate(category, 'category')}
                  >
                  <CardContent className='flex flex-col items-center justify-center p-6'>
                    <category.icon className="w-12 h-12 mb-4 text-primary"/>
                    <span className="font-bold">{category.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>

        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {
              brandsWithIcon.map((category, index) => (
                <Card key={index} className='cursor-pointer hover:shadow-lg transition-shadow'
                  onClick={() => handleNavigate(category, 'brand')}
                >
                  <CardContent className='flex flex-col items-center justify-center p-6'>
                    <category.icon className="w-12 h-12 mb-4 text-primary"/>
                    <span className="font-bold">{category.label}</span>
                  </CardContent>
                </Card>
              ))
            }
          </div>

        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              products && products.length > 0 &&
              products.map((product, index) => (
                <ProductTile key={index} product={product} handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails}></ProductTile>
              ))
            }
          </div>
        </div>
      </section>
      <ProductDetailDialog open={openDetailDialog} setOpen={setOpenDetailDialog} productDetail={productDetail}></ProductDetailDialog>
    </div>
  )
}

export default ShoppingHome;
