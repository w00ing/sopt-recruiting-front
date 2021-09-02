import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthAPI from 'src/api/auth';
import RecruitingAdminAPI from 'src/api/recruitingAdmin';

const initialAuthState = {
  status: null,
  user: {
    id: null,
    idFirebase: '',
    email: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
  },
  isLoggedIn: false,
};

export const getUserInfoInitial = createAsyncThunk(
  'auth/getUserInfoInitial',
  async ({ idFirebase }, { dispatch, getState }) => {
    console.log('GET USER INFO INITIAL', idFirebase);
    const userRes = await RecruitingAdminAPI.recruitingAdminGET(idFirebase);
    if (!userRes.err) {
      return {
        user: userRes.user,
      };
    }
    return {};
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,

  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      Object.assign(state, initialAuthState);
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: {
    // Get user info
    [getUserInfoInitial.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getUserInfoInitial.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.status = 'success';
    },
    [getUserInfoInitial.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;
