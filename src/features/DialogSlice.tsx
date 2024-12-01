import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  value: boolean;
}

const initialState: DialogState = {
  value: false,
};

export const DialogSlice = createSlice({
  name: "Dialog",
  initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setDialog } = DialogSlice.actions;
export default DialogSlice.reducer;
