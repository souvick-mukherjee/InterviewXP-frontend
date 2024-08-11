import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user state interface

interface UserState {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

const initialState: UserState = {
  id: '',
  fullName: '',
  email: '',
  role: '',
  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    clearUser(state) {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
