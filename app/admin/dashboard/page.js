"use client"
import { Truck, Users, FileText, DollarSign } from 'lucide-react';
import { StatCard } from '@/app/utils/StatCard';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Sidebar } from '@/app/components/dashboard/adminSideBar';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';
import Loader from '@/app/utils/Loader';
import { useAuthSession } from '@/app/utils/AuthenticateUser';

// --- Mock Data (included here for completeness, usually imported) ---
const monthlyData = [
    { month: 'Jan', income: 245000, expenses: 185000 },
    { month: 'Feb', income: 280000, expenses: 195000 },
    { month: 'Mar', income: 310000, expenses: 220000 },
    { month: 'Apr', income: 290000, expenses: 210000 },
    { month: 'May', income: 340000, expenses: 235000 },
    { month: 'Jun', income: 365000, expenses: 245000 },
];
const vehiclePerformance = [
    { truck: 'MH-12-AB-1234', trips: 45, income: 125000, expenses: 85000, profit: 40000 },
    { truck: 'MH-12-CD-5678', trips: 38, income: 98000, expenses: 72000, profit: 26000 },
    { truck: 'MH-12-EF-9012', trips: 42, income: 115000, expenses: 78000, profit: 37000 },
    { truck: 'MH-12-GH-3456', trips: 35, income: 92000, expenses: 68000, profit: 24000 },
    { truck: 'MH-12-IJ-7890', trips: 40, income: 108000, expenses: 74000, profit: 34000 },
];
const recentTrips = [
    { id: 1, truck: 'MH-12-AB-1234', from: 'Mumbai', to: 'Delhi', date: '2025-12-14', amount: 28000, status: 'Completed' },
    { id: 2, truck: 'MH-12-CD-5678', from: 'Pune', to: 'Bangalore', date: '2025-12-14', amount: 24000, status: 'In Transit' },
    { id: 3, truck: 'MH-12-EF-9012', from: 'Delhi', to: 'Kolkata', date: '2025-12-13', amount: 32000, status: 'Completed' },
    { id: 4, truck: 'MH-12-GH-3456', from: 'Chennai', to: 'Hyderabad', date: '2025-12-13', amount: 18000, status: 'Completed' },
    { id: 5, truck: 'MH-12-IJ-7890', from: 'Ahmedabad', to: 'Surat', date: '2025-12-12', amount: 12000, status: 'Completed' },
];
// --- End Mock Data ---

const AdminDashboard = () => {
    const { user, loading, isAuthenticated } = useAuthSession('/login');
    if (!isAuthenticated) {
        return <Loader />;
    }

    return (
        <div className='flex flex-col lg:flex-row w-full min-h-screen bg-neutral-50 relative'>
            {/* Sidebar should be common or adjust based on role prop */}
            <Sidebar role={"admin/dashboard"} />

            <main className="flex-1 px-4 md:px-8">
                <div className="p-8 space-y-6 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">Welcome back, <strong>{user.full_name}</strong>! Here's your <strong>{user.company}</strong> overview.</p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <StatCard title="Total Trucks" value="24" icon={Truck} trend={{ value: '8.5%', isPositive: true }} color="blue" />
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <StatCard title="Active Drivers" value="32" icon={Users} trend={{ value: '3.2%', isPositive: true }} color="green" />
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <StatCard title="Total Trips" value="348" icon={FileText} trend={{ value: '12.3%', isPositive: true }} color="orange" />
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <StatCard title="Monthly Profit" value="₹1,20,000" icon={DollarSign} trend={{ value: '15.7%', isPositive: true }} color="green" />
                        </motion.div>
                    </motion.div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Income vs Expenses Chart */}
                        <motion.div
                            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: '10px' }} />
                                    <Bar dataKey="income" fill="#3b82f6" name="Income" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* Profit Trend Chart */}
                        <motion.div
                            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profit Trend</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                                    <Tooltip formatter={(value, name, props) => {
                                        // Calculate profit (Income - Expenses)
                                        const profit = props.payload.income - props.payload.expenses;
                                        return [`₹${profit.toLocaleString()}`, 'Profit'];
                                    }} />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: '10px' }} />
                                    {/* Plotting Profit (Income - Expenses) as a calculated line */}
                                    <Line
                                        type="monotone"
                                        dataKey="profit"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        name="Profit"
                                        dot={{ fill: '#10b981', r: 4 }}
                                        activeDot={{ r: 8 }}
                                        // Custom Line Function to calculate profit on the fly
                                        data={monthlyData.map(d => ({ ...d, profit: d.income - d.expenses }))}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </div>

                    {/* Vehicle Performance Table */}
                    <motion.div
                        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Vehicle-wise Performance</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Truck Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total Trips</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Income</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Expenses</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Profit</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {vehiclePerformance.map((vehicle) => (
                                        <tr key={vehicle.truck} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{vehicle.truck}</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{vehicle.trips}</td>
                                            <td className="px-6 py-4 text-sm text-green-600">₹{vehicle.income.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-sm text-red-600">₹{vehicle.expenses.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{vehicle.profit.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Recent Trips Table */}
                    <motion.div
                        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Trips</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Truck</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Route</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recentTrips.map((trip) => (
                                        <tr key={trip.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-900">{trip.truck}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{trip.from} → {trip.to}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{trip.date}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">₹{trip.amount.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${trip.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                        }`}
                                                >
                                                    {trip.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;