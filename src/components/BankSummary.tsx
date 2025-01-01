import { useContext } from "react";
import { Card } from "../utils/Card";
import { Button } from "../utils/Button";
import { FilterContext } from "../Context/FilterContext";
import { PaymentContext } from "../Context/PaymentContext";

export const BankSummary = () => {
  // const filterContext = useFilter();
  const { bankBalance, accounts, transactions } = useContext(PaymentContext);
  const { handleSearchUser } = useContext(FilterContext);

  const activeAccount = accounts.filter(
    (account) => account.accountStatus === "Active"
  );

  return (
    <>
      <section className="grid grid-cols-2 gap-2 lg:flex justify-between h-">
        <Card>
          <div className="lg:flex gap-4">
            <p className="text-[#64748B]">Total Money in Bank: </p>
            <strong> ₦{bankBalance}</strong>
          </div>
        </Card>

        <Card>
          <div className="lg:flex gap-4">
            <p className="text-[#64748B]">Active Customers: </p>
            <strong>{activeAccount.length}</strong>
          </div>
        </Card>

        <Card>
          <div className="lg:flex gap-4">
            <p className="text-[#64748B]">Transactions initiated: </p>
            <strong>{transactions.length}</strong>
          </div>
        </Card>
        <form
          onSubmit={(e) => e.preventDefault()}
          action="search"
          className="mt-4 hidden md:block"
        >
          <label htmlFor="search">
            <input
              type="text"
              id="search"
              className="w-[70%] border rounded-lg p-2 mr-4"
              placeholder="search user.."
              onChange={handleSearchUser}
            />
          </label>
          <Button onClick={() => handleSearchUser()}>Search</Button>
        </form>
      </section>

      <form
        action="search"
        className="w-full mt-4 md:hidden"
        onSubmit={handleSearchUser}
      >
        <label htmlFor="text">
          <input
            type="text"
            id="text"
            className="w-[70%] border rounded-lg p-2 mr-2"
            placeholder="search user.."
            onChange={handleSearchUser}
          />
        </label>
        <Button onClick={handleSearchUser}>Search</Button>
      </form>
    </>
  );
};
