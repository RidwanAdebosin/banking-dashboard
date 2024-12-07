import { UserDataType, usersData } from "../utils/data";
import { createContext, ReactNode, useState } from "react";

const PaymentContext = createContext({});

const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<UserDataType[]>(usersData);

  const [bankBalance, setBankBalance] = useState(100000000);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);

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
