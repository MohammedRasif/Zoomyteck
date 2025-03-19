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
import SetNewPassword from './component/Pages/SetNewPassword.jsx';
import PasswordChange from './component/Pages/PasswordChange.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import DashboardLayout from './component/DashboardLayout/DashboardLayout.jsx';
import CompanyDetails from './component/DashboardPages/CompanyDetails.jsx';
import RecentContact from './component/DashboardPages/RecentContact.jsx';


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
      {
        path:"/setNewPassoword",
        element:<SetNewPassword/>
      },
      {
        path:"/passwordChange",
        element:<PasswordChange/>
      },
      
    ],
  },
  {
    path: "/dashboard",
    element: (<DashboardLayout />),
    children: [
      {
        index: true,
        element: <CompanyDetails />
      },
      {
       path:"/dashboard/recent_contract",
        element: <RecentContact />
      },
      
    ]
  }





]);

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <StrictMode>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </StrictMode>
  </ThemeProvider>,
)
