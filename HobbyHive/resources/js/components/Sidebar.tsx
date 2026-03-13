import { Transition } from "@headlessui/react";
import {Link, usePage} from "@inertiajs/react";

export default function Sidebar(){
    const {url} = usePage();

    const linkStyle = (path: string) => ({
        padding: "0.75rem 1rem",
        borderRadius: url.startsWith(path) ? "9999px" : "12px",
        fontWeight: 600,
        backgroundColor: url.startsWith(path) ? "white" : "transparent",
        color: url.startsWith(path) ? "black" : "#2c2c2c",
        textDecoration: "none",
        display: "block",
        marginBottom: "3.5rem",
        transition: "all 0.2s ease",
        
        marginRight: url.startsWith(path) ? "-50px" : "0px",
        paddingRight: url.startsWith(path) ? "40px" : "1rem",
        paddingLeft: "1rem",
        width: url.startsWith(path) ? "calc(100% + 23px)" : "100%",
        position: "relative",
        zIndex: 2,
        
        


    });

    return (
        <div
          style = {{
            width: "250px",
            backgroundColor: "#ffc300",
            height: "100vh",
            padding: "2rem 0 2rem 1rem",
            display: "flex",
            flexDirection: "column",
            overflow: "visible",
            position: "relative",
            zIndex: 3,
          }}
        >
            <img
              src="/images/HobbyHiveLogo.png"
              alt  = "Hobby Hive Logo"
              style = {{ 
                width: "210px",
                marginBottom: "3.5rem",
                objectFit: "contain",
                marginTop: "-1rem"
              }}
            />

            <Link href="/admin/dashboard" style ={linkStyle("/admin/dashboard")}>
            <div className="flex items-center gap-3">
                <img src="/icons/dashboard.svg" className="w-5 h-5"/>
                <span>DASHBOARD</span>
            </div>
            </Link>

            <Link href="/admin/users" style ={linkStyle("/admin/users")}>
            <div className="flex items-center gap-3">
                <img src="/icons/user.svg" className="w-5 h-5"/>
                <span>USERS</span>
            </div>
            </Link>

            <Link href="/admin/products" style ={linkStyle("/admin/products")}>
            <div className="flex items-center gap-3">
                <img src="/icons/palette.svg" className="w-5 h-5"/>
                <span>INVENTORY</span>
            </div>
            </Link>

            <Link href="/admin/orders" style ={linkStyle("/admin/orders")}>
            <div className="flex items-center gap-3">
                <img src="/icons/package.svg" className="w-5 h-5"/>
                <span>ORDERS</span>
            </div>
            </Link>

            <Link href="/admin/account" style ={linkStyle("/admin/account")}>
            <div className="flex items-center gap-3">
                <img src="/icons/account.svg" className="w-5 h-5"/>
                <span>ACCOUNT</span>
            </div>
            </Link>

        </div>
    );
}