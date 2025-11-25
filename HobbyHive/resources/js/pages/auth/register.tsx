import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Sign Up"
            description="Start your creative journey today!"
        >

            

            <Head title="Register - HobbyHive" />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"  
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className='sr-only'>Input your Email Address</Label> {/*sr-only label for screen readers, ive applied it to all labels.*/}
                                <Input 
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="Email"
                                    
                                />
                               <InputError message={errors.email} />
                            </div>





                            <div className="grid gap-2">
                                <Label htmlFor="email" className='sr-only'>Confirm your Email Address</Label> 
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="Confirm Email"
                                />
                                <InputError message={errors.email} />
                            </div>




                            <div className="grid gap-2">
                                <Label htmlFor="password" className='sr-only'>Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>



                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className='sr-only'>
                                    Confirm password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm Password"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                variant="auth"
                                type="submit"
                                className="mt-2 mx-auto h-11"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-6 w-6 animate-spin" />
                                )}
                                START CREATING
                            </Button>


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
                            



                        </div>


                        

                        <div className="text-center text-base text-[#2C2C2C] font-slab font-light">
                            Already a member?{' '}
                            <TextLink href={login()} tabIndex={6} className='text-[#2C2C2C] font-slab font-bold'>
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
