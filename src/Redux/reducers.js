import { GET_PUBLIC_TASKS, GET_PRIVATE_TASKS, FETCH_USER, LOGOUT_USER } from "./constants";


const initialState = {
    public: [],
    private: []
}


export const taskList = (state=initialState, action) => {
    switch (action.type) {
        case GET_PUBLIC_TASKS:
            return Object.assign({}, state, { public: action.payload});
        case GET_PRIVATE_TASKS: 
            return Object.assign({}, state, {private: action.payload});
        default:
            return state;
    }
}

export const userInfo = (state={}, action) => {
    switch (action.type){
        case FETCH_USER:
            return Object.assign({}, state, action.payload)
        case LOGOUT_USER:
            return action.payload;
        default:
            return state;
    }
}