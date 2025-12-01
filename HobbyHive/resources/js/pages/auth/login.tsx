import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AuthLayout
            title="Log In"
            description="Back for more inspiration?"
        >
            <Head title="Log In - HobbyHive" />

            <Form
                {...AuthenticatedSessionController.store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                               
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="Email"
                                />
                                <InputError message={errors.email} />
                            </div>

                            
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex justify-center items-center  mx-auto whitespace-nowrap">
                                    
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className=" text-base font-slab text-[##2C2C2C] pr-22"
                                            tabIndex={5}
                                        >
                                            Forgot Password?
                                        </TextLink>
                                    )}

                                    <div className="flex items-center gap-1">
                                    <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}

                                />
                                <Label htmlFor="remember" className='text-center text-base'>Remember Me</Label>
                                </div>

                                </div>

                            <div className="flex items-center space-x-3">
                                
                            </div>

                            <Button
                                variant="auth"
                                type="submit"
                                className="mt-2 mx-auto h-11"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-6 w-6 animate-spin" />
                                )}
                                KEEP CREATING
                            </Button>
                        </div>

                        <div className="text-center text-base text-[#2C2C2C] font-slab font-light">
                            Don't have an account?{' '}
                            <TextLink href={register()} tabIndex={5} className="text-[#2C2C2C] font-slab font-bold">
                                Sign Up
                            </TextLink>
                        </div>



                         <div className="grid gap-2">
                                <h1 className='mx-auto font-slab font-bold text-base'> OR </h1>
                            </div>

                                <div className="grid gap-2">

                                    <Button
                                    variant="google"
                                    type="button"
                                    className='mx-auto'
                                    tabIndex={6}
                                    data-test="google-register-button"
                                    
                                    >
                                          <img
                                            src="/images/cont_google.png"
                                            alt="Continue With Google"
                                            
                                            />



                                    </Button>

                                



                            </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
