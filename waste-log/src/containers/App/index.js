import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadCurrentUser, loadUsers } from '../../action';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      loggedIn : false,
      signedUp : true,
      username : "",
      password : "",
      error : ""
    };
  }

  componentWillMount(){
    fetch('/api/User', {
      method : "GET",
      credentials: 'include'
    }).then(( response )=>{
      return response.json()
    }).then(( users ) =>{
      //this.props.loadUsers( users )
    }).catch(err =>{
      throw err;
    })
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    this.authUser( this.state )
    /*this.setState({
      loggedIn : true
    })*/
  }

  authUser( user ) {
    return fetch('/logIn',{
        method: "POST",
        credentials : 'include',
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(user)
      }).then(response =>{
          return(response.json())
      }).then(data => {
        if(data.message === 'invalid'){
          this.setState({
            error: "invalid username password"
          })
        }
        else {
          this.props.loadCurrentUser( user.username );
          this.setState({
            loggedIn : true
          })
        }
      })
  }

  handleSignUpSubmit = ( event ) =>{
    event.preventDefault();
    this.setState({
      signedUp : false
    })
  }

  handleusernameChange = ( event ) => {
    this.setState({
      username : event.target.value
    })
  }

  handlePasswordChange = ( event ) => {
    this.setState({
      password : event.target.value
    })
  }


  render() {
    console.log(`THIS.STATE: ${this.state}`)
    console.log(this.props.currentUser)
    if(this.state.loggedIn === true){
      return(
        <Redirect to={{
          pathname : "/product"
        }} />
        )
    }

    if(this.state.signedUp === false){
      return(
        <Redirect to={{
          pathname : "/signUp"
        }} />
        )
    }
    if(this.state.loggedIn === false){
      return (
        <div className="App">

          <div className = "log-in-form">
            <div className="log-in-form-logo-div">
              <h1 className="log-in-form-logo"> TOSSED </h1>
            </div>
            <form className = "user-name-input" onSubmit ={this.handleSubmit}>
              <div className="log-in-or-sign-up">
                <div className="chosen-button-div">
                  <h4 className="log-in-header">
                    LOG IN
                  </h4>
                </div>
                <div className = "sign-up-button-div" onClick={this.handleSignUpSubmit}>
                  <h4 className = "sign-up-button" type = "submit">
                  SIGN UP
                  </h4>
                </div>
            </div>
              <input className = "user-name" type = "text" placeholder = "User Name:" value = {this.username} onChange = {this.handleusernameChange} />
              <input className = "password" type = "password" placeholder = "Password:" value = {this.password} onChange = {this.handlePasswordChange} />
              <button className = "button-log-in" type = "submit">
              GET STARTED
              </button>
              <div className="error">
                {this.state.error}
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ( state ) => {
  return {
    currentUser : state.currentUser
  };
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
  return {
    loadCurrentUser : user => {
      dispatch( loadCurrentUser ( user ))
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);

export default ConnectedApp;