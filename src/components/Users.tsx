import { UserDataType } from "../utils/data";
import { FilterProvider, useFilter } from "../Context/FilterContext";

export const Users = () => {
  const { onFilteredUser } = useFilter();
  // const handleTransfer = () => {};
  return (
    <FilterProvider>
      <section className="relative flex flex-col w-full h-[70svh] text-gray-700 bg-white dark:bg-blue-950 dark:text-white rounded-lg bg-clip-border py-4">
        <table className="w-full text-left table-auto min-w-max">
          <thead className="">
            <tr className=" ">
              <th>Name</th>
              <th>Account No.</th>
              <th>Status</th>
              <th>Balance</th>
              <th></th>
            </tr>
          </thead>
          {onFilteredUser.map((user: UserDataType) => (
            <tbody key={user?.accountNumber} className="mb-4">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-900">
                <td>{user?.name}</td>
                <td>{user?.accountNumber}</td>
                <td
                  className={`${
                    user.accountStatus === "Active"
                      ? " text-green-800"
                      : "text-red-700"
                  }`}
                >
                  {user?.accountStatus}
                </td>
                <td>₦{user?.balance}</td>
                <td>
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
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    </FilterProvider>
  );
};
