import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const EarningsChart = ({ data }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDark(document.documentElement.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  const axisColor = isDark ? "#e5e7eb" : "#111827";
  const gridColor = isDark ? "#374151" : "#d1d5db";

  return (
    <div className="px-5 py-3 bg-gradient-to-b from-white via-white to-gray-50 dark:bg-gradient-to-b dark:from-[#0b111f] dark:to-[#0e1628] rounded-lg border border-gray-200 dark:border-[#252525]">
      <div className="mb-6 text-2xl font-medium dark:text-white">
        <p>Monthly Earnings</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="month"
            stroke={axisColor}
            fontSize={12}
            tick={{ fill: axisColor }}
          />
          <YAxis
            stroke={axisColor}
            fontSize={12}
            tick={{ fill: axisColor }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#fff",
              border: "1px solid purple",
              borderRadius: "5px",
              color: isDark ? "#f3f4f6" : "#111827",
            }}
            formatter={(value) => [`$${value}`, "Earnings"]}
          />
          <Bar dataKey="earnings" fill="purple" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
