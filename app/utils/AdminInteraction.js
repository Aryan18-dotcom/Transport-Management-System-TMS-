import {
  Car,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export const AdminInteraction = () => (
  <div className="flex flex-col h-full bg-neutral-100/50 rounded-xl p-4 space-y-3 justify-center">
    <h4 className="text-sm font-semibold text-neutral-800 flex items-center">
      Live Vehicle Status
      <motion.div
        className="ml-2 size-2 bg-green-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </h4>
    <div className="flex space-x-4">
      {/* Truck 1 */}
      <motion.div
        className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm w-1/3"
        whileHover={{ translateY: -4 }}
      >
        <Car size={24} className="text-blue-500" />
        <span className="text-xs font-medium mt-1">Truck #A</span>
        <span className="text-[10px] text-green-600">Active</span>
      </motion.div>
      {/* Driver/Employee Circle Animation */}
      <div className="flex flex-col items-center p-3 w-1/3 justify-center">
        <motion.div
          className="size-10 bg-neutral-900 rounded-full flex items-center justify-center text-white shadow-lg relative"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Users size={20} className="absolute inset-0 m-auto" />
          {/* Employee Dot 1 */}
          <div className="absolute -top-1 -right-1 size-3 bg-yellow-400 rounded-full border-2 border-neutral-900" />
          {/* Employee Dot 2 (for rotation illusion) */}
          <div className="absolute -bottom-1 -left-1 size-3 bg-red-400 rounded-full border-2 border-neutral-900" />
        </motion.div>
        <p className="text-[10px] text-neutral-600 mt-1">360° View</p>
      </div>
       {/* Truck 2 (Skeleton) */}
      <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm w-1/3">
        <div className="size-6 bg-neutral-200 rounded-full" />
        <div className="h-2 w-8 bg-neutral-200 mt-2 rounded" />
        <div className="h-2 w-10 bg-neutral-300 mt-1 rounded" />
      </div>
    </div>
  </div>
);