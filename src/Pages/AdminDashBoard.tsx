import { useState } from "react";
import { BankSummary } from "../components/BankSummary";
import { Users } from "../components/Users";
import { usersData } from "../utils/data";

const AdminDashBoard = () => {
  const [searchUser, setSearchUser] = useState("");
  const [filteredUser, setFilteredUser] = useState(usersData);

  const handleSearchUser = (e) => {
    e.preventDefault();
    // saving the user input into a variable
    const searchedUser = e.target.value;
    setSearchUser(searchedUser);

    // Create a new filteredItem based on the searched query
    const filteredItem = usersData.filter(
      (user) => user?.name.toLowerCase().includes(searchedUser)

      // user?.accountNumber?.toLocaleString().includes(searchedUser)
    );
    console.log(filteredItem);
    setFilteredUser(filteredItem);

    if (filteredItem.length < 0) {
      return filteredUser;
    }
  };

  return (
    <section className="py-8 px-4 lg:px-8">
      <BankSummary onSearchUser={handleSearchUser} />
      <Users filteredUser={filteredUser} />
    </section>
  );
};

export default AdminDashBoard;
