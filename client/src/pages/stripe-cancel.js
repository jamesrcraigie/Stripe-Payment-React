import { useState, useEffect } from 'react';
import axios from 'axios';
import { WarningTwoTone } from "@ant-design/icons";
import { UserContext }  from "../context"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const StripeCancel = () => {
    const [state, setstate] = useContext(UserContext);
    const navigate = useNavigate();
    if (!state) {
        navigate("/login");
    }
    return (
        <div className="d-flex justify-content-center fw-bold" style={{ height: "90vh" }}>
            <div className="d-flex align-items-center">
                <WarningTwoTone style={{ fontSize: "50px" }}/>
            </div>
        </div>
    )
}

export default StripeCancel;