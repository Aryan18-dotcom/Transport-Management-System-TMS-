"use client"
import { useRouter } from 'next/navigation';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import { requireAuth } from '../utils/auth';
import { useEffect, useState } from 'react';
import Loader from '../utils/Loader';
import { Sidebar } from '../components/dashboard/adminSideBar';

const DashboardPage = () => {
    const router = useRouter();
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const session = await requireAuth();
            
            if (!session.isAuthenticated) {
                router.push('/login');
            } else {
                setAuth(session);
            }
        };
        checkAuth();
    }, []);

    if (!auth) {
        return <Loader isLoading={true} message="Loading dashboard..." />;
    }

    const { role, user } = auth;

    // 2. Role-Based Rendering (Bifurcation)
    const renderDashboard = () => {
        switch (role) {
            case 'admin':
                // Pass the user data to the dashboard component if needed
                return <AdminDashboard user={user} />; 
            case 'employee':
                return <EmployeeDashboard user={user} />;
            default:
                // Handle unknown or restricted roles
                return (
                    <div className="p-8 text-center w-full">
                        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
                        <p className="mt-2 text-neutral-600">Your role ({role}) is not authorized for this dashboard view.</p>
                    </div>
                );
        }
    };

    return (
        // 
        <div className='flex flex-col md:flex-row w-full min-h-screen bg-neutral-50'>
            {/* Sidebar should be common or adjust based on role prop */}
            <Sidebar role={role} /> 
            
            <main className="flex-1 p-4 md:p-8">
                {renderDashboard()}
            </main>
        </div>
    );
}

export default DashboardPage;