import { BadgeCheckIcon, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'


const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasket />
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <BadgeCheckIcon />
    },
]

const MenuItems = ({ setOpen }) => {

    const navigate = useNavigate();

    return (
        <nav className='mt-8 flex flex-col gap-2'>
            {
                adminSidebarMenuItems.map((item) => (
                    <div key={item.id} 
                        className='flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-foreground' 
                        onClick={() => {
                            navigate(item.path)
                            setOpen ? setOpen(false) : null
                        }}
                        >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))
            }
        </nav>
    )
}

const AdminSidebar = ({ open, setOpen }) => {
    
    const navigate = useNavigate();
    
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className='w-64'>
                    <div className='flex flex-col h-full'>
                        <SheetHeader className={'border-b'}>
                            <SheetTitle className='flex gap-2 mt-5 mb-5'>
                                <ChartNoAxesCombined size={30}/>
                                <span>Admin PAnel</span>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className='hidden w-64 border-r bg-background p-6 lg:flex flex-col'>
                <div className='flex items-center gap-2 cursor-pointer'
                    onClick={() => navigate("/admin/dashboard")}
                >
                    <ChartNoAxesCombined size={30}/>
                    <h1 className='font-bold text-2xl'>Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}

export default AdminSidebar
