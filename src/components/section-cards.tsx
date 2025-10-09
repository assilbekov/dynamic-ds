"use client";

import { useEffect, useState } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardData = {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
  description: string;
};

const generateRandomCardData = (): CardData[] => {
  const revenue = Math.floor(Math.random() * 5000) + 1000;
  const customers = Math.floor(Math.random() * 2000) + 500;
  const accounts = Math.floor(Math.random() * 50000) + 10000;
  const growthRate = (Math.random() * 10).toFixed(1);

  return [
    {
      title: "Total Revenue",
      value: `$${revenue.toLocaleString()}.00`,
      change: Math.floor(Math.random() * 30) - 10,
      isPositive: Math.random() > 0.3,
      description: "Visitors for the last 6 months",
    },
    {
      title: "New Customers",
      value: customers.toLocaleString(),
      change: Math.floor(Math.random() * 40) - 20,
      isPositive: Math.random() > 0.4,
      description: "Customer acquisition trend",
    },
    {
      title: "Active Accounts",
      value: accounts.toLocaleString(),
      change: Math.floor(Math.random() * 25) - 5,
      isPositive: Math.random() > 0.2,
      description: "Engagement exceed targets",
    },
    {
      title: "Growth Rate",
      value: `${growthRate}%`,
      change: parseFloat(growthRate),
      isPositive: parseFloat(growthRate) > 0,
      description: "Meets growth projections",
    },
  ];
};

export function SectionCards() {
  const [cardsData, setCardsData] = useState<CardData[]>(
    generateRandomCardData()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCardsData(generateRandomCardData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardsData.map((card) => (
        <Card key={card.title} className="@container/card">
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums transition-all duration-700 ease-out-cubic @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge
                variant="outline"
                className={
                  card.isPositive
                    ? "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300 transition-all duration-300 ease-out-cubic"
                    : "border-secondary-200 bg-secondary-50 text-secondary-700 dark:border-secondary-800 dark:bg-secondary-950 dark:text-secondary-300 transition-all duration-300 ease-out-cubic"
                }
              >
                {card.isPositive ? (
                  <IconTrendingUp className="transition-all duration-300 ease-out-cubic" />
                ) : (
                  <IconTrendingDown className="transition-all duration-300 ease-out-cubic" />
                )}
                {card.change > 0 ? "+" : ""}
                {card.change}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div
              className={`line-clamp-1 flex gap-2 font-medium transition-all duration-300 ease-out-cubic ${
                card.isPositive
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-secondary-600 dark:text-secondary-400"
              }`}
            >
              {card.isPositive ? "Trending up" : "Needs attention"}
              {card.isPositive ? (
                <IconTrendingUp className="size-4 transition-all duration-300 ease-out-cubic" />
              ) : (
                <IconTrendingDown className="size-4 transition-all duration-300 ease-out-cubic" />
              )}
            </div>
            <div className="text-muted-foreground">{card.description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
