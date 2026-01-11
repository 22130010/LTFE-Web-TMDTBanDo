import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {hideMiniCart} from "../redux/cartSlice";
import { Link } from "react-router-dom";

const MiniCart = () => {
    const dispatch = useDispatch();
    const isShow = useSelector((state: RootState) => state.cart.showMiniCart);

    if (!isShow) return null;
    return (
        <div className="fixed top-16 right-6 w-80 bg-white shadow-lg rounded-xl p-4 z-50">
            <button
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                onClick={() => dispatch(hideMiniCart())}
            >
                ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                     ✓
                </span>
                <p className="font-medium leading-none">
                    Đã thêm sản phẩm vào giỏ hàng
                </p>
            </div>

            <div className="flex gap-2">
                <Link
                    to="/cart"
                    className="flex-1 bg-red-600 text-white text-center py-2 rounded-lg"
                    onClick={() => dispatch(hideMiniCart())}
                >
                    Xem giỏ hàng và thanh toán
                </Link>
            </div>
        </div>
    );
}
export default MiniCart;