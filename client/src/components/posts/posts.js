import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import { getPosts } from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'
const propTypes = {
    getPosts: PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}
const Posts = ({post:{posts, loading}, getPosts}) => {
    useEffect(() => {
        getPosts()
    },[getPosts])
    return (
        <div>
            {!loading ? (
                <>
                    <section className="container">
                    <h1 className="large text-primary">
                        Posts
                    </h1>
                    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
                    <PostForm />
                    <div className="posts">
                        {posts.map(pst => (
                            <PostItem key={pst._id} post={pst}></PostItem>
                        ))}
                    </div>
                    </section>
                </>
            ) : (<></>)}    
        </div>
    )
}

Posts.propTypes = propTypes
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPosts})(Posts)
