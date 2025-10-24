import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const Protected = ({ children, allowedRoles = [] }) => {
    const [isValid, setIsValid] = useState(null);
    const { user, setUser } = useUser();

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
                    return res.json();
                } else {
                    localStorage.removeItem("token");
                    setIsValid(false);
                    return null;
                }
            })
            .then(data => {
                if (data) {
                    setUser(data.user);
                    if (allowedRoles.includes(data.user.role)) {
                        setIsValid(true);
                    } else {
                        setIsValid(false);
                    }
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                setIsValid(false);
            });
    }, [allowedRoles, setUser]);

    if (isValid === null) return <div>Cargando...</div>;
    if (!isValid) {
        if (!user) {
            return <Navigate to="/login" replace />;
        }
        if (user.role === 'user') {
            return <Navigate to="/home" replace />;
        }
        if (user.role === 'admin' || user.role === 'superadmin') {
            return <Navigate to="/dashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return children;
}

export default Protected