import { useContext } from "react";

const PaymentContext: any = useContext();

const PaymentProvider = ({ children }) => {
  const handlePayUser = () => {
    alert("User Paid");
  };
  return (
    <PaymentContext.Provider
      value={{ onPayUser: handlePayUser }}
    ></PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
