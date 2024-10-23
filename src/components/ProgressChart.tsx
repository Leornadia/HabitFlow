import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { day: 'Sun', completed: 1 },
  { day: 'Mon', completed: 2 },
  { day: 'Tue', completed: 1 },
  { day: 'Wed', completed: 3 },
  { day: 'Thu', completed: 4 },
  { day: 'Fri', completed: 2 },
  { day: 'Sat', completed: 1 },
]

export default function ProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>Your habit completion over the past week</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip />
              <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
