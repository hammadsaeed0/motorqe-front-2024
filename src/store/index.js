import { configureStore } from "@reduxjs/toolkit";
import authService from "./services/authService";
import categoryService from "./services/categoryService";
import authReducer from "./reducers/authReducer";
import planReducer from "./reducers/planReducer";
import globalReducer from "./reducers/globalReducer";
import planService from "./services/planService";

const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [planService.reducerPath]: planService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
    planReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authService.middleware)
      .concat(categoryService.middleware)
      .concat(planService.middleware),
});

export default Store;
