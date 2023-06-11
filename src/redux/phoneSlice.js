import { createSlice, nanoid } from "@reduxjs/toolkit";

const phonesInitialState = [
  { id: 0, name: "Vitaliy", number: 123123 },
  { id: 1, name: "Maxim", number: 456456 },
  { id: 2, name: "Sergii", number: 789789 },
];

const phoneSlice = createSlice({
  name: "phones",
  initialState: phonesInitialState,
  reducers: {
    addPhone: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(),
            name,
            number
          },
        };
      },
    },
    deletePhone(state, action) {
      const index = state.findIndex(phone => phone.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addPhone, deletePhone } = phoneSlice.actions;
export const phoneReducer = phoneSlice.reducer;
