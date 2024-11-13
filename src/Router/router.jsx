import { createBrowserRouter, Outlet } from "react-router-dom";
import AdminDashBoard from "../Pages/AdminDashBoard";
import TransactionsPage from "../Pages/TransactionsPage";
import CustomersPage from "../Pages/CustomersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminDashBoard />,

    children: [
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
