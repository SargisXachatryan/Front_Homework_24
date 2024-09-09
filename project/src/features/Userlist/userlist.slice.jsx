import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUsers, deleteUser, addUser, updateUser } from "../../api"

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getUsers()
    return response.data
})

export const removeUserThunk = createAsyncThunk('users/removeUser', async (id, { dispatch }) => {
    await deleteUser(id)
    dispatch(removeUser(id))
})

export const addUserThunk = createAsyncThunk('users/addUser', async (newUser, { dispatch }) => {
    const response = await addUser(newUser)
    dispatch(addUserToState(response.data))
})

export const updateUserThunk = createAsyncThunk('users/updateUser', async ({ id, updatedUser }, { dispatch }) => {
    const response = await updateUser(id, updatedUser)
    dispatch(updateUserInState({ id, updatedUser: response.data }))
})

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        isLoading: false,
    },
    reducers: {
        removeUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        addUserToState: (state, action) => {
            state.users.push(action.payload)
        },
        updateUserInState: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id)
            if (index !== -1) {
                state.users[index] = action.payload.updatedUser
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const { removeUser, addUserToState, updateUserInState } = userSlice.actions
export const userReducer = userSlice.reducer
