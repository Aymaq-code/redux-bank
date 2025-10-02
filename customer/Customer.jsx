import { useSelector } from "react-redux";
import BalanceDisplay from "../account/BalanceDisplay";

export default function Customer() {
  const { fullName, nationalID } = useSelector((state) => state.customer);

  return (
    <div className="wlcm">
      <h2>👋 welcome, {fullName}</h2>
      <h2>Account: {nationalID}</h2>
    </div>
  );
}
