'use client';
import { useEffect, useState } from 'react';

const images: string[] = [
 '/assets/43.jpg',  // Replace with your actual image paths
  '/assets/38.jpg',
  '/assets/39.jpg',
  '/assets/1.jpeg',
  '/assets/44.jpg',
    '/assets/30.jpg',
  '/assets/23.jpg',
  '/assets/2tulsi.jpeg',
  '/assets/47.webp',
  '/assets/48.webp',
  '/assets/29.jpg',
  '/assets/one.jpg',
  '/assets/new.webp',
];

export default function ImageSlider(): JSX.Element {
  const [current, setCurrent] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovered) {
        setCurrent((prev) => (prev + 1) % images.length);
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [hovered]);

  const handleMouseEnter = (): void => {
    setHovered(true);
    setCurrent((current + 1) % images.length);
  };

  const handleMouseLeave = (): void => {
    setHovered(false);
  };

  return (
    <div className="relative bg-netural-50 text-white h-[500px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute top-10 left-10 text-green-700 text-4xl ">
        
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="transition-all duration-500 ease-in-out p-4"
      >
        <img
          src={images[current]}
          alt={`Product ${current + 1}`}
          className="h-[300px] md:h-[400px]  rounded-sm transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="absolute bottom-10 right-10 text-green-700 text-xl">
        Grow Naturally 🌿
      </div>
    </div>
  );
}
