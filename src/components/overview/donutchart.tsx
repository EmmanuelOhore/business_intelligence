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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/revenue");
        setChartData(res.data.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }
    fetchData();

    // Detect small screen and update state
    const mediaQuery = window.matchMedia("(max-width: 640px)"); // Tailwind's "sm" breakpoint
    setIsSmallScreen(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsSmallScreen(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="flex-1 h-56">
      <h2 className="text-lg font-semibold mb-4 max-phoneL:text-base">
        Revenue Breakdown
      </h2>

      <div className="h-56 max-phoneL:w-[100%]  max-phoneP:w-[100%] max-phoneP:ml-[-2.5rem]">
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
              layout={isSmallScreen ? "vertical" : "horizontal"}
              align={isSmallScreen ? "right" : "center"}
              verticalAlign={isSmallScreen ? "middle" : "bottom"}
              wrapperStyle={{
                fontSize: isSmallScreen ? 10 : 12,
                marginTop: isSmallScreen ? 0 : "1rem",
              }}
              formatter={(value) => (
                <span
                  style={{
                    fontSize: isSmallScreen ? 10 : 12,
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
