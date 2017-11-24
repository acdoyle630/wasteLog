import React, { Component } from 'react';
import logo from './logo.svg';
import './styles.css';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      productName : ""
    };

  }

  handleProductNameChange = ( event ) => {
    this.setState({
      productName : event.target.value
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

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Waste-Log</h1>
        </header>
        <div className = "testing">
          <form onSubmit = {this.handleSubmit} className = "product-post-form">
            <input className = "product-name" type = "text" placeholder = "Product Name" value = {this.productName} onChange = {this.handleProductNameChange} />
            <button className = "button" type = "submit">
            Add Product
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
