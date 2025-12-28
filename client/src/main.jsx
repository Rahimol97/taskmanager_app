import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import './index.css'
import App from './App.jsx'
import AddTask from  './pages/AddTask.jsx'
import EditTask from './pages/EditTask.jsx'
import ViewTask from './pages/ViewTask.jsx'

import axios from "axios";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([

  {
    path:'/',
    element:<App/>,
    children:[
      {path:'/',element:<Dashboard/>},
      {path:'/login',element:<Login/>},
      {path:'/register',element:<Signup/>},
      {path:'/task/add',element:<AddTask/>},
      {path:'/task/edit/:id',element:<EditTask/>},
      {path:'/task/view/:id',element:<ViewTask/>},
      
    ]
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
