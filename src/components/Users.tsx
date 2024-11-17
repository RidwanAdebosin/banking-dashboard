export const Users = ({ filteredUser }) => {
  const handleTransfer = () => {};
  return (
    <section className="relative flex flex-col w-full h-[70svh] text-gray-700 bg-white  rounded-lg bg-clip-border py-4">
      <table className="w-full text-left table-auto min-w-max">
        <thead className="">
          <tr className=" ">
            <th>Name</th>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        {filteredUser.map((user: userData) => (
          <tbody key={user.accountNumber} className="">
            <tr className="hover:bg-slate-50">
              <td>{user.name}</td>
              <td>{user.accountNumber}</td>
              <td>{user.accountStatus}</td>
              <td>₦{user.balance}</td>
              <td>
                <button
                  onClick={() => handleTransfer()}
                  className="px-10 py-2 border rounded-lg bg-green-600"
                >
                  Pay
                </button>
              </td>
            </tr>
            {/* </Card> */}
          </tbody>
        ))}
      </table>
    </section>
  );
};
