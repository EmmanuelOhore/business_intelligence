"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981"]; // Indigo, Cyan, Green

export default function RevenueSourceChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/revenue");
        setChartData(res.data.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="flex-1  h-56 ">
      <h2 className="text-lg font-semibold mb-4 max-phoneL:text-base">
        Revenue Breakdown
      </h2>

      <div className=" h-56  max-phoneL:w-[80%] max-phoneP:w-full ">
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              height={26}
              formatter={(value) => (
                <span
                  style={{
                    fontSize: "12px",
                    marginTop: "1rem",
                    color: "#374151",
                  }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
