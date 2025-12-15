const Stat = ({ title, value }) => (
  <div
    className="rounded-xl bg-neutral-800 border border-neutral-700 p-6 transition-colors duration-200
               hover:bg-neutral-700/70 relative overflow-hidden"
  >
    {/* Subtle top border accent */}
    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50" />

    {/* Value (More readable, less bombastic) */}
    <h3 className="text-3xl font-bold text-cyan-400 pt-1">
      {value}
    </h3>
    {/* Title (The description) */}
    <p className="text-sm text-neutral-400 mt-2 tracking-normal">
      {title}
    </p>
  </div>
);

const StatsSection = () => {
  return (
    <section id="stats" className="py-20 bg-neutral-900 text-white rounded-2xl shadow-2xl">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header - Reduced size and weight */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
            Performance Metrics
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">
            Driving Efficiency and Profitability
          </h2>
          <p className="mt-3 text-base text-neutral-400 max-w-2xl mx-auto">
            Our system is built on core principles that eliminate manual overhead and maximize profitability per vehicle.
          </p>
        </div>

        {/* Stats Grid - Remains responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Stat title="Digital Records" value="100%" />
          <Stat title="Trip Tracking" value="Real-Time" />
          <Stat title="Profit Analysis" value="Vehicle-wise" />
          <Stat title="User Permissions" value="Role-Based" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;