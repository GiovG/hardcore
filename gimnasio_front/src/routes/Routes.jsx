import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../components/Auth/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleProtectedRoute from "./RoleProtectedRoute.jsx";
import Profile from "../pages/Profile.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import EmployeePage from "../pages/EmployeePage.jsx";
import ActividadesPage from "../pages/Actividades.jsx";
import Register from '../pages/Register';
import ErrorPage from "../pages/Error.jsx";
import ActivityEdit from "../pages/EditActivities.jsx";


const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true, // path: "/"
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-activity/:id",
        element: (
          <RoleProtectedRoute allowedRoles={[ "employee", "admin"]}>
            <ActivityEdit />
          </RoleProtectedRoute>
        ),
      },
      
      {
        path: "admin",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "employee",
        element: (
          <RoleProtectedRoute allowedRoles={["employee", "admin"]}>
            <EmployeePage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "actividades",
        element: (
          <RoleProtectedRoute allowedRoles={["user", "employee", "admin"]}>
            <ActividadesPage />
          </RoleProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export { Router };
