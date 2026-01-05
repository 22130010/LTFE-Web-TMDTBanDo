import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from './pages/ProductDetail';
import Header from "./componnents/Header";
import Footer from "./componnents/Footer";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/san-pham" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;