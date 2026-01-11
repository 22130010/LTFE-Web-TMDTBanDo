import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {setQuantity, removeCart, addToCart} from "../redux/cartSlice";
import cartTotalSelector from "../redux/cartSelector";

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState)=> state.cart.items);
    //  Tổng tiền
    const totalPrice = useSelector(cartTotalSelector);

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng trống</h2>
                <Link
                    to="/"
                    className="text-blue-600 underline hover:text-blue-800"
                >
                    Quay về mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Danh sách sản phẩm */}
                <div className="md:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div
                            key={`${item.id}-${item.sizes}-${item.colors}`}
                            className="flex gap-4 border rounded-lg p-4 items-center"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div className="flex-1">
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                    Màu: {item.colors} | Size: {item.sizes}
                                </p>
                                <p className="text-red-600 font-bold">
                                    {item.price.toLocaleString()} đ
                                </p>
                            </div>

                            {/* Số lượng */}
                            <div className="flex items-center border rounded">
                                <button
                                    className="px-3 py-1"
                                    disabled={item.quantity <= 1}
                                    onClick={() => dispatch(setQuantity({
                                        id: item.id,
                                        sizes: item.sizes,
                                        colors: item.colors,
                                        quantity: item.quantity - 1}))}
                                >-</button>
                                <span className="px-3">{item.quantity}</span>
                                <button
                                    className="px-3 py-1"
                                    onClick={() => dispatch(setQuantity({
                                        id: item.id,
                                        sizes: item.sizes,
                                        colors: item.colors,
                                        quantity: item.quantity + 1}))}
                                >+</button>
                            </div>

                            <button
                                className="text-red-500 hover:text-red-700 font-bold"
                                onClick={() => dispatch(removeCart({
                                    id: item.id,
                                    sizes: item.sizes,
                                    colors: item.colors}))}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="border rounded-lg p-6 h-fit">
                    <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>

                    <div className="flex justify-between mb-2">
                        <span>Tạm tính</span>
                        <span>{totalPrice.toLocaleString()} đ</span>
                    </div>

                    <div className="flex justify-between font-bold text-lg border-t pt-3">
                        <span>Tổng cộng</span>
                        <span className="text-red-600">
                            {totalPrice.toLocaleString()} đ
                        </span>
                    </div>

                    <Link to="/checkout">
                        <button className="w-full mt-6 bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700">
                            THANH TOÁN
                        </button>
                    </Link>

                    <Link
                        to="/san-pham"
                        className="block text-center mt-4 text-blue-600 underline"
                    >
                        Tiếp tục mua hàng
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;