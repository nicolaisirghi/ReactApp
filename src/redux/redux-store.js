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
let reducers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    sidebar:sideBarReducer,
    usersPage:usersReducer,
    auth:authReducer,
    form:formReducer,
    friendsPage:friendsReducer,
    app:appReducer
});
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store =legacy_createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));
window.store=store;
export default store;