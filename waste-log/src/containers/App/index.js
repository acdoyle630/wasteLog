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
      userName : "",
      password : ""
    };
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    this.setState({
      loggedIn : true
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
    if(this.state.loggedIn === false){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Waste-Log LOGGIN PAGE</h1>
          </header>
          <div className = "testing">
            <form onSubmit = {this.handleSubmit} className = "product-post-form">
              <input className = "user-name" type = "text" placeholder = "User Name" value = {this.userName} onChange = {this.handleUserNameChange} />
              <input className = "password" type = "password" placeholder = "Password" value = {this.password} onChange = {this.handlePasswordChange} />
              <button className = "button" type = "submit">
              Log In
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default App;
