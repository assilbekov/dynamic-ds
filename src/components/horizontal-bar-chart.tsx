"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataItem = {
  label: string;
  value: number;
  color: string;
};

const generateRandomData = (): DataItem[] => {
  const categories = [
    { label: "Product A", color: "bg-primary-500" },
    { label: "Product B", color: "bg-primary-400" },
    { label: "Product C", color: "bg-primary-600" },
    { label: "Product D", color: "bg-primary-300" },
    { label: "Product E", color: "bg-primary-700" },
  ];

  return categories.map((cat) => ({
    ...cat,
    value: Math.floor(Math.random() * 100) + 10,
  }));
};

export function HorizontalBarChart() {
  const [data, setData] = useState<DataItem[]>(generateRandomData());
  const maxValue = Math.max(...data.map((d) => d.value));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Product</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((item, index) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.value}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-secondary-100 dark:bg-secondary-900">
              <div
                className={`h-full ${item.color} transition-all duration-700 ease-out-cubic`}
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
