import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchListUsers = createAsyncThunk(
  'users/fetchListUsers',
  async () => {
    const res = await fetch("http://localhost:8000/users");
    const data = await res.json();
    return data;
  }
)

interface IUserPayload {
  email: string;
  name: string;
}

export const createNewUser = createAsyncThunk(
  'users/createNewUser',
  async (payload: IUserPayload, thunkAPI) => {
    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name
      }),
      headers: {
        "Content-type": " application/json"
      }
    });
    const data = await res.json();
    if (data && data.id) {
      // create success
      thunkAPI.dispatch(fetchListUsers())
    }
    return data;
  }
)

interface IUpdatePayload {
  email: string;
  name: string;
  id: number | null;
}

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload: IUpdatePayload, thunkAPI) => {
    const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        "Content-type": " application/json"
      }
    });
    const data = await res.json();
    if (data && data.id) {
      // update success
      thunkAPI.dispatch(fetchListUsers())
    }
    return data;
  }
)



interface IUser {
  id: number;
  name: string;
  email: string;
}

const initialState: {
  listUsers: IUser[],
  isCreateSuccess: boolean,
  isUpdateSuccess: boolean
} = {
  listUsers: [],
  isCreateSuccess: false,
  isUpdateSuccess: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreate: (state) => {
      state.isCreateSuccess = false
    },
    resetUpdate: (state) => {
      state.isUpdateSuccess = false
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload
    }),
      builder.addCase(createNewUser.fulfilled, (state, action) => {
        state.isCreateSuccess = true
      }),
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isUpdateSuccess= true
    })
  }
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate } = userSlice.actions

export default userSlice.reducer