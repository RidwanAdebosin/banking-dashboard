import { createContext, ReactNode, useState } from "react";
import { UserDataType, usersData } from "../utils/data";

const PaymentContext = createContext({});

const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<UserDataType[]>(usersData); // Fixed initial state
  const [bankBalance, setBankBalance] = useState(100000000);

  // console.log("Updated Accounts in Context:", accounts);

  return (
    <PaymentContext.Provider
      value={{
        accounts,
        setAccounts,
        bankBalance,
        setBankBalance,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
