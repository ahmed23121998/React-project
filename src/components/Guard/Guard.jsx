import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { tokenContext } from '../../Context/token'

function Guard({ children }) {
    let { isAuth } = useContext(tokenContext)

    if (isAuth) {
        return children
    }
    else {
        return <Navigate to="/login" />
    }
}

export default Guard
