"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Datos de ejemplo para "Productos por Mes"
const chartData = [
  { month: "Junio", products: 186 },
  { month: "Julio", products: 305 },
  { month: "Agosto", products: 237 },
  { month: "Septiembre", products: 73 },
  { month: "Octubre", products: 209 },
  { month: "Noviembre", products: 214 },
];

const chartConfig = {
  products: {
    label: "Productos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartProductsComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos por Mes</CardTitle>
        <CardDescription>
          Ventas de productos de Enero a Junio 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Muestra solo las primeras 3 letras del mes
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="products" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Productos mas vendidos de 305<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando total de ventas de productos por mes
        </div>
      </CardFooter>
    </Card>
  );
}
