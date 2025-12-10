import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "../../services/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const res = await usersService.getUsers();
    return res.data || res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to fetch users");
  }
});

export const addUser = createAsyncThunk("users/addUser", async (userData, thunkAPI) => {
  try {
    const res = await usersService.createUser(userData);
    return res.data || res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to add user");
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async ({ id, userData }, thunkAPI) => {
  try {
    const res = await usersService.updateUser(id, userData);
    return res.data || res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to update user");
  }
});

export const updateUserRole = createAsyncThunk("users/updateUserRole", async ({ id, userRole }, thunkAPI) => {
  try {
    const res = await usersService.updateUserRole(id, {userRole} );
    return res.data || res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to update user role");
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id, thunkAPI) => {
  try {
    await usersService.deleteUser(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message || "Failed to delete user");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    selectedUser: null,
  },
  reducers: {
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((u) =>
          u.userID === action.payload.userID ? action.payload : u
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((u) =>
          u.userID === action.payload.userID ? action.payload : u
        );
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u.userID !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedUser, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
