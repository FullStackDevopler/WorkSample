import { combineReducers } from "redux"; 
import  userInfoSlice from "./userInfoSlice";
import jobListSlice from "./jobListSlice";
import contactsSlice from "./contactsSlice";
import hotshotSlice from "./hotshotSlice";

const rootReducer = combineReducers({
    userData: userInfoSlice,
    jobListData: jobListSlice,
    contactListData: contactsSlice,
    hotshotListData: hotshotSlice

})



export default rootReducer;