import Sidebar from "@/components/Sidebar";
import { PropsWithChildren, useState} from "react";

export default function AdminLayout({children, title}: PropsWithChildren & {title: String}){
    const [openMenu, setOpenMenu] = useState(false);
    const [userView, setUserView] = useState(false);
    return (

        <div style={{ display: "flex", height: "100vh", width: "100%", backgroundColor: "white", overflow: "visible", position:"relative", }}>

        <Sidebar/>
        

        <div style={{flex: 1, display: "flex", flexDirection:"column"}}>

            <div 
              style ={{
                height:"70px",
                borderBottom: "1px solid #e5e5e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1.5rem",
                backgroundColor: "white",
                overflow: "visible",
                position: "relative",
              }}
            >

              <div style={{fontWeight: 600, fontSize: "1.2rem", color: "#2c2c2c"}}>{title}</div>



            <div className="relative flex items-center gap-3">
                <input
               type="text"
               placeholder="Search..."
               style={{
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "250px",
                color: "#2c2c2c",
               }}
            />
                {/**<img src="/icons/AccountIcon.svg" className="w-8 h-8"/> {/**allow for pfp */}
                <button onClick={() =>  setOpenMenu(!openMenu)}>
                    <img src="/icons/dropdown.svg" className="w-8 h-8"/>
                </button>

                {openMenu && (
                    <div className="absolute right-0 top-full mt-2 w-70 bg-white shadow-lg rounded-md border z-50">
                        <div className ="flex items-center justify-between px-4 py-4 hover:bg-gray-100 text-[#2c2c2c]">
                            <span>Switch to user view</span>
                            <button 
                              onClick={() => {
                                setUserView(!userView);
                                window.location.href = "/";
                              }}
                              className={`w-12 h-6 flex items-center rounded-full transition ${
                                   userView ? "bg-[#ffc300]" : "bg-gray-300"
                              }`}
                            >
                                <div 
                                  className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                                    userView ? "translate-x-6" : "translate-x-1"
                                  }`}   
                                /> 
                            </button>
                        </div>

                        <button 
                        onClick={() => {
                            window.location.href = "/";
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[#2c2c2c]">
                            Log out
                        </button>
                       </div> 
                )}


            </div>
            
            </div>

            <div style ={{padding: "2rem", overflowY:"auto"}}>
                {children}
            </div>

        </div>

        </div>
        
    );
}


