import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Moment from "react-moment"
import {Link} from "react-router-dom"
import Spinner from "../layout/Spinner"
import {getProfileById} from "../../actions/profile"
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileGithub from './ProfileGithub'


const Profile = ({getProfileById, profile:{profile, loading},auth, match}) => {
    useEffect(() =>{
        getProfileById(match.params.id)
       
    },[getProfileById])
    return (
        <>
            {profile == null || loading ? ( <Spinner /> ) : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                
                {auth.loading === false && auth.isAuthenticated && auth.user._id === profile.user._id && (
                    <Fragment>
                        <Link to='/edit-profile' className="btn btn-dark">Eidt Profile</Link>
                    </Fragment>
                )}
                <ProfileTop profile={profile}></ProfileTop>
                <ProfileAbout profile={profile}></ProfileAbout>

             <div className="profile-grid my-1">
                {profile.experience.length > 0 && (
                    <>
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.map(exp => (
                                <>
                                    <div>
                                        <h3 className="text-dark">{exp.company}</h3>
                                        <p> <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to == null ? "Now" : (<Moment format="YYYY/MM/DD"></Moment>)}</p>
                                        <p><strong>Position: </strong>{exp.title}</p>
                                        <p>
                                        <strong>Description: </strong>{exp.description}
                                        </p>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                )}
                {profile.education.length > 0 && (
                    <>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.map(edu => (
                                <>
                                    <div>
                                        <h3 className="text-dark">{edu.school}</h3>
                                        <p> <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.to == null ? "Now" : (<Moment format="YYYY/MM/DD"></Moment>)}</p>
                                        <p><strong>Position: </strong>{edu.degree}</p>
                                        <p>
                                        <strong>Description: </strong>{edu.description}
                                        </p>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                )}
                {profile.githubusername ? (
                    <ProfileGithub username={profile.githubusername} />
                ): (<>No Github Profile</>)}
                
                </div>
                </Fragment>
            )}
        
        </>
    )
}

Profile.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth:state.auth,
    repos: state.profile
})
export default connect(mapStateToProps, {getProfileById})(Profile)