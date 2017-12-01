import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadProducts, loadCurrentProduct } from '../../action'
import ProductList from '../../components/productList';


class WasteApp extends Component {

  constructor(props){
    super(props);

    this.state = {
      redirect: '',
      productName: '',
      productCategory: '',
      dayOfWeek : '',
      amount : '',
      reason : '',
      week : '',
    };

  }

  componentDidMount() {
    fetch('/api/Product', {
      method : "GET",
      credentials: 'include'
    }).then(( response )=>{
      return response.json()
    }).then(( products ) =>{
      this.props.loadProducts( products )
    }).catch(err =>{
      throw err;
    })
  }

  handleSubmit = ( event ) => {
    event.preventDefault()
    this.verifyProduct( this.state.productName );
  }

  handleAmountChange = ( event ) => {
    this.setState({
      amount : event.target.value
    })
  }

  handleReasonChange = ( event ) => {
    this.setState({
      reason : event.target.value
    })
  }

  handleProductNameChange = ( event ) => {
    this.setState({
      productName : event.target.value
    })
  }

  verifyProduct( name ) {
    for(let i = 0; i<this.props.products.length; i++){
      if(this.props.products[i].productName === name){
        console.log(this.props.products[i])
        this.setState({
          productCategory: this.props.products[i].productCategory,
          productName: this.props.products[i].productName,
          dayOfWeek: 'Monday',
          amount: Number(this.state.amount),
          reason: this.state.reason,
          week: '11',
          },
          this.logWaste
        );
      }

      //else{}
    }
  }



  logWaste = () => {
    if(this.state.amount !== '' && this.state.reason !== ''){
      return fetch('/api/waste', {
          method: "POST",
          credentials : "include",
          headers :
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body : JSON.stringify( this.state )
          }).then(( response ) => {
            return(response.json())
          })
          //.then((data) => {
          //})
          .catch(err =>{
          throw err;
        })
    }
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
    console.log(this.state)
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


        <form onSubmit = {this.handleSubmit} className = "product-post-form">
              <input className = "product-name" type = "text" placeholder = "Wasted Product Name" value = {this.state.productName} onChange = {this.handleProductNameChange} />
              <input className = "amount" type = "text" placeholder = "Wasted Product Amount" value = {this.state.amount} onChange = {this.handleAmountChange} />
              <input className = "product-price" type = "text" placeholder = "Reason" value = {this.state.reason} onChange = {this.handleReasonChange} />
              <button className = "product-add-button" type = "submit">
              LOG WASTE
              </button>
            </form>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    products : state.products,
    currentUser : state.currentUser,
    currentProduct : state.currentProduct
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadProducts : products => {
      dispatch(loadProducts(products))
    },
    loadCurrentProduct : product => {
      dispatch(loadCurrentProduct(product))
    }
  }
}

const ConnectedWasteApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(WasteApp);

export default ConnectedWasteApp;
