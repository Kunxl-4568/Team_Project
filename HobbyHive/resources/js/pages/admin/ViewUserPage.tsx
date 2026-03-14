import AdminLayout from "../../layouts/Admin/AdminLayout";
import {useState} from "react";

export default function ViewUserPage({id}: any){
    const users = [
        {
            id: "#1234",
            name: "sarah jones",
            email: "sarahjones@gmail.com",
            date: "13/11/25",
            status: "Active",
            phone: "07876457848",
            address: "12 cherry tree drive B34"
        },
        {
            id:"#2377",
            name: "jo",
            email: "jo@gmail.com",
            date: "15/6/26",
            status: "Inactive"
        },
        {
            id:"#2377",
            name: "jo",
            email: "jo@gmail.com",
            date: "15/6/26",
            status: "Inactive"
        }
    ];
    
    const data = users.find(u => u.id === `#${id}`);
    const [status, setStatus] = useState(data?.status);
    const [name, setName] = useState(data?.name);
    const [email, setEmail] = useState(data?.email);
    const [phone, setPhone] = useState(data?.phone);
    const [address, setAddress] = useState(data?.address);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 3000);
    };

    return (
        <AdminLayout title="View Users">
            <div className="">
                <h2 className="text-2xl text-[#2c2c2c] mb-5">
                    <strong>ID: </strong>{data?.id},
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-8">
                    
                    <div className="flex justify-center gap-4 p-6 bg-[#fefaf1] rounded-full border items-center transition-transform duration-300 ">
                        <p className = "text-[#2c2c2c]"><strong>Name: </strong></p>
                        <input 
                           type='name' 
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className ='py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c] text-center'
                           required
                           />
                    </div>

                    <div className="flex justify-center gap-4 p-6 bg-[#fefaf1] rounded-full border items-center transition-transform duration-300 ">
                        <p className = "text-[#2c2c2c]"><strong>Email: </strong></p>
                        <input 
                           type='email' 
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className ='py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c] text-center'
                           required
                           />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-[#fefaf1] rounded-full border flex flex-col items-center transition-transform duration-300 ">
                       <p className="text-[#2c2c2c]"><strong>Date Joined: </strong>{data?.date}</p>
                    </div>
                    
                    <button
                    onClick={() => setStatus(status === "Active" ? "Inactive" : "Active")}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                        >
                            {status}
                            </button>


                </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex justify-center gap-4 p-6 bg-[#fefaf1] rounded-full border items-center transition-transform duration-300 ">
                <p className = "text-[#2c2c2c]"><strong>Phone: </strong></p>
                 <input 
                type='number' 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className ='py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c] text-center'
                required
                />
                </div>

                <div className="flex justify-center gap-4  p-6 bg-[#fefaf1] rounded-full border items-center">
                <p className = "text-[#2c2c2c]"><strong>Address: </strong></p>
                 <input 
                type='text' 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className ='py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c] text-center'
                required
                />
                </div>

            </div>

            {saved && (
                <div className="fixed top-24 right-4 z-50 animate-slide-in">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                            <p className="font-semibold">Success!</p>
                            <p className="text-sm">Changes saved successfully.</p>
                        </div>
                        <button
                            onClick={() => setSaved(false)}
                            className="ml-4 text-white hover:text-gray-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            
            <div className= "flex justify-center gap-4 mt-6">

                <button
          onClick={() => history.back()}
          className="w-12 h-12 flex flex items-center justify-center bg-[#ffc300]  rounded-full text-[#2c2c2c] mt-3"
        >
          <img src="/icons/back.svg" className="w-7 h-6"/>
        </button>

        <button
        onClick={handleSave}
          className=" px-6 py-2 bg-[#ffc300] text-[#2c2c2c] rounded-full mt-3"
          >
            Save Changes
          </button>

          </div>
        
 

            
        </AdminLayout>
    )
}