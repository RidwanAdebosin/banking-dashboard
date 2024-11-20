import { useContext } from "react";
import { FilterProvider, FilterContext } from "../Context/FilterContext";
import { Button } from "../utils/Button";
import { Card } from "../utils/Card";

export const BankSummary = () => {
  const filterContext = useContext(FilterContext);
  const { onSearchUser } = filterContext;
  return (
    <>
      <FilterProvider>
        <section className="grid grid-cols-2 gap-2 lg:flex justify-between h-">
          <Card>
            <div className="lg:flex gap-4">
              <p className="text-[#64748B]">Total Money in Bank: </p>
              <strong>5,000000</strong>
            </div>
          </Card>

          <Card>
            <div className="lg:flex gap-4">
              <p className="text-[#64748B]">Active Customers: </p>
              <strong>100</strong>
            </div>
          </Card>

          <Card>
            <div className="lg:flex gap-4">
              <p className="text-[#64748B]">Transactions initiated: </p>
              <strong>5</strong>
            </div>
          </Card>
          <form
            onSubmit={(e) => e.preventDefault()}
            action="search"
            className=" mt-4 hidden md:block"
          >
            <label htmlFor="search">
              <input
                type="text"
                id="search"
                className="w-[70%] border rounded-lg p-2 mr-4"
                placeholder="search user.."
                onChange={onSearchUser}
              />
            </label>
            <Button onClick={() => onSearchUser()}>Search</Button>
          </form>
        </section>
      </FilterProvider>

      <form
        action="search"
        className="w-full mt-4 md:hidden"
        onSubmit={onSearchUser}
      >
        <label htmlFor="text">
          <input
            type="text"
            id="text"
            className="w-[70%] border rounded-lg p-2 mr-2"
            placeholder="search user.."
            onChange={onSearchUser}
          />
        </label>
        <Button onClick={onSearchUser}>Search</Button>
      </form>
    </>
  );
};