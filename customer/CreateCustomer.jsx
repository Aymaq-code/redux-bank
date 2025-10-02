import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFullName, setNationalID } from "./customerSlice";

export default function CreateCustomer() {
  const [customerFullName, setCustomerFullName] = useState("");
  const [customerNationalId, setCustomerNationalId] = useState("");
  const [customerOccupation, setCustomerOccupation] = useState("");

  const dispatch = useDispatch();

  // Create customer handler
  function handleCreateCustomer(e) {
    e.preventDefault();
    if (!customerFullName || !customerNationalId || !customerOccupation) {
      alert("Please fill up the each * forms.");
      return;
    }
    dispatch(setFullName(customerFullName));
    dispatch(setNationalID(customerNationalId));
  }

  return (
    <form className="createCustomer">
      <input
        placeholder="* Customer Full name"
        type="text"
        value={customerFullName}
        onChange={(e) => setCustomerFullName(e.target.value)}
      />
      <input
        placeholder="* Customer national ID"
        type="number"
        value={customerNationalId}
        onChange={(e) => setCustomerNationalId(Number(e.target.value))}
      />
      <input
        placeholder="* Occupation"
        type="text"
        value={customerOccupation}
        onChange={(e) => setCustomerOccupation(e.target.value)}
      />
      <button onClick={handleCreateCustomer}>Create Account</button>
    </form>
  );
}
