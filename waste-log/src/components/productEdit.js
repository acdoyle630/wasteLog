/*jshint esversion: 6*/


import React,{Component} from 'react';


class ProductEdit extends Component {
  constructor(props) {

    super(props);

    this.state = {
      allProducts : []
    }

  }



   render() {
    return(
      <div className="product-list">
        <h2>
          ALL PRODUCTS
        </h2>
        <ul>
          <li>
            PRODUCT EDIT
          </li>
        </ul>
      </div>
      )
   }
}

export default ProductEdit;
