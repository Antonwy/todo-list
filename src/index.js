import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'


import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
//import { createLogger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import { taskList, userInfo, allUser, groupInfo, colorManager } from './Redux/reducers'


//const logger = createLogger();
const rootReducer = combineReducers({
    tasks: taskList,
    user: userInfo,
    form: formReducer,
    allUser,
    group: groupInfo,
    colors: colorManager
})
const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
            <Router basename={process.env.PUBLIC_URL}>
                <Provider store={store}>
                    <App />
                </Provider>
            </Router>
        , document.getElementById('root'));
registerServiceWorker();
