"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

interface PriceChartProps {
  history: { date: string; price: number }[];
}

export default function PriceChart({ history }: PriceChartProps) {
  const data = [...history].reverse();
  const min = Math.min(...data.map(d => d.price));
  const max = Math.max(...data.map(d => d.price));

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EB" vertical={false} />
          <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false}
            domain={[min * 0.98, max * 1.02]}
            tickFormatter={(v) => "₹" + Number(v).toLocaleString("en-IN", { maximumFractionDigits: 0 })} />
          <Tooltip
            contentStyle={{ background: "#1C1C1C", border: "none", borderRadius: 8, color: "#F5F5F0", fontSize: 12, padding: "8px 12px" }}
            labelStyle={{ color: "#9CA3AF", marginBottom: 4, fontSize: 11 }}
            formatter={(value: any) => ["₹" + Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 }), "Price"]}
          />
          <Line type="monotone" dataKey="price" stroke="#00B386" strokeWidth={2.5}
            dot={{ fill: "#fff", stroke: "#00B386", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "#00B386", stroke: "#fff", strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}