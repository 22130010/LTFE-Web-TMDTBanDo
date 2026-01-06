import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const images = [
    '/banner3.jpg',
    '/banner2.jpg',
    '/banner1.jpg',
    '/banner5.jpg',
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
            {/* Ảnh nền */}
            <div
                className="w-full h-full bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            ></div>

            {/* Mũi tên trái */}
            <button onClick={prevSlide}
                    className="absolute top-1/2 left-6 transform -translate-y-1/2
                     bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full
                     shadow-lg transition duration-300 ease-in-out" >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>

            {/* Mũi tên phải */}
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
