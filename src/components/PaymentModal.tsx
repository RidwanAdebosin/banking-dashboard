import { useRef } from "react";
import Modal from "react-modal";
import { Formik, FormikProps, useFormik } from "formik";

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

// Modal.setAppElement("#PaymentModal");

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
  //pass in the initial values for the form fills
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      name: "",
      amount: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const subtitle = useRef<HTMLHeadingElement>(null);

  function afterOpenModal() {
    if (subtitle.current) {
      subtitle.current.style.color = "#f00";
    }
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
      <Formik>
        <form action="submit" className="grid grid-cols-1 gap-2">
          <label htmlFor="name" className="text-sm">
            Selected Destination Account
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled
            placeholder="Ridwan"
            className="border mb-2 px-2 rounded-xs"
          />
          <label htmlFor="amount" className="text-sm">
            Amount
          </label>
          <input
            type="amount"
            id="amount"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            placeholder="₦"
            className="border mb-2 px-2 rounded-xs"
            required
          />
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
            className="border mb-2 px-2 rounded-xs"
            required
          />
          <button className="bg-[#606c38] text-white p-2 rounded-xs flex justify-center w-full">
            Continue
          </button>
        </form>
      </Formik>
    </Modal>
  );
};

export default PaymentModal;
