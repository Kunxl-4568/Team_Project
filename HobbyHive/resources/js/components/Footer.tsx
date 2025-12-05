import React from "react";
import { FaFacebook, FaInstagram, FaTwitch } from "react-icons/fa";
import { Link } from "@inertiajs/react";
<<<<<<< HEAD
import React from "react";


=======
>>>>>>> 051c94f6a387df8ac2cefc8715cf796d3eca0417

export default function Footer() {
    return (
        <footer className="bg-yellow-500 px-4 md:px-16 lg:px-28 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2">
                
                <div className="mr-10">
                    <h2 className="font-hepta text-black text-lg mb-4 ml-19">Help Center</h2>
                    <ul>
                        <div className="grid grid-cols-2 md:grid-cols-2">
                            <Link href="/" className="hover:underline text-black font-hepta">Home</Link>
                            <li><a href="/about-us" className="hover:underline text-black font-hepta">About us</a></li>
                            <li><a href="/contact-us" className="hover:underline text-black font-hepta">Contact us</a></li>
                            <li><a href="/login" className="hover:underline text-black font-hepta">Login</a></li>
                        </div>
                    </ul>
                </div>

                <div className="ml-25">
                    <h2 className="font-hepta text-black text-lg mb-4 ml-19">Follow Us</h2>
                    <ul className="flex space-x-4">
                        <li className="flex items-center space-x-1">
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

            <div className="border border-t p-4 font-hepta text-black text-center mt-6">
                <p>© HobbyHive team. All rights Reserved</p>
            </div>
        </footer>
    );
}
