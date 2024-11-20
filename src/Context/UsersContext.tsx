import { createContext } from "react";
import { usersData } from "../utils/data";

const UsersContext = createContext(usersData);

const UsersProvider = ({ children }) => {
  return (
    <UsersContext.Provider value={usersData}>{children}</UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
