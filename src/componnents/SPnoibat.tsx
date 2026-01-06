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

const SPnoibat = () => {
    const [p1, setP1] = useState<Product | null>(null);
    const [p2, setP2] = useState<Product | null>(null);
    const [p3, setP3] = useState<Product | null>(null);
    const [p4, setP4] = useState<Product | null>(null);
    const [p5, setP5] = useState<Product | null>(null);
    const [p6, setP6] = useState<Product | null>(null);

    useEffect(() => {
        setP1(productsData.find(p => p.id === 1) || null);
        setP2(productsData.find(p => p.id === 30) || null);
        setP3(productsData.find(p => p.id === 16) || null);
        setP4(productsData.find(p => p.id === 19) || null);
        setP5(productsData.find(p => p.id === 25) || null);
        setP6(productsData.find(p => p.id === 75) || null);
    }, []);

    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto my-12 px-4">

                <div className="mb-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        Sản Phẩm Nổi Bật
                    </h2>
                    <p className="text-gray-500">
                        Cập nhật những sản phẩm nổi bật mỗi ngày
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* CARD 1 – ID 1 */}
                    {p1 && (
                        <div className="border rounded-lg overflow-hidden shadow-sm h-full">
                            <img
                                src={Array.isArray(p1.image) ? p1.image[0] : p1.image}
                                alt={p1.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{p1.name}</h3>
                                <p className="text-gray-600 text-sm">{p1.description}</p>
                            </div>

                            <Link
                                to={`/product/${p1.id}`}
                                className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    )}

                    {/* CARD 2 – ID 30 */}
                    {p2 && (
                        <div className="border rounded-lg overflow-hidden shadow-sm h-full">
                            <img
                                src={Array.isArray(p2.image) ? p2.image[0] : p2.image}
                                alt={p2.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{p2.name}</h3>
                                <p className="text-gray-600 text-sm">{p2.description}</p>
                            </div>
                            <Link
                                to={`/product/${p2.id}`}
                                className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    )}

                    {/* CARD 3 – ID 16 */}
                    {p3 && (
                        <div className="border rounded-lg overflow-hidden shadow-sm h-full">
                            <img
                                src={Array.isArray(p3.image) ? p3.image[0] : p3.image}
                                alt={p3.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{p3.name}</h3>
                                <p className="text-gray-600 text-sm">{p3.description}</p>
                            </div>
                            <Link
                                to={`/product/${p3.id}`}
                                className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    )}

                    {/* CARD 4 – ID 19 */}
                    {p4 && (
                        <div className="border rounded-lg overflow-hidden shadow-sm h-full">
                            <img
                                src={Array.isArray(p4.image) ? p4.image[0] : p4.image}
                                alt={p4.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{p4.name}</h3>
                                <p className="text-gray-600 text-sm">{p4.description}</p>
                            </div>

                            <Link
                                to={`/product/${p4.id}`}
                                className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    )}

                    {/* CARD 5 – ID 25 */}
                    {p5 && (
                        <div className="border rounded-lg overflow-hidden shadow-sm h-full">
                            <img
                                src={Array.isArray(p5.image) ? p5.image[0] : p5.image}
                                alt={p5.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{p5.name}</h3>
                                <p className="text-gray-600 text-sm">{p5.description}</p>
                            </div>

                            <Link
                                to={`/product/${p5.id}`}
                                className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    )}

                    {/* CARD 6 – ID 6 */}
                    {p6 && (
                        <div className="border rounded-lg overflow-hidden shadow-sm h-full">
                            <img
                                src={Array.isArray(p6.image) ? p6.image[0] : p6.image}
                                alt={p6.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{p6.name}</h3>
                                <p className="text-gray-600 text-sm">{p6.description}</p>
                            </div>

                            <Link
                                to={`/product/${p6.id}`}
                                className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Xem chi tiết
                            </Link>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SPnoibat;
