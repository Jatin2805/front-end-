import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useParams,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";

const DashboardWrapper = () => {
    const { hallNumber } = useParams();
    return <Dashboard hallID={hallNumber} />;
};

const EventsPageWrapper = () => {
    const { hallNumber } = useParams();
    return <EventsPage hallID={hallNumber} />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/events/:hallNumber"
                    element={<EventsPageWrapper />}
                />
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/hall/:hallNumber"
                    element={<DashboardWrapper />}
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
