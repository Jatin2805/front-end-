const handleLogin = async (username, password) => {
    try {
        const response = await fetch("http://localhost:3000/handleLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);

            const coordinator = data.coordinator;
            if (
                coordinator &&
                coordinator.coordinatorName &&
                coordinator.coordinatorMail &&
                coordinator.hallNumber &&
                coordinator.hallName
            ) {
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 7);
                const expires = `expires=${expiryDate.toUTCString()}; path=/`;

                document.cookie = `coordinatorName=${coordinator.coordinatorName}; ${expires}`;
                document.cookie = `coordinatorMail=${coordinator.coordinatorMail}; ${expires}`;
                document.cookie = `hallNumber=${coordinator.hallNumber}; ${expires}`;
                document.cookie = `hallName=${coordinator.hallName}; ${expires}`;

                window.location.href = `/hall/${coordinator.hallNumber}`;
            } else {
                console.error(
                    "Received coordinator data contains undefined values:",
                    coordinator
                );
            }
        } else {
            const errorData = await response.json();
            console.log("Login failed:", errorData.error);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
};

export default handleLogin;
