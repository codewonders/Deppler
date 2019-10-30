import React, { Component, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllProfile} from "../../actions/profile";
import Spinner from "../layout/Spinner"
import { Link } from 'react-router-dom';
import ProfileItem from './ProfilesItems';
const Profiles = ({ getAllProfile, profile:{profiles, loading}}) => {
    useEffect(() => {
        getAllProfile()
    },[])
    return <Fragment>
        {loading ? <Spinner/> : (
        <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>
            <div>
                {profiles.length > 0 ? 
                (
                    profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile}></ProfileItem>
                    ))
                ):(
                    <>
                        <h4>PROFILE NOT AVAILABLE</h4>
                    </>
                )}
            </div>
        </section>
        )}
        </Fragment>
    
}

Profiles.propTypes = {
    getAllProfile:PropTypes.func.isRequired,
}
const mapSateToProps = state =>({
    profile: state.profile
})
export default connect(mapSateToProps, {getAllProfile})(Profiles)