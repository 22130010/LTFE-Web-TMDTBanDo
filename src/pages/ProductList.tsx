import { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import productsData from "../services/Products.json";

// --- INTERFACE (Giữ nguyên) ---
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

    const inputProducts = searchResult ?? products;
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState<string>('default');
    const [priceFilter, setPriceFilter] = useState<string>('all');
    const [fakePromo, setFakePromo] = useState<string[]>([]);

    const toggleFakePromo = (val: string) => {
        setFakePromo(prev =>
            prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]
        );
    };

    const processedProducts = useMemo(() => {
        //clone 1 mảng để k ảnh hưởng
        let data = [...inputProducts];
        // Lọc giá
        if (priceFilter === 'under200') {
            data = data.filter(p => p.price < 200000);
        } else if (priceFilter === 'over200') {
            data = data.filter(p => p.price >= 200000);
        }
        if (sortOrder === 'asc') {
            data.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            data.sort((a, b) => b.price - a.price);
        }

        return data;
    }, [inputProducts, sortOrder, priceFilter]);


    const titleToShow = customTitle || "Danh sách sản phẩm";

    const handleAddToHistory = (item: Product) => {
        const key = 'recently_viewed';
        const existing = localStorage.getItem(key);
        let list = existing ? JSON.parse(existing) : [];
        list = list.filter((p: any) => p.id !== item.id);
        list.unshift(item);
        if (list.length > 10) list.pop();
        localStorage.setItem(key, JSON.stringify(list));
    };

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-4 py-6">

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold uppercase text-gray-800">
                        {titleToShow}
                    </h1>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <span className="text-gray-500 text-sm">
                            Hiển thị <strong>{processedProducts.length}</strong> sản phẩm
                        </span>
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span className="font-medium text-sm">Bộ Lọc & Sắp Xếp</span>
                        </button>
                    </div>
                </div>
                {processedProducts.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp.</p>
                        <button
                            onClick={() => {setSortOrder('default'); setPriceFilter('all')}}
                            className="text-blue-600 underline mt-2 hover:text-blue-800"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-6">
                        {processedProducts.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg shadow-sm hover:shadow-xl bg-white group overflow-hidden transition-all duration-300"
                            >
                                <div className="h-48 w-full overflow-hidden relative">
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
                                    <p className="text-xs text-gray-400 mt-1 uppercase">{item.category}</p>
                                    <p className="text-red-500 font-bold mt-2 text-lg">
                                        {item.price.toLocaleString()} đ
                                    </p>
                                    <Link
                                        to={`/product/${item.id}`}
                                        onClick={() => handleAddToHistory(item)}
                                        className="block text-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-3 font-medium"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={() => setIsFilterOpen(false)}
            ></div>
            <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-5 border-b bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800 uppercase">Bộ Lọc Tìm Kiếm</h2>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-5 overflow-y-auto h-[calc(100%-130px)] space-y-8">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3 uppercase text-xs tracking-wider border-l-4 border-blue-600 pl-2">Sắp xếp theo giá</h3>
                        <div className="space-y-3">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="radio" name="sort"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    checked={sortOrder === 'default'}
                                    onChange={() => setSortOrder('default')}
                                />
                                <span className="text-gray-700 group-hover:text-blue-600 transition">Mặc định</span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="radio" name="sort"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    checked={sortOrder === 'asc'}
                                    onChange={() => setSortOrder('asc')}
                                />
                                <span className="text-gray-700 group-hover:text-blue-600 transition">Giá: Thấp đến Cao</span>
                            </label>
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="radio" name="sort"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    checked={sortOrder === 'desc'}
                                    onChange={() => setSortOrder('desc')}
                                />
                                <span className="text-gray-700 group-hover:text-blue-600 transition">Giá: Cao đến Thấp</span>
                            </label>
                        </div>
                    </div>

                    <hr className="border-gray-100" />
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3 uppercase text-xs tracking-wider border-l-4 border-blue-600 pl-2">Khoảng giá</h3>
                        <div className="flex flex-col gap-2">
                            {['all', 'under200', 'over200'].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setPriceFilter(val)}
                                    className={`px-4 py-2 text-sm rounded-lg border text-left transition-all ${
                                        priceFilter === val
                                            ? 'bg-blue-50 text-blue-700 border-blue-600 font-semibold'
                                            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                                    }`}
                                >
                                    {val === 'all' ? 'Tất cả mức giá' : val === 'under200' ? 'Dưới 200.000đ' : 'Trên 200.000đ'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-100" />
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3 uppercase text-xs tracking-wider border-l-4 border-blue-600 pl-2">Khuyến mãi & Loại</h3>
                        <div className="space-y-3">
                            {['Đang giảm giá', 'Freeship Extra', 'Hàng mới về'].map((label) => (
                                <label key={label} className="flex items-center space-x-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        checked={fakePromo.includes(label)}
                                        onChange={() => toggleFakePromo(label)}
                                    />
                                    <span className="text-gray-700 group-hover:text-blue-600 transition">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Menu */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <button
                        onClick={() => {
                            setSortOrder('default');
                            setPriceFilter('all');
                            setFakePromo([]);
                        }}
                        className="flex-1 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition"
                    >
                        Thiết lập lại
                    </button>
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-lg transition"
                    >
                        Áp dụng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductList;