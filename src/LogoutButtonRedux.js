import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './store/authentication';


const LogoutButtonRedux = (props) => {
  if (props.loggedOut) {
    return <Redirect to="/login" />;
  }
  return (
    <div id="logout-button-holder">
      <button onClick={props.logout}>Logout</button>
    </div>
  );
}


const mapStateToProps = (state) => ({
  loggedOut: state.currentUserId ? true : false,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButtonRedux);
