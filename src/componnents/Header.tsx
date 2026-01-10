import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MENU_ITEMS = [
    { label: 'Trang Chủ', href: '/' },
    {
        label: 'Sản Phẩm',
        href: '/san-pham',
        submenu: [
            { label: 'Áo thun đồng phục', href: '/san-pham/ao-thun' },
            { label: 'Áo sơ mi công sở', href: '/san-pham/so-mi' },
            { label: 'Đồ bảo hộ lao động', href: '/san-pham/bao-ho' },
            { label: 'Áo khoác gió', href: '/san-pham/ao-khoac' },
        ]
    },
    { label: 'Giỏ Hàng', href: '/cart' },
    {
        label: 'Tin Tức',
        href: '/tin-tuc',
        submenu: [
            { label: 'Khuyến mãi', href: '/tin-tuc/khuyen-mai' },
            { label: 'Tuyển dụng', href: '/tin-tuc/tuyen-dung' },
        ]
    },
];

const Header = () => {
    // State để quản lý việc đóng/mở màn hình tìm kiếm
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Ref để focus vào ô input ngay khi mở tìm kiếm
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Effect: Khi mở tìm kiếm thì focus vào ô input, và khóa cuộn trang
    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
            document.body.style.overflow = 'hidden'; // Khóa cuộn trang chính
        } else {
            document.body.style.overflow = 'unset'; // Mở lại cuộn
        }
    }, [isSearchOpen]);

    return (
        <>
            {/* --- HEADER CHÍNH --- */}
            <nav className="bg-white shadow-sm h-16 relative z-40">
                <div className="container mx-auto px-4 h-full flex justify-between items-center">

                    {/* 1. LOGO (Bên Trái) */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold text-blue-700 hover:opacity-80">
                            Đồng Phục Happy
                        </Link>
                    </div>

                    {/* 2. MENU (Ở Giữa - Center) */}
                    {/* flex-1 và justify-center giúp menu nằm giữa khoảng trống còn lại */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <ul className="flex space-x-8 text-sm text-gray-700 font-medium">
                            {MENU_ITEMS.map((item, index) => (
                                <li key={index} className="relative group py-4">
                                    <Link
                                        to={item.href}
                                        className="hover:text-blue-600 flex items-center transition-colors"
                                    >
                                        {item.label}
                                        {item.submenu && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 pt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {item.submenu && (
                                        <div className="absolute left-0 top-full w-max min-w-[200px] bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                            {/* Mũi tên trang trí */}
                                            <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                                            <ul className="py-2 relative bg-white rounded-lg z-10">
                                                {item.submenu.map((subItem, subIdx) => (
                                                    <li key={subIdx}>
                                                        <Link
                                                            to={subItem.href}
                                                            className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left"
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. ICON TÌM KIẾM (Bên Phải) */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all"
                            title="Tìm kiếm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* overlay được làm mờ */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">

                    {/* Lớp nền mờ (Backdrop Blur) */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity"
                        onClick={() => setIsSearchOpen(false)} // Bấm ra ngoài thì đóng
                    ></div>

                    {/* Hộp tìm kiếm */}
                    <div className="relative w-full max-w-2xl px-4 animate-fade-in-down">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex items-center p-2">
                            <div className="pl-3 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Input tìm kiếm chính */}
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Tìm kiếm sản phẩm, tin tức..."
                                className="w-full p-4 text-lg text-gray-700 focus:outline-none placeholder-gray-400"
                            />

                            {/* Nút đóng (X) */}
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Gợi ý tìm kiếm (Optional - thêm cho đẹp) */}
                        <div className="mt-2 text-white text-sm text-center opacity-80">
                            Gợi ý: Áo thun, Đồng phục công sở, Bảo hộ lao động...
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;