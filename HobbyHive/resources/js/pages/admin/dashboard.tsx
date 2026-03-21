import AdminLayout from "../../layouts/Admin/AdminLayout";
import DashboardGraph from "@/components/ui/DashboardGraph";

export default function Dashboard() {
    const dashboard = {
        totalOrders: 55,
        totalUsers: 45,
        totalSales: 600,
        totalProducts: 43,


    }
    return (
        <div className="bg-[#F4F3EF]">
        <AdminLayout title="Dashboard">

            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-[#fefaf1] rounded-xl border flex flex-col items-center transition-transform duration-300 hover:scale-110">
                    <img src="/icons/users.svg" className="w-20 h-20 mb-5"/>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-3xl font-semibold text-[#2c2c2c]">{dashboard.totalUsers}</p>
                </div>

                <div className="p-6 bg-[#fefaf1] rounded-xl border flex flex-col items-center transition-transform duration-300 hover:scale-110">
                    <img src="/icons/cart.svg" className="w-20 h-20 mb-5"/>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-3xl font-semibold text-[#2c2c2c]">{dashboard.totalOrders}</p>
                </div>

                <div className="p-6 bg-[#fefaf1] rounded-xl border flex flex-col items-center transition-transform duration-300 hover:scale-110">
                    <img src="/icons/£.svg" className="w-20 h-20 mb-5"/>
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <p className="text-3xl font-semibold text-[#2c2c2c]">{dashboard.totalSales}</p>
                </div>

                <div className="p-6 bg-[#fefaf1] rounded-xl border flex flex-col items-center transition-transform duration-300 hover:scale-110">
                    <img src="/icons/palette2.svg" className="w-20 h-20 mb-5"/>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-3xl font-semibold text-[#2c2c2c]">{dashboard.totalProducts}</p>
                </div>

            </div>
            <div className="flex justify-center mb-8 transition-transform duration-300 hover:scale-105">
            <DashboardGraph/>
            </div>


        </AdminLayout>
        </div>
    );
}
