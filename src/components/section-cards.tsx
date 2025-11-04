"use client";

import { useEffect, useState } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { BlurredText } from "@/components/ui/blurred-text";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type LoadingStyle = "blur" | "skeleton" | "spinner";

type CardData = {
  title: string;
  value: string | null;
  change: number | null;
  isPositive: boolean | null;
  description: string;
};

type CardValueProps = {
  value: string | null;
};

type CardBadgeProps = {
  change: number | null;
  isPositive: boolean | null;
};

type CardStatusProps = {
  isPositive: boolean | null;
};

type StatCardProps = {
  card: CardData;
  loadingStyle: LoadingStyle;
};

function CardValue({ value }: CardValueProps) {
  return (
    <BlurredText isLoading={value === null} placeholder="$0,000.00">
      {value || "$0,000.00"}
    </BlurredText>
  );
}

function CardBadge({ change, isPositive }: CardBadgeProps) {
  if (change === null || isPositive === null) {
    return <Skeleton className="h-6 w-14 bg-accent" />;
  }

  return (
    <Badge
      variant="outline"
      className={
        isPositive
          ? "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300 transition-all duration-300 ease-out-cubic"
          : "border-secondary-200 bg-secondary-50 text-secondary-700 dark:border-secondary-800 dark:bg-secondary-950 dark:text-secondary-300 transition-all duration-300 ease-out-cubic"
      }
    >
      {isPositive ? (
        <IconTrendingUp className="transition-all duration-300 ease-out-cubic" />
      ) : (
        <IconTrendingDown className="transition-all duration-300 ease-out-cubic" />
      )}
      <span className="tabular-nums">
        {change > 0 ? "+" : ""}
        {change}%
      </span>
    </Badge>
  );
}

function CardStatus({ isPositive }: CardStatusProps) {
  if (isPositive === null) {
    return <Skeleton className="h-5 w-32 bg-accent" />;
  }

  return (
    <div
      className={`line-clamp-1 flex gap-2 font-medium transition-all duration-300 ease-out-cubic ${
        isPositive
          ? "text-primary-600 dark:text-primary-400"
          : "text-secondary-600 dark:text-secondary-400"
      }`}
    >
      {isPositive ? "Trending up" : "Needs attention"}
      {isPositive ? (
        <IconTrendingUp className="size-4 transition-all duration-300 ease-out-cubic" />
      ) : (
        <IconTrendingDown className="size-4 transition-all duration-300 ease-out-cubic" />
      )}
    </div>
  );
}

// Combined approach (current implementation)
function BlurCard({ card }: { card: CardData }) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{card.title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          <CardValue value={card.value} />
        </CardTitle>
        <CardAction>
          <CardBadge change={card.change} isPositive={card.isPositive} />
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <CardStatus isPositive={card.isPositive} />
        <div className="text-muted-foreground">{card.description}</div>
      </CardFooter>
    </Card>
  );
}

// Skeleton only approach
function SkeletonCard({ card }: { card: CardData }) {
  const isLoading = card.value === null;

  if (isLoading) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-32 @[250px]/card:h-9" />
          <CardAction>
            <Skeleton className="h-6 w-14" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-full" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{card.title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
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
            <span className="tabular-nums">
              {card.change! > 0 ? "+" : ""}
              {card.change}%
            </span>
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
  );
}

// Spinner approach
function SpinnerCard({ card }: { card: CardData }) {
  const isLoading = card.value === null;

  if (isLoading) {
    return (
      <Card className="@container/card">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="size-8 animate-spin rounded-full border-4 border-muted-foreground/20 border-t-muted-foreground" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{card.title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
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
            <span className="tabular-nums">
              {card.change! > 0 ? "+" : ""}
              {card.change}%
            </span>
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
  );
}

function StatCard({ card, loadingStyle }: StatCardProps) {
  switch (loadingStyle) {
    case "blur":
      return <BlurCard card={card} />;
    case "skeleton":
      return <SkeletonCard card={card} />;
    case "spinner":
      return <SpinnerCard card={card} />;
  }
}

const initialCardData: CardData[] = [
  {
    title: "Total Revenue",
    value: null,
    change: null,
    isPositive: null,
    description: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: null,
    change: null,
    isPositive: null,
    description: "Customer acquisition trend",
  },
  {
    title: "Active Accounts",
    value: null,
    change: null,
    isPositive: null,
    description: "Engagement exceed targets",
  },
  {
    title: "Growth Rate",
    value: null,
    change: null,
    isPositive: null,
    description: "Meets growth projections",
  },
];

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
  const [cardsData, setCardsData] = useState<CardData[]>(initialCardData);
  const [loadingStyle, setLoadingStyle] = useState<LoadingStyle>("skeleton");

  const onLoadingStyleChange = (value: LoadingStyle) => {
    setLoadingStyle(value);
    setCardsData(initialCardData);
    setTimeout(
      () => {
        setCardsData(generateRandomCardData());
      },
      value === "blur" ? 300 : 2000
    );
  };

  /* // Effect for continuous data refresh - just updates data without loading state
  useEffect(() => {
    const interval = setInterval(() => {
      setCardsData(generateRandomCardData());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []); */

  return (
    <div className="space-y-6">
      <div className="flex justify-start px-4 lg:px-6">
        <ToggleGroup
          type="single"
          value={loadingStyle}
          onValueChange={onLoadingStyleChange}
          variant="outline"
        >
          <ToggleGroupItem
            value="skeleton"
            className="px-4"
            aria-label="Skeleton loading"
          >
            Skeleton
          </ToggleGroupItem>
          <ToggleGroupItem
            value="spinner"
            className="px-4"
            aria-label="Spinner loading"
          >
            Spinner
          </ToggleGroupItem>
          <ToggleGroupItem
            value="blur"
            className="px-4"
            aria-label="Blur loading"
          >
            Blur
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {cardsData.map((card) => (
          <StatCard key={card.title} card={card} loadingStyle={loadingStyle} />
        ))}
      </div>
    </div>
  );
}
