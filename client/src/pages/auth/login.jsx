import Form from '@/components/common/form';
import { loginFormControls } from '@/components/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/auth-slice';
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
    email: "",
    password: ""
}

const AuthLogin = () => {
    
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();
    
    function onSubmit (e) {
        
        e.preventDefault();
        
        dispatch(loginUser(formData)).then((data) => {
            
            if (data?.payload?.success){
                toast({
                    title: data?.payload?.message,
                    variant: "success"
                })
            }else{
                toast({
                    title: 'Login Failed Please try again',
                    variant: "destructive"
                })
            }
        })
    }

    const submitCallback = useCallback(onSubmit,[dispatch, formData])

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className="text-center">
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in To Your Account</h1>
                <p>
                    <Link to={"/auth/register"} className='font-medium ml-2 text-primary hover:underline'>Don&apos;t Have Account ? Register now !</Link>
                </p>
            </div>
            <Form 
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Login"}
                onSubmit={submitCallback}
            ></Form>
        </div>
    )
}

export default AuthLogin;
