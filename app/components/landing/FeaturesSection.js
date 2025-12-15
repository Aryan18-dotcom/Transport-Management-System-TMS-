"use client";

import {
  Truck,
  Route,
  Wrench,
  BarChart3,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";

// The features array remains the same
const features = [
  {
    title: "Truck & Driver Management",
    desc: "Maintain complete records of trucks, drivers, documents, and assignments in one place.",
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Trip & Load Tracking",
    desc: "Track daily trips, pickup & drop locations, and load details with accuracy.",
    icon: Route,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Vehicle Maintenance Records",
    desc: "Log repairs, services, tire changes, and breakdown costs per vehicle.",
    icon: Wrench,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    title: "Expense & Profit Reports",
    desc: "Automatically calculate earnings, expenses, and net profit per truck.",
    icon: BarChart3,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    title: "Employee Role Management",
    desc: "Admins can manage employees, permissions, and daily data entries securely.",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Secure Document Storage",
    desc: "Store RC, insurance, permits, and driver documents digitally and securely.",
    icon: FileText,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Core Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mt-2">
            Everything you need to run your transport business
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            A single platform designed for roadways companies to manage
            operations, finances, and people with ease.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative rounded-3xl border border-neutral-200 bg-white p-7 transition-all duration-300 shadow-sm
                           hover:shadow-xl hover:border-blue-300 hover:z-10"
              >
                {/* Icon Container - Now colored based on feature */}
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.bg} ${feature.color} transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-extrabold text-neutral-900 leading-snug">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Micro-Interaction: Hidden link/arrow on hover */}
                <a
                  href="#" // Replace with actual link to feature details
                  className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;