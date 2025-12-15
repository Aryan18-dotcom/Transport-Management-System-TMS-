"use client";

import {
  Car,
  DollarSign,
  Users,
  BarChart2,
  Lock,
  ArrowRight,
  Route,
  Activity,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { AdminInteraction } from "@/app/utils/AdminInteraction";
import { EmployeeInteraction } from "@/app/utils/EmployeeInteraction";
import { ExpenseInteraction } from "@/app/utils/ExpenseInteraction";
import { ProfitInteraction } from "@/app/utils/ProfitInteraction";

// --- Feature Data (Bento Grid Items) ---
const bentoItems = [
  {
    id: 1,
    title: "Admin Dashboard",
    description:
      "Full control over trucks, drivers, employees, trips, income, expenses, and profitability.",
    icon: Lock,
    size: "large", // Spans 2 columns on medium screens
    interaction: <AdminInteraction />,
  },
  {
    id: 2,
    title: "Employee Access",
    description:
      "Employees can add trips, bills, vehicle data, and documents based on roles.",
    icon: Users,
    size: "small", // Standard 1 column
    interaction: <EmployeeInteraction />,
  },
  {
    id: 3,
    title: "Expense Tracking",
    description:
      "Fuel, repairs, tyres, tolls — every cost linked precisely to a vehicle or trip.",
    icon: DollarSign,
    size: "small", // Standard 1 column
    interaction: <ExpenseInteraction />,
  },
  {
    id: 4,
    title: "Profit Analytics",
    description:
      "See how much each truck and driver earns vs spends, understanding true profitability.",
    icon: BarChart2,
    size: "large", // Spans 2 columns on medium screens
    interaction: <ProfitInteraction />,
  },
];


// --- Individual Bento Card Component (Remains largely the same) ---
const BentoCard = ({ item, index }) => {
  const isLarge = item.size === "large";

  // Animation variants for staggered entry
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={`
        rounded-3xl h-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300
        flex flex-col p-6 border border-neutral-100
        ${isLarge ? "md:col-span-2 md:row-span-1" : "md:col-span-1"}
      `}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
    >
      {/* Top Section: Title and Icon */}
      <div className="flex items-start justify-between">
        <div className="size-10 bg-blue-50 flex items-center justify-center rounded-xl text-blue-600">
          <item.icon size={20} />
        </div>
        <div className="text-xs font-medium text-blue-600 bg-blue-100 rounded-full px-3 py-1">
          {isLarge ? "Core Feature" : "Utility"}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="font-extrabold text-xl text-neutral-900 leading-tight">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
      </div>

      {/* Skeleton/Micro-Interaction Area */}
      {/* Added flex-1 to push the content up and ensure the interaction area takes available space */}
      <div className="mt-6 flex-1 min-h-0">{item.interaction}</div>
    </motion.div>
  );
};

// --- Main Section Component (Remains the same) ---
const BentoSection = () => {
  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header and Vision */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mt-2">
            The Digital Backbone for Transport
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            One platform to manage everything—from trucks and trips to bills,
            documents, and profits.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {bentoItems.map((item, index) => (
            <BentoCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoSection;