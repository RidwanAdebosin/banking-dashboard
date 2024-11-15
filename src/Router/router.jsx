import { createBrowserRouter, Outlet } from "react-router-dom";
import AdminDashBoard from "../Pages/AdminDashBoard";
import Layout from "./Layout";
import TransactionsPage from "../Pages/TransactionsPage";
import CustomersPage from "../Pages/CustomersPage";

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <AdminDashBoard />,
      },
      {
        path: "customers-page",
        element: <CustomersPage />,
      },
      {
        path: "/transactions-page",
        element: <TransactionsPage />,
      },
    ],
  },
]);

export default router;
