import { motion } from "framer-motion";

export const ProfitInteraction = () => (
  <div className="flex flex-col h-full bg-neutral-100/50 rounded-xl p-4 space-y-4">
    <h4 className="text-sm font-semibold text-neutral-800">
      Truck Profitability Overview
    </h4>
    <div className="flex items-end h-24">
      {/* Bar 1: High Profit */}
      <motion.div
        className="flex flex-col items-center mx-2"
        initial={{ height: "0%" }}
        animate={{ height: "70%" }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="text-[10px] text-green-600 font-bold mb-1">$5.2K</span>
        <div className="w-8 bg-green-500 rounded-t-lg h-full" />
        <span className="text-xs mt-1 text-neutral-500">T-01</span>
      </motion.div>

      {/* Bar 2: Medium Profit */}
      <motion.div
        className="flex flex-col items-center mx-2"
        initial={{ height: "0%" }}
        animate={{ height: "45%" }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <span className="text-[10px] text-blue-600 font-bold mb-1">$2.8K</span>
        <div className="w-8 bg-blue-500 rounded-t-lg h-full" />
        <span className="text-xs mt-1 text-neutral-500">T-07</span>
      </motion.div>

      {/* Bar 3: Low/Negative Profit */}
      <motion.div
        className="flex flex-col items-center mx-2"
        initial={{ height: "0%" }}
        animate={{ height: "20%" }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <span className="text-[10px] text-red-600 font-bold mb-1">$0.9K</span>
        <div className="w-8 bg-red-500 rounded-t-lg h-full" />
        <span className="text-xs mt-1 text-neutral-500">T-12</span>
      </motion.div>
    </div>
  </div>
);