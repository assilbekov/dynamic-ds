"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProgressItem = {
  title: string;
  value: number;
  target: number;
  color: string;
};

const generateRandomProgress = (): ProgressItem[] => {
  return [
    {
      title: "Project Completion",
      value: Math.floor(Math.random() * 100),
      target: 100,
      color: "primary-500",
    },
    {
      title: "Task Progress",
      value: Math.floor(Math.random() * 80) + 20,
      target: 100,
      color: "secondary-500",
    },
    {
      title: "Team Performance",
      value: Math.floor(Math.random() * 90) + 10,
      target: 100,
      color: "primary-600",
    },
  ];
};

export function CircularProgressCards() {
  const [progress, setProgress] = useState<ProgressItem[]>(
    generateRandomProgress()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(generateRandomProgress());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {progress.map((item) => {
        const percentage = (item.value / item.target) * 100;
        const circumference = 2 * Math.PI * 45;
        const strokeDashoffset =
          circumference - (percentage / 100) * circumference;

        return (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="relative h-32 w-32">
                <svg
                  className="h-32 w-32 -rotate-90 transform"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-secondary-100 dark:text-secondary-900"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={`var(--${item.color})`}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out-cubic"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold tabular-nums transition-all duration-700 ease-out-cubic">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.value} / {item.target}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
