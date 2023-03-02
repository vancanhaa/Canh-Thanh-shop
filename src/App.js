import { Route, Routes } from "react-router-dom";

import Checkout from "./routes/Checkout";
import "./index.css";
import Cart from "./pages/cart/Cart";
import ForgotPassword from "./routes/ForgotPassword";
import { ROUTE } from "./constants";
import UserLogin from "./pages/user-login/UserLogin";
import UserRegister from "./pages/user-register/UserRegister";
import Home from "./pages/home/Home";
import Product from "./pages/products/product/Product";
import ProductDetail from "./pages/products/product-detail/ProductDetail";
import Address from "./pages/address/Address";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTE.HOME_PAGE} element={<Home />} />
        <Route path={ROUTE.PRODUCT} element={<Product />} />
        <Route path={ROUTE.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={ROUTE.CHECK_OUT} element={<Checkout />} />
        <Route path={ROUTE.CART} element={<Cart />} />
        <Route path={ROUTE.LOGIN} element={<UserLogin />} />
        <Route path={ROUTE.REGISTER} element={<UserRegister />} />
        <Route path={ROUTE.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTE.ADDRESS} element={<Address />} />
      </Routes>
    </div>
  );
}

export default App;
