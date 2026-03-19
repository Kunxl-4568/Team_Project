// Components
import {useEffect} from'react';
import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';
import { FormEventHandler } from 'react';

interface ForgotPasswordProps {
    status?: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    useEffect(() => {
        document.documentElement.classList.remove('dark')
    }, []);


    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };
    return (
    <>
    {/*<div className="forgot-password-page">*/}
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
                                    variant="auth"
                                    className="mx-auto"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-6 w-6 animate-spin" />
                                    )}
                                    SEND EMAIL
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-[#2c2c2c]">
                    <span>Remember now?</span>
                    <TextLink href={login()} className="text-black font-bold no-underline">Log in</TextLink>
                </div>
            </div>



        </AuthLayout>

    </>

    );
}

