import { PaymentContext } from "./PaymentContext";
import { createContext, useContext, useEffect, useState } from "react";

//Creating a filter context custom provider
const FilterContext = createContext({});

//Create a filter provider
const FilterProvider = ({ children }) => {
  const [searchUser, setSearchUser] = useState("");

  const { accounts } = useContext(PaymentContext);
  const [filteredUser, setFilteredUser] = useState();
  // console.log(accounts);

  useEffect(() => {
    if (accounts && Array.isArray(accounts)) {
      setFilteredUser(accounts);
    }
  }, [accounts]);
  // console.log(filteredUser);

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

  // console.log(filteredUser);
  // console.log(onFilteredUser);
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

// const useFilter = () => {
//   const context = useContext(FilterContext);
//   return context;
// };

export { FilterContext, FilterProvider };
