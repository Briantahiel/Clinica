import React from 'react'
import { createBrowserRouter } from "react-router-dom"
import Home from "../components/Home"
import Form from "../components/Form"
import Login from "../components/Login"
export const userContext = React.createContext();
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/form',
        element: <Form />
    },
    {
        path: '/login',
        element: <Login />
    }
])
