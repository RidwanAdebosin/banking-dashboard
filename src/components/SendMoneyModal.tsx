import * as Yup from "yup";
import Modal from "react-modal";
import { useContext, useState } from "react";
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
  recipient: object;
  amount: string;
  description: string;
}

interface User {
  accountNumber: string;
  name: string;
  balance: number;
}

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1, "Amount must be at least 1")
    .required("Please enter an amount"),
  description: Yup.string()
    .min(2, "Description is too short")
    .required("Enter a description"),
});

export const SendMoneyModal = ({
  user,
  isOpen,
  onClose,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { accounts, setAccounts } = useContext(PaymentContext);
  const [selectedRecipient, setSelectedRecipient] = useState({});
  console.log(accounts);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    const amount = Number(values.amount);
    const recipientAccountNumber = values.recipient;

    if (user && user.balance >= amount) {
      const transactionDate = new Date().toLocaleString();

      const updatedAccounts = accounts.map((account) => {
        if (account.accountNumber === user.accountNumber) {
          return {
            ...account,
            balance: account.balance - amount,
            lastTransaction: {
              date: transactionDate,
              amountSent: amount,
            },
          };
        }

        if (+recipientAccountNumber === account.accountNumber) {
          return {
            ...account,
            balance: account.balance + amount,
            lastTransaction: {
              date: transactionDate,
              amountReceived: amount,
            },
          };
        }

        return account;
      });

      setAccounts(updatedAccounts);
      alert("Transaction successful!");
    } else {
      alert("Invalid amount or insufficient balance.");
    }

    setSubmitting(false);
    resetForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Send Money Modal"
      style={customStyles}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Send Money</h2>
      <Formik
        initialValues={{
          recipient: {},
          amount: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6 space-y-4">
            <div>
              <label
                htmlFor="balance"
                className="block text-gray-700 font-semibold mb-2"
              >
                Balance
              </label>
              <p className="text-gray-800 font-medium">{user.balance}</p>
            </div>

            <div>
              <label
                htmlFor="recipient"
                className="block text-gray-700 font-semibold mb-2"
              >
                Select Recipient
              </label>
              <Field
                as="select"
                name="recipient"
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedRecipient(value);
                  formik.setFieldValue("recipient", value);
                }}
              >
                <option value="">Select Recipient</option>
                {accounts
                  .filter(
                    (account) =>
                      account.accountNumber !== user.accountNumber &&
                      account.accountStatus !== "Suspended"
                  )
                  .map((account) => (
                    <option
                      key={account.accountNumber}
                      value={account.accountNumber}
                    >
                      {account.name} - {account.accountNumber}
                    </option>
                  ))}
              </Field>

              <ErrorMessage
                name="recipient"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-gray-700 font-semibold mb-2"
              >
                Amount
              </label>
              <Field
                type="number"
                id="amount"
                name="amount"
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold mb-2"
              >
                Description
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                placeholder="Enter description"
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition focus:outline-none focus:ring focus:ring-green-300 disabled:opacity-50"
            >
              {formik.isSubmitting ? "Processing..." : "Send Now"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
