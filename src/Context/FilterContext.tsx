import { PaymentContext } from "./PaymentContext";
import { createContext, useContext, useEffect, useState } from "react";

//Creating a filter context custom provider
const FilterContext = createContext({});

//Create a filter provider
const FilterProvider = ({ children }) => {
  const [searchUser, setSearchUser] = useState("");

  const { accounts } = useContext(PaymentContext);
  const [filteredUser, setFilteredUser] = useState(accounts);

  const handleSearchUser = (e): void => {
    e.preventDefault();
    // saving the user input into a variable
    const searchedUser = e.target.value;
    setSearchUser(searchedUser);

    // Create a new filteredItem based on the searched query
    const filteredItem = accounts?.filter(
      (user) =>
        user?.name?.toLowerCase().includes(searchedUser) ||
        user?.accountNumber?.toLocaleString().includes(searchedUser)
    );
    setFilteredUser(filteredItem);
  };
  return (
    <FilterContext.Provider
      value={{
        handleSearchUser,
        filteredUser,
        accounts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
