import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

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
          console.log("LOGIN SUCCESS")
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
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Waste-Log LOGGIN PAGE</h1>
          </header>
          <div className = "testing">
            <form onSubmit = {this.handleSubmit} className = "product-post-form">
              <input className = "user-name" type = "text" placeholder = "User Name" value = {this.username} onChange = {this.handleusernameChange} />
              <input className = "password" type = "password" placeholder = "Password" value = {this.password} onChange = {this.handlePasswordChange} />
              <button className = "button" type = "submit">
              LOG IN
              </button>
            </form>
          </div>
          <div className = "testing">
            <form onSubmit = {this.handleSignUpSubmit} className = "sign-up-form">
              <button className = "button" type = "submit">
              SIGN UP
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default App;
