"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";

type StatItem = {
  title: string;
  value: number;
  change: number;
  icon: "up" | "down" | "trend";
};

const generateRandomStats = (): StatItem[] => {
  return [
    {
      title: "Active Users",
      value: Math.floor(Math.random() * 5000) + 1000,
      change: Math.floor(Math.random() * 40) - 20,
      icon: Math.random() > 0.5 ? "up" : "down",
    },
    {
      title: "Conversion Rate",
      value: Math.floor(Math.random() * 100) / 10,
      change: Math.floor(Math.random() * 20) - 10,
      icon: Math.random() > 0.5 ? "up" : "down",
    },
    {
      title: "Total Revenue",
      value: Math.floor(Math.random() * 50000) + 10000,
      change: Math.floor(Math.random() * 30) - 15,
      icon: Math.random() > 0.5 ? "up" : "down",
    },
    {
      title: "Avg Order Value",
      value: Math.floor(Math.random() * 500) + 50,
      change: Math.floor(Math.random() * 25) - 12,
      icon: Math.random() > 0.5 ? "up" : "down",
    },
  ];
};

export function AnimatedStatsGrid() {
  const [stats, setStats] = useState<StatItem[]>(generateRandomStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateRandomStats());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon === "up" && (
              <ArrowUp className="h-4 w-4 text-primary-500 transition-all duration-300 ease-out-cubic" />
            )}
            {stat.icon === "down" && (
              <ArrowDown className="h-4 w-4 text-secondary-500 transition-all duration-300 ease-out-cubic" />
            )}
            {stat.icon === "trend" && (
              <TrendingUp className="h-4 w-4 text-muted-foreground transition-all duration-300 ease-out-cubic" />
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div
                className="text-2xl font-bold tabular-nums transition-all duration-700 ease-out-cubic"
                style={{
                  transform: "translateY(0)",
                }}
              >
                {stat.title.includes("Rate")
                  ? `${stat.value}%`
                  : stat.title.includes("Revenue") ||
                    stat.title.includes("Value")
                  ? `$${stat.value.toLocaleString()}`
                  : stat.value.toLocaleString()}
              </div>
              <p
                className={`text-xs transition-all duration-300 ease-out-cubic ${
                  stat.change > 0
                    ? "text-primary-600 dark:text-primary-400"
                    : stat.change < 0
                    ? "text-secondary-600 dark:text-secondary-400"
                    : "text-muted-foreground"
                }`}
              >
                {stat.change > 0 ? "+" : ""}
                {stat.change}% from last period
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
