'use client'

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface TemperatureRangeChartProps {
  data: {
    time: string[]
    temperature_2m_min: number[]
    temperature_2m_max: number[]
  }
}

export function TemperatureRangeChart({ data }: TemperatureRangeChartProps) {
  const chartData = data.time.map((date, index) => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    min: data.temperature_2m_min[index],
    max: data.temperature_2m_max[index],
  }))

  return (
    <ChartContainer
      config={{
        min: {
          label: 'Min Temperature',
          color: 'hsl(var(--chart-1))',
        },
        max: {
          label: 'Max Temperature',
          color: 'hsl(var(--chart-2))',
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="min"
            stroke="var(--color-min)"
            name="Min Temperature"
          />
          <Line
            type="monotone"
            dataKey="max"
            stroke="var(--color-max)"
            name="Max Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
