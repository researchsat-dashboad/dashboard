import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";

export default function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis dataKey="value"/>
      <Tooltip />
      <Legend />

      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
  )
}