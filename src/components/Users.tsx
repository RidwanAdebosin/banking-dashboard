import { UserDataType } from "../utils/data";
import { FilterProvider, useFilter } from "../Context/FilterContext";

export const Users = () => {
  const { onFilteredUser, onPayUser, userBalance } = useFilter();
  // const handleTransfer = () => {};
  return (
    <FilterProvider>
      <section className="relative flex flex-col w-full h-[70svh] text-gray-700 bg-white dark:bg-blue-950 dark:text-white rounded-lg bg-clip-border py-4">
        <table className="w-full text-left table-auto">
          <thead className="">
            <tr className=" ">
              <th>Name</th>
              <th>Account No.</th>
              <th className="">Status</th>
              <th className="">Balance</th>
              {/* <th></th> */}
            </tr>
          </thead>
          {onFilteredUser.map((user: UserDataType) => (
            <tbody key={user?.accountNumber} className="mb-4">
              <tr className="hover:border-b-2 hover:border-black">
                <td className="font-semibold">{user?.name}</td>
                <td>{user?.accountNumber}</td>
                <td
                  className={`${
                    user.accountStatus === "Active"
                      ? " text-green-800 font-semibold hidden md:flex"
                      : "text-red-700 font-semibold hidden md:flex"
                  }`}
                >
                  {user?.accountStatus}
                </td>
                <td className="">₦{userBalance}</td>
                <td className="flex justify-end my-2">
                  {user?.accountStatus === "Active" ? (
                    <button
                      onClick={() => onPayUser()}
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
            </tbody>
          ))}
        </table>
      </section>
    </FilterProvider>
  );
};
