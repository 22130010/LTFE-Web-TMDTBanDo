import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const images = [
    'https://dongphuchaianh.vn/wp-content/uploads/2025/11/bst-essence-banner-pc.jpg',
    'https://dongphucatd.vn/wp-content/uploads/2022/05/banner-dong-phuc-cong-so-1349x610px_1561949921-min.jpeg',
    'https://dongphuchaianh.com/wp-content/uploads/2025/09/banner-bst-fancy.jpg',
    'https://www.dongphuctranganh.vn/media/images/00003-banner-dong-phuc-trang-anh.jpg',
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide(); }, 4000);
        return () => clearInterval(interval);
        }, []);

    return (
        <div className="relative w-full h-[700px] overflow-hidden">
            <div
                className="w-full h-full bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            ></div>

            <button onClick={prevSlide}
                    className="absolute top-1/2 left-6 transform -translate-y-1/2
                     bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full
                     shadow-lg transition duration-300 ease-in-out" >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <button onClick={nextSlide}
                    className="absolute top-1/2 right-6 transform -translate-y-1/2
                    bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg t
                    ransition duration-300 ease-in-out" >
                <ChevronRightIcon className="h-6 w-6" />
            </button>
        </div>
    );
};

export default Banner;
