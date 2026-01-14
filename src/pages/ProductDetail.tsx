import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import productsData from "../services/Products.json";
import { addToCart, showMiniCart } from "../redux/cartSlice";
import { Product } from "../Interface/Product";

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState<string>('');

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!id) return;

        const foundProduct = productsData.find(p => p.id === parseInt(id)) as unknown as Product;

        if (foundProduct) {
            setProduct(foundProduct);
            if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0]);
            if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]);

            const firstImg = Array.isArray(foundProduct.image) ? foundProduct.image[0] : foundProduct.image;
            setActiveImage(firstImg);
        }
    }, [id]);

    const productImages = useMemo(() => {
        if (!product) return [];
        return Array.isArray(product.image) ? product.image : [product.image];
    }, [product]);

    const handleColorSelect = (color: string, index: number) => {
        setSelectedColor(color);
        if (productImages[index]) {
            setActiveImage(productImages[index]);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: activeImage,
            sizes: selectedSize,
            colors: selectedColor,
            quantity
        }));
        dispatch(showMiniCart());
    };

    if (!product) return <div className="text-center mt-20 text-xl font-bold">Không tìm thấy sản phẩm!</div>;

    return (
        <div className="container mx-auto px-4 py-8">

            <div className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-blue-600">Trang chủ</Link> / <span className="text-gray-900 font-medium">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="flex flex-col gap-4">
                    <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img src={activeImage} alt={product.name} className="w-full h-[400px] object-contain mix-blend-multiply" />
                    </div>

                    {productImages.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {productImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${activeImage === img ? 'border-blue-600' : 'border-transparent'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                    <p className="text-sm text-gray-500 mb-4">Mã SP: <b>#{product.id}</b> | Danh mục: <span className="text-blue-600">{product.category}</span></p>
                    <div className="text-3xl font-bold text-red-600 mb-6">{product.price.toLocaleString()} đ</div>
                    <p className="text-gray-600 mb-6 border-y py-4">{product.description}</p>

                    {/*chọn màu*/}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Màu sắc:</h3>
                        <div className="flex gap-2">
                            {product.colors.map((color, idx) => (
                                <button
                                    key={color}
                                    onClick={() => handleColorSelect(color, idx)}
                                    className={`px-4 py-2 border rounded ${selectedColor === color ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'hover:border-gray-400'}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/*chọn size*/}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Kích thước:</h3>
                        <div className="flex gap-2">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-10 border rounded flex items-center justify-center ${selectedSize === size ? 'bg-gray-900 text-white' : 'hover:border-gray-900'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-8">
                        <div className="flex items-center border rounded">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 bg-gray-50">-</button>
                            <span className="w-10 text-center font-semibold">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 bg-gray-50">+</button>
                        </div>
                        <button onClick={handleAddToCart} className="flex-1 bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 shadow-md">
                            THÊM VÀO GIỎ NGAY
                        </button>
                    </div>
                </div>
            </div>

            {/*gợi ý sản phẩm có thể chọn*/}
            <div className="mt-16 border-t pt-8">
                <h2 className="text-2xl font-bold mb-6">Có thể bạn cũng thích</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productsData
                        .filter(p => p.category === product.category && p.id !== product.id)
                        .slice(0, 4)
                        .map((rel: any) => (
                            <Link to={`/product/${rel.id}`} key={rel.id} className="group border rounded-lg overflow-hidden hover:shadow-lg transition">
                                <img
                                    src={Array.isArray(rel.image) ? rel.image[0] : rel.image}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="p-3">
                                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">{rel.name}</h3>
                                    <p className="text-red-600 font-bold mt-1">{rel.price.toLocaleString()} đ</p>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;