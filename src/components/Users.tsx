import { useContext, useState } from "react";
import { FilterProvider, useFilter } from "../Context/FilterContext";
import PaymentModal from "./PaymentModal";
import { UserDataType } from "../utils/data";
import { PaymentContext } from "../Context/PaymentContext";

export const Users = () => {
  const { onFilteredUser } = useFilter();
  const { accounts, userBalance, setUserBalance } = useContext(PaymentContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);

  const handleOpenModal = (user: UserDataType) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };
  console.log(accounts[0].balance);
  const newBalance = accounts.map((account, index) => account.balance);
  console.log(newBalance);

  return (
    <FilterProvider>
      <section className="relative flex flex-col w-full h-[70svh] text-gray-700 bg-white dark:bg-blue-950 dark:text-white rounded-lg bg-clip-border py-4">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Account No.</th>
              <th>Status</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {onFilteredUser.map((user: UserDataType) => (
              <tr
                key={user.accountNumber}
                className="hover:border-b-2 hover:border-black"
              >
                <td className="font-semibold">{user.name}</td>
                <td>{user.accountNumber}</td>
                <td
                  className={`${user.accountStatus === "Active" ? "text-green-800" : "text-red-700"}`}
                >
                  {user.accountStatus}
                </td>
                <td>₦{newBalance}</td>
                <td>₦{user.balance}</td>

                <td className="flex justify-end my-2">
                  {user.accountStatus === "Active" ? (
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="bg-green-600 px-5 md:px-10 py-1 border rounded-lg"
                    >
                      Pay
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-red-600 px-1 md:px-10 py-1 border rounded-lg"
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
    </FilterProvider>
  );
};
