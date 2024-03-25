import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../dtos';

interface UserState {
  screenInitialState: boolean;
  data: FormData[];
}

const initialState: UserState = {
  screenInitialState: false,
  data: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<FormData>) {
      state.data.push(action.payload);
    },
    deleteData(state, action: PayloadAction<number>) {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    replaceStateInitial(state) {
      state.screenInitialState = true;
    },
    editData(state,action:PayloadAction<FormData>){
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }

    }
  },
});
export const { setData, deleteData, replaceStateInitial,editData } = userSlice.actions;
export default userSlice.reducer;
