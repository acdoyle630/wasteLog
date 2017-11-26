import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      productName : "",
      productCategory : "",
      productPrice : 0.00,
      productUnit : "",
      //user_id : 1,
      returnHome : false,
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
      console.log( product )
    }).catch(err =>{
      throw err;
    })
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
    console.log( product );
    return fetch('/api/product', {
      method: "POST",
      credentials : "include",
      headers :
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body : JSON.stringify( product )
    });
  }

  redirectHome = ( event ) => {
    event.preventDefault();
    this.setState({
      returnHome : true
    });
  }

  render() {
    if(this.state.returnHome === true){
      return(
        <Redirect to={{
          pathname : '/'
        }} />
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
      </div>
    );
  }
}

export default App;
