const  Header =()=>{
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-700">Đồng Phục Happy</h1>
            <div className="flex-1 px-5">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-full border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <ul className="flex space-x-5 text-sm text-gray-700">
                <a href="/" className="hover:text-blue-600">Trang Chủ</a>
                <a href="/san-pham" className="hover:text-blue-600">Sản Phẩm</a>
                <a href="/gio-hang" className="hover:text-blue-600">Giỏ Hàng</a>
                <a href="/tin-tuc" className="hover:text-blue-600">Tin Tức</a>
            </ul>
        </nav>


    )
}

export default Header;