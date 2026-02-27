'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface CategoryData {
  category: string
  amount: number
  count: number
}

interface SpendingChartProps {
  data: CategoryData[]
}

const COLORS = [
  '#2563EB', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#6B7280', // Gray
]

export function SpendingChart({ data }: SpendingChartProps) {
  // Group small categories into "Other"
  const threshold = 0.05 // 5% threshold
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  let topCategories = data.slice(0, 6)
  let otherCategories = data.slice(6)

  // Check if any top categories are below threshold
  const belowThreshold = topCategories.filter((item) => item.amount / total < threshold)
  if (belowThreshold.length > 0) {
    otherCategories = [...belowThreshold, ...otherCategories]
    topCategories = topCategories.filter((item) => item.amount / total >= threshold)
  }

  const chartData = [...topCategories]

  if (otherCategories.length > 0) {
    const otherTotal = otherCategories.reduce((sum, item) => sum + item.amount, 0)
    chartData.push({
      category: 'Other',
      amount: otherTotal,
      count: otherCategories.reduce((sum, item) => sum + item.count, 0),
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.category}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.amount)} ({data.count} transactions)
          </p>
          <p className="text-sm text-gray-500">
            {((data.amount / total) * 100).toFixed(1)}% of total
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: any) => {
              const percent = (entry.amount / total) * 100
              return percent > 5 ? `${percent.toFixed(0)}%` : ''
            }}
            outerRadius={120}
            fill="#8884d8"
            dataKey="amount"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry: any) => {
              const percent = ((entry.payload.amount / total) * 100).toFixed(0)
              return `${value} (${percent}%)`
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
