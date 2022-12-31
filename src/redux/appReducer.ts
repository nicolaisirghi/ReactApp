// @ts-ignore
import {getAuthUserData} from './authReducer.ts';

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES'
export type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false
}


const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCES:
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCES;
}
export const initializedSucces = ():InitializedSuccessActionType =>
    (
        {type: INITIALIZED_SUCCES}
    )

export const initializeApp = () => (dispatch :any ) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializedSucces());
    })
}
export default appReducer;