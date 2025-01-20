import { useContext, useEffect, useState } from "react";
import { PaymentContext } from "../Context/PaymentContext";
import { UserDataType } from "../utils/data";

// export interface TransactionDataType {
//   transactions: {
//     name: string;
//     balance: number;
//     accountNumber: number;
//     accountType: string;
//     email: string;
//     phoneNumber: number;
//     address: string;
//     dateOfBirth: string | number;
//     lastTransaction: {
//       date: number | string | object;
//       amount: number;
//       description: string;
//     };
//     accountStatus: string;
//     createdAt: number | string;
//     currency: string;
//     userType: string;
//     isVerified: boolean;
//   };
// }

const TransactionsPage = () => {
  const { transactions, loading, setIsLoading } = useContext(PaymentContext);
  // const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <section className="flex flex-col justify-start items-center h-svh pt-[30px] dark:text-white">
          <h1 className="text-2xl font-bold mb-6">Transactions History</h1>

          <div className="overflow-x-auto w-full px-4">
            <table className="w-full text-left table-auto border-collapse">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Account No.</th>
                  <th className="p-4 border-b">Amount Received</th>
                  <th className="p-4 border-b">Amount Sent</th>
                  <th className="p-4 border-b">Date / Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="animate-pulse">
                  <td className="p-4 border-b">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                  <td className="p-4 border-b">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                  <td className="p-4 border-b">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                  <td className="p-4 border-b">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="flex flex-col justify-start items-center h-svh pt-[30px] dark:text-white">
          <h1 className="text-2xl font-bold mb-6">Transactions History</h1>

          <div className="overflow-x-auto w-full px-4">
            <table className="w-full text-left table-auto border-collapse">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Account No.</th>
                  <th className="p-4 border-b">Amount Sent</th>
                  <th className="p-4 border-b">Amount Received</th>
                  <th className="p-4 border-b">Date / Time</th>
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
                      ₦{user.lastTransaction.amountSent || 0}
                    </td>
                    <td className="p-4 border-b">
                      ₦{user.lastTransaction.amountReceived || 0}
                    </td>
                    <td className="p-4 border-b">
                      {user.lastTransaction.date.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default TransactionsPage;
