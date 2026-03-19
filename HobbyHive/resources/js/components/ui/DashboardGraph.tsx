"use client";

import {
    LineChart,
    ResponsiveContainer,
    Line,
    YAxis,
    XAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const data = [
    {month: "Jan", sales: 12},
    {month: "Feb", sales: 78},
    {month: "Mar", sales: 90},
    {month: "Apr", sales: 345},
    {month: "May", sales: 213},
    {month: "Jun", sales: 456},
    {month: "Jul", sales: 123},
    {month: "Aug", sales:456},
    {month: "Sep", sales: 678},
    {month: "Oct", sales: 123},
    {month: "Nov", sales:456},
    //{month: "Dec", sales: 987},
];

export default function DashboardGraph() {
    return(
        <div className="bg-[#fefaf1] p-6 rounded-xl border w-2/3">
            <h2 className="text-lg font-semibold b-4 text-[#2c2c2c] mb-4">
                Sales Overview
            </h2>

            <ResponsiveContainer width="100%" height={200}>
                <LineChart data = {data}>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#ffc300"
                      strokeWidth={3}
                      dot={{r: 4}}
                    />
                </LineChart>
            </ResponsiveContainer>


        </div>
    )
}