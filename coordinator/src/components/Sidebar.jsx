import React, { useState, useEffect, useRef } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import HallTitle from "../components/HallTitle.jsx";
import HallData from "../api/fetchHallData.jsx";
import "../styles/Sidebar.css";

const Sidebar = ({ hallID }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(0);
    const [hallName, setHallName] = useState("");
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const basePath = hallID;

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1700px)");
        setIsSmallScreen(mediaQuery.matches);

        const handleResize = () => {
            setIsSmallScreen(mediaQuery.matches);
            if (!mediaQuery.matches) {
                setIsVisible(true);
            }
        };

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    const navigateToEvents = () => {
        navigate(`/events/${basePath}`);
    };

    const navigateToDashboard = () => {
        navigate(`/hall/${basePath}`);
    };

    useEffect(() => {
        if (sidebarRef.current) {
            setSidebarWidth(isVisible ? sidebarRef.current.offsetWidth : 0);
        }
    }, [isVisible]);

    const handleLogout = () => {
        document.cookie.split(";").forEach((cookie) => {
            document.cookie = cookie
                .replace(/^ +/, "")
                .replace(
                    /=.*/,
                    "=;expires=" + new Date(0).toUTCString() + ";path=/"
                );
        });
        navigate("/");
    };

    const handleHallData = (data) => {
        setHallName(data.hallName);
    };

    return (
        <div>
            <HallTitle
                isVisible={isVisible}
                sidebarWidth={sidebarWidth}
                basePath={basePath}
                hallName={hallName}
            />
            {isSmallScreen && (
                <button className="toggle-button" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            )}
            {(isSmallScreen || isVisible) && (
                <>
                    <div
                        ref={sidebarRef}
                        className={`sidebar ${
                            isVisible ? "visible" : "hidden"
                        }`}
                    >
                        <div className="logo">
                            <img
                                src="/Assets/images/aac-masked.png"
                                alt="LOGO"
                                className="logo-image"
                            />
                        </div>
                        <ul className="menu">
                            <li
                                className="menu-item"
                                onClick={navigateToDashboard}
                            >
                                CALENDAR
                            </li>
                            <li
                                className="menu-item"
                                onClick={navigateToEvents}
                            >
                                EVENTS
                            </li>
                            <li
                                className="menu-item logout"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </li>
                        </ul>
                    </div>
                    {isSmallScreen && isVisible && (
                        <div
                            className="sidebar-only"
                            onClick={toggleSidebar}
                        ></div>
                    )}
                </>
            )}
            <HallData hallID={hallID} onDataReceived={handleHallData} />
        </div>
    );
};

export default Sidebar;
