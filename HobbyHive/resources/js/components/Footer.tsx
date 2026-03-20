import React from "react";
import { FaFacebook, FaInstagram, FaTwitch } from "react-icons/fa";
import { Link } from "@inertiajs/react";



export default function Footer() {
    return (
      <footer className="bg-[#FFC300] px-4 md:px-8 lg:px-12 py-6 mt-6 rounded">
    <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto text-center">
                
                <div className="mx-auto">
                    <h2 className="font-hepta text-black text-lg mb-4">Help Center</h2>
                    <ul>
                        <div className="grid grid-cols-2 md:grid-cols-2">
                            <Link href="/" className="hover:underline text-black font-hepta">Home</Link>
                            <li><a href="/about-us" className="hover:underline text-black font-hepta">About us</a></li>
                            <li><a href="/contact-us" className="hover:underline text-black font-hepta">Contact us</a></li>
                            <li><a href="/login" className="hover:underline text-black font-hepta">Login</a></li>
                        </div>
                    </ul>
                </div>

                <div className="mx-auto ">
                    <h2 className="font-slab text-black text-lg ">Follow Us</h2>
                    <ul className="flex space-x-4">
                        <li className="flex items-center space-x-1 ">
                            <FaFacebook />
                            <a href="#" className="hover:underline text-black font-hepta">Facebook</a>
                        </li>
                        <li className="flex items-center space-x-1">
                            <FaTwitch />
                            <a href="#" className="hover:underline text-black font-hepta">Twitch</a>
                        </li>
                        <li className="flex items-center space-x-1">
                            <FaInstagram />
                            <a href="#" className="hover:underline text-black font-hepta">Instagram</a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="border border-t p-4 font-hepta text-black text-center mt-6 rounded">
                <p>© HobbyHive team. All rights Reserved</p>
            </div>
        </footer>
    );
}