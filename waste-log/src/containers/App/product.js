import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ProductList from '../../components/productList';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      productName : "",
      productCategory : "",
      productPrice : 0.00,
      productUnit : "",
      returnHome : false,
      showProducts : false,
      allProducts : []
    };
  }

  componentDidMount() {
    fetch('/api/Product', {
      method : "GET",
      credentials: 'include'
    }).then(( response )=>{
      return response.json()
    }).then(( product ) =>{
      this.saveToState( product )
    }).catch(err =>{
      throw err;
    })
  }

  saveToState( products ){
     for(let i = 0; i<products.length; i++){
       this.setState({
         allProducts : this.state.allProducts.concat([products[i]])
       })
     }
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
    this.addProduct(this.state)
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
    }).then(( product ) => {
      this.setState( product )
    }).catch(err =>{
      throw err;
    })
  }

  redirectHome = ( event ) => {
    event.preventDefault();
    this.setState({
      returnHome : true
    });
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

  render() {
    if(this.state.returnHome === true){
      return(
        <Redirect to={{
          pathname : '/'
        }} />
        )
    }

    if(this.state.showProducts === false){
      return(
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Waste-Log</h1>
        </header>
        <div className = "testing">
          <form onSubmit = {this.handleSubmit} className = "product-post-form">
            <input className = "product-name" type = "text" placeholder = "Product Name" value = {this.productName} onChange = {this.handleProductNameChange} />
            <input className = "product-category" type = "text" placeholder = "Product Category" value = {this.productCategory} onChange = {this.handleProductCategoryChange} />
            <input className = "product-price" type = "decimal" placeholder = "Product Price" value = {this.productPrice} onChange = {this.handleProductPriceChange} />
            <input className = "product-unit" type = "text" placeholder = "Unit" value = {this.productUnit} onChange = {this.handleProductUnitChange} />
            <button className = "button" type = "submit">
            Add Product
            </button>
          </form>
        </div>
        <div className="Return Home">
          <form onSubmit={this.redirectHome}>
            <button className = "button" type = "submit">
              RETURN HOME
            </button>
          </form>
        </div>
        <div className="all-products">
          <button className="button" onClick={this.showOrHideProducts}>
            SHOW ALL PRODUCTS
          </button>
        </div>
      </div>
        )
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Waste-Log</h1>
        </header>
        <div className = "testing">
          <form onSubmit = {this.handleSubmit} className = "product-post-form">
            <input className = "product-name" type = "text" placeholder = "Product Name" value = {this.productName} onChange = {this.handleProductNameChange} />
            <input className = "product-category" type = "text" placeholder = "Product Category" value = {this.productCategory} onChange = {this.handleProductCategoryChange} />
            <input className = "product-price" type = "decimal" placeholder = "Product Price" value = {this.productPrice} onChange = {this.handleProductPriceChange} />
            <input className = "product-unit" type = "text" placeholder = "Unit" value = {this.productUnit} onChange = {this.handleProductUnitChange} />
            <button className = "button" type = "submit">
            Add Product
            </button>
          </form>
        </div>
        <div className="Return Home">
          <form onSubmit={this.redirectHome}>
            <button className = "button" type = "submit">
              RETURN HOME
            </button>
          </form>
        </div>
        <div className="all-products">
          <button className="button" onClick={this.showOrHideProducts}>
            HIDE ALL PRODUCTS
          </button>
          <ProductList product={this.state.allProducts} />
        </div>
      </div>
    );
  }
}

export default App;
