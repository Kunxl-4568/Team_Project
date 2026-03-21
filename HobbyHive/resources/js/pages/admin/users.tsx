import AdminLayout from "../../layouts/Admin/AdminLayout";
import { PropsWithChildren, useState} from "react";
import {router} from "@inertiajs/react";

export default function Users() {
    const [openRow, setOpenRow] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const users = [
        {
            id: "#1234",
            name: "sarah jones",
            email: "sarahjones@gmail.com",
            date: "13/11/25",
            status: "Active"
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

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.id.toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
               statusFilter === "All" || user.status === statusFilter;
            
            return matchesSearch && matchesStatus;
    });


    return (
        <AdminLayout title="Users">
            <p className="text-[#2c2c2c] mb-8">{filteredUsers.length} users found</p>
            
            <div className = "text-[#2c2c2c] mb-8 flex gap-2">
                <input
                   type="text"
                   placeholder = "Search by ID, customer or email"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="border border-gray-300 rounded-lg px-3 py-2 w-72 text-sm outline-none focus:border-[#2c2c2c]"
                />

                <select
                   value={statusFilter}
                   onChange={(e) => setStatusFilter(e.target.value)}
                   className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2c2c2c]"
                >
                    <option value="All">All statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>

                </select>   

            </div>

            <div className = "bg-white rounded-xl overflow-hidden ">
                <table className = "w-full border-collapse">
                    <thead>
                        <tr className = "bg-[#fefaf1] text-left">
                            <th className = "p-4 font-semibold text-[#2c2c2c]">ID</th>
                            <th className = "p-4 font-semibold text-[#2c2c2c]">Name</th>
                            <th className = "p-4 font-semibold text-[#2c2c2c]">Email</th>
                            <th className = "p-4 font-semibold text-[#2c2c2c]">Date</th>
                            <th className = "p-4 font-semibold text-[#2c2c2c]">Status</th>
                            <th className = "p-4 font-semibold text-[#2c2c2c]">Action</th>
                        </tr>
                    </thead>

            <tbody>
                {filteredUsers.map((user, index) => (
                    <tr key={index} className="border-b last:border-none border-[#e8e3e3] transition-transform ">
                    <td className="p-4 text-[#2c2c2c]">{user.id}</td>
                    <td className="p-4 text-[#2c2c2c]">{user.name}</td>
                    <td className="p-4 text-[#2c2c2c]">{user.email}</td>
                    <td className="p-4 text-[#2c2c2c]">{user.date}</td>
                    <td className="p-4 text-[#2c2c2c]">
                  
                  <td className="p-4">
                    <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                       }`}
                    >
                       {user.status}
                    </span>  
                  </td>          
                        
                </td>
                <td className = "p-4 cursor-pointer text-[#2c2c2c] text-center rounded-full">
                    <button
                      onClick={() => setOpenRow(openRow === index ? null : index)}
                      className = "cursor-pointer"
                    >
                        <img src="/icons/dropdown.svg" className="w-8 h-8"/>
                    </button>

                    {openRow === index && (
                        <div className="absolute right-4 mt-2 w-32 bg-white shadow-lg z-10">
                            <button 
                            onClick={() => router.visit(`/admin/users/${user.id.replace('#', '')}`)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100">VIEW</button>

                            <button 
                            onClick={() => console.log("Delete clicked:", user.id)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100">DELETE</button>
                        </div>
                    )}
                </td>
              </tr>
                ))}
            </tbody>

            </table>
            </div>

        </AdminLayout>
    );
}
