export const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 bg-green-900  text-white rounded-lg border hover:font-semibold hover:bg-green-800"
    >
      {children}
    </button>
  );
};
