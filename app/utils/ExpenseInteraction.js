import { motion } from "framer-motion";

export const ExpenseInteraction = () => (
  <div className="flex flex-col h-full bg-neutral-100/50 rounded-xl p-4 justify-center space-y-2">
    <h4 className="text-xs font-semibold text-neutral-800">Recent Bills</h4>
    {/* Bill 1 (Fuel) */}
    <motion.div
      className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm border-l-4 border-red-500"
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <span className="text-xs font-medium">Fuel Refill</span>
      <span className="text-sm font-bold text-red-600">-$750</span>
    </motion.div>
    {/* Bill 2 (Toll) */}
    <motion.div
      className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm border-l-4 border-yellow-500"
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <span className="text-xs font-medium">Highway Toll</span>
      <span className="text-sm font-bold text-yellow-600">-$25</span>
    </motion.div>
    {/* Bill 3 (Repair) Skeleton */}
    <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
        <div className="h-3 w-1/3 bg-neutral-200 rounded" />
        <div className="h-3 w-1/4 bg-neutral-300 rounded" />
    </div>
  </div>
);