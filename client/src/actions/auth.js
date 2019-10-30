import {REGISTER_SUCCESS , REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE} from './types'
import axios from 'axios'
import { setAlert } from './alerts'
import  setAuthToken from '../utils/setAuthToken'

 
export const loadUser = () => async dispatch =>{
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try{
        const res = await axios.get('/api/auth')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }
    catch (err){
        dispatch({
            type: AUTH_ERROR
        })
    }
}
export const logout = (history) => async dispatch =>{
    if(localStorage.token){
        localStorage.removeItem('token')
    }
    try{
        dispatch({type: CLEAR_PROFILE})
        dispatch({type: LOGOUT}) 
        history.push('/login')   
    }
    catch (err){
        throw err;
    }
}
export const register = ({name , email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-type": 'application/json'
        }
    }
    const newUser = {
        name,
        email,
        password
    }
    const body = JSON.stringify(newUser)
    try{
        
        const res = await axios.post('/api/users', body, config);

        dispatch({
            payload: res.data,
            type: REGISTER_SUCCESS
        })
        dispatch(loadUser())
    }catch (err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
        }


        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-type": 'application/json'
        }
    }
    const newUser = {
        email,
        password
    }
    const body = JSON.stringify(newUser)
    try{
        
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            payload: res.data,
            type: LOGIN_SUCCESS
        })
        dispatch(loadUser())
    }catch (err){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
        }


        dispatch({
            type: LOGIN_FAIL
        })
    }
}
