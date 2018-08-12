import { ROOT_URL, FETCH_USER, GET_PUBLIC_TASKS, GET_PRIVATE_TASKS, LOGOUT_USER, GET_ALL_USER } from "./constants";
import axios from 'axios'

export const addListItem = (item, name, checked, callback) => (dispatch) => {
   axios.post(`${ROOT_URL}/tasks/new`, {
       todo: item,
       name: name,
       checked: checked
   }).then(response => {
        console.log(response)
        callback()
   }).catch(error => console.log(error))
}

export const getPublicTasks = () => (dispatch) => {
    axios.get(`${ROOT_URL}/tasks/public`)
        .then(response => {
            dispatch({ type: GET_PUBLIC_TASKS, payload: response.data })
        })
        .catch(error => console.log(error))
}

export const getPrivateTasks = (name) => (dispatch) => {
    axios.get(`${ROOT_URL}/tasks/private/${name}`)
        .then(response => {
            dispatch({ type: GET_PRIVATE_TASKS, payload: response.data })
        })
        .catch(error => console.log(error))
}

export const registerUser = (values, callback) => (dispatch) => {

    const { email, username, password } = values;

    axios.post(`${ROOT_URL}/register`, {
        name: username,
        email: email,
        password: password
    }).then(response => {
        if(response.status === 200){
            dispatch({ type: FETCH_USER, payload: response.data });
            callback();
        }
    }).catch(error => console.log(error))

}

export const loginUser = (values, callback) => (dispatch) => {

    const { email, password } = values;

    axios.post(`${ROOT_URL}/signin`, {
        email: email,
        password: password
    }).then(response => {
        if(response.status === 200){
            dispatch({ type: FETCH_USER, payload: response.data });
            callback();
        }
    }).catch(error => callback(error));

}

export const logoutUser = () => {
    return {type: LOGOUT_USER, payload: {}}
}

export const getAllUser = (callback) => (dispatch) => {
    axios.get(`${ROOT_URL}/`)
        .then(response => {
            dispatch({
                type: GET_ALL_USER,
                payload: response.data
            })
            callback();
        })
        .catch(error => console.log(error))
}

