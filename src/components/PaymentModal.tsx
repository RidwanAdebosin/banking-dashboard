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

const Paying = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
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

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const amount = Number(values.amount);

    // Validate transfer amount
    if (amount <= 0 || amount > bankBalance) {
      alert("Invalid amount or insufficient bank balance.");
      setSubmitting(false);
      return;
    }

    try {
      setSubmitting(true);

      // Simulate processing delay
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
                  amount,
                },
              }
            : account
        );

        // Update context state
        setAccounts(updatedAccounts);
        setBankBalance((prevBalance: number) => prevBalance - amount);
        setTransactionDate(transactionDate);

        // Reset form and close modal
        resetForm();
        onClose();
      }
    } catch (error) {
      console.error("Payment submission failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
      alert("Payment successful!");
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
              {formik.isSubmitting ? (
                <div className="flex justify-center">
                  {" "}
                  <Paying />
                </div>
              ) : (
                "Pay Now"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PaymentModal;
