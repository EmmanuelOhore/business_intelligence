"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SalesLineChart() {
  const [lineData, setlineData] = useState([]);
  const [tickFontSize, setTickFontSize] = useState(12);

  useEffect(() => {
    // Responsive tick size
    const updateFontSize = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setTickFontSize(10);
      } else {
        setTickFontSize(12);
      }
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    return () => window.removeEventListener("resize", updateFontSize);
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/sales");
        setlineData(res.data.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="flex-1   max-laptop:h-[20rem] max-tablet:h-[16rem] max-phoneL:h-56 ">
      <h2 className="text-lg  font-semibold mb-8 max-phoneL:text-base">
        Monthly Recurring Revenue (MRR)
      </h2>
      <div className=" h-56  max-phoneL:ml-[-2rem] max-phoneP:w-full max-phoneP:ml-[-2.5rem]">
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: tickFontSize }} />
            <YAxis tick={{ fontSize: tickFontSize }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981" // Tailwind green-500
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
