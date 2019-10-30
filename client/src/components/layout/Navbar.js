import React , { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading}, logout, history}) => {
    const authLinks =(
        <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><a onClick={e => logout(history)} href="#!"><i className="fas fa-sign-out-alt">{' '} </i> Logout</a></li>
        </>
    );
    const guestLinks =(
        <>
               
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </>
    );
    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                
                
                <ul>
                    <li><Link to="/profiles">Developers</Link></li>
                    {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
                    
                </ul>
            </nav>
        </div>
    );
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logout})(withRouter(Navbar));
