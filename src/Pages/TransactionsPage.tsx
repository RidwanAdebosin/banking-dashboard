import { useContext, useState } from "react";
import { PaymentContext, PaymentProvider } from "../Context/PaymentContext";

const TransactionsPage = () => {
  const { accounts } = useContext(PaymentContext);
  const [transactions, setTransactions] = useState([]);

  console.log(accounts);

  const latestTranscations = accounts.map((account) => account);
  return (
    <PaymentProvider>
      <section className="flex flex-col justify-center items-center">
        <h1>Transactions History</h1>

        <div></div>
      </section>
    </PaymentProvider>
  );
};

export default TransactionsPage;
