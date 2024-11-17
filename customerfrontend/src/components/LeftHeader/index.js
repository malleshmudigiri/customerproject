import {Link} from "react-router-dom";
import React from "react";
import "./index.css";


const LeftHeader=()=> {
    return (
        <div className="LeftHeader">
            <Link to="/upload" className="uploadCustomer">Upload Customer</Link>
            <Link to="/search">Search Customer</Link>
        </div>

    )
}

export default LeftHeader;