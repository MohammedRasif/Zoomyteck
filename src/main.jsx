import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Roots from './Root/Roots.jsx';
import Home from './component/Home/Home.jsx';
import Login from './component/Pages/Login.jsx';
import Register from './component/Pages/Register.jsx';
import ForgetPassword from './component/Pages/ForgetPassword.jsx';
import Verification from './component/Pages/Verification.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element:<Roots/> ,
    children: [
      {
        path: "/",
        element:<Home/> ,
      },
      {
        path: "/login",
        element:<Login/> ,
      },
      {
        path: "/register",
        element:<Register/> ,
      },
      {
        path:"/forgetPassword",
        element:<ForgetPassword/>
      },
      {
        path:"/verification",
        element:<Verification/>
      },
      
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </StrictMode>,
)
