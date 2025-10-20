import {
  statsCards,
  recentActivities,
  monthlyEarnings,
} from "../data/statsData";
import { DollarSign, FolderKanban, Clock, Users } from "lucide-react";
import { StatsCard } from "../components/dashboard/StatsChart";
import { EarningsChart } from "../components/dashboard/EarningsChart";
import { RecentActivity } from "../components/dashboard/RecentActivities";

const icons = [FolderKanban, DollarSign, Clock, Users];

const Overview = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2 dark:text-white">Overview</h1>
        <p className="dark:text-gray-300">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} icon={icons[index]} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-6">
        <div className="lg:col-span-2">
          <EarningsChart data={monthlyEarnings} />
        </div>
        <div>
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
