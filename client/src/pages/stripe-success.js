import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from "../context"
import { useContext } from 'react';
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const StripeSuccess = () => {
    const navigate = useNavigate();
    const [state, setstate] = useContext(UserContext);
    if (!state) {
        navigate("/login");
    }

    useEffect(() => {
        const getSubscriptionStatus = async () => {
            const { data } = await axios.get('/subscription-status');
            console.log('Subscription status =>', data);
            if (data && data.length === 0) {
                navigate("/");
            } else {
                navigate("/account");
            }
        };

        getSubscriptionStatus();
    }, [navigate]);

    return (
        <div className="d-flex justify-content-center fw-bold" style={{ height: "90vh" }}>
            <div className="d-flex align-items-center">
                <SyncOutlined spin style={{ fontSize: "50px" }} />
            </div>
        </div>
    )
}

export default StripeSuccess;