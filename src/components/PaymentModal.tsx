import * as Yup from "yup";
import Modal from "react-modal";
import { useContext } from "react";
import { PaymentContext } from "../Context/PaymentContext";
import { Field, ErrorMessage, Formik, FormikHelpers, Form } from "formik";

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

const PaymentModal = ({
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

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const amount = Number(values.amount);

    // Validate the transfer amount
    if (amount <= 0 || amount > bankBalance) {
      alert("Invalid amount or insufficient bank balance.");
      setSubmitting(false);
      return;
    }

    // Update account balances and transaction date
    if (selectedUser) {
      const transactionDate = new Date();
      const updatedAccounts = accounts.map((account) =>
        account.accountNumber === user.accountNumber
          ? {
              ...account,
              balance: account.balance + amount,
              lastTransaction: {
                date: transactionDate.toLocaleDateString(),
                amount,
              },
            }
          : account
      );

      setAccounts(updatedAccounts);
      setBankBalance((prevBalance) => prevBalance - amount);
      setTransactionDate(transactionDate);

      setSubmitting(false);
      resetForm();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Payment Modal"
    >
      <h2 className="text-lg font-semibold text-center mb-4">Transfer Funds</h2>
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PaymentModal;
