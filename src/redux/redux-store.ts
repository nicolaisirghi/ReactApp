import {applyMiddleware, combineReducers, legacy_createStore,compose} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sideBarReducer from "./sideBarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import {friendsReducer} from "./friendsReducer";
let rootReducer = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    sidebar:sideBarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form:formReducer,
    friendsPage:friendsReducer,
    app:appReducer
});
type RootReducerType = typeof  rootReducer;
export type AppStateType = ReturnType<RootReducerType>
 // @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store =legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;