"use client";
import DisplayCard from "@/components/overview/displayCards";
import Header from "@/components/overview/header";
import SalesLineChart from "@/components/overview/salesLineChart";
import ProtectedRoute from "@/components/ui/protectedApps";
import RevenueSourceChart from "../../../components/overview/donutchart";
import SignupsChart from "../../../components/overview/salesChart";
import OverviewTable from "../../../components/overview/table";

const OverView = () => {
  return (
    <ProtectedRoute>
      <main className=" w-[100%] p-4 pt-0  overflow-y-auto max-tablet:p-3 max-phoneL:p-2 max-phoneP:p-1 ">
        <Header />
        <section className="grid my-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-tablet:gap-4 max-phoneL:gap-3">
          <DisplayCard
            title="Total Users"
            value="12,000"
            change="+5%"
            isUp={true}
          />
          <DisplayCard
            title="Active Sessions"
            value="300"
            change="-2%"
            isUp={false}
          />
          <DisplayCard
            title="Sales Revenue"
            value="$25,000"
            change="+10%"
            isUp={true}
          />
        </section>
        <section className="grid grid-cols-3 gap-4 max-laptop:grid-cols-2  max-tablet:grid-cols-1">
          <article className="p-4 rounded-lg shadow-xl flex gap-4 items-center">
            <SignupsChart />
          </article>
          <article className="p-4 rounded-lg shadow-xl flex gap-4 items-center">
            <RevenueSourceChart />
          </article>
          <article className="p-4 rounded-lg shadow-xl flex gap-4 items-center max-laptop:col-span-2 max-tablet:col-span-1">
            <SalesLineChart />
          </article>
        </section>

        <section>
          <OverviewTable />
        </section>
      </main>
    </ProtectedRoute>
  );
};

export default OverView;
