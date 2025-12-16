"use client"
import { Truck, FileText, DollarSign, TrendingDown, LayoutDashboard } from 'lucide-react';
import React from 'react'; // Ensure React is imported for functional component
import { StatCard } from '../utils/StatCard';

const recentTrips = [
  { id: 1, truck: 'MH-12-AB-1234', from: 'Mumbai', to: 'Delhi', date: '2025-12-14', amount: 28000, status: 'Completed' },
  { id: 2, truck: 'MH-12-CD-5678', from: 'Pune', to: 'Bangalore', date: '2025-12-14', amount: 24000, status: 'In Transit' },
  { id: 3, truck: 'MH-12-EF-9012', from: 'Delhi', to: 'Kolkata', date: '2025-12-13', amount: 32000, status: 'Completed' },
  { id: 4, truck: 'MH-12-GH-3456', from: 'Chennai', to: 'Hyderabad', date: '2025-12-13', amount: 18000, status: 'Completed' },
  { id: 5, truck: 'MH-12-IJ-7890', from: 'Ahmedabad', to: 'Surat', date: '2025-12-12', amount: 12000, status: 'Completed' },
];

const EmployeeDashboard = () => {

  // Employee Dashboard
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center">
                <LayoutDashboard className="w-6 h-6 mr-3 text-blue-600"/> Employee Dashboard
            </h1>
            <p className="text-gray-600">Quick access to your daily tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title="Today's Trips"
          value="8"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Assigned Trucks"
          value="4"
          icon={Truck}
          color="green"
        />
        <StatCard
          title="Pending Documents"
          value="5"
          icon={TrendingDown}
          color="orange"
        />
         <StatCard
          title="Fuel Card Balance"
          value="₹ 15,000"
          icon={DollarSign}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
        <h2 className="text-lg text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <div className="text-gray-900 mb-1 font-medium">Start New Trip</div>
            <div className="text-sm text-gray-600">Initiate trip checklist</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <div className="text-gray-900 mb-1 font-medium">Upload Receipt</div>
            <div className="text-sm text-gray-600">Add fuel or toll bill</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-border-red-500 hover:bg-red-50 transition-colors text-left">
            <div className="text-gray-900 mb-1 font-medium">Report Issue</div>
            <div className="text-sm text-gray-600">Log truck maintenance ticket</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors text-left">
            <div className="text-gray-900 mb-1 font-medium">View Paystub</div>
            <div className="text-sm text-gray-600">Check latest salary statement</div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg text-gray-900">Recent Activity / Assigned Trips</h2>
        </div>
        <div className="p-6 space-y-4">
          {recentTrips.slice(0, 5).map((trip) => (
            <div key={trip.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 rounded-md transition-colors">
              <div>
                <div className="text-sm text-gray-900 font-medium">Trip ID: {trip.id} | {trip.truck}</div>
                <div className="text-xs text-gray-500">
                  {trip.from} → {trip.to}
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                    {trip.status}
                </div>
                <div className="text-xs text-gray-500 mt-1">{trip.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;