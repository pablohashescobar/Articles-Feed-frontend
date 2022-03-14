import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OTPBar = () => {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const loading = useSelector((state) => state.user.loading);
    const user = useSelector((state) => state.user.user)

    return (
        !loading && isAuthenticated && user != null && !user.is_verified ? (
            <div className="alert alert-warning" role="alert">
                Looks like your email is not verified. Please check your email for a verification OTP. <Link to="/settings">Please verify OTP to continue.</Link>
            </div>) : (
            <div></div>
        )
    )
}

export default OTPBar