import { useState } from 'react';

const images = [
    '/banner3.jpg',
    '/banner2.jpg',
    '/banner1.jpg',
    '/banner5.jpg',
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full h-[700px] overflow-hidden">
            {/* Ảnh nền */}
            <div
                className="w-full h-full bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            ></div>

            {/* Mũi tên trái */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white text-black p-2 rounded-full"
            >
                ◀
            </button>

            {/* Mũi tên phải */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white text-black p-2 rounded-full"
            >
                ▶
            </button>
        </div>
    );
};

export default Banner;
