"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataItem = {
  label: string;
  value: number;
  secondaryValue: number;
};

const generateRandomData = (): DataItem[] => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month) => {
    const value = Math.floor(Math.random() * 100) + 20;
    // Ensure secondaryValue is at least 10% smaller than value
    const maxSecondaryValue = Math.floor(value * 0.9);
    const secondaryValue =
      Math.floor(Math.random() * (maxSecondaryValue - 10)) + 10;
    return {
      label: month,
      value,
      secondaryValue,
    };
  });
};

export function VerticalBarChart() {
  const [data, setData] = useState<DataItem[]>(generateRandomData());
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.value, d.secondaryValue))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartHeight = 200; // Height in pixels for the chart area

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          <div
            className="flex items-end justify-between gap-1.5 sm:gap-3 md:gap-4"
            style={{ height: `${chartHeight}px` }}
          >
            {data.map((item) => (
              <div
                key={item.label}
                className="relative flex flex-1 items-end justify-center"
              >
                {/* Background bar (darker, bigger) */}
                <div
                  className="absolute bottom-0 w-full rounded-t-md sm:rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-500 transition-all duration-700 ease-out-cubic"
                  style={{
                    height: `${(item.value / maxValue) * chartHeight}px`,
                  }}
                />
                {/* Foreground bar (secondary, lighter, smaller, overlapping) */}
                <div
                  className="absolute bottom-0 w-full rounded-t-md sm:rounded-t-lg bg-gradient-to-t from-secondary-400 to-secondary-300 transition-all duration-700 ease-out-cubic"
                  style={{
                    height: `${
                      (item.secondaryValue / maxValue) * chartHeight
                    }px`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-0.5 sm:gap-2 md:gap-4">
            {data.map((item) => (
              <div
                key={`label-${item.label}`}
                className="flex flex-1 flex-col items-center text-center min-w-0"
              >
                <div className="text-[10px] sm:text-xs font-medium text-muted-foreground truncate w-full">
                  {item.label}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-1 text-[8px] sm:text-xs font-bold w-full min-w-0">
                  <span className="text-primary-600 truncate">
                    ${item.value}k
                  </span>
                  <span className="hidden sm:inline text-muted-foreground shrink-0">
                    /
                  </span>
                  <span className="text-secondary-600 truncate">
                    ${item.secondaryValue}k
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
