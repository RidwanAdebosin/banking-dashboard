// import { usersData } from "../utils/data"
import { useLoaderData } from "react-router";
import { Card } from "../utils/Card";
import { UserDataType } from "../utils/data";

const SingleClientPage = () => {
  const user = useLoaderData() as UserDataType;
  console.log(user);

  return (
    <>
      <section className="flex justify-between">
        <div>
          <Card>
            <p>
              Account Name: <span>{user.name}</span>
            </p>
            <p>
              Account Number: <span>{user.accountNumber}</span>
            </p>
          </Card>
        </div>
        <div>
          <Card>
            Account Name: <span>{}</span>
          </Card>
        </div>
      </section>
    </>
  );
};

export default SingleClientPage;
