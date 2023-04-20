import ThemeReducer from "./ThemeReducer";
import appReducer from "./appReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ ThemeReducer, appReducer });

export default rootReducer;
