import { Route, Routes } from "react-router-dom";

import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Home from "./routes/Home";
import Shop from "./routes/Shop";
import ProductDetail from "./routes/ProductDetail";
import Checkout from "./routes/Checkout";
import Cart from "./routes/Cart";

import ForgotPassword from "./routes/ForgotPassword";
import {ROUTE} from "./constants"
import UserRegister from "./pages/user-register-login/UserRegister";
import UserLogin from "./pages/user-register-login/UserLogin";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={ROUTE.HOME_PAGE} element={<Home />} />
        <Route path={ROUTE.SHOP} element={<Shop />} />
        <Route path={ROUTE.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={ROUTE.CHECK_OUT} element={<Checkout />} />
        <Route path={ROUTE.CART} element={<Cart />} />
        <Route path={ROUTE.LOGIN} element={<UserLogin />} />
        <Route path={ROUTE.REGISTER} element={<UserRegister />} />
        <Route path={ROUTE.FORGOT_PASSWORD} element={<ForgotPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
