'use client'

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { motion } from 'framer-motion'

interface StatsData {
  totalScans: number
  safeCount: number
  cautionCount: number
  dangerousCount: number
  reportsCount: number
  dailyStats: Array<{
    date: string
    scans: number
    safe: number
    caution: number
    dangerous: number
  }>
  topDomains: Array<{
    domain: string
    count: number
  }>
}

interface ChartPanelProps {
  data: StatsData
}

const COLORS = ['#22c55e', '#f59e0b', '#ef4444']

export default function ChartPanel({ data }: ChartPanelProps) {
  const pieData = [
    { name: 'An toàn', value: data.safeCount },
    { name: 'Cảnh báo', value: data.cautionCount },
    { name: 'Nguy hiểm', value: data.dangerousCount },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-4">Phân bố kết quả</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Line Chart - Daily Scans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-4">Lượt kiểm tra theo ngày</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.dailyStats}>
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
            />
            <Line type="monotone" dataKey="scans" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart - Top Domains */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700 lg:col-span-2"
      >
        <h3 className="text-lg font-semibold mb-4">Top domain bị cảnh báo</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.topDomains} layout="vertical">
            <XAxis type="number" stroke="#9ca3af" fontSize={12} />
            <YAxis type="category" dataKey="domain" stroke="#9ca3af" fontSize={12} width={150} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
            />
            <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
