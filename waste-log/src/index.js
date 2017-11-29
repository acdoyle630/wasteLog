import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers  from './reducers';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import product from './containers/App/product';
import signup from './containers/App/signup';
import home from './containers/App/home';
import productEdit from './containers/App/productEdit';


const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/product" component={product} />
        <Route path="/signUp" component={signup} />
        <Route path="/home" component={home} />
        <Route path="/productEdit" component={productEdit} />

      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

