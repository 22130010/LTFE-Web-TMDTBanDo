import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import productsData from "../services/Products.json";
import { Product } from "../Interface/Product";
import { useProductFilter } from "../hook/useProductFilter";

interface ProductListProps {
    searchResult?: Product[];
    customTitle?: string;
}

function ProductList({ searchResult, customTitle }: ProductListProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setProducts(productsData as unknown as Product[]);
    }, []);

    const inputData = searchResult ?? products;
    const { processedProducts, filters, setters } = useProductFilter(inputData);
    const { sortOrder, priceFilter, fakePromo } = filters;
    const { setSortOrder, setPriceFilter, togglePromo, resetFilters } = setters;

    const handleAddToHistory = (item: Product) => {
        const key = 'recently_viewed';
        const list = JSON.parse(localStorage.getItem(key) || '[]').filter((p: Product) => p.id !== item.id);
        list.unshift(item);
        if (list.length > 10) list.pop();
        localStorage.setItem(key, JSON.stringify(list));
    };

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold uppercase text-gray-800">
                        {customTitle || "Danh sách sản phẩm"}
                    </h1>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <span className="text-gray-500 text-sm">Hiển thị <strong>{processedProducts.length}</strong> sản phẩm</span>
                        <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 bg-white border px-4 py-2 rounded-full hover:border-blue-500 shadow-sm">
                            <span className="font-medium text-sm">Bộ Lọc & Sắp Xếp</span>
                        </button>
                    </div>
                </div>

                {processedProducts.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 border border-dashed rounded-lg">
                        <p>Không tìm thấy sản phẩm nào.</p>
                        <button onClick={resetFilters} className="text-blue-600 underline mt-2">Xóa bộ lọc</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {processedProducts.map((item) => (
                            <div key={item.id} className="border rounded-lg shadow-sm hover:shadow-xl bg-white group overflow-hidden transition-all">
                                <div className="h-48 w-full overflow-hidden relative">
                                    <img
                                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="font-semibold text-sm line-clamp-2 h-10" title={item.name}>{item.name}</h2>
                                    <p className="text-xs text-gray-400 mt-1 uppercase">{item.category}</p>
                                    <p className="text-red-500 font-bold mt-2 text-lg">{item.price.toLocaleString()} đ</p>
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

            <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity ${isFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsFilterOpen(false)} />
            <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between p-5 border-b bg-gray-50">
                    <h2 className="font-bold text-gray-800">BỘ LỌC</h2>
                    <button onClick={() => setIsFilterOpen(false)}>✕</button>
                </div>

                <div className="p-5 overflow-y-auto h-[calc(100%-80px)] space-y-8">
                    {/*sort*/}
                    <div>
                        <h3 className="font-bold text-sm mb-3 border-l-4 border-blue-600 pl-2">SẮP XẾP</h3>
                        {['default', 'asc', 'desc'].map(type => (
                            <label key={type} className="flex items-center space-x-3 mb-2 cursor-pointer">
                                <input type="radio" name="sort" checked={sortOrder === type} onChange={() => setSortOrder(type)} className="text-blue-600" />
                                <span>{type === 'default' ? 'Mặc định' : type === 'asc' ? 'Giá thấp đến cao' : 'Giá cao đến thấp'}</span>
                            </label>
                        ))}
                    </div>

                    {/*phần giá*/}
                    <div>
                        <h3 className="font-bold text-sm mb-3 border-l-4 border-blue-600 pl-2">KHOẢNG GIÁ</h3>
                        <div className="flex flex-col gap-2">
                            {['all', 'under200', 'over200'].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setPriceFilter(val)}
                                    className={`px-4 py-2 text-sm rounded border text-left ${priceFilter === val ? 'bg-blue-50 border-blue-600 text-blue-700' : 'border-gray-300'}`}
                                >
                                    {val === 'all' ? 'Tất cả' : val === 'under200' ? 'Bé hơn 200k' : 'Lớn hơn 200k'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-sm mb-3 border-l-4 border-blue-600 pl-2">KHUYẾN MÃI</h3>
                        {['Đang giảm giá', 'Freeship Extra', 'Hàng mới về'].map(label => (
                            <label key={label} className="flex items-center space-x-3 mb-2 cursor-pointer">
                                <input type="checkbox" checked={fakePromo.includes(label)} onChange={() => togglePromo(label)} className="rounded text-blue-600" />
                                <span>{label}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/*footer cho filter*/}
                <div className="absolute bottom-0 w-full p-4 border-t bg-white flex gap-2">
                    <button onClick={resetFilters} className="flex-1 py-2 border rounded hover:bg-gray-100">Đặt lại</button>
                    <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Xong</button>
                </div>
            </div>
        </div>
    );
}

export default ProductList;