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
      showForm : false
    }

  }


  editProduct = ( event ) =>{
    // this.setState({
    //   currentId : event.target.value
    // })
    //find current id within props.products
    this.findCurrentProductObject(event.target.value);
  }

  findCurrentProductObject(productId){
    //console.log(productId)
    //console.log(this.props.products)
    for(let i = 0; i<this.props.products.length; i++){
      //console.log('enter loop')
      //console.log( this.props.products[i])
      if(this.props.products[i].id === Number(productId)){
        this.props.loadCurrentProduct(this.props.products[i])
        this.setState({
          showForm : true
        })
      }
    }
  }

   render() {
    if(this.state.showForm === false){
      return(
        <div className="product-list">
          <h2>
            ALL PRODUCTS
          </h2>

          <ul>
            {
               this.props.products.map((products) =>
                <li className="event" key={products.id}>
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
    if(this.state.showForm === true){
      return(
        <div className="product-list">
          <h2>
            ALL PRODUCTS
          </h2>
          <div className="edit-page">
            <ProductEdit showForm = {Math.floor(Math.random() * 1000)} />
          </div>
          <ul>
            {
               this.props.products.map((products) =>
                <li className="event" key={products.id}>
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

