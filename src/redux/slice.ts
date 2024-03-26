import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setStorage } from '~/utils/asyncStorage';
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
      setStorage("dataUser", state.data)
    },
    setDataStorage(state, action: PayloadAction<FormData>) {
      state.data = action.payload.data;
    },
    deleteData(state, action: PayloadAction<number>) {
      state.data = state.data.filter((item) => item.id !== action.payload);
      setStorage("dataUser", state.data)
    },
    replaceStateInitial(state) {
      state.screenInitialState = true;
    },
    editData(state, action: PayloadAction<FormData>) {
      const index = state.data.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      setStorage("dataUser", state.data)

    }
  },
});
export const { setData, deleteData, replaceStateInitial, editData, setDataStorage } = userSlice.actions;
export default userSlice.reducer;
