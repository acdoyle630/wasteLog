import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadProducts } from '../../action'
import ProductList from '../../components/productList';


class ProductApp extends Component {

  constructor(props){
    super(props);

    this.state = {
      productName : "",
      productCategory : "",
      productPrice : "",
      productUnit : "",
      error : "",
      redirect : '',
      showProducts : false,
      validProduct : false

    };
  }

  componentWillMount() {
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


  saveToState( products ){
   }

  handleProductNameChange = ( event ) => {
    this.setState({
      productName : event.target.value
    })
  }

   handleProductCategoryChange = ( event ) => {
    this.setState({
      productCategory : event.target.value
    })
  }

  handleProductUnitChange = ( event ) => {
    this.setState({
      productUnit : event.target.value
    })
  }

   handleProductPriceChange = ( event ) => {
    this.setState({
      productPrice : Number(event.target.value)
    })
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    this.verifyProduct(this.state)
  }

  addProduct( product ){
        return fetch('/api/product', {
          method: "POST",
          credentials : "include",
          headers :
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body : JSON.stringify( product )
          }).then(( response ) => {
            return(response.json())
          }).then((data) => {
            this.props.loadProducts(this.props.products.concat(data))
            this.clearState();
          }).catch(err =>{
          throw err;
        })
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


  redirectHome = ( event ) =>{
    event.preventDefault();
    this.setState({
      redirect : 'home'
    })
  }

  redirectWaste = ( event ) => {
    this.setState({
      redirect : 'waste'
    })
  }

  showOrHideProducts = () =>{
    if(this.state.showProducts === true){
      this.setState({
        showProducts : false
      })
    }
    else if(this.state.showProducts === false){
      this.setState({
        showProducts : true
      })
    }
  }

  verifyProduct( product ){
    console.log(this.props.products)
    let allProductName = [];

    for(let i = 0; i< this.props.products.length; i++){
      allProductName.push(this.props.products[i].productName)
    }

    if( allProductName.indexOf(product.productName) > -1){
      this.setState({
        error : 'PRODUCT NAME ALREADY USED',
        validProduct : false
      })
    }
    else if( this.state.productCategory === ''){
      this.setState({
        error : 'MUST CHOOSE CATEGORY',
        validProduct : false
      })
    }
    else if( this.state.productUnit === ''){
      this.setState({
        error : 'MUST CHOOSE UNIT',
        validProduct : false
      })
    }
    else{
      this.setState({
        error: '',
        validProduct : true
      })
    this.addProduct( product );
    //this.clearState();
    }
  }

  clearState = () => {
    this.setState({
      productName : "",
      productCategory : "",
      productPrice : "",
      productCategory : "",
      productUnit: ""
    })
  }

  render() {
    if(this.state.redirect === 'logout' || this.props.currentUser === ''){
      return(
        <Redirect to={{
          pathname : '/'
        }} />
        )
    }

    if(this.props.currentProduct !== ''){
     return(
      <Redirect to={{
        pathname : '/productEdit'
      }} />
      )
    }

    if(this.state.redirect === 'home'){
     return(
      <Redirect to={{
        pathname : '/home'
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
             <div className="go-to-home" onClick={this.redirectHome}>
              <h4>HOME</h4>
            </div>
            <div className="go-to-waste" onClick={this.redirectWaste}>
              <h4>WASTE</h4>
            </div>
          </div>

        </header>
        <div className="product-add-error">
          {this.state.error}
        </div>
        <div className="all-products-div">
            <form onSubmit = {this.handleSubmit} className = "product-post-form">
              <h3 className="edit-product-header">Add Product</h3>
              <input className = "product-name" type = "text" placeholder = "Product Name" value = {this.state.productName} onChange = {this.handleProductNameChange} />
              <input className = "product-category" type = "text" placeholder = "Product Category" value = {this.state.productCategory} onChange = {this.handleProductCategoryChange} />
              <input className = "product-price" type = "decimal" placeholder = "Product Price" value = {this.state.productPrice} onChange = {this.handleProductPriceChange} />
              <input className = "product-unit" type = "text" placeholder = "Unit" value = {this.state.productUnit} onChange = {this.handleProductUnitChange} />
              <button className = "product-add-button" type = "submit">
              Add Product
              </button>
            </form>
          <div className="all-products">
            <ProductList showForm={Math.floor(Math.random() * 1000)} />
          </div>
        </div>
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
    }
  }
}

const ConnectedProductApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ProductApp);

export default ConnectedProductApp;
