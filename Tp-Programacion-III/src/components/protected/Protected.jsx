import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const Protected = ({ children }) => {
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsValid(false);
            return;
        }
        
        fetch('http://localhost:3000/api/auth/verify-token', {
            headers: { 'x-token': token }
        })
            .then(res => {
                if (res.ok) {
                    setIsValid(true);
                } else {
                    localStorage.removeItem("token");
                    setIsValid(false);
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                setIsValid(false);
            });
    }, []);

    if (isValid === null) return <div>Cargando...</div>;
    if (!isValid) return <Navigate to="/login" replace />;

    return children;
}

export default Protected