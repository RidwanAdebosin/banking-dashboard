import { UserDataType } from "../utils/data";
// import { FilterContext, FilterProvider } from "../Context/FilterContext";
// import { useContext } from "react";
// import { PaymentContext } from "../Context/PaymentContext";
import { useParams } from "react-router";

const CustomersPage = ({ user }) => {
  const { accountNumber } = useParams();
  // console.log(params);
  // const { accounts } = useContext(FilterContext);
  // const { selectedUser, setSelectedUser } = useContext(PaymentContext);

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
          {user.map((user: UserDataType) => (
            <tr
              key={user?.accountNumber}
              className="hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <td className="text-blue-500 hover:underline">{user?.name}</td>
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
