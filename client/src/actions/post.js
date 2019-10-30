import {GET_POSTS,POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from './types'
import axios from 'axios'
import { setAlert } from './alerts'

/**  Get Current User Profile
 * @param {GET} Method  
 * @return {Current Users Posts} returns all the current users profile
*/

export const getPosts = () => async dispatch =>{

    /**
     * User type definition
     * @typedef {Object} User
     * @property {Object} [User]
    */
    try{
        const res = await axios.get('/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

/**  Get Current User Profile
 * @param {GET} Method  
 * @return {Current Users Posts} returns all the current users profile
*/

export const getSinglePosts = (id) => async dispatch =>{

    /**
     * User type definition
     * @typedef {Object} User
     * @property {Object} [User]
    */
    try{
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}


/**  Get All User Profile
 * @param {PUT} Method  
 * @return {Add Like} returns all the current users profile
*/
export const addLike = (id) => async dispatch =>{

    /**
     * User type definition
     * @typedef {Object} User
     * @property {Object} [User]
    */
    try{
        const res = await axios.put(`/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id , likes:res.data}
        })
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

/**  Get All User Profile
 * @param {PUT} Method  
 * @return {Add Like} returns all the current users profile
*/
export const removeLike = (id) => async dispatch =>{

    /**
     * User type definition
     * @typedef {Object} User
     * @property {Object} [User]
    */
    try{
        const res = await axios.put(`/api/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id , likes:res.data}
        })
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

/**  Get All User Profile
 * @param {DELETE} Method  
 * @return {DELETE Post} returns all the current users profile
*/
export const deletePost = (id) => async dispatch =>{

    /**
     * User type definition
     * @typedef {Object} User
     * @property {Object} [User]
    */
    try{
        const res = await axios.delete(`/api/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: {id , likes:res.data}
        })
        dispatch(setAlert("Post Removed", "danger"))
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

/**  Create / update User Profile
 * @param {POST} Method  
 * @return { Message } returns all the current users profile
*/
export const createPost = (formdata) => async dispatch =>{
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
       
       const res = await axios.post('/api/posts', formdata , config)

       dispatch({
           type: ADD_POST,
           payload: res.data
       })
       dispatch(setAlert("Post Created" , 'success'))
  }
  catch (err){
   const errors = err.response.data.errors;

   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
   }
   dispatch({
       type: POST_ERROR,
       payload: {msg: err.response.statusText, status: err.response.status}
   })
  }
}

/**  Create / update User Profile
 * @param {POST} Method  
 * @return { Message } returns all the current users profile
*/
export const createComment = (id, formdata) => async dispatch =>{
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
       
       const res = await axios.post(`/api/posts/comment/${id}`, formdata , config)

       dispatch({
           type: ADD_COMMENT,
           payload: res.data
       })
       dispatch(setAlert("Comment Created" , 'success'))
  }
  catch (err){
   const errors = err.response.data.errors;

   if(errors){
       errors.forEach(error => dispatch(setAlert(error.msg, 'danger ')))
   }
   dispatch({
       type: POST_ERROR,
       payload: {msg: err.response.statusText, status: err.response.status}
   })
  }
}

/**  Get All User Profile
 * @param {DELETE} Method  
 * @return {DELETE Comment} returns all the current users profile
*/
export const deleteComment = (postId, commentId) => async dispatch =>{

    /**
     * User type definition
     * @typedef {Object} User
     * @property {Object} [User]
    */
    try{
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert("Comment Removed", "danger"))
    }catch (err){
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}