import { GET_TASKS } from "./constants";

export const taskList = (state=[], action) => {
    switch (action.type) {
        case GET_TASKS:
            return action.payload;
        default:
            return state;
    }
}