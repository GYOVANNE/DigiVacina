import React from "react";
import "./styles.css";

function Footer({ children }) {
    return (
        <div>
            <div className="footer">
                { children }
                <span>Copyright © 2020 - DigiVacina</span>
            </div>
        </div>
    )
}

export default Footer