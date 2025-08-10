import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Layout } from "@/components/Layout";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getMonthMatrix(year: number, month: number) {
  // month: 0-indexed
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday as first day
  const daysInMonth = lastDay.getDate();

  const matrix: ({ date: number, currentMonth: boolean, label?: string } | null)[][] = [];
  let week: ({ date: number, currentMonth: boolean, label?: string } | null)[] = [];
  let dayCounter = 1;

  // Fill first week
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = 0; i < 7; i++) {
    if (i < firstDayOfWeek) {
      week.push({ date: prevMonthLastDay - (firstDayOfWeek - i - 1), currentMonth: false });
    } else {
      week.push({ date: dayCounter++, currentMonth: true });
    }
  }
  matrix.push(week);

  // Fill rest of the weeks
  while (dayCounter <= daysInMonth) {
    week = [];
    for (let i = 0; i < 7; i++) {
      if (dayCounter > daysInMonth) {
        // Next month
        week.push({ date: dayCounter - daysInMonth, currentMonth: false });
        dayCounter++;
      } else {
        week.push({ date: dayCounter++, currentMonth: true });
      }
    }
    matrix.push(week);
  }
  // Ensure 6 rows for full calendar
  while (matrix.length < 6) {
    week = [];
    for (let i = 0; i < 7; i++) {
      week.push(null);
    }
    matrix.push(week);
  }
  // Remove last row if it contains no current month days
  while (
    matrix.length > 0 &&
    matrix[matrix.length - 1].every(
      (cell) => !cell || !cell.currentMonth
    )
  ) {
    matrix.pop();
  }
  return matrix;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const matrix = getMonthMatrix(currentYear, currentMonth);

  function goToPrevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }
  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }
  function goToToday() {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-screen h-screen overflow-hidden" style={{height: '100vh'}}>
        <div className="sticky top-0 bg-white z-10">
          <ProjectHeader />
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="mb-4 flex flex-col gap-2 px-6 pt-6">
            <div className="flex items-center gap-2">
              <div className="relative w-40">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Search calendar"
                  className="border rounded-md pl-9 pr-3 py-1.5 text-sm w-full bg-white"
                />
              </div>
              {/* Avatars removed */}
              <button className="border rounded-md px-2 py-1.5 text-sm bg-white flex items-center gap-1">
                Filter <ChevronDown className="w-4 h-4" />
              </button>
              <div className="flex-1" />
              <button onClick={goToToday} className="border rounded-md px-3 py-1.5 text-sm bg-white">Today</button>
              <button onClick={goToPrevMonth} className="border rounded-md px-2 py-1.5 bg-white"><ChevronLeft className="w-4 h-4" /></button>
              <span className="text-sm font-medium">{monthNames[currentMonth]} {currentYear}</span>
              <button onClick={goToNextMonth} className="border rounded-md px-2 py-1.5 bg-white"><ChevronRight className="w-4 h-4" /></button>
              <button className="border rounded-md px-2 py-1.5 bg-white">
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </button>
              <button className="border rounded-md px-2 py-1.5 bg-white">
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7" /><circle cx="8" cy="7" r="2" fill="none" /><line x1="4" y1="17" x2="20" y2="17" /><circle cx="16" cy="17" r="2" fill="none" /></svg>
              </button>
            </div>
          </div>
          {/* Calendar Table */}
          <div className="flex-1 flex flex-col px-6 min-h-0" style={{marginBottom: '40px'}}>
            <div className="bg-white rounded-md border-1 border-gray-300 overflow-hidden flex-1 flex flex-col min-h-0">
              <table className="w-full h-full text-center select-none border-collapse table-fixed" >
                <thead className="bg-gray-50 text-gray-500 text-sm">
                  <tr style={{height: '40px'}}>
                    {daysOfWeek.map((day) => (
                      <th
                        key={day}
                        className="py-2 font-medium border-[1px] border-solid border-gray-200 w-1/7 bg-gray-50 text-center"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((week, i) => (
                    <tr key={i} style={{height: `calc(100% / ${matrix.length})`}}>
                      {week.map((cell, j) => (
                        <td
                          key={j}
                          className={`align-top text-left pt-2 !pl-3 text-sm font-normal transition-colors border-[1px] border-solid border-gray-200 ${cell?.currentMonth ? "text-gray-700 bg-white" : "text-gray-300 bg-gray-50"}`}
                        >
                          {cell ? (cell.label ? cell.label : cell.date) : ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        <div style={{height: '40px', flexShrink: 0}} />
        </div>
      </div>
    </Layout>
  );
}
