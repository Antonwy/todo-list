import { GET_PUBLIC_TASKS, GET_PRIVATE_TASKS, FETCH_USER, LOGOUT_USER, GET_ALL_USER, CREATE_GROUP, GET_GROUP, GET_GROUP_TASKS } from "./constants";


const initialState = {
    public: [],
    private: [],
    groupTasks: []
}


export const taskList = (state=initialState, action) => {
    switch (action.type) {
        case GET_PUBLIC_TASKS:
            return Object.assign({}, state, { public: action.payload});
        case GET_PRIVATE_TASKS: 
            return Object.assign({}, state, {private: action.payload});
        case GET_GROUP_TASKS:
            return Object.assign({}, state, {groupTasks: action.payload})
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

export const allUser = (state=[], action) => {
    switch (action.type) {
        case GET_ALL_USER:
            return action.payload
        default:
            return state
    }
}

export const groupInfo = (state={}, action) => {
    switch (action.type) {
        case CREATE_GROUP:
            return action.payload[0]
        case GET_GROUP:
            return action.payload[0]
        default:
            return state
    }
}