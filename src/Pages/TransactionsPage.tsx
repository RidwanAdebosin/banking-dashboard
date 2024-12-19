import { useContext } from "react";
import { PaymentContext } from "../Context/PaymentContext";
import { UserDataType } from "../utils/data";

const TransactionsPage = () => {
  const { transactions } = useContext(PaymentContext);

  return (
    <section className="flex flex-col justify-start items-center h-svh pt-[30px] dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Transactions History</h1>

      <div className="overflow-x-auto w-full px-4">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Account No.</th>
              <th className="p-4 border-b">Amount</th>
              <th className="p-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((user: UserDataType) => (
              <tr
                key={user.accountNumber}
                className="hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              >
                <td className="p-4 border-b font-semibold">{user.name}</td>
                <td className="p-4 border-b">{user.accountNumber}</td>
                <td className="p-4 border-b">
                  ₦{user.lastTransaction.lastTransaction.amount}
                </td>
                <td className="p-4 border-b">{user.lastTransaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionsPage;
