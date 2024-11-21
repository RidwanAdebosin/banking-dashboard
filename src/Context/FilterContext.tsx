import { createContext, useContext, useState } from "react";
import { usersData } from "../utils/data";

//Creating a filter context custom provider
const FilterContext = createContext({});

//Create a filter provider
const FilterProvider = ({ children }) => {
  const [searchUser, setSearchUser] = useState("");
  const [filteredUser, setFilteredUser] = useState(usersData);
  const [userBalance, setUserBalance] = useState(10);
  const [bankBalance, setBankBalance] = useState(1000000000);
  const handleSearchUser = (e): void => {
    e.preventDefault();
    // saving the user input into a variable
    const searchedUser = e.target.value;
    setSearchUser(searchedUser);

    // Create a new filteredItem based on the searched query
    const filteredItem = usersData.filter(
      (user) =>
        user?.name?.toLowerCase().includes(searchedUser) ||
        user?.accountNumber?.toLocaleString().includes(searchedUser)
    );
    setFilteredUser(filteredItem);

    // if (filteredItem.length < 0) {
    //   return filteredUser;
    // }
  };

  const handlePayUser = () => {
    alert("User Paid");
  };

  return (
    <FilterContext.Provider
      value={{
        onSearchUser: handleSearchUser,
        onFilteredUser: filteredUser,
        onPayUser: handlePayUser,
        userBalance,
        bankBalance,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => {
  const context = useContext(FilterContext);
  return context;
};

export { useFilter, FilterProvider };
