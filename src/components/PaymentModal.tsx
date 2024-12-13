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
    width: "50%",
    paddingBlock: "2rem",
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
  amount: Yup.number().min(1).required("Please enter an amount"),
  description: Yup.string().min(2).required("Enter description"),
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
    transactionDate,
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

    // Deduct from bank balance and add to the user's balance
    if (selectedUser) {
      const transactionDate = new Date();
      const updatedAccounts = accounts.map((account) =>
        account.accountNumber === user.accountNumber ||
        account.user === selectedUser
          ? {
              ...account,
              balance: account.balance + amount,
              lastTransaction: {
                ...account.lastTransaction.date,
                date: transactionDate,
                lastTransaction: {
                  ...account.lastTransaction.amount,
                  amount: amount,
                },
              },
            }
          : account
      );

      const updatedUser = updatedAccounts.find(
        (account) => 
      );
      console.log(updatedUser);

      // console.log(date.toLocaleString());

      // Update state
      setTransactionDate(transactionDate);
      setAccounts(updatedAccounts);
      setBankBalance((prevBalance) => prevBalance - amount);

      // console.log("Updated Accounts in Context:", updatedAccounts);
      // Reset form and close modal
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
      <h2>Transfer</h2>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => (
          <Form className="grid grid-cols-1 gap-2">
            <p>Selected Destination Account: {user.name}</p>
            <label htmlFor="amount" className="text-sm">
              Amount
            </label>
            <Field
              type="text"
              id="amount"
              name="amount"
              placeholder="₦"
              className="border mb-2 px-2 rounded"
            />
            <ErrorMessage
              name="amount"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
            <label htmlFor="description" className="text-sm">
              Transaction Description
            </label>
            <Field
              type="text"
              id="description"
              name="description"
              placeholder="Transaction Description"
              className="border mb-2 px-2 rounded"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-600 text-xs mt-1"
            />
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="bg-[#606c38] text-white p-2 rounded flex justify-center w-full cursor-pointer"
            >
              {formik.isSubmitting ? "Initializing" : "Pay"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PaymentModal;
