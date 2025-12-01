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

        

        <div className="grid h-screen grid-cols-1 md:grid-cols-2 shadow-lg text-[#2C2C2C] overflow-hidden"> {/*two column grid for the split screen login, this is the yellow left side*/}
            <div className="bg-[#FFC300] font-slab drop-shadow-lg " >
            
            <div className="flex flex-col items-center justify-center px-6  lg:px-8 m-20"> {/*flex container for the form*/}
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="pb-1 flex h-9 w-9 items-center justify-center scale-1000">
                                <img src="/images/hobbyhiveicon - Copy.png" alt="Logo"/>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

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
            </div> {/* closing div for the flex container of the form*/}
            </div> {/*closing div for the yellow side*/}
            <div className="bg-white"> {/*white section of page, ill add hobbyhive stuff later*/}
            </div>
        </div>
        
    );
}
