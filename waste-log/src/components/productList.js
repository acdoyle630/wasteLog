/*jshint esversion: 6*/


import React,{Component} from 'react';


class ProductList extends Component {
  constructor(props) {

    super(props);

    this.state = {
      allProducts : []
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

   render() {
    console.log(this.state.allProducts)
    return(
      <div className="product-list">
        <h2>
          ALL PRODUCTS
        </h2>
        <ul>
          {
             this.state.allProducts.map((products) =>
              <li className="event" key={products.id}>
                <h3>{products.productName}</h3>
              </li>
              )
          }
        </ul>
      </div>
      )
   }
}

export default ProductList;
