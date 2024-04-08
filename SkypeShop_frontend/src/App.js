
import './App.css';
import { Navbar } from '../src/Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer'
import men_banner from '../src/Components/Assets/banner_mens.png'
import women_banner from '../src/Components/Assets/banner_women.png'
import kid_banner from '../src/Components/Assets/banner_kids.png'
import LiveStream from './Components/LiveStream/LiveStream';

function App() {
  return (
    <>
      <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/men" element={<ShopCategory banner={men_banner} category={"men"} />}  ></Route>
          <Route path="/women" element={<ShopCategory banner={women_banner} category={"women"} />}></Route>
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category={"kid"} />}></Route>
          <Route path="/product" element={<Product />}>
            <Route path=":id" element={<Product />}></Route>
          </Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/loginSignup" element={<LoginSignup />}></Route>
          <Route path="/live" element={<LiveStream />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter >


    </>
  );
}

export default App;
