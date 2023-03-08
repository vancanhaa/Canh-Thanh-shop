import { Route, Routes } from "react-router-dom";

import Checkout from "./pages/checkout/Checkout";
import Cart from "./pages/cart/Cart";
import { ROUTE } from "./constants";
import UserLogin from "./pages/user-login/UserLogin";
import UserRegister from "./pages/user-register/UserRegister";
import Home from "./pages/home/Home";
import Product from "./pages/products/product/Product";
import ProductDetail from "./pages/products/product-detail/ProductDetail";
import Address from "./pages/account/components/address/Address";
import Account from "./pages/account/Account";
import Profile from "./pages/account/components/profile/Profile";
import Order from "./pages/account/components/order/Order";
import OrderDetail from "./pages/account/components/order-detail/OrderDetail";

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
        <Route path={ROUTE.ACCOUNT} element={<Account />}>
          <Route index element={<Profile />} />
          <Route path={ROUTE.PROFILE} element={<Profile />} />
          <Route path={ROUTE.ADDRESS} element={<Address />} />
          <Route path={ROUTE.ORDER} element={<Order />} />
          <Route path={ROUTE.ORDER_DETAIL} element={<OrderDetail />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
