import { BankSummary } from "../components/BankSummary";
import { Users } from "../components/Users";
import { PaymentProvider } from "../Context/PaymentContext";

const AdminDashBoard = () => {
  return (
    <PaymentProvider>
      <section className="py-8 px-4 lg:px-8 grid grid-cols-1 gap-4">
        <BankSummary />
        <Users />
      </section>
    </PaymentProvider>
  );
};

export default AdminDashBoard;
