import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (

// <<<<<<< frontend
        /*<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-yellow p-6 md:p-10">*/
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        {/*}
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >

                            <div className="mt-4 mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[#2c2c2c]" />
// >>>>>>> Stashed changes

        

        <div className="grid h-screen grid-cols-1 md:grid-cols-2 shadow-lg text-[#2C2C2C] overflow-hidden"> {/*two column grid for the split screen login, this is the yellow left side*/}
            <div className="bg-[#FFC300] font-slab drop-shadow-lg " >
            
            <div className="flex flex-col items-center justify-center px-6  lg:px-8 m-20" > {/*flex container for the form*/}
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={home()}>
                            <div className=" flex h-9 w-9 items-center justify-center">
                                <div className="pointer-events-none scale-1000 pb-1">
                                <img src="/images/hobbyhiveicon - Copy.png" alt="Logo"/>
<!-- >>>>>>> main -->
                            </div>
                            
                            <span className="sr-only">{title}</span>
                            </div>
                        </Link>
                        */}

                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-extrabold font-slab dark:text-[#2C2C2C]">{title}</h1> {/* Changed to dark text to match my figma design */}
                            <p className="text-center text-base text-muted-foreground dark:text-[#2C2C2C] font-slab">
                                {description}
                            </p>
                            
                        </div>
                    </div>
                    {children}
                </div>
            </div>

        /*</div>*/

    );
}
