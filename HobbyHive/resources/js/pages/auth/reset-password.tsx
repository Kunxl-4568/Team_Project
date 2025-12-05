import {useEffect} from 'react';
import NewPasswordController from '@/actions/App/Http/Controllers/Auth/NewPasswordController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    useEffect(() => {
        document.documentElement.classList.remove('dark')
    }, []);

    return (
    <>
   {/* <div className = "reset-password-page">*/}
        <AuthLayout>
            <Head title="Reset password" />
            <div className='px-6 rounded-lg text-center space-y-4'>
                <h1 className = "text-3xl font-bold font-slab text-[#2c2c2c]">Reset Password</h1>
                <p className = "text-sm text-[#2c2c2c] rounded-lg text-center">Let's get you back in.</p>
            </div>
        
            

        <div className="space-y-4 mt-4"> 
            <Form
                {...NewPasswordController.store.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-5">
                        {/*
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="mt-1 block w-full"
                                readOnly
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        */}

                        <div className="grid gap-2">
                            {/*<Label htmlFor="password" className = 'text-[#2c2c2c]'>Password</Label>*/}
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                /*className="mt-1 block w-full"*/
                                autoFocus
                                placeholder="Password"
                                className = "bg-white text-[#2c2c2c] placeholder-[#2c2c2c] border-[#ffc300]"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                           {/*
                            <Label htmlFor="password_confirmation" className = 'text-[#2c2c2c]'>
                                Confirm password
                            </Label>
                            */}
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="Confirm password"
                                className="bg-white text-[#2c2c2c] placeholder-[#2c2c2c] border-[#ffc300]"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2" 
                            />
                        </div>

                        <div className='my-2 flex items-center justify-center'>
                         <Button
                            type="submit"
                            className="mt-2 w-45 bg-[#2c2c2c] text-white hover:bg-gray-800"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            )}
                            RESET PASSWORD
                         </Button>
                        </div>
                        
                    </div>
                )}
            </Form>

            <div className="space-x-1 text-center text-sm text-[#2c2c2c]">
                <span>Remember now?</span>
                <TextLink href={login()} className="text-black font-bold no-underline">log in</TextLink>
            </div>

             

        </div>    
        </AuthLayout>
      
    {/*</div>

    <div className='bg-white py-6 flex justify-center'>
        <div className = 'flex flex-col items-start gap-y-3 mt-8'>
            <span className='text-[#2FFFFF] text-2xl font-bold mr-20'>FREEDOM</span>
            <span className='text-[#FF381B] text-2xl font-bold mr-20'>CREATIVITY</span>
            <span className='text-[#33FF76] text-2xl font-bold mr-20'>DISCOVERY</span>
        </div>

        <img src="/images/HobbyHiveLogo.png" alt="Hobby Hive Logo" className="mt-6 sm:h-40 w-auto" />

        <div className='flex flex-col items-start gap-y-3 mt-6'>
            <span className='text-[#FF67AB] text-2xl font-bold ml-20'>IMAGINATION</span>
            <span className='text-[#FF9700] text-2xl font-bold ml-20'>EXPRESSION</span>
            <span className='text-[#8672FF] text-2xl font-bold ml-20'>PASSION</span>
        </div>
    </div>*/}

    </>
    
    );
}
