import { TrendingUp, TrendingDown } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

export const StatsCard = ({ title, value, change, trend, icon }) => {
  const Icon = icon;

  return (
    <div className="border border-gray-200 dark:border-[#252525] rounded-lg bg-gradient-to-b from-white via-white to-gray-50 dark:bg-gradient-to-b dark:from-[#0b111f] dark:to-[#0e1628] hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-black dark:text-white">
              {title}
            </p>
            <p className="text-3xl font-bold text-black dark:text-white">
              {value}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-300">
            <Icon className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-sm">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};
