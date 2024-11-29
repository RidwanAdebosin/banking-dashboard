import { BankSummary } from "../components/BankSummary";
import { Users } from "../components/Users";

const AdminDashBoard = () => {
  return (
    <section className="py-8 px-4 lg:px-8 grid grid-cols-1 gap-4">
      <BankSummary />
      <Users />
    </section>
  );
};

export default AdminDashBoard;
