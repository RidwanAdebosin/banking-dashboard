// import { object } from "yup";
import { UserDataType, usersData } from "../utils/data";
import { createContext, ReactNode, useEffect, useState } from "react";

const PaymentContext = createContext({});

const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<UserDataType[]>(() => {
    const storedAccounts = localStorage.getItem("accounts");
    return storedAccounts ? JSON.parse(storedAccounts) : usersData;
  });

  const [bankBalance, setBankBalance] = useState(() => {
    const storedBalance = localStorage.getItem("bankBalance");
    return storedBalance ? Number(storedBalance) : 1000000000;
  });
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);

  const [transactionDate, setTransactionDate] = useState(() => {
    const storedTransactionDate = localStorage.getItem("transactionDate");
    return storedTransactionDate ? new Date(storedTransactionDate) : "";
  });

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem("bankBalance", bankBalance.toString());
  }, [bankBalance]);

  useEffect(() => {
    localStorage.setItem("transactionDate", transactionDate.toLocaleString());
  }, [transactionDate]);
  // console.log(transactionDate);
  return (
    <PaymentContext.Provider
      value={{
        accounts,
        setAccounts,
        bankBalance,
        setBankBalance,
        selectedUser,
        setSelectedUser,
        transactionDate,
        setTransactionDate,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
