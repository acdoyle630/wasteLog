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
      productPrice : 0.00,
      productUnit : "",
      error : "",
      returnHome : false,
      showProducts : false,
      allProducts : [],
      allProductNames : [],
      validProduct : false
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


  saveToState( products ){
     for(let i = 0; i<products.length; i++){
       this.setState({
        //no more all products in state
         allProducts : this.state.allProducts.concat([products[i]]),
         //all product names should be in relation to redux not local state
         allProductNames : this.state.allProductNames.concat([products[i].productName])
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
    this.verifyProduct(this.state)
  }

  addProduct( product ){
    console.log('adding product')
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

  verifyProduct( product ){
    if( this.state.allProductNames.indexOf(product.productName) > -1){
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
    }
  }

  render() {

    console.log(this.props.products);

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
        <div className="error">
          {this.state.error}
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
        <div className="error">
          {this.state.error}
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

const mapStateToProps = (state) =>{
  return {
    products : state.products
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
