import { useEffect, useState } from "react";
import productsData from "../services/Products.json";
import Header from "../componnents/Header";
import Footer from "../componnents/Footer";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string | string[];
    description: string;
    sizes: string[];
    colors: string[];
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(productsData);
    }, []);

    return (
        <div>
         <Header/>
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Danh sách sản phẩm
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-lg shadow hover:shadow-lg bg-white"
                    >
                        <img
                            src={Array.isArray(item.image) ? item.image[0] : item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />

                        <div className="p-4">
                            <h2 className="font-semibold text-sm line-clamp-2">
                                {item.name}
                            </h2>

                            <p className="text-red-500 font-bold">
                                {item.price.toLocaleString()} đ
                            </p>

                            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
            <Footer/>
        </div>
    );
}

export default ProductList;
