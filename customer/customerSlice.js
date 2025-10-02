import { createSlice } from "@reduxjs/toolkit";

const initialState = { fullName: "", nationalID: "" };

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setFullName(state, action) {
      state.fullName = action.payload;
    },
    setNationalID(state, action) {
      state.nationalID = action.payload;
    },
  },
});

export const { setFullName, setNationalID } = customerSlice.actions;
export default customerSlice.reducer;
