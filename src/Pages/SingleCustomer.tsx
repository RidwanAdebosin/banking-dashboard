import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FilterContext } from "../Context/FilterContext";
import { PaymentContext } from "../Context/PaymentContext";
import { UserDataType } from "../utils/data";
import { SendMoneyModal } from "../components/SendMoneyModal";

interface PaymentContextType {
  loading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: object;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
  transactions: UserDataType;
}

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6 bg-white rounded-lg shadow-md dark:bg-blue-800">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
      {title}
    </h2>
    <div className="space-y-2 text-gray-600 dark:text-gray-300">{children}</div>
  </div>
);

const SkeletonLoader = () => (
  <section className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4 font-inter animate-pulse">
    <div className="w-full max-w-4xl space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-6 bg-gray-200 rounded-lg shadow-md">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-2 text-gray-600">
            {[...Array(index === 2 ? 2 : 5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const SingleCustomer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { accounts } = useContext(FilterContext);
  const { accountNumber } = useParams();
  const { loading, setIsLoading, selectedUser, setSelectedUser, transactions } =
    useContext(PaymentContext) as PaymentContextType;

  const handleOpenModal = (user: UserDataType) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // console.log(accounts);
  const user = accounts?.find(
    (user: UserDataType) => user.accountNumber === Number(accountNumber)
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-blue-950">
        <h1 className="text-2xl font-semibold text-red-600">User not found</h1>
      </div>
    );
  }
  return loading ? (
    <SkeletonLoader />
  ) : (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-blue-950 py-8 px-4 font-inter">
      <div className="w-full max-w-4xl space-y-6">
        <InfoSection title="Account Information">
          <p>
            <span className="font-semibold tracking-wide">Account Type:</span>{" "}
            {user.accountType}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Account Number:</span>{" "}
            {user.accountNumber}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Status:</span>{" "}
            <span
              className={`${
                user.accountStatus === "Active"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {user.accountStatus}
            </span>
          </p>
          <p>
            <span className="font-semibold tracking-wide">Balance:</span> ₦
            {user.balance.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Created At:</span>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </InfoSection>

        <InfoSection title="User Information">
          <p>
            <span className="font-semibold tracking-wide">Name:</span>{" "}
            {user.name}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Email:</span>{" "}
            {user.email}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Phone:</span>{" "}
            {user.phoneNumber}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Date of Birth:</span>{" "}
            {new Date(user.dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Address:</span>{" "}
            {user.address}
          </p>
          <p>
            <span className="font-semibold tracking-wide">User Type:</span>{" "}
            {user.userType}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Verified:</span>{" "}
            {user.isVerified ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </p>
        </InfoSection>

        <InfoSection title="Latest Transactions">
          <ul>
            {/* <li>
              <p>
                <span className="font-semibold tracking-wide">
                  Date & Time:
                </span>{" "}
                {new Date(user.lastTransaction.date).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold tracking-wide">
                  Amount Received:
                </span>{" "}
                ₦{user.lastTransaction.amountReceived?.toLocaleString()}
              </p>
            </li> */}
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="text-sm text-gray-800 dark:text-white tracking-wide ">
                    Receiver's Name
                  </th>
                  <th className="text-sm text-gray-800 dark:text-white tracking-wide">
                    Account No.
                  </th>
                  {/* <th className="text-sm text-gray-800 dark:text-white tracking-wide">
                    Amount Received
                  </th> */}
                  <th className="text-sm text-gray-800 dark:text-white tracking-wide hidden md:flex">
                    Amount Sent
                  </th>
                  <th className="text-sm text-gray-800 dark:text-white tracking-wide">
                    Date / Time
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((user: UserDataType) => (
                  <tr
                    key={user.accountNumber}
                    className="hover:border-b-2 hover:border-indigo-600 transition duration-300"
                  >
                    <td className="text-semibold text-gray-800 dark:text-white">
                      {user.name}
                    </td>
                    <td className="text-base text-gray-800 dark:text-white">
                      {user.accountNumber}
                    </td>

                    <td className="text-base text-gray-800 dark:text-white">
                      ₦{user.lastTransaction.amountReceived || 0}
                    </td>
                    {/* <td className="text-gray-600">
                      ₦{user.lastTransaction.amountSent || 0}
                    </td> */}
                    <td className="font-semibold text-base text-gray-800 dark:text-white">
                      {user.lastTransaction.date.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </InfoSection>

        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-blue-800 flex justify-center">
          {user.accountStatus === "Active" ? (
            <button
              onClick={() => handleOpenModal(user)}
              className="px-6 py-3 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 tracking-wide"
            >
              Send Money
            </button>
          ) : (
            <button
              disabled
              className="px-6 py-3 text-white bg-red-600 rounded-lg cursor-not-allowed shadow tracking-wide"
            >
              Freezed
            </button>
          )}
        </div>
      </div>
      {selectedUser && (
        <SendMoneyModal
          user={selectedUser}
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default SingleCustomer;
