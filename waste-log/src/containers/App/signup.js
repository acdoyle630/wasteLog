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
      uniqueUser : false,
      validPassword : false,
      allUsers : [],
      error : "",
      passwordsMatch : false,
      success : ""
    };
  }

  componentDidMount() {
    fetch('/api/User', {
      method : "GET",
      credentials: 'include'
    }).then(( response )=>{
      return response.json()
    }).then(( user ) =>{
      this.usersToState( user )
    }).catch(err =>{
      throw err;
    })
  }

  usersToState( users ) {
    for(let i = 0; i < users.length; i++){
      this.setState({
        allUsers : this.state.allUsers.concat([users[i].username])
      })
    }
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
    this.checkUserName();
    /*if(this.state.uniqueUser && this.state.validPassword && this.state.password === this.state.passwordTwo && this.state.allUsers.indexOf(this.state.username) < 0){
      this.signUp(this.state);
    }*/
  }

  checkUserName = () => {
    if(this.state.allUsers.indexOf(this.state.username) >= 0){
      this.setState({
        uniqueUser : false,
        error : "User Name is Taken"
      })
    }
    else if(this.state.username.length < 8){
      this.setState({
        uniqueUser : false,
        error : "username must be at least 8 characters"
      })
    } else {
      this.setState({
        uniqueUser : true
      })
      this.checkPasswordValidity();
    }
  }

  checkPasswordValidity = () => {
    if(this.state.password !== this.state.passwordTwo){
      this.setState({
        passwordsMatch : false,
        error : "passwords do not match"
      })
    }
    else if(this.state.password === this.state.passwordTwo && this.state.password.length < 8){
      this.setState({
        passwordsMatch : false,
        error : "Password needs to be at least 8 characters"
      })
    }
    else if(this.state.password === this.state.passwordTwo && this.state.password.length >= 8){
      this.setState({
        passwordsMatch : true,
        validPassword : true,
        error : '',
        success : "Successful Sign up, sign in"
      })
      this.signUp( this.state );
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

  redirectHome = () => {
    this.setState({
      signedUp : true
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
          <div className = "log-in-form">
            <div className="log-in-form-logo-div">
              <h1 className="log-in-form-logo"> TOSSED </h1>
            </div>
            <form onSubmit = {this.handleSignInSubmit} className = "user-name-input">
              <div className="log-in-or-sign-up">
                  <div className="log-in-header-div" onClick={this.redirectHome}>
                    <h4 className="log-in-header">
                      LOG IN
                    </h4>
                  </div>
                  <div className = "chosen-button-div" >
                    <h4 className = "sign-up-button" type = "submit">
                    SIGN UP
                    </h4>
                  </div>
                </div>
                <input className = "user-name" type = "text" placeholder = "User Name:" value = {this.username} onChange = {this.handleusernameChange} />
                <input className = "password" type = "password" placeholder = "Password:" value = {this.password} onChange = {this.handlePasswordChange} />
                <input className = "password" type = "password" placeholder = "Re-Enter Password:" value = {this.passwordTwo} onChange = {this.handlePasswordTwoChange} />
                <button className = "button-log-in" type = "submit">
                SIGN UP
                </button>
                <div className="error">
                  {this.state.error}
                  {this.state.success}
                </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default App;
