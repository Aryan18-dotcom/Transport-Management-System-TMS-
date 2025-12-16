import React from 'react'
import { Sidebar } from '@/app/components/dashboard/adminSideBar'
import { useAuthSession } from '@/app/utils/AuthenticateUser';
import Loader from '@/app/utils/Loader';

const Trips = () => {
  const { user, loading, isAuthenticated } = useAuthSession('/login');
  if (!isAuthenticated) {
    return <Loader />;
  }
  return (
    <div className='flex flex-col lg:flex-row w-full min-h-screen bg-neutral-50 relative'>
      <Sidebar role={"admin/trips"} />
    </div>
  )
}

export default Trips