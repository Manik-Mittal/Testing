import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import ShopState from './Context/ShopContext/ShopState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ShopState>
    <App />
  </ShopState>

);

