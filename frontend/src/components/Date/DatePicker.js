import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const DatePicker = ({ initialDate = null, onDateChange, className = "" }) => {
  // const [selectedDate, setSelectedDate] = useState(initialDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    initialDate ? initialDate.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    initialDate ? initialDate.getFullYear() : new Date().getFullYear()
  );
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);

    setShowCalendar(false);
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  const handleMonthChange = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleYearChange = (increment) => {
    setCurrentYear(currentYear + increment);
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        day === initialDate?.getDate() &&
        currentMonth === initialDate?.getMonth() &&
        currentYear === initialDate?.getFullYear();
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`p-2 hover:bg-blue-400 rounded-sm ${
            isSelected ? "bg-blue-500 text-white" : ""
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="flex items-center border rounded-md p-2 cursor-pointer"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <Calendar className="mr-2" size={20} />
        <span>
          {initialDate ? initialDate.toLocaleDateString() : "Select a date"}
        </span>
      </div>
      {showCalendar && (
        <div className="absolute top-full left-0 mt-1 bg-bg-pf border rounded-md shadow-lg z-10 p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => handleMonthChange(-1)} className="p-1">
              <ChevronLeft size={20} />
            </button>
            <span className="font-bold">
              {months[currentMonth]} {currentYear}
            </span>
            <button onClick={() => handleMonthChange(1)} className="p-1">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => handleYearChange(-1)} className="p-1">
              <ChevronLeft size={20} />
            </button>
            <span className="font-bold">{currentYear}</span>
            <button onClick={() => handleYearChange(1)} className="p-1">
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center font-bold">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
