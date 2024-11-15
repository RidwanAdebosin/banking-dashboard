const Card = ({ children }) => {
  return <div className="p-4 bg-gray-300 rounded-lg w-fit">{children}</div>;
};

const BankSummary = () => {
  return (
    <article className="flex flex-wrap justify-between gap-10">
      <Card>
        <div className="lg:flex gap-4">
          <p className="text-[#64748B]">Total Money in Bank: </p>
          <strong>5,000000</strong>
        </div>
      </Card>

      <Card>
        <div className="lg:flex gap-4">
          <p className="text-[#64748B]">Active Customers: </p>
          <strong>100</strong>
        </div>
      </Card>

      <Card>
        <div className="lg:flex gap-4">
          <p className="text-[#64748B]">Transaction initiated today: </p>
          <strong>5</strong>
        </div>
      </Card>
    </article>
  );
};

const AdminDashBoard = () => {
  return (
    <section className="py-8 px-4 lg:px-8">
      <BankSummary />
    </section>
  );
};

export default AdminDashBoard;
