import { Sidebar } from '@/app/components/dashboard/adminSideBar'
import { useAuthSession } from '@/app/utils/AuthenticateUser';
import Loader from '@/app/utils/Loader';
import React from 'react'

const CreateEmployee = () => {
  const { user, loading, isAuthenticated } = useAuthSession('/login');
  if (!isAuthenticated) {
    return <Loader />;
  }
  return (
    <div className='flex flex-col lg:flex-row w-full min-h-screen bg-neutral-50 relative'>
      <Sidebar role={"admin/createEmployee"} />
      <div className='w-full h-[200vh] bg-red-400'>
        a
      </div>
    </div>
  )
}

export default CreateEmployee