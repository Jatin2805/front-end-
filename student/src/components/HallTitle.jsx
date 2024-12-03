import React from "react";
import "../styles/HallTitle.scss";

const HallTitle = ({ isVisible, sidebarWidth, basePath, hallName }) => {
    const bannerStyles = {
        width: isVisible ? "80%" : "100%",
        paddingLeft: isVisible ? `${sidebarWidth}px` : "0",
    };

    return (
        <div className="banner-box">
            <div className="banner" style={bannerStyles}>
                <img src="/Assets/images/banner.png" alt="Banner" />
            </div>
            <div className="hall-name">{hallName}</div>
        </div>
    );
};

export default HallTitle;
