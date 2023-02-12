import React from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
