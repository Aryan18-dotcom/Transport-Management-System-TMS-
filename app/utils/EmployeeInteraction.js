import { motion } from "framer-motion";

export const EmployeeInteraction = () => (
  <div className="flex flex-col h-full bg-neutral-100/50 rounded-xl p-4 justify-center items-center space-y-3">
    <div className="flex items-center space-x-3">
      {/* User 1 (Admin) */}
      <motion.div
        className="size-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 10 }}
      >
        A
      </motion.div>
      {/* User 2 (Driver) */}
      <motion.div
        className="size-10 bg-yellow-500 rounded-full flex items-center justify-center text-neutral-900 font-bold"
        whileHover={{ rotate: 15 }}
      >
        D
      </motion.div>
      {/* User 3 (Clerk) */}
      <div className="size-8 bg-neutral-300 rounded-full flex items-center justify-center text-neutral-600 font-bold">
        C
      </div>
    </div>
    <div className="w-full text-center">
      <div className="h-2 w-3/4 mx-auto bg-neutral-300 rounded" />
      <motion.div
        className="h-2 w-1/2 mx-auto bg-blue-400 mt-1 rounded"
        animate={{ width: ["50%", "70%", "50%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <p className="text-[10px] text-neutral-600 mt-2">Permission Hierarchy</p>
    </div>
  </div>
);