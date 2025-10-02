import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// =============== THUNKS =================

// Deposit with currency conversion
export const deposit = createAsyncThunk(
  "account/deposit",
  async ({ amount, currency }, { rejectWithValue }) => {
    try {
      if (currency === "USD") return amount;

      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
      );

      if (!res.ok) throw new Error("Error in converting...");

      const data = await res.json();
      return data.rates.USD;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Withdraw
export const withdraw = createAsyncThunk("account/withdraw", async (amount) => {
  return amount;
});

// Request Loan
export const requestLoan = createAsyncThunk(
  "account/requestLoan",
  async ({ amount, purpose }) => {
    return { amount, purpose };
  }
);

// Pay Loan
export const payLoan = createAsyncThunk("account/payLoan", async () => {
  return true;
});

// Clear Transactions
export const clearTransactions = createAsyncThunk(
  "account/clearTransactions",
  async () => true
);

// =============== SLICE =================

const accountSlice = createSlice({
  name: "account",
  initialState: {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    transactions: [],
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // Deposit
    builder
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.balance += action.payload;
        state.isLoading = false;
        state.transactions.push({
          type: "💰 Deposit",
          amount: action.payload,
          date: new Date().toLocaleString(),
        });
      })
      .addCase(deposit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Withdraw
    builder.addCase(withdraw.fulfilled, (state, action) => {
      state.balance -= action.payload;
      state.transactions.push({
        type: "💸 Withdraw",
        amount: action.payload,
        date: new Date().toLocaleString(),
      });
    });

    // Request Loan
    builder.addCase(requestLoan.fulfilled, (state, action) => {
      state.loan += action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance += action.payload.amount;
      state.transactions.push({
        type: "📥 Loan",
        amount: action.payload.amount,
        purpose: action.payload.purpose,
        date: new Date().toLocaleString(),
      });
    });

    // Pay Loan
    builder.addCase(payLoan.fulfilled, (state) => {
      state.balance -= state.loan;
      state.transactions.push({
        type: "✅ Pay Loan",
        amount: state.loan,
        date: new Date().toLocaleString(),
      });
      state.loan = 0;
      state.loanPurpose = "";
    });

    // Clear Transactions
    builder.addCase(clearTransactions.fulfilled, (state) => {
      state.transactions = [];
    });
  },
});

export default accountSlice.reducer;

// ====simple====

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
//   transactions: [],
//   isLoading: false,
// };

// const accountSlice = createSlice({
//   name: "account",
//   initialState,
//   reducers: {
//     deposit(state, action) {
//       state.balance += action.payload;
//       state.isLoading = false;
//       state.transactions.push({
//         type: "deposit",
//         amount: action.payload,
//         date: new Date().toLocaleString(),
//       });
//     },
//     withdraw(state, action) {
//       state.balance -= action.payload;

//       state.transactions.push({
//         type: "withdraw",
//         amount: action.payload,
//         date: new Date().toLocaleString(),
//       });
//     },
//     requestLoan(state, action) {
//       state.loan += action.payload.amount;
//       state.loanPurpose = action.payload.purpose;
//       state.balance += action.payload.amount;

//       state.transactions.push({
//         type: "Loan",
//         amount: action.payload.amount,
//         date: new Date().toLocaleString(),
//         purpose: action.payload.purpose,
//       });
//     },
//     payLoan(state) {
//       state.balance -= state.loan;

//       state.transactions.push({
//         type: "Pay Loan",
//         amount: state.loan,
//         date: new Date().toLocaleString(),
//       });
//       state.loan = 0;
//       state.loanPurpose = "";
//     },

//     clearTransactions(state) {
//       state.transactions = [];
//     },
//     convertingCurrency(state) {
//       state.isLoading = true;
//     },
//   },
// });

// export const { withdraw, requestLoan, payLoan, clearTransactions } =
//   accountSlice.actions;

// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch) {
//     dispatch({ type: "account/convertingCurrency" });
//     const res = await fetch(
//       `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
//     );

//     const data = await res.json();
//     const converted = data.rates.USD;
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }
// export default accountSlice.reducer;
