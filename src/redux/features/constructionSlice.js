import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListConstructionProjectAPI,
  getDetailConstructionAPI,
} from "../../apis/construction";

const getListConstructionProjectThunkAction = createAsyncThunk(
  "construction/getListConstructionProject",
  async ({ userId, orderBy, sortBy, q, limit, page }, thunkAPI) => {
    try {
      const res = await getListConstructionProjectAPI({
        userId,
        orderBy,
        sortBy,
        q,
        limit,
        page,
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getDetailConstructionThunkAction = createAsyncThunk(
  "construction/getDetailConstruction",
  async ({ userId, constructionId }, thunkAPI) => {
    try {
      const res = await getDetailConstructionAPI({ userId, constructionId });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  listHistoryConstructions: [],
  construction: {},
  totalPage: 0,
  currentPage: 0,
  count: 0,
};

const constructionSlice = createSlice({
  name: "construction",
  initialState,
  reducers: {
    addConstruction: (state, action) => {
      state.listHistoryConstructions.push(action.payload);
    },
    clearListHistoryConstructions: (state) => {
      state.listHistoryConstructions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getListConstructionProjectThunkAction.fulfilled,
        (state, action) => {
          state.listHistoryConstructions = action.payload?.data;
          state.totalPage = action.payload?.totalPage;
          state.currentPage = action.payload?.currentPage;
          state.count = action.payload?.count;
        }
      )
      .addCase(getDetailConstructionThunkAction.fulfilled, (state, action) => {
        state.construction = action.payload?.data;
      });
  },
});

export {
  getListConstructionProjectThunkAction,
  getDetailConstructionThunkAction,
};
export const constructionSelect = (state) => state.construction;
export const { addConstruction, clearListHistoryConstructions } =
  constructionSlice.actions;
export default constructionSlice.reducer;
