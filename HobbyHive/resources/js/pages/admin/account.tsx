import AdminLayout from "../../layouts/Admin/AdminLayout";
import {useState} from "react";

export default function Account({id}: any) {
    const adminUsers = [
        {
            id: "#1234",
            name: "sarah",
            email: "sarah@gmail.com",
        }
    ];

    const data = adminUsers.find(a => a.id === `#${id}`) || adminUsers[0];
    const [email, setEmail] = useState(data.email);
    const [name, setName] = useState(data.name);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 3000);
    };


    return (
        <AdminLayout title="Account Settings">
            <div className="w-full">

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

                <div className="p-6 bg-[#fefaf1] rounded-xl border flex flex-col w-full">
                    <h2 className="text-[#2c2c2c] text-lg font-semibold mb-3">Profile Information</h2>
                    <hr className="border-t border-[#2c2c2c] mb-3"/>


                    <div className="flex flex-col gap-3  rounded-lg p-4">

                        <div className="flex items-center">
                            <p className="text-[#2c2c2c] font-semibold min-w-[140px]">Admin Name</p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-[300px] py-2 outline-none bg-transparent 
                                           focus:border-[#2c2c2c] text-[#2c2c2c] text-center outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c]"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <p className="text-[#2c2c2c] font-semibold min-w-[140px]">Email Address</p>
                            <input
                                type='email' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-[300px] py-2 outline-none bg-transparent 
                                           focus:border-[#2c2c2c] text-[#2c2c2c] text-center outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c]"
                                required
                            />
                        </div>

                        <button 
                        onClick={handleSave} 
                        className="bg-[#2c2c2c] text-white py-2 w-60 rounded ml-[140px]">
                            SAVE CHANGE
                        </button>

                    </div>
                </div>


                <div className="p-6 bg-[#fefaf1] rounded-xl border flex flex-col w-full mt-5">
    <h2 className="text-[#2c2c2c] text-lg font-semibold mb-3">Change Password</h2>
    <hr className="border-t border-[#2c2c2c] mb-8"/>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="border border-[#2c2c2c] bg-white rounded-lg p-4">
            <div className="grid grid-cols-[140px_1fr] gap-y-4 items-center">

                <p className="col-span-2 text-[#2c2c2c]">
                    First Login - Please set your new password
                </p>

                <p className="text-[#2c2c2c] font-semibold">New Password</p>
                <input
                    type="password"
                    placeholder="NEW PASSWORD"
                    className="w-[250px] py-2 text-center border-b border-gray-400 bg-transparent outline-none focus:border-[#2c2c2c] text-[#2c2c2c]"
                    required
                />

                <p className="text-[#2c2c2c] font-semibold">Confirm New Password</p>
                <input
                    type="password"
                    placeholder="CONFIRM PASSWORD"
                    className="w-[250px] py-2 text-center border-b border-gray-400 bg-transparent outline-none focus:border-[#2c2c2c] text-[#2c2c2c]"
                    required
                />

                <p className="col-span-2 text-[#2c2c2c] italic">
                    * Password must be 8 characters long
                </p>

                
                <div className = "col-span-2 flex justify-center">
                <button
                onClick={handleSave} 
                className="bg-[#2c2c2c] text-white py-2 w-60 rounded">
                    CHANGE PASSWORD
                </button>
                </div>
            </div>
        </div>

        <div className="border border-[#2c2c2c] bg-[#fff1c4] rounded-lg p-4 h-50">
            <h3 className="text-[#2c2c2c] font-semibold mb-2">Password Tips</h3>
            <hr className="border-t border-[#2c2c2c] mb-3"/>

            <ul className="text-[#2c2c2c] space-y-2 text-sm">
                <li>• Use at least 8 characters</li>
                <li>• Mix upper and lower case letters</li>
                <li>• Include numbers and symbols</li>
            </ul>
        </div>

    </div>
</div>

            </div>
        </AdminLayout>
    );
}