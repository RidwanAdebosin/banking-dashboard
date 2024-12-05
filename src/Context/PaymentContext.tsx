import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDataType, usersData } from "../utils/data";

const PaymentContext = createContext({});

const PaymentProvider = ({ children }: { children: ReactNode }) => {
  // const [accounts, setAccounts] = useState<UserDataType[]>([]);
  const [accounts, setAccounts] = useState<UserDataType[]>(usersData);

  const [bankBalance, setBankBalance] = useState(100000000);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setAccounts(usersData);
  //   }, 1000);
  // }, []);

  // console.log(accounts);
  return (
    <PaymentContext.Provider
      value={{
        accounts,
        setAccounts,
        bankBalance,
        setBankBalance,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
