import { createBrowserRouter, Outlet } from "react-router-dom";
import AdminDashBoard from "../Pages/AdminDashBoard";
import Layout from "./Layout";
import TransactionsPage from "../Pages/TransactionsPage";
import CustomersPage from "../Pages/CustomersPage";
import SingleClientPage from "../Pages/SingleClientPage";
// import { usersData } from "../utils/data";
import { UsersContext } from "../Context/UsersContext";
import Error from "../Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AdminDashBoard />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
        // loader: () => usersData,
      },
      {
        path: "customers/:accountNumber",
        element: <SingleClientPage />,
        loader: async ({ params }) => {
          const user = UsersContext.find(
            (user) => user.accountNumber === Number(params.accountNumber)
          );
          return user;
        },
      },
      {
        path: "/transactions-page",
        element: <TransactionsPage />,
      },
    ],
  },
]);

export default router;
