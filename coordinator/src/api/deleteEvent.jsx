import React, { useState, useEffect } from "react";

const deleteEvent = async ({ hallID, date, eventName }) => {
    try {
        const response = await fetch("http://localhost:3000/deleteEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ hallID, date, eventName }),
        });

        console.log(JSON.stringify({ hallID, date, eventName }));

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Event deleted successfully:", data);
        return data;
    } catch (error) {
        console.error("Error deleting event:", error);
        return { error: error.message };
    }
};

export default deleteEvent;
