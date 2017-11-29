/*jshint esversion: 6*/


import React,{Component} from 'react';
import ProductEdit from './productEdit';
import { connect } from 'react-redux'
import { loadCurrentProduct } from '../action'


class ProductListApp extends Component {
  constructor(props) {

    super(props);

    this.state = {
      currentId : null,
      showForm : null
    }

  }

  editProduct = ( event ) =>{
    this.findCurrentProductObject(event.target.value);
  }

  findCurrentProductObject(productId){
    for(let i = 0; i<this.props.products.length; i++){
      if(this.props.products[i].id === Number(productId)){
        this.props.loadCurrentProduct(this.props.products[i])
        this.setState({
          showForm : this.props.showForm
        })
      }
    }
  }

   render() {
    console.log(this.props.currentProduct)
    if(this.state.showForm !== this.props.showForm && this.props.products.length > 0){
      return(
        <div className="product-list">
          <h3 className="product-list-header">
            ALL PRODUCTS
          </h3>

          <ul>
            {
               this.props.products.map((products) =>
                <li className="product-list-object" key={products.id}>
                  <h3 className="product-list-name">{products.productName}</h3>
                  <button value={products.id} onClick={this.editProduct} className="product-list-edit-button">
                    Edit Product
                  </button>
                </li>
                )
            }
          </ul>
        </div>
        )
      }

    if(this.state.showForm !== this.props.showForm && this.props.products.length < 1){
      return(
        <div className="product-list">
          <h2>
           ADD PRODUCTS TO BEGIN
          </h2>

        </div>
        )
      }

    if(this.state.showForm === this.props.showForm && this.props.products.length > 0){
      return(
        <div className="product-list">
          <h2 className="product-list-header">
            ALL PRODUCTS
          </h2>

          <ul>
            {
               this.props.products.map((products) =>
                <li className="product-list-object" key={products.id}>
                  <h3>{products.productName}</h3>
                  <button value={products.id} onClick={this.editProduct}>
                    EDIT
                  </button>
                </li>
                )
            }
          </ul>
        </div>
        )
      }
      else {
        return(
        <div className="product-list">
          <h2>
           ADD PRODUCTS TO BEGIN
          </h2>

        </div>
        )

      }
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

const ConnectedProductListApp = connect(
  mapStateToProps,
  mapDispatchToProps
  )(ProductListApp);

export default ConnectedProductListApp;

