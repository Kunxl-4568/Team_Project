// Components
import {useEffect} from'react';
import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    useEffect(() => {
        document.documentElement.classList.remove('dark')
    }, []);
    return (
    <>
    <div className="forgot-password-page">
        <AuthLayout>
            <Head title = "Forgot password" />

            <div className ="px-6 rounded-lg text-center space-y-4">
                <h1 className = "text-3xl font-bold font-slab text-[#2c2c2c]">Forgot password?</h1>
                <p className="text-sm text-[#2c2c2c] mt-2">Happens to the best of us.</p>
            </div>    
            

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6 mt-6">
                <Form {...PasswordResetLinkController.store.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                {/*<Label htmlFor="email" className="text-[#2c2c2c]">Email address</Label>*/}
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                    className="bg-white text-[#2c2c2c] placeholder-[#2c2c2c] border-[#ffc300] focus:border-[#ffc300] focus:ring-[#ffc300]"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="my-6 flex items-center justify-center">
                                <Button
                                    className="w-40 bg-[#2c2c2c] text-white hover:bg-gray-800"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    SEND EMAIL
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-[#2c2c2c]">
                    <span>Remember now?</span>
                    <TextLink href={login()} className="text-black font-bold no-underline">log in</TextLink>
                </div>
            </div>

        </AuthLayout>
    </div>

    <div className='py-6 flex justify-center'>
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
    </div>

    </>

    );
}
