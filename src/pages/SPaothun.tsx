import { useEffect, useState } from "react";
import productsData from "../services/Products.json";
import {Link} from "react-router-dom";

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

function SPaothun() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const aoThunDongPhuc = productsData.filter(
            (item) => item.category === "Áo thun đồng phục"
        );

        setProducts(aoThunDongPhuc);
    }, []);

    return (

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

                                <Link
                                    to={`/product/${item.id}`}
                                    className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Xem chi tiết
                                </Link>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

    );
}

export default SPaothun;
