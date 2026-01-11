import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from './pages/ProductDetail';
import Header from "./componnents/Header";
import Footer from "./componnents/Footer";
import SPaothun from "./pages/SPaothun";
import SPaosomi from "./pages/SPaosomi";
import SPbaoho from "./pages/SPbaoho";
import SPaokhoac from "./pages/SPaokhoac";
import SearchResultsPage from "./pages/SearchResultsPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/checkOut";


function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50 pt-20">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/san-pham" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/san-pham/ao-thun" element={<SPaothun />} />
                    <Route path="/san-pham/so-mi" element={<SPaosomi />} />
                    <Route path="/san-pham/bao-ho" element={<SPbaoho />} />
                    <Route path="/san-pham/ao-khoac" element={<SPaokhoac />} />
                    <Route path="/search-results" element={<SearchResultsPage />} />
                    <Route path="/gio-hang" element={<Cart/>} />
                    <Route path="/checkout" element={<Checkout />} />

                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;