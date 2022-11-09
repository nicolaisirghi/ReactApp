import {toggleFollowingInProgress} from "../redux/usersReducer";

export const updateObjectInArray = (items,itemId,objPropName,newObjProps) => {
   return  items.map(u => {
            if (u[objPropName] === itemId) {
                return {...u,...newObjProps }
            }
            return u;
        }
    )
}

export const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userID))
    const response = await apiMethod(userID)
    if (response.resultCode == 0) {
        debugger
        dispatch(actionCreator(userID));
    }
    dispatch(toggleFollowingInProgress(false, userID));
}