import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {addeducation} from "../../actions/profile"

const AddEducation = ({addeducation, history}) => {
    const [formData, setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        current:false,
        to:'',
        description:'',
    })
    const [toDateDisabled, toggletoDateDisabled] = useState(false)
    const {school,degree,fieldofstudy,from ,current,to,description} = formData
    const onChange = e => setFormData({ ...formData , [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault()
        addeducation(formData, history)
    }
    return (
        <section className="container">
            <h1 className="large text-primary">
            Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended.
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="* School" name="school" required value={school} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Degree" name="degree" required value={degree} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field Of Study" name="fieldofstudy"  value={fieldofstudy} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                    setFormData({...formData, current: !current})
                    toggletoDateDisabled(!toDateDisabled)
                }} /> Current Job</p>
                </div>
                {!toDateDisabled && 
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)}/>
                </div>}
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description}
                    onChange={e => onChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
            </form>
        </section>
    )
}

AddEducation.propTypes = {
    addeducation:PropTypes.func.isRequired,
}

export default connect(null, {addeducation})(withRouter(AddEducation))