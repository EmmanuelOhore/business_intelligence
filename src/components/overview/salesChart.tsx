"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SignupsChart() {
  const [signData, setsignData] = useState([]);
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
        const res = await axios.get("/api/customers");
        setsignData(res.data.data);
        console.log("Fetched Users customer:", res.data.data);
      } catch (err) {
        console.error("Error fetching customer data", err);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="flex-1 h-56">
      <h2 className="text-lg font-semibold mb-8 max-phoneL:text-base">
        New Customers Acquired
      </h2>

      <div className=" h-56  max-phoneL:w-[80%] max-phoneP:w-[100%] max-phoneP:ml-[-2.5rem]">
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={signData}>
            <XAxis dataKey="name" tick={{ fontSize: tickFontSize }} />
            <YAxis tick={{ fontSize: tickFontSize }} />
            <Tooltip />
            <Bar dataKey="signups" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
