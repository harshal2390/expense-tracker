import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface FilterState {
  selectedMonth: string;
  selectedCategory: string;
}

const currentDate = new Date();

const currentMonth = `${currentDate.getFullYear()}-${String(
  currentDate.getMonth() + 1,
).padStart(2, "0")}`;

const initialState: FilterState = {
  selectedMonth: currentMonth,
  selectedCategory: "",
};

const filterSlice = createSlice({
  name: "filters",

  initialState,

  reducers: {
    setSelectedMonth(state, action: PayloadAction<string>) {
      state.selectedMonth = action.payload;
    },

    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },

    resetFilters(state) {
      state.selectedCategory = "";
      state.selectedMonth = currentMonth;
    },
  },
});

export const { setSelectedMonth, setSelectedCategory, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
