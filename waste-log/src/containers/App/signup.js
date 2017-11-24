import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      username : "",
      password : "",
      passwordTwo : "",
      signedUp : false,
      uniqueUser : true,
      validPassword : true
    };
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

  handlePasswordTwoChange = ( event ) => {
    this.setState({
      passwordTwo : event.target.value
    })
  }

  handleSignInSubmit = ( event ) => {
    event.preventDefault();
    if(this.state.uniqueUser && this.state.validPassword && this.state.password === this.state.passwordTwo){
      this.signUp(this.state);
    }
  }

  signUp( user ) {
    fetch('/api/User',{
        method: "POST",
        credentials : 'include',
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(user)
     }).then(response =>{
        //this.clearState()
        //this.signedUp = true;
      }).catch(error => {
        this.setState({
          error : error
        });
      })
  }



  render() {
    if(this.state.signedUp === true){
      return(
        <Redirect to={{
          pathname : "/"
        }} />
        )
    }
    if(this.state.signedUp === false){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Waste-Log SIGN UP PAGE</h1>
          </header>
          <div className = "testing">
            <form onSubmit = {this.handleSignInSubmit} className = "product-post-form">
              <input className = "user-name" type = "text" placeholder = "User Name" value = {this.username} onChange = {this.handleusernameChange} />
              <input className = "password" type = "password" placeholder = "Password" value = {this.password} onChange = {this.handlePasswordChange} />
              <input className = "password" type = "password" placeholder = "Password" value = {this.passwordTwo} onChange = {this.handlePasswordTwoChange} />
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
