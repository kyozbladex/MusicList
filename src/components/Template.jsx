import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderContainer from './shared/HeaderContainer';
import HomePage from './home/HomePageContainer';
import ProfilePage from './account/ProfilePage';
import LoginPage from './account/LoginPageContainer';

export default function Template(props) {
  const { authentication, progress } = props;
  return (
    <Router>
        <div className="wrapper">
            <HeaderContainer authentication={authentication}/>
           {/*  <p>{props.progress}</p> */}
            <section className="page-content container-fluid">
            <div className="loader-wrapper" style={progress > 0 ? { display: 'block' } : { display: 'none' }}>
          <div className="loader-box">
            <div className="loader">Loading...</div>
          </div>
        </div>
                <Route exact path="/" component={HomePage} />
                <Route path="/account/profile/:id" component={ProfilePage} />
                <Route exact path="/account/login" component={LoginPage} />
            </section>
        </div>
    </Router>
  );
}