import { useContext, useState } from "react";
import Modal from "react-modal";
import { Field, ErrorMessage, Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";
import { PaymentContext } from "../Context/PaymentContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "500px",
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

interface FormValues {
  amount: string;
  description: string;
}

interface User {
  accountNumber: string;
  name: string;
  balance: number;
}

const initialValues: FormValues = {
  amount: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, "Amount must be at least 1")
    .required("Please enter an amount"),
  description: Yup.string()
    .min(2, "Description is too short")
    .required("Enter a description"),
});

const PaymentSuccessModal = ({
  isOpen,
  onClose,
  amount,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  user: User;
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={customStyles}
    contentLabel="Payment Successful"
  >
    <h2 className="text-lg font-semibold text-center mb-4">
      Payment Successful
    </h2>
    <p className="text-center text-gray-700 mb-4">
      You have successfully paid <span className="font-bold">₦{amount}</span> to{" "}
      <span className="font-bold">{user.name}</span>.
    </p>
    <button
      onClick={onClose}
      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition focus:outline-none focus:ring focus:ring-green-300 w-full"
    >
      Close
    </button>
  </Modal>
);

export const PayClientModal = ({
  user,
  isOpen,
  onClose,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    accounts,
    setAccounts,
    bankBalance,
    setBankBalance,
    selectedUser,
    setTransactionDate,
  } = useContext(PaymentContext);

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const amount = Number(values.amount);

    if (amount <= 0 || amount > bankBalance) {
      alert("Invalid amount or insufficient bank balance.");
      setSubmitting(false);
      return;
    }

    try {
      setSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (selectedUser) {
        const transactionDate = new Date().toLocaleString();
        const updatedAccounts = accounts.map((account) =>
          account.accountNumber === user.accountNumber
            ? {
                ...account,
                balance: account.balance + amount,
                lastTransaction: {
                  date: transactionDate,
                  amountReceived: amount,
                },
              }
            : account
        );

        setAccounts(updatedAccounts);
        setBankBalance((prevBalance: number) => prevBalance - amount);
        setTransactionDate(transactionDate);

        setPaidAmount(amount);
        setIsSuccessOpen(true);
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error("Payment submission failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Payment Modal"
      >
        <h2 className="text-lg font-semibold text-center mb-4">
          Transfer Funds
        </h2>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          {(formik) => (
            <Form className="grid grid-cols-1 gap-4">
              <p className="text-sm">
                <span className="font-semibold">Recipient:</span> {user.name}
              </p>
              <label htmlFor="amount" className="text-sm font-medium">
                Amount (₦)
              </label>
              <Field
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                className="border rounded px-3 py-2 w-full focus:ring focus:ring-green-300"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-600 text-xs"
              />

              <label htmlFor="description" className="text-sm font-medium">
                Transaction Description
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                placeholder="Enter description"
                className="border rounded px-3 py-2 w-full focus:ring focus:ring-green-300"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-xs"
              />

              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition focus:outline-none focus:ring focus:ring-green-300"
              >
                {formik.isSubmitting ? "Processing..." : "Pay Now"}
              </button>
              <PaymentSuccessModal
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                amount={paidAmount}
                user={user}
              />
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
