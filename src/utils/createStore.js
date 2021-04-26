import { LOGOUT } from "../actions/user/types";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//Reducers
import UserReducer from "../reducers/Users";
import ArticleReducer from "../reducers/Article";

const initialState = {};

const AppReducer = combineReducers({
  user: UserReducer,
  article: ArticleReducer,
});

const RootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = initialState;
  }

  return AppReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const middleware = [thunk];

// create the store
export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export let persistor = persistStore(store);
