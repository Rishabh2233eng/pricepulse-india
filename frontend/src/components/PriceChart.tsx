"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface PriceChartProps {
  history: { date: string; price: number }[];
}

export default function PriceChart({ history }: PriceChartProps) {
  const data = [...history].reverse();

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#B8A878" opacity={0.3} />
          <XAxis dataKey="date" stroke="#6B6357" fontSize={11} tickLine={false} />
          <YAxis stroke="#6B6357" fontSize={11} tickLine={false} domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip
            contentStyle={{ background: "#1C1B19", border: "none", borderRadius: 4, color: "#F7F2E9" }}
            labelStyle={{ color: "#E8871E", fontWeight: "bold" }}
            formatter={(value: any) => ["₹" + Number(value).toLocaleString("en-IN"), "Price"]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#E8871E"
            strokeWidth={2.5}
            dot={{ fill: "#1C1B19", r: 3 }}
            activeDot={{ r: 6, fill: "#E8871E" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}