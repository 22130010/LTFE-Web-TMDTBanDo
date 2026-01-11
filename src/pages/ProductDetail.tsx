import React, { useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import productsData from "../services/Products.json";
import {addToCart} from "../redux/cartSlice";
import {useDispatch} from "react-redux";

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

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Tìm sản phẩm, reset state
    useEffect(() => {
        window.scrollTo(0, 0);
        if (!id) return;
        const foundProduct = productsData.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct as Product);
            if (foundProduct.sizes.length > 0) setSelectedSize(foundProduct.sizes[0]);
            if (foundProduct.colors.length > 0) setSelectedColor(foundProduct.colors[0]);
            const firstImage = Array.isArray(foundProduct.image)
                ? foundProduct.image[0]
                : foundProduct.image;
            setActiveImage(firstImage);
        }
    }, [id]);

   //đổi màu ảnh
    const handleColorSelect = (color: string, index: number) => {
        setSelectedColor(color);
        // Nếu image là mảng và có ảnh tại vị trí index tương ứng thì đổi ảnh
        if (product && Array.isArray(product.image) && product.image[index]) {
            setActiveImage(product.image[index]);
        }
    };

    // Add giỏ hàng
    const handleAddToCart = () => {
        if (!product) return;
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: activeImage,
            sizes: selectedSize,
            colors: selectedColor,
            quantity: quantity
        };

        const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
        currentCart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(currentCart));

        dispatch(addToCart(cartItem));
        navigate('/cart');
    };

    if (!product) {
        return <div className="text-center mt-20 text-xl font-bold">Không tìm thấy sản phẩm!</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Ảnh bên trái */}
                <div className="flex flex-col gap-4">
                    {/* Ảnh chính */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img
                            src={activeImage}
                            alt={product.name}
                            className="w-full h-[400px] object-contain mix-blend-multiply transition-all duration-300"
                        />
                    </div>

                    {/* List ảnh làm thumbnail */}
                    {Array.isArray(product.image) && product.image.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {product.image.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`small-${index}`}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                                        activeImage === img ? 'border-blue-600' : 'border-transparent'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Thông tin bên phải */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                    <p className="text-sm text-gray-500 mb-4">
                        Mã SP: <span className="font-mono text-black">#{product.id}</span> |
                        Danh mục: <span className="text-blue-600">{product.category}</span>
                    </p>

                    <div className="text-3xl font-bold text-red-600 mb-6">
                        {product.price.toLocaleString()}
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed border-t border-b py-4">
                        {product.description}
                    </p>

                    {/* Chọn màu */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2 text-gray-700">Màu sắc:</h3>
                        <div className="flex gap-2 flex-wrap">
                            {product.colors.map((color, index) => (
                                <button
                                    key={color}
                                    // Sửa lại: Truyền index vào hàm xử lý
                                    onClick={() => handleColorSelect(color, index)}
                                    className={`px-4 py-2 border rounded transition-all ${
                                        selectedColor === color
                                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                                            : 'border-gray-300 hover:border-gray-400 text-gray-600'
                                    }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chọn Size */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-gray-700">Kích thước:</h3>
                            <button className="text-xs text-blue-500 underline hover:text-blue-700">Bảng quy đổi size</button>
                        </div>
                        <div className="flex gap-2">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-10 border rounded flex items-center justify-center font-medium transition-all ${
                                        selectedSize === size
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'border-gray-300 hover:border-gray-900 text-gray-700'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tăng giảm số lượng */}
                    <div className="flex items-center gap-4 mt-8">
                        <div className="flex items-center border border-gray-300 rounded">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-2 bg-gray-50 hover:bg-gray-200"
                            >-</button>
                            <span className="w-10 text-center font-semibold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-2 bg-gray-50 hover:bg-gray-200"
                            >+</button>
                        </div>

                        <Link
                            to={`/gio-hang`}
                            onClick={handleAddToCart}
                            className="flex-1 flex items-center justify-center
                            bg-red-600 text-white py-3 rounded-xl font-bold
                            hover:bg-red-700
                            hover:-translate-y-0.5
                            shadow-lg
                            transition-all duration-200
                            active:scale-95"
                        >
                            THÊM VÀO GIỎ NGAY
                        </Link
>
                    </div>
                </div>
            </div>

            {/* Gợi ý các sản phẩm liên quan */}
            <div className="mt-16 border-t pt-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Có thể bạn cũng thích</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productsData
                        .filter(p => p.category === product.category && p.id !== product.id)
                        .slice(0, 4)
                        .map(rel => (
                            <Link to={`/product/${rel.id}`} key={rel.id} className="group">
                                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                                    <img
                                        src={Array.isArray(rel.image) ? rel.image[0] : rel.image}
                                        alt={rel.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="p-3">
                                        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">{rel.name}</h3>
                                        <p className="text-red-600 font-bold mt-1">{rel.price.toLocaleString()} đ</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;