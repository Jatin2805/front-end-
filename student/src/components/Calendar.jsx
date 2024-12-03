import React from "react";
import Calendar from "react-calendar";
import "../styles/CalendarComponent.css";

function CalendarComponent({
    hallID,
    selectedDate,
    onDateChange,
    tileClassName,
    onDateClick,
    eventData,
}) {
    const handleDateClick = (date) => {
        onDateChange(date);
        onDateClick(date);
    };

    return (
        <div className="container">
            <Calendar
                value={selectedDate}
                onChange={onDateChange}
                onClickDay={handleDateClick}
                tileClassName={tileClassName}
            />
        </div>
    );
}

export default CalendarComponent;
