import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    cartItemsSelector,
    cartTotalSelector
} from "../redux/cartSelector";
import {useState} from "react";

const Checkout = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const handleCheckOut = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
    }

    const cartItems = useSelector(cartItemsSelector);
    const totalPrice = useSelector(cartTotalSelector);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-2xl font-bold">🛒 Giỏ hàng trống</h2>
                <Link to="/" className="text-blue-600 underline">
                    Quay về mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">

            {/* Thông tin khách hàng */}
            <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Thông tin thanh toán</h2>

                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Họ và tên"
                />
                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Số điện thoại"
                />
                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Email"
                />
                <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Địa chỉ giao hàng"
                />
            </div>

            {/* Đơn hàng */}
            <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Đơn hàng</h2>

                {cartItems.map(item => (
                    <div
                        key={`${item.id}-${item.sizes}-${item.colors}`}
                        className="flex justify-between text-sm mb-2"
                    >
                        <span>
                            {item.name} ({item.sizes}/{item.colors}) x {item.quantity}
                        </span>
                        <span>
                            {(item.price * item.quantity).toLocaleString()} đ
                        </span>
                    </div>
                ))}

                <hr className="my-3" />

                <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng</span>
                    <span className="text-red-600">
                        {totalPrice.toLocaleString()} đ
                    </span>
                </div>

                <button
                    className="w-full mt-6 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700"
                    onClick={ handleCheckOut}
                >
                    XÁC NHẬN THANH TOÁN

                </button>
                {showSuccess && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded text-center font-semibold">
                        ✅ Bạn đã thanh toán thành công!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
