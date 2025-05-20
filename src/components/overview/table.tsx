// src/app/(Dashboard)/overview/components/OverviewTable.tsx
"use client";
import ReactPaginate from "react-paginate";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserDataType = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLoginDate: string;
  lastLogin: string;
  status: string;
  usageCount: string;
  ip: string;
  signups: string;
};

const OverviewTable = () => {
  const [userslist, setUserslist] = useState<UserDataType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: "2025-04-01",
    endDate: "2025-04-09",
  });
  const [filterByDate, setFilterByDate] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  // Fetch user data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/users");
        setUserslist(res.data.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }

    fetchData();
  }, []);

  // Filter by search + date range
  const filteredData = userslist.filter((user) => {
    const name = user.name || "";
    const nameMatch = name.toLowerCase().includes(searchQuery.toLowerCase());

    const loginDate = new Date(user.lastLoginDate);
    const start = new Date(selectedDateRange.startDate);
    const end = new Date(selectedDateRange.endDate);
    const dateInRange = loginDate >= start && loginDate <= end;

    return nameMatch && (filterByDate ? dateInRange : true);
  });

  // Active Users Count
  const activeUsers = useMemo(() => {
    return userslist.filter((user) => user.status === "Active");
  }, [userslist]);

  // Pagination
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <section className="flex-1 p-6 bg-gray-50 max-laptop:p-4 max-phoneL:p-1 max-phoneL:mt-[2rem]">
      {/* Header Section */}
      <article>
        <header className="flex flex-col gap-6 mb-6">
          <div>
            <h2 className="font-semibold text-3xl text-gray-800 max-tablet:text-2xl max-phoneL:text-xl">
              User Analytics
            </h2>
            <h3 className="font-normal text-sm text-gray-500 mt-1 max-tablet:text-xs max-phoneL:text-[10px]">
              Track user engagement and activity across your platform
            </h3>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md font-medium hover:bg-blue-200 transition-colors max-tablet:py-1 max-tablet:px-3 max-tablet:text-sm max-phoneL:rounded">
              All Users
            </button>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md font-medium hover:bg-green-200 transition-colors max-tablet:py-1 max-tablet:px-3 max-tablet:text-sm">
              Active
            </button>
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-md font-medium hover:bg-red-200 transition-colors max-tablet:py-1 max-tablet:px-3 max-tablet:text-sm">
              Inactive
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white shadow-sm border rounded-lg p-4 max-tablet:p-3 max-phoneL:p-2">
              <p className="text-gray-500 max-tablet:text-xs">Total Users</p>
              <p className="text-2xl font-bold text-gray-800 max-tablet:text-xl max-phoneL:text-lg">
                {userslist.length}
              </p>
            </div>
            <div className="bg-white shadow-sm border rounded-lg p-4 max-tablet:p-3 max-phoneL:p-2">
              <p className="text-gray-500 max-tablet:text-xs">
                Active Users (Today)
              </p>
              <p className="text-2xl font-bold text-green-600 max-tablet:text-xl max-phoneL:text-lg">
                {activeUsers.length}
              </p>
            </div>
            <div className="bg-white shadow-sm border rounded-lg p-4 max-tablet:p-3 max-phoneL:p-2">
              <p className="text-gray-500 max-tablet:text-xs">
                New Signups (This Week)
              </p>
              <p className="text-2xl font-bold text-blue-600 max-tablet:text-xl max-phoneL:text-lg">
                324
              </p>
            </div>
          </div>
        </header>
      </article>

      {/* Table Section */}
      <article className="p-6 bg-white rounded-md shadow-sm max-tablet:p-4">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-lg font-semibold text-gray-800 max-tablet:text-base max-phoneL:text-sm">
            User Activity
          </h2>

          <div className="w-full md:w-auto flex flex-wrap gap-4 items-center border-t border-gray-100 pt-4 md:border-t-0 md:pt-0">
            {/* Search Input */}
            <div className="w-full sm:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="border px-3 py-2 rounded-md text-sm w-full max-tablet:py-1 max-tablet:px-2 max-tablet:text-xs"
              />
            </div>

            {/* Date Range Filter */}
            <div className="flex flex-col gap-2 w-full sm:w-auto max-tablet:w-full">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="toggle-date-filter"
                  className="text-sm text-gray-700 whitespace-nowrap max-phoneL:text-xs"
                >
                  Filter by Date:
                </label>
                <button
                  id="toggle-date-filter"
                  onClick={() => setFilterByDate(!filterByDate)}
                  className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
                    filterByDate ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                      filterByDate ? "translate-x-6" : ""
                    } ${
                      filterByDate ? "translate-x-6" : ""
                    } max-tablet:w-3 max-tablet:h-3`}
                  />
                </button>
                <span className="text-sm text-gray-500 max-phoneL:text-xs">
                  {filterByDate ? "Enabled" : "Disabled"}
                </span>
              </div>

              {/* Conditional Date Inputs */}
              <div
                className={`flex flex-wrap gap-4 ${
                  !filterByDate ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="start-date"
                    className="text-sm text-gray-600 whitespace-nowrap max-phoneL:text-xs"
                  >
                    From
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    disabled={!filterByDate}
                    value={selectedDateRange.startDate}
                    onChange={(e) =>
                      setSelectedDateRange({
                        ...selectedDateRange,
                        startDate: e.target.value,
                      })
                    }
                    className={`border px-3 py-1 rounded-md text-sm ${
                      !filterByDate
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : ""
                    } max-tablet:px-2 max-tablet:py-0.5 max-tablet:text-xs`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="end-date"
                    className="text-sm text-gray-600 whitespace-nowrap max-phoneL:text-xs"
                  >
                    To
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    disabled={!filterByDate}
                    value={selectedDateRange.endDate}
                    onChange={(e) =>
                      setSelectedDateRange({
                        ...selectedDateRange,
                        endDate: e.target.value,
                      })
                    }
                    className={`border px-3 py-1 rounded-md text-sm ${
                      !filterByDate
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : ""
                    } max-tablet:px-2 max-tablet:py-0.5 max-tablet:text-xs max-phoneL:rounded`}
                  />
                </div>
              </div>
            </div>

            {/* Export Button */}
            <div className="w-full sm:w-auto flex-shrink-0 mt-2 sm:mt-0">
              <button className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md text-sm font-medium transition-colors max-tablet:px-3 max-tablet:py-1 max-tablet:text-xs max-phoneL:rounded">
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <table className="w-full text-sm max-tablet:text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:px-2">
                  ID
                </th>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:px-2">
                  User
                </th>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:px-2">
                  Email
                </th>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:hidden">
                  Role
                </th>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:hidden">
                  Last Login
                </th>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:hidden">
                  Status
                </th>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:hidden">
                  Usage Count
                </th>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:hidden">
                  Last IP
                </th>
                <th className="py-3.5 px-4 text-left font-semibold text-gray-700 max-phoneL:hidden">
                  Signups
                </th>
                <th className="py-3.5 px-4 text-right font-semibold text-gray-700 max-phoneL:hidden">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => router.push(`/user/${item.id}`)}
                  className="text-center cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 max-tablet:text-xs"
                >
                  <td className="py-3.5 px-4 text-left max-phoneL:px-2">
                    {item.id}
                  </td>
                  <td className="py-3.5 px-4 text-left font-medium max-phoneL:px-2">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-left text-gray-600 max-phoneL:px-2">
                    {item.email}
                  </td>
                  <td className="py-3.5 px-4 text-left max-phoneL:hidden">
                    {item.role}
                  </td>
                  <td className="py-3.5 px-4 text-left max-phoneL:hidden">
                    {item.lastLogin}
                  </td>
                  <td
                    className={`py-3.5 px-4 text-left font-semibold max-phoneL:hidden ${
                      item.status === "Active"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="py-3.5 px-4 text-left max-phoneL:hidden">
                    {item.usageCount}
                  </td>
                  <td className="py-3.5 px-4 text-left text-gray-600 max-phoneL:hidden">
                    {item.ip}
                  </td>
                  <td className="py-3.5 px-4 text-left max-phoneL:hidden">
                    {item.signups}
                  </td>
                  <td className="py-3.5 px-4 text-right flex justify-end items-center gap-3 max-phoneL:justify-center max-phoneL:gap-2">
                    <button
                      className="hover:text-blue-600"
                      title="View Details"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="hover:text-green-600" title="Edit">
                      <i className="fas fa-cog"></i>
                    </button>
                    <button className="hover:text-red-600" title="Delete">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center flex-wrap gap-4 max-tablet:flex-col max-tablet:items-start max-tablet:gap-2">
          <p className="text-sm text-gray-600 max-tablet:text-xs max-phoneL:text-[10px]">
            Showing {currentPage} to {pageCount} of {filteredData.length}{" "}
            Entries
          </p>

          <div className="flex gap-2 max-tablet:gap-1">
            <ReactPaginate
              previousLabel={"←"}
              nextLabel={"→"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex justify-center mt-6 gap-2 text-sm max-tablet:mt-4 max-tablet:text-xs"
              pageClassName="px-3 py-1 border rounded-md cursor-pointer max-tablet:px-2 max-tablet:py-0.5"
              activeClassName="bg-blue-500 text-white font-medium"
              previousClassName="px-3 py-1 border rounded-md cursor-pointer max-tablet:px-2 max-tablet:py-0.5"
              nextClassName="px-3 py-1 border rounded-md cursor-pointer max-tablet:px-2 max-tablet:py-0.5"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakLabel="..."
              breakClassName="px-3 py-1 border rounded-md opacity-70 max-tablet:px-2 max-tablet:py-0.5"
              marginPagesDisplayed={1} // Number of pages at start/end
              pageRangeDisplayed={2} // Number of middle pages shown
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default OverviewTable;
