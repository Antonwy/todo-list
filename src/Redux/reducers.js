import { GET_TASKS, FETCH_USER } from "./constants";

export const taskList = (state=[], action) => {
    switch (action.type) {
        case GET_TASKS:
            return action.payload;
        default:
            return state;
    }
}

export const userInfo = (state={}, action) => {
    switch (action.type){
        case FETCH_USER:
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}