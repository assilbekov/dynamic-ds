import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { HorizontalBarChart } from "@/components/horizontal-bar-chart";
import { VerticalBarChart } from "@/components/vertical-bar-chart";
import { CircularProgressCards } from "@/components/circular-progress-cards";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />

              {/*      <div className="px-4 lg:px-6">
                <AnimatedStatsGrid />
              </div> */}

              <div className="grid gap-4 px-4 md:grid-cols-2 lg:px-6">
                <HorizontalBarChart />
                <VerticalBarChart />
              </div>

              <div className="px-4 lg:px-6">
                <CircularProgressCards />
              </div>

              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>

              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
