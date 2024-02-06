import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import NotFoundPage from "./Pages/NotFoundPage";
import Offer from "./Pages/Offer";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Cookies from "js-cookie";
import Publish from "./Pages/Publish";
import Payment from "./Pages/Payment";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log("✅response Data✅", response.data);
        setData(response.data);
      } catch (error) {
        console.log("🚨catch app.jsx>>>>>🚨", error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>📀Chargement en cours📀</p>
  ) : (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home productList={data.offers} />} />
          <Route
            path="/product/:id"
            element={<Offer product={data.offers} token={token} />}
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment token={token} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
