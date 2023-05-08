import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { calculateFunctionPointsAPI } from "../../apis/calculate";

const calculateFunctionPointsThunkAction = createAsyncThunk(
  "calculate/calculateFunctionPoints",
  async ({ data }, thunkAPI) => {
    try {
      const res = await calculateFunctionPointsAPI({ data });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  result: {},
};

const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    clearResult: (state) => {
      state.result = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      calculateFunctionPointsThunkAction.fulfilled,
      (state, action) => {
        state.result = action.payload.data;
      }
    );
  },
});

export { calculateFunctionPointsThunkAction };
export const calculateSelect = (state) => state.calculate;
export const { clearResult } = calculateSlice.actions;
export default calculateSlice.reducer;
