/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux'
import { loadCurrentProduct, loadProducts } from '../action'


class ProductEditApp extends Component {
  constructor(props) {

    super(props);

    this.state = {
      productName : this.props.currentProduct.productName,
      productCategory : this.props.currentProduct.productCategory,
      productPrice : this.props.currentProduct.productPrice,
      productUnit : this.props.currentProduct.productUnit,
      id : this.props.currentProduct.id
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
    console.log( state )
    this.props.loadCurrentProduct( state )
    this.updateAllProducts();
  }

  updateAllProducts = () =>{
    console.log(this.props.currentProduct)
    let updatedStoreArray = [];
    //this.props.loadProducts( [this.props.products.concat[(this.props.currentProduct)]])
    // console.log(this.props.products)
    // console.log(this.props.currentProduct)
    // let upDatedStore =(this.props.products.concat(this.props.currentProduct))
    // this.props.loadProducts(upDatedStore);
    for(let i = 0; i<this.props.products.length; i++){
      if( this.props.products[i].id !== this.props.currentProduct.id){
        console.log('readding product')
        updatedStoreArray.push(this.props.products[i])
      }
      if( this.props.products[i].id === this.props.currentProduct.id){
        console.log('adding replacment')
        updatedStoreArray.push(this.props.currentProduct)
      }
    }
    this.props.loadProducts(updatedStoreArray)
  }


   render() {
    return(
      <div className="product-edit-list">
        <h4>
          EDIT PRODUCT
        </h4>
        <h5>
          {this.props.currentProduct.productName}
        </h5>
        <form onSubmit = {this.handleSubmit} className = "product-post-form">
          <div className="product-name-edit">
            <h6>
              PRODUCT NAME
            </h6>
            <input className = "product-name" type = "text" placeholder = "Product Name" value = {this.state.productName} onChange = {this.handleProductNameChange} />
          </div>
          <div>
            <h6>
              PRODUCT CATEGORY
            </h6>
            <input className = "product-category" type = "text" placeholder = "Product Category" value = {this.state.productCategory} onChange = {this.handleProductCategoryChange} />
          </div>
          <div>
            <h6>
              PRODUCT PRICE
            </h6>
            <input className = "product-price" type = "decimal" placeholder = "Product Price" value = {this.state.productPrice} onChange = {this.handleProductPriceChange} />
          </div>
          <div>
            <h6>
              PRODUCT UNIT
            </h6>
            <input className = "product-unit" type = "text" placeholder = "Unit" value = {this.state.productUnit} onChange = {this.handleProductUnitChange} />
          </div>
            <button className = "button" type = "submit">
            EDIT PRODUCT
            </button>
        </form>
      </div>
      )
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

