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
           <div className="bg-[#FFC300] font-slab drop-shadow-lg flex items-center justify-center">

            <div className="flex flex-col items-center justify-center px-6 lg:px-8 py-12 w-full max-w-md">

            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={home()}>
                            <div className=" flex h-9 w-9 items-center justify-center">
                                <div className="pointer-events-none scale-1000 pb-1">


                                <img src="/images/hobbyhiveicon - Copy.png" alt="Logo"/>
                            </div>
                            
                            <span className="sr-only">{title}</span>
                            </div>
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
            <div className="bg-white flex items-center justify-center  "> {/*right side of the split screen, white side*/}

               <div className="flex flex-col items-center justify-center pb-26 ">

                        <div className = 'flex flex-col items-start gap-y-3 mx-auto text-4xl text-shadow-2xl ml-15'>
                            <span className='text-[#2FFFFF]  font-bold ml-37'>FREEDOM</span>
                            <span className='text-[#FF381B] font-bold ml-37'>CREATIVITY</span>
                            <span className='text-[#33FF76]  font-bold ml-37'>DISCOVERY</span>
                        
                            <Link href={home()}>
                            <img src="/images/HobbyHiveLogo.png" alt="Hobby Hive Logo" className="mt-5 sm:h-40 w-auto mx-auto" /> {/* image needs centering - jb */}
                            </Link>
                        
                            <span className='text-[#FF67AB]  font-bold ml-37 '>IMAGINATION</span>
                            <span className='text-[#FF9700]  font-bold ml-37'>EXPRESSION </span>
                            <span className='text-[#8672FF]  font-bold ml-37'>PASSION</span>
                            </div>
                        </div>
                    </div> 
                
            </div>
        

    );
}