import React from 'react';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import {BrowserRouter as Router, Route, Switch } from "react-router-dom" 
import Alert from './components/layout/Alert'
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
// REDUX
import PrivateRoute from "./components/routing/PrivateRoute"
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './components/profile-form/CreateProfile'
import store from './store'
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
import posts from './components/posts/posts';
import SinglePost from './components/post/SinglePost';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  React.useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return(
    <Provider store={store}>
    <React.Fragment>
      <Router>
        <Navbar />
        <Route exact path="/" component={ Landing } />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/post/:id" component={SinglePost} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/posts" component={posts} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
          </Switch>
        </section>
      </Router>
    </React.Fragment>
    </Provider>
)}
export default App;
