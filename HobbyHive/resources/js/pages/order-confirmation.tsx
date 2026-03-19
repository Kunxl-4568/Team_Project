import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Header } from "@/components/Header";
import { Link, usePage } from "@inertiajs/react";

function OrderConfirmation() {
    const [bannerVisible] = useState(true);
    const fixedHeight = 80;
    const fixedRef = useRef<HTMLDivElement>(null);

    const { auth } = usePage().props as any;
    const email = auth?.user?.email ?? "No email available";

    const basket: number[] = [];

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col">
                <div className="w-full flex justify-center">
                    <div className="w-full px-4 md:px-8 lg:px-12">
                        <Header basket={basket} />
                    </div>
                </div>

                <div className="flex justify-center w-full mt-2">
                    <div className="w-full px-4 md:px-8 lg:px-12 mx-auto mt-2">
                        <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} />
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center mb-6 mt-6">
                <div className="bg-white p-4 sm:p-8 rounded-lg w-full max-w-md shadow sm:mt-[12rem] mt-[6rem] ml-4 sm:ml-9">
                    <div className="flex flex-col items-center">
                        <img src="/icons/tick.svg" alt="Order confirmed" className="w-20 h-20 mb-5" />
                        <h1 className="text-xl sm:text-3xl font-semibold sm:mb-3 mb-4 text-[#2c2c2c]">
                            Order Confirmation
                        </h1>
                    </div>

                    <hr className="border-t border-[#2c2c2c] mb-3" />

                    <p className="text-[#2c2c2c]">Thank you!</p>
                    <p className="text-[#2c2c2c] mt-3">A confirmation email has been sent to</p>
                    <p className="text-[#2c2c2c] font-semibold">{email}</p>

                    <ul className="list-disc ml-5 mt-3 mb-5">
                        <li className="text-gray-400">
                            If you're not receiving our emails, please check whether they were filtered
                            into your spam or junk folder.
                        </li>
                    </ul>

                    <Link
                        href="/products"
                        className="bg-[#ffc300] text-[#2c2c2c] px-4 py-2 rounded hover:underline w-full block text-center"
                    >
                        CONTINUE SHOPPING
                    </Link>

                    <div className="bg-white shadow rounded-lg w-full max-w-md mx-auto mt-5 p-4 pb-6">
                        <div className="flex flex-col items-center">
                            <p className="font-semibold sm:mb-8 mb-4 text-[#2c2c2c] mt-3">
                                Need Help with Your Order?
                            </p>
                            <p className="text-gray-400 text-sm text-center">
                                Our support team is here to help you with any queries!
                            </p>
                        </div>

                        <Link
                            href="/contact-us"
                            className="bg-white shadow text-[#2c2c2c] px-4 py-2 rounded hover:underline block mx-auto w-fit mt-4"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;