import { useAuthSession } from "@/app/utils/AuthenticateUser";
import { Sidebar } from "../../components/dashboard/adminSideBar"
import Loader from "@/app/utils/Loader";

const Documents = () => {
  const { user, loading, isAuthenticated } = useAuthSession('/login');
  if (!isAuthenticated) {
    return <Loader />;
  }
  return (
    <div className='flex flex-col lg:flex-row w-full min-h-screen bg-neutral-50 relative'>
      <Sidebar role={"admin/documents"} />
    </div>
  )
}

export default Documents