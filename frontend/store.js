import { configureStore } from '@reduxjs/toolkit'
import userSlice from './src/userSlice'
export default configureStore({
  reducer: {
    user: userSlice
  }
})