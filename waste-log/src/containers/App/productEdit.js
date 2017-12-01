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
          <div className="title-logout-div">
            <div className="empty-header-div">
            </div>
            <h1 className="App-title">TOSSED</h1>
            <button className="logout-button"onClick={this.redirectLogout}>LOGOUT</button>
          </div>
          <h2 className="current-user">
            Product Edit {this.props.currentUser}
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

        <div className="all-products-div">
            <form onSubmit = {this.handleSubmit} className = "product-post-form">
              <h5 className="edit-product-header">Edit Product: {this.props.currentProduct.productName}</h5>
              <div className ="product-edit-form">
                <div className = "product-edit-name-text">Product Name:</div>
                <input className = "product-edit-name" type = "text" placeholder = "Product Name" value = {this.state.productName} onChange = {this.handleProductNameChange} />
              </div>
              <div className ="product-edit-form">
                <div className="product-edit-category-text">Product Category:</div>
                <input className = "product-edit-category" type = "text" placeholder = "Product Category" value = {this.state.productCategory} onChange = {this.handleProductCategoryChange} />
              </div>
              <div className ="product-edit-form">
                <div className="product-edit-price-text">Product Price: </div>
                <input className = "product-edit-price" type = "decimal" placeholder = "Product Price" value = {this.state.productPrice} onChange = {this.handleProductPriceChange} />
              </div>
              <div className ="product-edit-form">
                <div className="product-edit-unit-text">product Unit</div>
                <input className = "product-edit-unit" type = "text" placeholder = "Unit" value = {this.state.productUnit} onChange = {this.handleProductUnitChange} />
              </div>
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


