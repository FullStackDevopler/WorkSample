import { combineReducers } from "redux";
import user from "./user-reducer"
import game from "./game-reducer"

//Combine all recucers
const appReducer = combineReducers({ user, game });

//Setup root reducer
const rootReducer = (state, action) => {
    const newState = action.type === "RESET" ? undefined : state;
    return appReducer(newState, action)
};

export default rootReducer;
