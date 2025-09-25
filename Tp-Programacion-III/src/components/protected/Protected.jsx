import React from 'react'
import { Navigate } from 'react-router-dom'
const Protected = ({isSingedIn, children }) =>{
    if (!isSingedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default Protected