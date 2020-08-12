import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            <img
                style={{ width: "65%" }}
                className="margin-top-2x"
                src="/images/page_not_found.svg"
                alt="Page Not Found"
            />
            <Link to="/">Go Home</Link>
        </div>
    );
}
