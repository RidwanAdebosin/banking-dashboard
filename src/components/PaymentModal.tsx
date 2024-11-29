import { useRef } from "react";
import Modal from "react-modal";
import { useFormik, FormikProps } from "formik";
import { useFilter } from "../Context/FilterContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface FormValues {
  name: string;
  amount: string;
  description: string;
}

const PaymentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { onFilteredUser } = useFilter();
  const subtitle = useRef<HTMLHeadingElement>(null);

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      name: onFilteredUser?.name || "",
      amount: "",
      description: "",
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.name) errors.name = "Required";
      if (!values.amount) {
        errors.amount = "Amount is required";
      } else if (!/^\d+(\.\d{1,2})?$/.test(values.amount)) {
        errors.amount = "Must be a valid number";
      } else if (Number(values.amount) <= 0) {
        errors.amount = "Must be greater than zero";
      }
      if (!values.description) errors.description = "Required";
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form Submitted: ", values);
    },
  });

  function afterOpenModal() {
    if (subtitle.current) subtitle.current.style.color = "#f00";
  }

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Payment Modal"
    >
      <h2 ref={subtitle}>Transfer</h2>
      <form className="grid grid-cols-1 gap-2" onSubmit={formik.handleSubmit}>
        <label htmlFor="name" className="text-sm">
          Selected Destination Account
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          disabled
          className="border mb-2 px-2 rounded"
        />
        <input type="hidden" id="name" name="name" value={formik.values.name} />
        <label htmlFor="amount" className="text-sm">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formik.values.amount}
          onChange={(e) =>
            formik.setFieldValue(
              "amount",
              e.target.value === "0" ? "" : e.target.value
            )
          }
          placeholder="₦"
          className={`border mb-2 px-2 rounded ${
            formik.errors.amount ? "border-red-500" : ""
          }`}
        />
        {formik.errors.amount && (
          <div className="text-red-500 text-sm">{formik.errors.amount}</div>
        )}
        <label htmlFor="description" className="text-sm">
          Transaction Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Transaction Description"
          className="border mb-2 px-2 rounded"
        />
        {formik.errors.description && (
          <div className="text-red-500 text-sm">
            {formik.errors.description}
          </div>
        )}
        <button
          type="submit"
          className="bg-[#606c38] text-white p-2 rounded flex justify-center w-full"
        >
          Continue
        </button>
      </form>
    </Modal>
  );
};

export default PaymentModal;
