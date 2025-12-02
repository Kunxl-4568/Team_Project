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
        <div className="grid h-screen grid-cols-1 md:grid-cols-2 shadow-lg text-[#2C2C2C] overflow-hidden">
            {/* Left yellow side with logo + form */}
            <div className="bg-[#FFC300] font-slab drop-shadow-lg">
                <div className="flex flex-col items-center justify-center px-6 lg:px-8 m-20">
                    <div className="w-full max-w-sm">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col items-center gap-4">
                                <Link href={home()}>
                                    <div className="flex h-9 w-9 items-center justify-center">
                                        <div className="pointer-events-none scale-1000 pb-1">
                                            <img
                                                src="/images/hobbyhiveicon - Copy.png"
                                                alt="Logo"
                                            />
                                            {/* Or use the icon component instead:
                                            <AppLogoIcon className="size-9 fill-current text-[#2c2c2c]" />
                                            */}
                                        </div>
                                    </div>
                                    <span className="sr-only">{title}</span>
                                </Link>

                                <div className="space-y-2 text-center">
                                    <h1 className="text-3xl font-extrabold font-slab dark:text-[#2C2C2C]">
                                        {title}
                                    </h1>
                                    <p className="text-center text-base text-muted-foreground dark:text-[#2C2C2C] font-slab">
                                        {description}
                                    </p>
                                </div>
                            </div>

                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side of split screen – you can add an image/illustration here later */}
            <div className="hidden md:block bg-white" />
        </div>
    );
}
