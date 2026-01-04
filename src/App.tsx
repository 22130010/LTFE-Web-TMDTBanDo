import React from 'react';
import Home from "./pages/Home";
import {Routes, Route} from "react-router-dom";
import ProductList from "./pages/ProductList";


function App() {
  return (
    <div>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/san-pham" element={<ProductList />} />
            </Routes>

    </div>
  );
}

export default App;
