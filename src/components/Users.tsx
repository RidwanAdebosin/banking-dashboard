import PaymentModal from "./PaymentModal";
import { UserDataType } from "../utils/data";
import { useContext, useState } from "react";
import { PaymentContext } from "../Context/PaymentContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export const Users = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { accounts, selectedUser, setSelectedUser } =
    useContext(PaymentContext);

  const handleOpenModal = (user: UserDataType) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  const params = useParams();
  return (
    <section className="relative flex flex-col w-full h-svh text-gray-800 bg-white dark:bg-gray-300 dark:text-white rounded-lg bg-clip-border py-6 px-4">
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="text-sm font-medium text-gray-600">Name</th>
            <th className="text-sm font-medium text-gray-600">Account No.</th>
            <th className="text-sm font-medium text-gray-600 hidden md:flex">
              Status
            </th>
            <th className="text-sm font-medium text-gray-600">Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((user: UserDataType) => (
            <tr
              key={user.accountNumber}
              className="hover:border-b-2 hover:border-indigo-600 transition duration-300"
            >
              <td className="font-semibold text-gray-800">
                <Link to={`/customers/:accountNumber}`}>{user.name}</Link>
              </td>
              <td className="text-gray-600">{user.accountNumber}</td>
              <td
                className={`${
                  user.accountStatus === "Active"
                    ? "text-green-700"
                    : "text-red-700"
                } hidden md:flex`}
              >
                {user.accountStatus}
              </td>
              <td className="font-semibold text-gray-900">₦{user.balance}</td>

              <td className="flex justify-end my-2">
                {user.accountStatus === "Active" ? (
                  <button
                    onClick={() => handleOpenModal(user)}
                    className="bg-green-600 text-white px-5 md:px-10 py-2 border rounded-lg text-sm font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  >
                    Pay
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-5 md:px-10 py-2 border rounded-lg text-sm font-semibold cursor-not-allowed"
                  >
                    Freezed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <PaymentModal
          user={selectedUser}
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};
