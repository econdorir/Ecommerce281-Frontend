"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

// Datos con cantidades más grandes
const chartData = [
  { categoria: "Decoración", cantidad: 120, fill: "var(--color-decoracion)" },
  { categoria: "Muebles", cantidad: 85, fill: "var(--color-muebles)" },
  { categoria: "Juguetes", cantidad: 50, fill: "var(--color-juguetes)" },
  { categoria: "Cerámica", cantidad: 75, fill: "var(--color-ceramica)" },
  { categoria: "Artesanía", cantidad: 60, fill: "var(--color-artesania)" },
];

const chartConfig = {
  cantidad: {
    label: "Cantidad",
  },
  decoracion: {
    label: "Decoración",
    color: "hsl(var(--chart-1))",
  },
  muebles: {
    label: "Muebles",
    color: "hsl(var(--chart-2))",
  },
  juguetes: {
    label: "Juguetes",
    color: "hsl(var(--chart-3))",
  },
  ceramica: {
    label: "Cerámica",
    color: "hsl(var(--chart-4))",
  },
  artesania: {
    label: "Artesanía",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  const totalCantidad = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.cantidad, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gráfico de Torta</CardTitle>
        <CardDescription>Últimos productos por categoría</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="cantidad"
              nameKey="categoria"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCantidad.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Productos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tendencia en aumento del 5.2% este mes{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando productos totales por categoría
        </div>
      </CardFooter>
    </Card>
  );
}
