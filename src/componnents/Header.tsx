import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom'; // Import NavLink
import productsData from "../services/Products.json";
import {RootState} from "../redux/store";
import {useSelector} from "react-redux";


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
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isScrolled, setIsScrolled] = useState(false); // State để đổi màu header khi cuộn

    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const cart = useSelector((state:RootState)=> state.cart.items);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isSearchOpen) {
            searchInputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isSearchOpen]);

    const handleSearch = () => {
        setIsSearchOpen(false);
        if (!keyword.trim()) return;
        navigate(`/search-results?q=${encodeURIComponent(keyword)}`);
        setSuggestions([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setKeyword(val);
        if (val.length > 0) {
            const uniqueNames = Array.from(new Set(
                productsData
                    .filter((p: any) => p.name.toLowerCase().includes(val.toLowerCase()))
                    .map((p: any) => p.name)
            )).slice(0, 5);
            setSuggestions(uniqueNames);
        } else {
            setSuggestions([]);
        }
    };

    const clickSuggestion = (name: string) => {
        setKeyword(name);
        setSuggestions([]);
        setIsSearchOpen(false);
        navigate(`/search-results?q=${encodeURIComponent(name)}`);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-white/90 backdrop-blur-md shadow-md h-16'
                        : 'bg-white h-20 shadow-sm'
                }`}
            >
                <div className="container mx-auto px-4 h-full flex justify-between items-center">

                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">

                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
                                H
                            </div>
                            <span className=" text-xl font-bold text-gray-800" >
                                ĐỒNG PHỤC<span className="text-xl font-bold text-blue-700 tracking-tight group-hover:text-blue-600 transition-colors">HAPPY</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex flex-1 justify-center">
                        <ul className="flex space-x-8 text-sm font-medium">
                            {MENU_ITEMS.map((item, index) => (
                                <li key={index} className="relative group h-full flex items-center">
                                    <NavLink
                                        to={item.href}
                                        className={({ isActive }) => `
                                            py-2 px-1 transition-colors border-b-2 
                                            ${isActive
                                            ? 'text-blue-600 border-blue-600' // Sáng lên khi Active
                                            : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-200' // Bình thường
                                        }
                                        `}
                                        end={item.href === '/'}
                                    >
                                        {item.label}
                                        {item.submenu && (
                                            <span className="ml-1 text-[10px] align-middle">▼</span>
                                        )}
                                    </NavLink>
                                    {item.submenu && (
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                            <div className="bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden min-w-[220px]">
                                                {item.submenu.map((subItem, subIdx) => (
                                                    <NavLink
                                                        key={subIdx}
                                                        to={subItem.href}
                                                        className={({ isActive }) => `
                                                            block px-5 py-3 text-sm transition-colors border-l-4
                                                            ${isActive
                                                            ? 'bg-blue-50 text-blue-700 border-blue-600'
                                                            : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200'
                                                        }
                                                        `}
                                                    >
                                                        {subItem.label}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center space-x-2">

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 group"
                            title="Tìm kiếm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <Link to="/cart" className="p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300 relative group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>

                            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                             {totalQuantity}
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>

            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] flex flex-col items-center justify-start pt-24 animate-fade-in">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsSearchOpen(false)}
                    ></div>

                    <div className="relative w-full max-w-2xl px-4 z-10 scale-100 transition-transform duration-300">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header tìm kiếm */}
                            <div className="flex items-center border-b p-2">
                                <div className="pl-4 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm (vd: Áo thun, Bảo hộ)..."
                                    className="w-full p-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
                                    value={keyword}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="p-3 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Gợi ý */}
                            <div className="bg-gray-50 max-h-[60vh] overflow-y-auto">
                                {suggestions.length > 0 ? (
                                    <ul>
                                        <li className="px-5 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">Gợi ý từ khóa</li>
                                        {suggestions.map((s, idx) => (
                                            <li
                                                key={idx}
                                                className="px-5 py-3 hover:bg-blue-50 hover:text-blue-700 cursor-pointer text-gray-700 flex items-center transition-colors border-b border-gray-100 last:border-0"
                                                onClick={() => clickSuggestion(s)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    keyword && (
                                        <div className="p-8 text-center text-gray-500">
                                            Ấn Enter để tìm kiếm kết quả cho "<span className="font-bold text-gray-800">{keyword}</span>"
                                        </div>
                                    )
                                )}

                                {/* Gợi ý nhanh khi chưa nhập gì */}
                                {!keyword && (
                                    <div className="p-5">
                                        <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Tìm kiếm phổ biến</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Áo thun', 'Bảo hộ', 'Sơ mi', 'Áo khoác'].map(tag => (
                                                <span
                                                    key={tag}
                                                    onClick={() => clickSuggestion(tag)}
                                                    className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors shadow-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;