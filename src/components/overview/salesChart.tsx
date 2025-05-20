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

const data = [
  { name: "Jan", signups: 220 },
  { name: "Feb", signups: 180 },
  { name: "Mar", signups: 300 },
  { name: "Apr", signups: 270 },
  { name: "May", signups: 200 },
];

export default function SignupsChart() {
  const [signData, setsignData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/customers");
        setsignData(res.data.data);
        console.log("Fetched Users customer:", res.data.data);
      } catch (err) {
        console.error("Error fetching customer data", err);
      } finally {
        setLoading(false);
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="signups" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
