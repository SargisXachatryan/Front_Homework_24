import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./features/Userlist/userlist.slice"

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
})
