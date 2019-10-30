import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_ACCOUNT, ACCOUNT_DELETED, GET_PROFILES, CLEAR_PROFILE, GET_REPOS} from './types'
import axios from 'axios'
import { setAlert } from './alerts'

/**  Get Current User Profile
 * @param {GET} Method  
 * @return {Current Users} returns all the current users profile
*/

export const getCurrentProfile = () => async dispatch =>{

    /**
     * User type definition
     * @typedef {Object} User
     * @property {Object} [User]
    */
    try{
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

/**  Get All User Profile
 * @param {GET} Method  
 * @return {All Users} returns all the current users profile
*/

export const getAllProfile = () => async dispatch =>{

    /**
     * User type definition
     * @typedef {Array} Users
     * @property {Array} [Users]
    */
    dispatch({type: CLEAR_PROFILE})
    try{
        const res = await axios.get('/api/profile')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
        
    }catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

/**  Get Current User Profile
* @param {GET} Method  
* @return {One User} returns all the current users profile
*/

export const getProfileById= (id) => async dispatch =>{

   /**
    * User type definition
    * @typedef {Object} User
    * @property {Object} [User]
   */
   try{
       const res = await axios.get(`/api/profile/user/${id}`)

       dispatch({
           type: GET_PROFILE,
           payload: res.data
       })
   }catch (err){
       dispatch({ 
           type: PROFILE_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
   }
}

/**  Get Current User Profile
* @param {GET} Method  
* @return {Github Repo} returns all the current users profile
*/

export const getGithubRepos= (name) => async dispatch =>{

    /**
     * User type definition
     * @typedef {Array} Github.Repos
     * @property {Array} [Github.Repos]
    */
    try{
        const res = await axios.get(`/api/profile/github/${name}`)
 
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }catch (err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
 }
 
 


/**  Create / update User Profile
 * @param {POST} Method  
 * @return { Message } returns all the current users profile
*/
 export const createProfile = (formdata, history, edit = false) => async dispatch =>{
     /**
     * User type definition
     * @typedef {Formdata} User
     * @property {Object} [User]
    */
   try{
        const config ={
            headers:{
                "Content-Type":'application/json'
            }
        }
        
        const res = await axios.post('/api/profile', formdata , config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        {}
        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", 'success'))

        if(!edit){
            history.push('/dashboard')
        }
   }
   catch (err){
    const errors = err.response.data.errors;

    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
    }
    dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
    })
   }
 }

 
 /**  Add Experience to Profile
 * @param {PUT} Method  
 * @return { Message } returns all the current users profile
*/
export const addexperience = (formdata, history) => async dispatch =>{
    /**
    * User type definition
    * @typedef {Formdata} User
    * @property {Object} [User]
   */
  try{
       const config ={
           headers:{
               "Content-Type":'application/json'
           }
       }
       const res = await axios.put('/api/profile/experience', formdata , config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Experience Added", 'success'))

        history.push('/dashboard')
       
  }
  catch (err){
   const errors = err.response.data.errors;

   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
   }
   dispatch({
       type: PROFILE_ERROR,
       payload: {msg: err.response.statusText, status: err.response.status}
   })
  }
}

 /**  Add Education to Profile
 * @param {PUT} Method  
 * @return { Message } returns all the current users profile
*/
export const addeducation = (formdata, history) => async dispatch =>{
    /**
    * User type definition
    * @typedef {Formdata} User
    * @property {Object} [User]
   */
  try{
       const config ={
           headers:{
               "Content-Type":'application/json'
           }
       }
       const res = await axios.put('/api/profile/education', formdata , config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Education Added", 'success'))

        history.push('/dashboard')
       
  }
  catch (err){
   const errors = err.response.data.errors;

   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
   }
   dispatch({
       type: PROFILE_ERROR,
       payload: {msg: err.response.statusText, status: err.response.status}
   })
  }
}

 /**  Delete Education from Profile
 * @param { DELETE } Method  
 * @return { Message } returns all the current users profile
*/
export const deleteEducation = (id) => async dispatch =>{
    /**
    * User type definition
    * @typedef {Formdata} User
    * @property {Object} [User]
   */
  try{
       const res = await axios.delete(`/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Education Deleted", 'success'))
       
  }
  catch (err){
   const errors = err.response.data.errors;

   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
   }
   dispatch({
       type: PROFILE_ERROR,
       payload: {msg: err.response.statusText, status: err.response.status}
   })
  }
}

/**  Delete Experience from Profile
 * @param { DELETE } Method  
 * @return { Message } returns all the current users profile
*/
export const deleteExperience = (id) => async dispatch =>{
    /**
    * User type definition
    * @typedef {Formdata} User
    * @property {Object} [User]
   */
  try{
       const res = await axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Experience Deleted", 'success'))
       
  }
  catch (err){
   const errors = err.response.data.errors;

   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
   }
   dispatch({
       type: PROFILE_ERROR,
       payload: {msg: err.response.statusText, status: err.response.status}
   })
  }
}

/**  Delete Account
 * @param { DELETE } Method  
 * @return { Message } returns all the current users profile
*/
export const deleteAccount = () => async dispatch =>{
    /**
    * User type definition
    * @typedef {Formdata} User
    * @property {Object} [User]
   */
  if(window.confirm('Are You Sure You Want To Delete Account? This cannot be undone')){
     try{
        const res = await axios.delete(`/api/profile`)

            dispatch({
                type: DELETE_ACCOUNT,
            })
            dispatch({
                type: ACCOUNT_DELETED,
            })
            dispatch(setAlert("Your Account Has Been Permanently Deleted", 'success'))
        
    }
    catch (err){
    const errors = err.response.data.errors;

    if(errors){
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
    }
    dispatch({
        type: PROFILE_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
    })
    } 
  }
  
}