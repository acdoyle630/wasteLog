/*jshint esversion: 6*/


import React,{Component} from 'react';
import ProductEdit from './productEdit';
import { connect } from 'react-redux'


class ProductListApp extends Component {
  constructor(props) {

    super(props);

    this.state = {
      allProducts : [],
      currentId : null
    }

  }

  componentWillMount() {
    fetch('/api/Product', {
      method: "GET",
      credentials : 'include'
    }).then((response) =>{
      return response.json()
    }).then(( products ) =>{
      this.saveToState( products )
    }).catch(err =>{
      throw err;
    })
  }

  saveToState( products ){
    for(let i = 0; i<products.length; i++){
      this.setState({
        allProducts : this.state.allProducts.concat([products[i]])
      })
    }
  }

  editProduct = ( event ) =>{
    this.setState({
      currentId : event.target.value
    })
  }

   render() {
    console.log(this.props.products)
    return(
      <div className="product-list">
        <h2>
          ALL PRODUCTS
        </h2>
        <div className="edit-page">
          {this.state.currentId}
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

const mapStateToProps = (state) =>{
  return {
    products : state.products,
    currentUser : state.currentUser
  };
}

const ConnectedProductListApp = connect(
  mapStateToProps,
  )(ProductListApp);

export default ConnectedProductListApp;

