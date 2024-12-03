const fetchHolidays = async () => {
    console.log("Fetching HOLIDAYS...");
    try {
        const response = await fetch(`http://localhost:3000/getHolidays`);
        if (!response.ok) {
            throw new Error("Failed to fetch holidays");
        }
        const data = await response.json();
        console.log("Holidays Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching holidays:", error);
        return [];
    }
};

export default fetchHolidays;
