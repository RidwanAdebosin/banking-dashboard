import { useRef } from "react";
import Modal from "react-modal";
import { Formik } from "formik";

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

const PaymentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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
      <Formik
        initialValues={{ amount: "", password: "" }}
        validate={(values) => {
        //   const errors = {};
        //   if (!values.description) {
        //     errors.descriptiom = 'Required'
        //   } 
        // }}
        // onSubmit={(values, {setSubmitting)}
      >
        <form action="submit" className="grid grid-cols-1 gap-2">
          <label htmlFor="name" className="text-sm">
            Selected Destination Account
          </label>
          <input
            type="text"
            id="name"
            disabled
            placeholder="Ridwan"
            className="border mb-2 px-2 rounded-sm"
          />
          <label htmlFor="amount" className="text-sm">
            Amount
          </label>
          <input
            type="amount"
            id="amount"
            placeholder="₦"
            className="border mb-2 px-2 rounded-sm"
            required
          />
          <label htmlFor="description" className="text-sm">
            Transaction Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Transaction Description"
            className="border mb-2 px-2 rounded-sm"
            required
          />
          <button className="bg-[#606c38] text-white p-2 rounded-sm flex justify-center w-full">
            Continue
          </button>
        </form>
      </Formik>
    </Modal>
  );
};

export default PaymentModal;
