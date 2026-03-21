import AdminLayout from "../../layouts/Admin/AdminLayout";
import { useState } from "react";
import {router} from "@inertiajs/react";

export default function Orders() {
    const [openRow, setOpenRow] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const orders = [
        {
            id: "#1234",
            customer: "sarah jones",
            email: "@sarag@gmail.com",
            date: "13/11/25",
            total: "£43",
            status: "Pending",
        },
        {
            id: "#5678",
            customer: "jo",
            email: "jo@gmail.com",
            date: "13/11/25",
            total:"£54",
            status:"Completed",
        },
        {
            id: "#7654",
            customer: "hi",
            email:"hi@gmail.com",
            date: "13/10/2026",
            total: "£54",
            status: "Incomplete",
        },
        {
            id: "#7654",
            customer: "hi",
            email:"hi@gmail.com",
            date: "13/10/2026",
            total: "£54",
            status: "Incomplete",
        }
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.customer.toLowerCase().includes(search.toLowerCase()) ||
            order.email.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
               statusFilter === "All" || order.status === statusFilter;
            
            return matchesSearch && matchesStatus;
    });


    return (
        <AdminLayout title="Orders">
            <p className="text-[#2c2c2c] mb-8">{filteredOrders.length} orders found</p>

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
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Incomplete">Incomplete</option>

                </select>   

            </div>

            <div className="bg-white rounded-xl overflow-visible">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#fefaf1] text-left">
                            <th className="p-4 font-semibold text-[#2c2c2c]">ID</th>
                            <th className="p-4 font-semibold text-[#2c2c2c]">Customer</th>
                            <th className="p-4 font-semibold text-[#2c2c2c]">Email</th>
                            <th className="p-4 font-semibold text-[#2c2c2c]">Date</th>
                            <th className="p-4 font-semibold text-[#2c2c2c]">Total</th>
                            <th className="p-4 font-semibold text-[#2c2c2c]">Satus</th>
                            <th className="p-4 font-semibold text-[#2c2c2c]">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr 
                            key={index} 
                            className="hover:bg-transparent">
                                
                                <td className="p-4 text-[#2c2c2c]">{order.id}</td>
                                <td className="p-4 text-[#2c2c2c]">{order.customer}</td>
                                <td className="p-4 text-[#2c2c2c]">{order.email}</td>
                                <td className="p-4 text-[#2c2c2c]">{order.date}</td>
                                <td className="p-4 text-[#2c2c2c]">{order.total}</td>
                                
                                <td className="p-4">
                                    <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        order.status === "Completed"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                    >
                                        {order.status}
                                        </span>
                                        </td>
                                        
                                        <td className="p-4 text-center relative">
                                            <div className="relative inline-block">
                                            <button
                                            onClick={() => setOpenRow(openRow === index ? null : index)}
                                            className = "cursor-pointer"
                                            >
                                                <img src="/icons/dropdown.svg" className="w-8 h-8"/>
                                                </button> 
                                                
                                                {openRow === index && (
                                                    <div className="absolute right-4 mt-2 w-32 bg-white shadow-lg rounded-md border z-10">
                                                        <button 
                                                        onClick={() => router.visit(`/admin/orders/${order.id.replace('#', '')}`)}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[#2c2c2c]">VIEW</button>
                                                        <button 
                                                        onClick={() => console.log("Delete clicked:", order.id)}
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[#2c2c2c]">DELETE</button>
                                                    </div>
                                                )}
                                                </div>
                                                </td>
                                                </tr>
                        ))}
                                                </tbody> 
                                                </table>
</div>
            
        </AdminLayout>
    );
}