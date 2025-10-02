import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearTransactions,
  deposit,
  payLoan,
  requestLoan,
  withdraw,
} from "./accountSlice";
import BalanceDisplay from "./BalanceDisplay";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [theLoanPurpose, setTheLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();

  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    balance,
    transactions: record,
    isLoading,
    error,
  } = useSelector((store) => store.account);

  // Deposit handler
  function handleDeposit(e) {
    e.preventDefault();
    if (depositAmount <= 0) return;
    // dispatch(deposit(Number(depositAmount), currency));
    dispatch(deposit({ amount: Number(depositAmount), currency }));
    setDepositAmount("");
    setCurrency("USD");
  }

  // Withdraw handler
  function handleWithdraw(e) {
    e.preventDefault();

    const amount = Number(withdrawAmount);
    setWithdrawAmount("");

    if (amount <= 0) {
      alert("Please enter a valid withdraw amount.");
      return;
    }

    if (amount > balance) {
      alert("Withdraw amount is more than available balance.");
      return;
    }

    dispatch(withdraw(amount));
  }

  // Request loan handler
  function handleRequestLoan(e) {
    e.preventDefault();
    if (!loanAmount || !theLoanPurpose) return;
    if (balance <= 500) {
      alert("your deposit amount must be over $500");
      return;
    }
    if (currentLoan >= 1000) {
      alert(`please pay gaven $ ${currentLoan}`);
      return;
    }

    dispatch(
      requestLoan({
        amount: Number(loanAmount),
        purpose: theLoanPurpose,
      })
    );

    setLoanAmount("");
    setTheLoanPurpose("");
  }
  // Pay loan handleer
  function handlePayLoan(e) {
    e.preventDefault();
    if (currentLoan <= 0) return;
    dispatch(payLoan());
  }

  return (
    <div className="bank">
      {error && <p>❌{error}</p>}
      <div className="balanceDetails">
        <h1>💰 Account Balance </h1>
        <div className="balanceDetail__box">
          <h2>
            <BalanceDisplay />
          </h2>

          <h2>Loan: ${currentLoan}</h2>
          <h2>Loan Purpuse: {currentLoanPurpose}</h2>
        </div>
      </div>
      <div className="operations">
        <h1>Account Operations</h1>
        <form className="form">
          <label>💰Deposit Fund</label>
          <div className="dps">
            <input
              placeholder="Dposit amount"
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBR</option>
            </select>{" "}
            <button className="depositBtn" style={{}} onClick={handleDeposit}>
              {isLoading ? "Converting..." : "Deposit"}
            </button>
          </div>
        </form>

        <form className="form">
          <label>💸 Withdraw Funds</label>
          <div className="wdr">
            <input
              placeholder="Withdraw amount"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <button onClick={handleWithdraw}>Withdraw</button>
          </div>
        </form>

        <form className="form">
          <label>📥 Request Loan </label>
          <div className="lon">
            <input
              placeholder="Loan amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <input
              placeholder="Loan purpose"
              type="text"
              value={theLoanPurpose}
              onChange={(e) => setTheLoanPurpose(e.target.value)}
            />
          </div>
        </form>
        <div className="loanBtns">
          <button className="lonBtn" onClick={handleRequestLoan}>
            Request Loan
          </button>
          <button onClick={handlePayLoan}>Pay Loan</button>
        </div>
      </div>

      <div className="recordDetails">
        <h1>📊 Transaction History </h1>
        {record.map((trs, index) => (
          <ul key={index}>
            {trs.type === "📥 Loan" ? (
              <li>
                {trs.type} ${trs.amount} {trs.date} ({trs.purpose})
              </li>
            ) : (
              <li>
                {trs.type} ${trs.amount} {trs.date}
              </li>
            )}
          </ul>
        ))}

        <button onClick={() => dispatch(clearTransactions())}>
          🗑️ Clear History
        </button>
      </div>
    </div>
  );
}

export default AccountOperations;
