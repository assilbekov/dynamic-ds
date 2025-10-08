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
        <CardTitle>Monthly Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div
            className="flex items-end justify-between gap-4"
            style={{ height: `${chartHeight}px` }}
          >
            {data.map((item) => (
              <div
                key={item.label}
                className="relative flex flex-1 items-end justify-center"
              >
                {/* Background bar (darker, bigger) */}
                <div
                  className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-500 transition-all duration-700 ease-out-cubic"
                  style={{
                    height: `${(item.value / maxValue) * chartHeight}px`,
                  }}
                />
                {/* Foreground bar (secondary, lighter, smaller, overlapping) */}
                <div
                  className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-secondary-400 to-secondary-300 transition-all duration-700 ease-out-cubic"
                  style={{
                    height: `${
                      (item.secondaryValue / maxValue) * chartHeight
                    }px`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4">
            {data.map((item) => (
              <div
                key={`label-${item.label}`}
                className="flex flex-1 flex-col items-center text-center"
              >
                <div className="text-xs font-medium text-muted-foreground">
                  {item.label}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold">
                  <span className="text-primary-600">${item.value}k</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-secondary-600">
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
