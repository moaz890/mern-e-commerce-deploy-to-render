import Form from '@/components/common/form';
import { registerFormControls } from '@/components/config';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/store/auth-slice';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
    username: "",
    email: "",
    password: ""
}

const AuthRegister = () => {
    
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    
    async function onSubmit (e) {
        e.preventDefault();
        try {
            const result = await dispatch(registerUser(formData));
            if (result?.payload?.success) {
                toast({
                    title: result?.payload?.message,
                })
                navigate("/auth/login");
            }else {
                toast({
                    title: result?.payload?.message,
                    variant: 'destructive'
                })
            }
        } catch (error) {
            toast({
                title: 'Registeration Error, Please try again',
                variant: 'destructive'
            })
            
        }
    }
    
    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className="text-center">
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>                
                <p>
                    <Link to={"/auth/login"} className='font-medium ml-2 text-primary hover:underline'>Already Have Account</Link>
                </p>
            </div>
            <Form 
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Sign Up"}
                onSubmit={onSubmit}
            ></Form>
        </div>
    )
}

export default AuthRegister;
