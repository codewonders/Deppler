import React, {Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from "./DashboardActions"
import Experience from "./Experience"
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Education from './Education';
import {deleteAccount} from '../../actions/profile'
const Dashboard = ({profile:{profile, loading}, getCurrentProfile,deleteAccount, auth:{user}}) => {
    useEffect(() =>{
        getCurrentProfile()
    },[])
    return loading && profile == null ? (<Spinner/>) : (
           <Fragment>
               <section className="container">
                <h1 className="large text-primary">
                    Dashboard
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
                {profile !== null ? (
                    <>
                        <DashboardActions />
                        <Experience experience={profile.experience}></Experience>
                        <Education education={profile.education}></Education>
                    </>
                ):(
                    <Fragment>
                        <p>You dont yet have a profile currently please do create one, </p>
                        <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
                    </Fragment>
                )}
                
                

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => deleteAccount()}>
                            <i className="fas fa-user-minus"></i>

                            Delete My Account
                        </button>
                    </div>
                </section>
           </Fragment>
       ) 
}

Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard)