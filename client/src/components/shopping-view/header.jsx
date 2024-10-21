import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '../config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'
import CartWrapper from './cart-wrapper'
import { useEffect, useState } from 'react'
import { fetchCartItems } from '@/store/shop/cartSlice'
import { Label } from '../ui/label'

const MenuItems = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleNavigate(item) {
        sessionStorage.removeItem('filters');
        const filters = item.id === 'home' || item.id === 'products' || item.id === 'search'? 
            {} : {
                category: [item.id]
            }
        sessionStorage.setItem('filters', JSON.stringify(filters));
        if (location.pathname.includes("listing") && filters !== null ){
            setSearchParams(new URLSearchParams(`?category=${item.id}`))
        }
        navigate(`${item.link}`);
    }
    
    return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
        {
            shoppingViewHeaderMenuItems.map(item => (
                <Label
                    key={item.id}
                    className='text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer'
                    onClick={() => handleNavigate(item)}
                    >
                    {item.label}
                </Label>
            ))
        }
    </nav>
}

const HeaderRightContent = () => {

    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();

    const handleLogout = () => {
        dispatch(logoutUser())
        .then((data) => {
            if (data.payload.success) {
                toast({
                    title: "Logged out successfully",
                    variant: "default",
                    duration: 3000,
                })
            }
        })
    }

    useEffect(() => {
      dispatch(fetchCartItems(user?.id))  
    }, [dispatch, user?.id]);

    return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            <Button variant='outline' size='icon' 
                className={`relative`}
                onClick={() => setOpenCartSheet(true)}>
                <ShoppingCart className='w-6 h-6'/>
                <span className='absolute top-[-5px] right-[2px] text-sm font-extrabold'>{cartItems?.items?.length || 0}</span>
                <span className='sr-only'>Cart</span>   
            </Button>
            <CartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}
                setOpenCartSheet={setOpenCartSheet}
            ></CartWrapper>
        </Sheet>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                 <Avatar className='bg-black'>
                    <AvatarFallback className='bg-black text-white font-extrabold cursor-pointer'>{user?.username[0].toUpperCase()}</AvatarFallback>
                 </Avatar>
            </DropdownMenuTrigger>  
            <DropdownMenuContent className='w-56 border' align="end">
                <DropdownMenuLabel>Logged in As { user?.username }</DropdownMenuLabel>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem 
                    onClick={() =>  navigate('/shop/account')}
                className='p-2 flex items-center cursor-pointer'>
                    <UserCog className='mr-2 h-4 w-4' />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem 
                    onClick={handleLogout}
                className='p-2 flex items-center cursor-pointer'>
                    <LogOut className='mr-2 h-4 w-4' />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}

const ShoppingHeader = () => {

    const { isAuthenticated, user } = useSelector(state => state.auth);

    return (
        <header className='sticky top-0 z-40 w-full border-b bg-background'>
            <div className='flex h-16 items-center justify-between px-4 md:px-6'>
                <Link className='flex items-center gap-2' to='/shop/home'>
                    <HousePlug className='w-6 h-6'/>
                    <span className='font-bold'>Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='outline' size='icon' className='lg:hidden'>
                            <Menu className='w-6 h-6' />
                            <span className='sr-only'>Toggleheader Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='w-full max-w-xs'>
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className='hidden lg:block'>
                    <MenuItems />
                </div>
                 <div className='hidden lg:block'>
                    <HeaderRightContent />
                 </div>
            </div>
        </header>
    )
}

export default ShoppingHeader
