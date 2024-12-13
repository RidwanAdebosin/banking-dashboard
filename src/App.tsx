import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import "./App.css";
import { PaymentProvider } from "./Context/PaymentContext";
function App() {
  return (
    <>
      <PaymentProvider>
        <RouterProvider router={router} />
      </PaymentProvider>
    </>
  );
}

export default App;
