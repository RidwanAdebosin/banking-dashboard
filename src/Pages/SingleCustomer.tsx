import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { FilterContext } from "../Context/FilterContext";
import { PaymentContext } from "../Context/PaymentContext";

const InfoSection = ({ title, children }) => (
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
  const { accounts } = useContext(FilterContext);
  const { accountNumber } = useParams();
  const { loading, setIsLoading } = useContext(PaymentContext);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const user = accounts?.find(
    (user) => user.accountNumber === Number(accountNumber)
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

        <InfoSection title="Last Transaction">
          <p>
            <span className="font-semibold tracking-wide">Date & Time:</span>{" "}
            {new Date(user.lastTransaction.date).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold tracking-wide">Amount:</span> ₦
            {user.lastTransaction.amount.toLocaleString()}
          </p>
        </InfoSection>

        <div className="p-6 bg-white rounded-lg shadow-md dark:bg-blue-800 flex justify-center">
          {user.accountStatus === "Active" ? (
            <button
              disabled
              className="px-6 py-3 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 tracking-wide"
            >
              Pay Now
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
    </section>
  );
};

export default SingleCustomer;
