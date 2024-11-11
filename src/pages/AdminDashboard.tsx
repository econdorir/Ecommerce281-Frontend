"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PieChartComponent } from "@/components/PieChart";
// import { LineChartComponent } from "@/components/LineChart";
import { AreaChartComponent } from "@/components/AreaChart";
import { RadialChartComponent } from "@/components/RadialChart";
import { BarChartComponent } from "@/components/BarChart";
import { BarChartProductsComponent } from "@/components/BarChartProducts";

const AdminPanel = () => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      {/* Grid Container */}
      <div className="px-10 mt-10 mb-10">
        <h1 className="font-bold ">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-areas">
          {/* AreaChartComponent should be the largest */}
          <div className="col-span-1 lg:col-span-2 lg:row-span-1">
            <AreaChartComponent />
          </div>

          {/* Other charts */}
          <div className="col-span-1">
            <BarChartComponent />
          </div>

          <div className="col-span-1">
            <PieChartComponent />
          </div>

          <div className="col-span-1">
            <RadialChartComponent />
          </div>

          <div className="col-span-1">
            <BarChartProductsComponent />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPanel;
