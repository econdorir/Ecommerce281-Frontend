"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
const chartData = [
  {
    month: "enero",
    laPaz: 250,
    cochabamba: 180,
    santaCruz: 350,
    tarija: 100,
    potosi: 150,
    oruro: 80,
    beni: 120,
    pando: 60,
    chuquisaca: 90,
  },
];

const chartConfig = {
  laPaz: {
    label: "La Paz",
    color: "hsl(var(--chart-1))",
  },
  cochabamba: {
    label: "Cochabamba",
    color: "hsl(var(--chart-2))",
  },
  santaCruz: {
    label: "Santa Cruz",
    color: "hsl(var(--chart-3))",
  },
  tarija: {
    label: "Tarija",
    color: "hsl(var(--chart-4))",
  },
  potosi: {
    label: "Potosí",
    color: "hsl(var(--chart-5))",
  },
  oruro: {
    label: "Oruro",
    color: "hsl(var(--chart-1))",
  },
  beni: {
    label: "Beni",
    color: "hsl(var(--chart-2))",
  },
  pando: {
    label: "Pando",
    color: "hsl(var(--chart-3))",
  },
  chuquisaca: {
    label: "Chuquisaca",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function RadialChartComponent() {
  const totalCommunities = 1380;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        {" "}
        <CardTitle>Comunidades por Departamento</CardTitle>
        <CardDescription>Datos de las comunidades 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalCommunities.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Comunidades Totales
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {Object.keys(chartData[0])
              .slice(1)
              .map((department, index) => (
                <RadialBar
                  key={index}
                  dataKey={department}
                  stackId="a"
                  cornerRadius={5}
                  fill={chartConfig[department]?.color}
                  className="stroke-transparent stroke-2"
                />
              ))}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Datos de las comunidades por departamento 2024
        </div>
      </CardFooter>
    </Card>
  );
}
