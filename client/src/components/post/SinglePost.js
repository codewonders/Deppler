import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Moment from 'react-moment'
import {getSinglePosts, createComment} from "../../actions/post"
import { Link } from 'react-router-dom'
import {deleteComment} from '../../actions/post'
import PostItem from '../posts/PostItem'
const propTypes = {
    getSinglePosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired, 
    auth:PropTypes.object.isRequired,
    createComment: PropTypes.func.isRequired,  
    deleteComment:PropTypes.func.isRequired,
}

const SinglePost = ({getSinglePosts, match, post:{post, loading}, createComment, auth, deleteComment}) =>  {
    useEffect(() => {
        getSinglePosts(match.params.id)
    },[])
    const [text , setText] = useState('')
    return (
        <>
        {!loading && post && (
            <div>
            <section className="container">
            <Link to="/posts" className="btn">Back To Posts</Link>
            <PostItem post={post} showActions={false} />

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" onSubmit={e => {
                    e.preventDefault()
                    createComment(post._id, {text})
                    setText('')
                }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>

            <div className="comments">
                {/* {JSON.stringify(post)} */}
                {post.comments && (
                    <>
                        {post.comments.map(cmt => (
                            <>
                                <div className="post bg-white p-1 my-1" key={cmt._id}>
                                <div>
                                    <Link to={`/profile/${cmt.user}`}>
                                    <img
                                        className="round-img"
                                        src={cmt.avatar}
                                        alt=""
                                    />
                                    <h4>{cmt.name}</h4>
                                    </Link>
                                </div>
                                <div>
                                    <p className="my-1">
                                    {cmt.text}
                                    </p>
                                    <p className="post-date">
                                        <Moment format="YYYY/MM/DD">{cmt.date}</Moment>
                                    </p>
                                    {!auth.loading && cmt.user === auth.user._id && (
                                        <>
                                            <button className="btn btn-danger" onClick={e => deleteComment(post._id, cmt._id)}>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </>
                                    )}
                                </div>
                                </div>
                            </>
                        ))}
                    </>
                )}
                
            </div>
            </section>
        </div>
        )}
        </>
    )
}

SinglePost.propTypes = propTypes
const mapStateToProps = state => ({
    post:state.post,
    auth:state.auth
})
export default connect(mapStateToProps, {getSinglePosts, createComment, deleteComment})(SinglePost)
