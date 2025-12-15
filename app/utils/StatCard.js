import { TrendingUp, TrendingDown, DollarSign, Truck, Users, FileText } from 'lucide-react';

// Tailwind color map for easy styling
const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', trendBg: 'bg-blue-100', trendText: 'text-blue-800' },
  green: { bg: 'bg-green-50', text: 'text-green-600', trendBg: 'bg-green-100', trendText: 'text-green-800' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', trendBg: 'bg-orange-100', trendText: 'text-orange-800' },
  red: { bg: 'bg-red-50', text: 'text-red-600', trendBg: 'bg-red-100', trendText: 'text-red-800' },
};

export const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
  const styles = colorMap[color] || colorMap.blue;
  const TrendIcon = trend && (trend.isPositive ? TrendingUp : TrendingDown);
  const trendColor = trend && (trend.isPositive ? 'text-green-600' : 'text-red-600');

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {/* Icon */}
        <div className={`p-2 rounded-full ${styles.bg}`}>
          <Icon className={`w-5 h-5 ${styles.text}`} />
        </div>
      </div>
      
      {/* Value */}
      <div className="mt-4 text-3xl font-bold text-gray-900">{value}</div>
      
      {/* Trend (Optional) */}
      {trend && (
        <div className="mt-3 flex items-center">
          <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
          <span className={`text-sm font-medium ${trendColor}`}>{trend.value}</span>
          <span className="text-xs text-gray-500 ml-2">vs. last month</span>
        </div>
      )}
    </div>
  );
};