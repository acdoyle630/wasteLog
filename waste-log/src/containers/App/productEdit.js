/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux'
import { loadCurrentProduct, loadProducts } from '../../action'
import { Redirect } from 'react-router-dom';
import ProductList from '../../components/productList';



class ProductEditApp extends Component {
  constructor(props) {

    super(props);

    this.state = {
      productName : this.props.currentProduct.productName,
      productCategory : this.props.currentProduct.productCategory,
      productPrice : this.props.currentProduct.productPrice,
      productUnit : this.props.currentProduct.productUnit,
      id : this.props.currentProduct.id,
      returnToProducts : false
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
    this.editProduct( this.state );
  }

  editProduct ( product ){
    return fetch(`/api/product/${this.props.currentProduct.id}`, {
        method: "PUT",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify(product)
      }).then((response) =>{
        this.updateState ( this.state )
      }).catch(err =>{
        throw err;
      })

  }

  updateState( state ){
    this.props.loadCurrentProduct( state )
    this.updateAllProducts( "Edit");
  }

  updateAllProducts = ( command ) =>{
    let updatedStoreArray = [];
    for(let i = 0; i<this.props.products.length; i++){
      if( this.props.products[i].id !== this.props.currentProduct.id){
        updatedStoreArray.push(this.props.products[i])
      }
      if( this.props.products[i].id === this.props.currentProduct.id && command !== 'delete'){
        updatedStoreArray.push(this.props.currentProduct)
      }
    }
    this.props.loadProducts(updatedStoreArray)
    this.returnToProducts();
  }

  returnToProducts(){
    this.props.loadCurrentProduct('')
    this.setState({
      returnToProducts : true
    })
  }

  setProductStateToMatchProps(){
    this.setState({
      productName : this.props.currentProduct.productName,
      productCategory : this.props.currentProduct.productCategory,
      productPrice : this.props.currentProduct.productPrice,
      productUnit : this.props.currentProduct.productUnit,
      id : this.props.currentProduct.id,
    })
  }

  deleteProduct = ( event ) =>{
    event.preventDefault()
    return fetch(`/api/product/${this.state.id}`, {
        method: "DELETE",
        credentials: 'include',
         headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body : JSON.stringify(this.state)
      }).then(() =>{
          this.updateAllProducts('delete')
      }).catch(err =>{
        throw err;
      })
  }


   render() {
    console.log(this.state)
    if(this.props.currentProduct.id !== this.state.id){
      this.setProductStateToMatchProps()
    }

    if(this.state.returnToProducts === true){
      return(
        <Redirect to={{
          pathname : "/product"
        }} />
        )
    }

    if(this.props.currentUser === ''){
      return(
        <Redirect to={{
          pathname : "/"
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
              <div className="product-edit-buttons">
                <button className = "product-add-button" type = "submit">
                Edit Product
                </button>
                <button className="product-add-button" onClick={this.deleteProduct}>
                  Delete Product
                </button>
              </div>

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
    currentUser : state.currentUser,
    currentProduct : state.currentProduct
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCurrentProduct: currentProduct =>{
      dispatch(loadCurrentProduct(currentProduct))
    },
    loadProducts : products =>{
      dispatch(loadProducts(products))
    }
  }
}

const ConnectedProductEditApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ProductEditApp);

export default ConnectedProductEditApp;


