import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import productsData from "../services/Products.json";

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

interface ProductListProps {
    searchResult?: Product[];
    customTitle?: string;
}


function ProductList({ searchResult, customTitle }: ProductListProps) {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(productsData);
    }, []);

    // 1. Biến quyết định hiển thị: Nếu có 'searchResult' thì dùng nó, còn không thì dùng 'products' (của code cũ)
    // Dùng toán tử ?? để đảm bảo nếu searchResult là mảng rỗng [] thì vẫn lấy nó (để hiện thông báo không tìm thấy)
    const finalProducts = searchResult ?? products;

    // 2. Logic tiêu đề: Nếu có title truyền vào thì dùng, không thì dùng mặc định
    const titleToShow = customTitle || "Danh sách sản phẩm";

    // 3. Hàm lưu lịch sử xem (Sản phẩm đã xem) - Phần bạn yêu cầu thêm
    const handleAddToHistory = (item: Product) => {
        const key = 'recently_viewed';
        const existing = localStorage.getItem(key);
        let list = existing ? JSON.parse(existing) : [];
        list = list.filter((p: any) => p.id !== item.id); // Xóa trùng
        list.unshift(item); // Thêm lên đầu
        if (list.length > 10) list.pop();
        localStorage.setItem(key, JSON.stringify(list));
    };

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-center mb-6 uppercase">
                    {titleToShow}
                </h1>
                {finalProducts.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        Không tìm thấy sản phẩm nào.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {finalProducts.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg shadow hover:shadow-lg bg-white group overflow-hidden" // Thêm group overflow-hidden để đẹp hơn
                            >

                                <div className="h-48 w-full overflow-hidden">
                                    <img
                                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300' }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="font-semibold text-sm line-clamp-2 h-10" title={item.name}>
                                        {item.name}
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1">{item.category}</p>

                                    <p className="text-red-500 font-bold mt-2">
                                        {item.price.toLocaleString()} đ
                                    </p>

                                    <Link
                                        to={`/product/${item.id}`}
                                        onClick={() => handleAddToHistory(item)}
                                        className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-3"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;