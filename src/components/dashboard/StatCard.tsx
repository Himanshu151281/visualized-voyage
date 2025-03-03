
import { Briefcase, TrendingUp, CheckCircle, Users, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
  const iconMap: Record<string, any> = {
    briefcase: Briefcase,
    'trending-up': TrendingUp,
    'check-circle': CheckCircle,
    users: Users,
  };

  const Icon = iconMap[icon] || Briefcase;
  
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };
  
  const iconBg = colorMap[color] || 'bg-blue-100 text-blue-600';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-lg", iconBg)}>
          <Icon size={20} />
        </div>
        <div className="flex items-center">
          {change >= 0 ? (
            <TrendingUp size={16} className="text-green-500 mr-1" />
          ) : (
            <TrendingDown size={16} className="text-red-500 mr-1" />
          )}
          <span className={cn(
            "text-sm font-medium",
            change >= 0 ? "text-green-500" : "text-red-500"
          )}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-text-secondary">{title}</p>
    </div>
  );
};

export default StatCard;
