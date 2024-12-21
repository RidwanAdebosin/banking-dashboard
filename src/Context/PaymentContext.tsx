import { UserDataType, usersData } from "../utils/data";
import { createContext, ReactNode, useEffect, useState } from "react";

const PaymentContext = createContext({});
const date = new Date();
const midnight = new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
  0,
  0,
  0
).toLocaleString();

const safeLocalStorageGet = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    console.error(`Error fetching data from localStorage for key: ${key}`);
    return null;
  }
};

const safeLocalStorageSet = (key: string, value: string) => {
  try {
    return localStorage.setItem(key, value);
  } catch {
    console.error(`Error saving to localStorage for key: ${key}`);
  }
};

const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<UserDataType[]>(() => {
    const storedAccounts = safeLocalStorageGet("accounts");
    return storedAccounts ? JSON.parse(storedAccounts) : usersData;
  });

  const [transactions, setTransactions] = useState<UserDataType[]>(() => {
    safeLocalStorageGet("transactions");
    return accounts.filter(
      (account) => account.lastTransaction.date >= midnight
    );
  });

  const [bankBalance, setBankBalance] = useState(() => {
    const storedBalance = safeLocalStorageGet("bankBalance");
    return storedBalance ? Number(storedBalance) : 1000000000;
  });

  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);

  const [transactionDate, setTransactionDate] = useState(() => {
    const storedTransactionDate = safeLocalStorageGet("transactionDate");
    return storedTransactionDate ? storedTransactionDate : date;
  });

  useEffect(() => {
    safeLocalStorageSet("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    safeLocalStorageSet("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    safeLocalStorageSet("bankBalance", bankBalance.toString());
  }, [bankBalance]);

  useEffect(() => {
    safeLocalStorageSet("transactionDate", date.toLocaleString());
  }, [transactionDate]);

  return (
    <PaymentContext.Provider
      value={{
        accounts,
        setAccounts,
        bankBalance,
        setBankBalance,
        selectedUser,
        setSelectedUser,
        setTransactionDate,
        transactions,
        setTransactions,
        loading,
        setIsLoading,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
