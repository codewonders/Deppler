import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createPost} from '../../actions/post'
const propTypes = {
    createPost:PropTypes.func.isRequired,
}

const PostForm = ({createPost}) => {
    const [formData, setFormData] = useState({
        text:''
    })
    const onChange = e => setFormData({ ...formData , [e.target.name]: e.target.value })
    const {text} = formData
    const onSubmit = async e => {
        e.preventDefault()
        createPost(formData)
        setFormData({text:''})
    }
    return (
        <div>
            <div className="post-form">
                <div className="bg-primary p">
                <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={e => onSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                    value={text}
                    onChange={e => onChange(e)}
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </div>
    )
}

PostForm.propTypes = propTypes

export default connect(null, {createPost})(PostForm)
