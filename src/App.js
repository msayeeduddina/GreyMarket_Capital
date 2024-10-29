import React from "react";
import "../src/assets/css/custom.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Faq from "./Components/Pages/FAQ/Faq";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fund from "./Components/Pages/Fund/Fund";
import TradingBot from "./Components/Pages/TradingBot/TradingBot";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";

const App = () => {
  return (
    <div>
      {/* Routing */}
      <Router>
        <Header></Header>
        <Routes>
          {/* <Route path="/" exact component={Dashboard}></Route> */}
          <Route path="/Fund" exact component={Fund}></Route>
          <Route path="/TradingBot" component={TradingBot}></Route>
          <Route path="/FAQ" component={Faq}></Route>
          {/* <Route path="/Trading"  component={Trading}></Route>
          <Route path="/Statistics" component={Statistics}></Route>
          <Route path="/Stake" component={Stake}></Route>
          <Route path="/Claim" component={Claim}></Route>
          <Route path="/Calcutate" component={Calcutate}></Route>  */}
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
};

export default App;
