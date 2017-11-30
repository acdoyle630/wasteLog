import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadProducts } from '../../action'
import ProductList from '../../components/productList';


class HomeApp extends Component {

  constructor(props){
    super(props);

    this.state = {
      redirect: ''
    };

  }

  redirectLogout = ( event ) => {
    event.preventDefault();
    fetch('/logout', {
            method: "GET",
            credentials : "include",
            headers :
            {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }).then(() => {
            this.setState({
              redirect : 'logout'
            });
          })
  }

  redirectProducts = ( event ) => {
    event.preventDefault();
    this.setState({
      redirect : 'products'
    })
  }

  redirectHome = ( event ) =>{
    event.preventDefault();
    this.setState({
      redirect : 'home'
    })
  }


  render() {

    if(this.props.currentUser === '' || this.state.redirect === 'logout'){
      return(
        <Redirect to={{
          pathname : '/'
        }} />
        )
    }

    if(this.state.redirect === 'products'){
      return(
        <Redirect to={{
          pathname : '/product'
        }} />
        )
    }

    if(this.state.redirect === 'home'){
      return(
        <Redirect to={{
          pathname : '/Home'
        }} />
        )
    }




    return (
      <div className="App">
        <header className="App-header">
          <div className="title-logout-div">
            <div className="empty-header-div">
            </div>
            <h1 className="App-title">TOSSED WASTE LOG</h1>
            <button className="logout-button"onClick={this.redirectLogout}>LOGOUT</button>
          </div>
          <h2 className="current-user">
            Welcome {this.props.currentUser}
          </h2>
          <div className="routes">
            <div className="go-to-waste" onClick={this.redirectHome}>
              <h4>HOME</h4>
            </div>
            <div className="go-to-products" onClick ={this.redirectProducts}>
              <h4>PRODUCTS</h4>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    products : state.products,
    currentUser : state.currentUser
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadProducts : products => {
      dispatch(loadProducts(products))
    }
  }
}

const ConnectedHomeApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(HomeApp);

export default ConnectedHomeApp;
