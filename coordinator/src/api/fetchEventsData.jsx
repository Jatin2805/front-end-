import React, { useEffect } from "react";

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
};

const assignColorsToEvents = (data) => {
    const updatedData = { ...data };
    for (const date in updatedData) {
        if (updatedData.hasOwnProperty(date)) {
            updatedData[date] = updatedData[date].map((event) => {
                const color = getRandomColor();
                return {
                    ...event,
                    color,
                };
            });
        }
    }
    return updatedData;
};

const EventsData = ({ hallID, onDataReceived }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/hall/${hallID}`
                );
                const data = await response.json();
                const dataWithColors = assignColorsToEvents(data);

                console.log(`Hall ID: ${hallID}`);
                console.log("Original Data from Fetch:", dataWithColors);
                onDataReceived(dataWithColors);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [hallID]);

    return null;
};

export default EventsData;
