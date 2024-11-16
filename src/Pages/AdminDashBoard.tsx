const Card = ({ children }) => {
  return <div className="p-4  bg-gray-300 rounded-lg ">{children}</div>;
};

type UserDataType = [
  {
    name: string;
    balance: number;
    accountNumber: number;
    accountType: string;
    email: string;
    phoneNumber: number;
    address: string;
    dateOfBirth: string | number;
    lastTransaction: { date: number; amount: number; description: string };
    accountStatus: string;
    createdAt: number | string;
    currency: string;
    userType: string;
    isVerified: boolean;
  }
];

export const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

const usersData: UserDataType = [
  {
    name: "John Doe",
    balance: 1500.75,
    accountNumber: 1234567890,
    accountType: "Checking",
    email: "johndoe@example.com",
    phoneNumber: +1234567890,
    address: "123 Main St, Anytown, USA",
    dateOfBirth: "1985-08-15",
    lastTransaction: {
      date: 2024 - 11 - 15,
      amount: -200.0,
      description: "ATM Withdrawal",
    },
    accountStatus: "Active",
    createdAt: "2020-01-01",
    currency: "USD",
    userType: "Individual",
    isVerified: true,
  },
  {
    name: "Jane Smith",
    balance: 2800.5,
    accountNumber: 9876543210,
    accountType: "Savings",
    email: "janesmith@example.com",
    phoneNumber: +1987654321,
    address: "456 Oak St, Somecity, USA",
    dateOfBirth: "1992-12-22",
    lastTransaction: {
      date: 2024 - 11 - 14,
      amount: -50.0,
      description: "Grocery Store Purchase",
    },
    accountStatus: "Active",
    createdAt: "2018-05-15",
    currency: "USD",
    userType: "Individual",
    isVerified: true,
  },
  {
    name: "Alice Johnson",
    balance: 5000.0,
    accountNumber: 1122334455,
    accountType: "Business",
    email: "alice.johnson@business.com",
    phoneNumber: +1122334455,
    address: "789 Maple Ave, Bigcity, USA",
    dateOfBirth: "1980-04-30",
    lastTransaction: {
      date: 2024 - 11 - 10,
      amount: -1000.0,
      description: "Supplier Payment",
    },
    accountStatus: "Active",
    createdAt: "2015-02-20",
    currency: "USD",
    userType: "Business",
    isVerified: true,
  },
  {
    name: "Michael Williams",
    balance: 1250.0,
    accountNumber: 9988776655,
    accountType: "Checking",
    email: "michael.williams@example.com",
    phoneNumber: +1298765432,
    address: "321 Pine St, Villagetown, USA",
    dateOfBirth: "1995-06-18",
    lastTransaction: {
      date: "2024-11-13",
      amount: -50.0,
      description: "Restaurant Payment",
    },
    accountStatus: "Active",
    createdAt: "2017-07-10",
    currency: "USD",
    userType: "Individual",
    isVerified: false,
  },
  {
    name: "Sarah Lee",
    balance: 7800.25,
    accountNumber: 5566778899,
    accountType: "Savings",
    email: "sarah.lee@example.com",
    phoneNumber: +1234567892,
    address: "456 Birch Rd, Smalltown, USA",
    dateOfBirth: "1990-11-05",
    lastTransaction: {
      date: "2024-11-16",
      amount: 500.0,
      description: "Salary Deposit",
    },
    accountStatus: "Active",
    createdAt: "2016-03-01",
    currency: "USD",
    userType: "Individual",
    isVerified: true,
  },
  {
    name: "David Brown",
    balance: 3200.3,
    accountNumber: 6677889900,
    accountType: "Checking",
    email: "david.brown@example.com",
    phoneNumber: +9876543210,
    address: "101 Cherry Ln, Middletown, USA",
    dateOfBirth: "1988-01-22",
    lastTransaction: {
      date: "2024-11-12",
      amount: -120.0,
      description: "Car Repair",
    },
    accountStatus: "Active",
    createdAt: "2014-08-22",
    currency: "USD",
    userType: "Individual",
    isVerified: true,
  },
  {
    name: "Emily Davis",
    balance: 550.75,
    accountNumber: 4433221100,
    accountType: "Checking",
    email: "emily.davis@example.com",
    phoneNumber: +1122334455,
    address: "654 Willow St, Newtown, USA",
    dateOfBirth: "1993-07-08",
    lastTransaction: {
      date: "2024-11-11",
      amount: -40.0,
      description: "Online Shopping",
    },
    accountStatus: "Suspended",
    createdAt: "2021-06-12",
    currency: "USD",
    userType: "Individual",
    isVerified: false,
  },
  {
    name: "William Martinez",
    balance: 920.1,
    accountNumber: 2233445566,
    accountType: "Business",
    email: "william.martinez@business.com",
    phoneNumber: +4455667788,
    address: "432 Cedar St, Oldtown, USA",
    dateOfBirth: "1983-05-14",
    lastTransaction: {
      date: "2024-11-09",
      amount: -250.0,
      description: "Office Supplies",
    },
    accountStatus: "Active",
    createdAt: "2010-04-04",
    currency: "USD",
    userType: "Business",
    isVerified: true,
  },
  {
    name: "Olivia Moore",
    balance: 3600.9,
    accountNumber: 9988771122,
    accountType: "Savings",
    email: "olivia.moore@example.com",
    phoneNumber: +1234987654,
    address: "789 Oak Dr, Greenfield, USA",
    dateOfBirth: "1994-09-10",
    lastTransaction: {
      date: "2024-11-13",
      amount: 200.0,
      description: "Refund",
    },
    accountStatus: "Active",
    createdAt: "2019-05-18",
    currency: "USD",
    userType: "Individual",
    isVerified: true,
  },
  {
    name: "James Taylor",
    balance: 450.4,
    accountNumber: 6677881122,
    accountType: "Checking",
    email: "james.taylor@example.com",
    phoneNumber: +2345678901,
    address: "321 Elm St, Hilltop, USA",
    dateOfBirth: "1999-02-27",
    lastTransaction: {
      date: "2024-11-10",
      amount: -60.0,
      description: "Movie Ticket",
    },
    accountStatus: "Active",
    createdAt: "2022-12-04",
    currency: "USD",
    userType: "Individual",
    isVerified: false,
  },
];

const BankSummary = () => {
  return (
    <article className="grid grid-cols-2 gap-2 lg:flex justify-between h-[10svh]">
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
          <p className="text-[#64748B]">Transactions initiated: </p>
          <strong>5</strong>
        </div>
      </Card>

      <Card>
        <div className="lg:flex gap-4">
          <p className="text-[#64748B]">Transactions pending: </p>
          <strong>5</strong>
        </div>
      </Card>
    </article>
  );
};

const Transaction = () => {
  const handleTransfer = () => {};
  return (
    <section className="grid grid-cols-1 gap-3 mt-4 h-[70svh] overflow-scroll">
      {usersData.map((user) => (
        <Card>
          <div className="grid grid-cols-4">
            <p>{user.name}</p>
            <p>{user.accountNumber}</p>
            <p className={"Active" ? "text-green-950" : "text-red-700"}>
              {user.accountStatus}
            </p>
            <p>₦{user.balance}</p>
            <Button onClick={() => handleTransfer()}>Transfer</Button>
          </div>
        </Card>
      ))}
    </section>
  );
};

const AdminDashBoard = () => {
  return (
    <section className="py-8 px-4 lg:px-8">
      <BankSummary />
      <Transaction />
    </section>
  );
};

export default AdminDashBoard;
