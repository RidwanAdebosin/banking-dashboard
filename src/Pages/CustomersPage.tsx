import { Link, useLoaderData } from "react-router-dom";
import { UserDataType, usersData } from "../utils/data";

const CustomersPage = () => {
  // const usersData = useLoaderData() as UserDataType[];
  const handleTransfer = () => {
    // Implement transfer logic here
  };

  return (
    <section className="relative flex flex-col h-screen w-full text-gray-700 bg-white dark:bg-blue-950 dark:text-white rounded-lg bg-clip-border py-4">
      <table className="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th>Name</th>
            <th>Account No.</th>
            <th>Status</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user: UserDataType) => (
            <tr
              key={user?.accountNumber}
              className="hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <td>
                <Link
                  to={`/customers/${user.accountNumber}`}
                  className="text-blue-500 hover:underline"
                >
                  {user?.name}
                </Link>
              </td>
              <td>{user?.accountNumber}</td>
              <td
                className={`${
                  user.accountStatus === "Active"
                    ? "text-green-800"
                    : "text-red-700"
                }`}
              >
                {user?.accountStatus}
              </td>
              <td>₦{user?.balance}</td>
              <td>
                {user?.accountStatus === "Active" ? (
                  <button className="bg-green-600 px-10 py-1 border rounded-lg">
                    Pay
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-red-600 px-6 py-1 border rounded-lg"
                  >
                    Freezed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CustomersPage;
