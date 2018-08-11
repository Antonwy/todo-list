import { ROOT_URL, GET_TASKS, FETCH_USER } from "./constants";
import axios from 'axios'

export const addListItem = (item, callback) => (dispatch) => {
   axios.post(`${ROOT_URL}/tasks/new`, {
       todo: item
   }).then(response => {
        callback()
   }).catch(error => console.log(error))
} 

export const getTasks = () => (dispatch) => {
    axios.get(`${ROOT_URL}/tasks`)
        .then(response => {
            dispatch({ type: GET_TASKS, payload: response.data })
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
    }).catch(error => console.log(error));

}
