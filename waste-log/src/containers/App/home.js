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

  redirectProducts = ( event ) => {
    event.preventDefault();
    this.setState({
      redirect : 'products'
    })
  }

  redirectLogout = ( event ) =>{
    event.preventDefault();
    this.setState({
      redirect : 'logout'
    })
  }

  redirectWaste = ( event ) => {
    event.preventDefault();
    this.setState({
      redirect : 'waste'
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

    if(this.state.redirect === 'waste'){
      return(
        <Redirect to={{
          pathname : '/waste'
        }} />
        )
    }



    return (
      <div className="App">
        <header className="App-header">
          <div className="title-logout-div">
            <div className="empty-header-div">
            </div>
            <h1 className="App-title">TOSSED</h1>
            <button className="logout-button"onClick={this.redirectLogout}>LOGOUT</button>
          </div>
          <h2 className="current-user">
            Welcome {this.props.currentUser}
          </h2>
          <div className="routes">
            <div className="go-to-products" onClick ={this.redirectProducts}>
              <h4>PRODUCTS</h4>
            </div>
            <div className="go-to-waste" onClick={this.redirectWaste}>
              <h4>WASTE</h4>
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
