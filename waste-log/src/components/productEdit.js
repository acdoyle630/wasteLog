/*jshint esversion: 6*/


import React,{Component} from 'react';
import { connect } from 'react-redux'
import { loadCurrentProduct } from '../action'


class ProductEditApp extends Component {
  constructor(props) {

    super(props);

    this.state = {
      productName : "",
      productCategory : "",
      productPrice : "",
      productUnit : ""
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


   render() {
    console.log(this.state)
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
            <input className = "product-name" type = "text" placeholder = "Product Name" value = {this.props.currentProduct.productName} onChange = {this.handleProductNameChange} />
          </div>
          <div>
            <h6>
              PRODUCT CATEGORY
            </h6>
            <input className = "product-category" type = "text" placeholder = "Product Category" value = {this.props.currentProduct.productCategory} onChange = {this.handleProductCategoryChange} />
          </div>
          <div>
            <h6>
              PRODUCT PRICE
            </h6>
            <input className = "product-price" type = "decimal" placeholder = "Product Price" value = {this.props.currentProduct.productPrice} onChange = {this.handleProductPriceChange} />
          </div>
          <div>
            <h6>
              PRODUCT UNIT
            </h6>
            <input className = "product-unit" type = "text" placeholder = "Unit" value = {this.props.currentProduct.productUnit} onChange = {this.handleProductUnitChange} />
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
    }
  }
}

const ConnectedProductEditApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ProductEditApp);

export default ConnectedProductEditApp;


