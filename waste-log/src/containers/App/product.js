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
      returnHome : false,
      showProducts : false,
      allProductNames : [],
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
    }).then(() => {
     for(let i = 0; i<this.props.products.length; i++){
       this.setState({
         allProductNames : this.state.allProductNames.concat([this.props.products[i].productName])
       })
     }
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
            this.setState({
              allProductNames : this.state.allProductNames.concat([data.productName])
            })
            this.clearState();
          }).catch(err =>{
          throw err;
        })
    }

  redirectHome = ( event ) => {
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
              returnHome : true
            });
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

    for(let i = 0; i< this.props.products; i++){
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
    if(this.state.returnHome === true || this.props.currentUser === ''){
      return(
        <Redirect to={{
          pathname : '/'
        }} />
        )
    }


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">TOSSED</h1>
          <h2 className="current-user">
            {this.props.currentUser}'s Products
          </h2>
        <div className="Return Home">
          <form onSubmit={this.redirectHome}>
            <button className = "button" type = "submit">
              LOG OUT
            </button>
          </form>
        </div>
        </header>
        <div className="all-products-div">
            <form onSubmit = {this.handleSubmit} className = "product-post-form">
              <input className = "product-name" type = "text" placeholder = "Product Name" value = {this.state.productName} onChange = {this.handleProductNameChange} />
              <input className = "product-category" type = "text" placeholder = "Product Category" value = {this.state.productCategory} onChange = {this.handleProductCategoryChange} />
              <input className = "product-price" type = "decimal" placeholder = "Product Price" value = {this.state.productPrice} onChange = {this.handleProductPriceChange} />
              <input className = "product-unit" type = "text" placeholder = "Unit" value = {this.state.productUnit} onChange = {this.handleProductUnitChange} />
              <button className = "product-add-button" type = "submit">
              Add Product
              </button>
            </form>
          <div className="error">
            {this.state.error}
          </div>
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

const ConnectedProductApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ProductApp);

export default ConnectedProductApp;
