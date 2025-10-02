import { useSelector } from "react-redux";
import AccountOperations from "./features/account/AccountOperations";
import CreateCustomer from "./features/customer/CreateCustomer";
import Customer from "./features/customer/Customer";

function App() {
  const fullName = useSelector((state) => state.customer.fullName);

  return (
    <div className="app">
      <div className="title">
        <span>🏦</span>
        <h1>Redux Bank App</h1>
      </div>
      {fullName === "" ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
        </>
      )}
    </div>
  );
}

export default App;
