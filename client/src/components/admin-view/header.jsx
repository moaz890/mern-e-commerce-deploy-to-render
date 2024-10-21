import { Button } from '../ui/button';
import { AlignJustify, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';

const AdminHeader = ({ setOpen }) => {

    const dispatch = useDispatch();
    const { toast } = useToast();

    const handleLogout = () => {
        dispatch(logoutUser())
        .then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: 'Logout Successfully',
                    variant: 'success'
                })
            } else {
                toast({
                    title: 'Logout Failed',
                    variant: 'destructive'
                })
            }
        })
    }

    return (
        <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
            <Button 
                className='lg:hidden sm:block'
                onClick={() => setOpen(true)}
                >
                <AlignJustify />
                <span className='sr-only'>Toggle menu</span>
            </Button>
            <div className='flex flex-1 justify-end'>
                <Button 
                    className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'
                    onClick={handleLogout}
                    >
                    <LogOut />
                    Logout
                </Button>
            </div>
        </header>
    )
}

export default AdminHeader;
