import { 
    ROOT_URL, FETCH_USER, GET_PUBLIC_TASKS,
    GET_PRIVATE_TASKS, LOGOUT_USER,
    GET_ALL_USER, CREATE_GROUP, GET_GROUP,
    LOCAL_STORAGE_USER_ID, GET_GROUP_TASKS, CHANGE_PRIMARY_COLOR, CHANGE_SECONDARY_COLOR 
} from "./constants";
import axios from 'axios'


export const changePrimaryColor = (primary) => {
    return{
        type: CHANGE_PRIMARY_COLOR,
        payload: primary
    }
}

export const changeSecondaryColor = (secondary) => {
    return{
        type: CHANGE_SECONDARY_COLOR,
        payload: secondary
    }
}

export const addListItem = (item, name, checked, groupid, callback) => (dispatch) => {
   axios.post(`${ROOT_URL}/tasks/new`, {
       todo: item,
       name: name,
       checked: checked,
       groupid: groupid
   }).then(response => {
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
            callback(response.data);
        }
    }).catch(error => callback(error));

}

export const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_ID)
    return {type: LOGOUT_USER, payload: {}}
}

export const getUser = (id, callback) => (dispatch) => {
    axios.get(`${ROOT_URL}/profile/${id}`)
        .then(res => {
            dispatch({
                type: FETCH_USER,
                payload: res.data
            })
            callback()
        })
        .catch(err => console.log(err))
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

export const createGroup = (title, members, admin, callback) => (dispatch) => {
    axios.post(`${ROOT_URL}/teams/new`, {
        title: title,
        members: members,
        admin: admin
    }).then(response => {
        dispatch({
            type: CREATE_GROUP,
            payload: response.data
        })
        callback()
    }).catch(error => console.log(error))

}

export const getGroup = (groupid) => (dispatch) => {
    axios.get(`${ROOT_URL}/teams/${groupid}`, )
        .then(response => {
            dispatch({
                type: GET_GROUP,
                payload: response.data
            })
        })
        .catch(err => console.log(err));
}

export const getGroupTasks = (groupid) => (dispatch) => {
    axios.get(`${ROOT_URL}/tasks/teams/${groupid}`)
        .then(tasks => {
            dispatch({
                type: GET_GROUP_TASKS,
                payload: tasks.data
            })
        })
        .catch(err => console.log(err))
}

