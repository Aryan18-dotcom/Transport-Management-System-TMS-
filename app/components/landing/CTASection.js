import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    // Revert to a light background, keeping ample vertical padding
    <section className="py-24 bg-white text-center">
      <div className="px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
          Ready to Run Your Transport Business Digitally?
        </h2>
        
        {/* Subtext remains clear and focused */}
        <p className="mt-4 text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
          Eliminate spreadsheets, reduce errors, and understand your true vehicle profitability.
          <span className="block mt-2">Create your admin account and start managing everything today.</span>
        </p>

        {/* Primary CTA Button - Retaining the strong blue for high conversion */}
        <Link
          href="/signup"
          className="inline-flex items-center mt-10 bg-blue-600 text-white px-8 py-3.5 
                     rounded-full font-semibold text-lg shadow-xl shadow-blue-500/30 
                     transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02]"
        >
          Create Admin Account
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;