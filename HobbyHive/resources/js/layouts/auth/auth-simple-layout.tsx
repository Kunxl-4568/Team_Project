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

        

        <div className="grid h-screen grid-cols-2 shadow-lg text-[#2C2C2C]"> {/*two column grid for the split screen login, this is the yellow left side*/}
            <div className="bg-[#FFC300]" >
            
            <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-8 m-25"> {/*flex container for the form*/}
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-[#2C2C2C]" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-extrabold font-slab dark:text-[#2C2C2C]">{title}</h1> {/* Changed to dark text to match my figma design */}
                            <p className="text-center text-sm text-muted-foreground dark:text-[#2C2C2C] font-slab">
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
