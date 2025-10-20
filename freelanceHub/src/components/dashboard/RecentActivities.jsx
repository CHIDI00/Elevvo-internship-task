// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, DollarSign, Clock } from "lucide-react";

export const RecentActivity = ({ activities }) => {
  const getIcon = (type) => {
    switch (type) {
      case "project":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "payment":
        return <DollarSign className="h-5 w-5 text-blue-600" />;
      case "task":
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="px-5 py-5 bg-gradient-to-b from-white via-white to-gray-50 dark:bg-gradient-to-b dark:from-[#0b111f] dark:to-[#0e1628] rounded-lg border border-gray-200 dark:border-[#252525]">
      <div className="mb-6 font-medium text-2xl dark:text-white">
        <p>Recent Activity</p>
      </div>
      <div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 group">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#172039] group-hover:bg-muted/80 transition-smooth">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight dark:text-white">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 dark:text-gray-200">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
