// src/app/(Dashboard)/user/[id]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { UserData } from "@/mocks/mockData";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;
  const user = UserData.find((u) => u.id === userId);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!user)
    return (
      <div className="p-6 text-center text-lg font-medium text-red-500 max-tablet:text-base max-phoneL:text-sm">
        User not found
      </div>
    );

  // Calculate usage percentage
  const usagePercent = Math.min(100, (Number(user.usageCount) / 100) * 100);

  return (
    <main
      className={`p-6 mx-auto  transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      } max-tablet:p-4 max-phoneL:p-3`}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-6 max-tablet:mb-4 max-phoneL:mb-3"
        aria-label="Back to User List"
      >
        <ArrowLeft size={18} />
        <span className="text-sm max-tablet:text-xs max-phoneL:text-[11px]">
          Back to List
        </span>
      </button>

      {/* Header Card */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 shadow-lg rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 border border-gray-100 max-laptop:p-4 max-tablet:rounded-xl max-tablet:p-6 max-phoneL:p-4">
        {/* Avatar */}
        <div
          className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-xl hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-default select-none max-tablet:w-20 max-tablet:h-20 max-phoneL:w-16 max-phoneL:h-16"
          title={user.name}
        >
          {user.name.charAt(0)}
        </div>

        {/* Info Grid */}
        <div className="w-full grid grid-cols-4 max-laptop:grid-cols-2 gap-4">
          <Info label="Name" value={user.name} />
          <Info label="Email" value={user.email} />
          <Info label="Role" value={user.role} />
          <Info
            label="Status"
            value={
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                } max-tablet:text-[10px] max-phoneL:text-[9px]`}
              >
                {user.status === "Active" ? (
                  <CheckCircle className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <AlertCircle className="mr-1 h-3 w-3 text-red-600" />
                )}
                {user.status}
              </span>
            }
          />
        </div>


      </section>

      {/* Details Section */}
      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-tablet:gap-4 max-phoneL:gap-3">
        {/* Personal Info Card */}
        <article className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow max-tablet:p-4 max-phoneL:p-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 max-tablet:text-base max-phoneL:text-sm">
            Personal Info
          </h3>
          <div className="space-y-4 max-tablet:space-y-3 max-phoneL:space-y-2">
            <Info label="Usage Count" value={user.usageCount} />
            <UsageProgress percent={usagePercent} />
            <Info label="Last IP" value={user.ip} />
            <Info label="Signups" value={user.signups} />
            <Info label="Last Login" value={user.lastLogin} />
            <Info label="Login Date" value={user.lastLoginDate} />
          </div>
        </article>

        {/* Action Panel */}
        <article className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between max-tablet:p-4 max-phoneL:p-3 max-phoneL:pb-1 max-phoneL:gap-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 max-tablet:text-base max-phoneL:text-sm">
            Actions
          </h3>
          <div className="space-y-3 max-tablet:space-y-2 max-phoneL:space-y-1.5">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors transform hover:scale-105 max-tablet:py-2 max-tablet:text-xs max-phoneL:py-1.5 max-phoneL:text-[11px] max-phoneL:rounded-sm">
              <Edit2 size={14} /> Edit Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors transform hover:scale-105 max-tablet:py-2 max-tablet:text-xs max-phoneL:py-1.5 max-phoneL:text-[11px] max-phoneL:rounded-sm">
              <Trash2 size={14} /> Delete Account
            </button>
            <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors transform hover:scale-105 max-tablet:mt-3 max-tablet:py-2 max-tablet:text-xs max-phoneL:mt-2 max-phoneL:rounded-sm max-phoneL:py-1.5 max-phoneL:text-[11px]">
              Generate Report
            </button>
          </div>
        </article>
      </section>

      {/* Activity Feed / Logs */}
      <section className="mt-8 bg-white p-6 rounded-xl shadow-sm max-tablet:p-4 max-phoneL:p-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 max-tablet:text-base max-phoneL:text-sm">
          Recent Activity
        </h3>
        <ul className="space-y-3 text-sm text-gray-600 max-tablet:space-y-2 max-phoneL:space-y-1">
          <ActivityItem
            icon={<Activity size={14} />}
            text={`Logged in from ${user.ip}`}
          />
          <ActivityItem
            icon={<Activity size={14} />}
            text="Last dashboard view: Overview"
          />
          <ActivityItem
            icon={<Activity size={14} />}
            text="Generated weekly report on Apr 5"
          />
          <ActivityItem
            icon={<Activity size={14} />}
            text="Viewed settings panel"
          />
        </ul>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="">
      <h4 className="text-sm text-gray-500 font-medium max-tablet:text-xs max-phoneL:text-[10px]">
        {label}
      </h4>
      <p className="text-base font-semibold text-gray-700 mt-1 max-laptop:text- max-phoneL:text-xs">
        {value}
      </p>
    </div>
  );
}

function UsageProgress({ percent }: { percent: number }) {
  return (
    <div>
      <h4 className="text-sm text-gray-500 font-medium mb-1 max-tablet:text-xs max-phoneL:text-[10px]">
        Usage Progress
      </h4>
      <div className="w-full bg-gray-200 rounded-full h-2 max-tablet:h-1.5 max-phoneL:h-1">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-600 mt-1 max-tablet:text-[10px] max-phoneL:text-[9px]">
        {percent.toFixed(0)}%
      </p>
    </div>
  );
}

function ActivityItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-2 max-phoneL:gap-1">
      <span className="text-indigo-500">{icon}</span>
      <span className="text-sm max-tablet:text-xs max-phoneL:text-[11px]">
        {text}
      </span>
    </li>
  );
}
