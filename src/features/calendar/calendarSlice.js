// import { createSlice } from "@reduxjs/toolkit";

// const calendarSlice = createSlice({
//   name: "calendar",
//   initialState: {
//     currentDate: new Date(),
//     selectedDate: new Date(),
//     allWeeks: [],
//     isScrollable: false,
//     viewMode: "week",
//     selectedWeek: [], // initial value should be based on some logic
//     initialScrollIndex: 0, // initial value should be based on some logic
//   },
//   reducers: {
//     setCurrentDate: (state, action) => {
//       state.currentDate = action.payload;
//     },
//     setSelectedDate: (state, action) => {
//       state.selectedDate = action.payload;
//     },
//     setAllWeeks: (state, action) => {
//       state.allWeeks = action.payload;
//     },
//     toggleIsScrollable: (state) => {
//       state.isScrollable = !state.isScrollable;
//     },
//     setViewModeToMonth: (state) => {
//       state.viewMode = "month";
//     },
//     setViewModeToWeek: (state) => {
//       state.viewMode = "week";
//     },
//     setSelectedWeek: (state, action) => {
//       state.selectedWeek = action.payload;
//     },
//     setInitialScrollIndex: (state, action) => {
//       state.initialScrollIndex = action.payload;
//     },
//   },
// });

// export const {
//   setCurrentDate,
//   setSelectedDate,
//   setAllWeeks,
//   toggleIsScrollable,
//   setViewModeToMonth,
//   setViewModeToWeek,
//   setSelectedWeek,
//   setInitialScrollIndex,
// } = calendarSlice.actions;

// export default calendarSlice.reducer;
