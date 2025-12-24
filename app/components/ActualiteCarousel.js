"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ActualitesCarousel({ slides = [] }) {
  const carouselRef = useRef(null);
  const [current, setCurrent] = useState(0);

  // Autoplay toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Scroll uniquement horizontal du carousel
  useEffect(() => {
    if (!carouselRef.current) return;
    const slide = carouselRef.current.children[current];
    slide?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [current]);

  const goToSlide = (index) => setCurrent(index);
  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const nextSlide = () => setCurrent((current + 1) % slides.length);

  return (
    <div className="relative w-full">
      {/* Carousel */}
      <div
        ref={carouselRef}
        className="carousel w-full h-80 rounded-2xl overflow-hidden scroll-smooth flex"
      >
        {slides.map((slide) => (
          <div
            key={slide.slug}
            className="carousel-item relative min-w-full flex-shrink-0"
          >
            {/* Slide content */}
            <div className="relative w-full h-full group">
              <img
                src={slide.image.url}
                alt={slide.image.alt || slide.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h2 className="text-xl font-bold leading-tight line-clamp-2">
                  {slide.title}
                </h2>
                {/* Bouton pour aller à la page de l'article */}
                <Link
                  href={`/actualite/${slide.slug}`}
                  className="absolute bottom-4 right-4 btn btn-sm btn-primary"
                >
                  Lire la suite →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flèches */}
      <div className="absolute inset-y-1/2 left-3 right-3 flex justify-between -translate-y-1/2">
        <button
          onClick={prevSlide}
          className="btn btn-circle btn-md bg-white bg-opacity-50 border-none text-black"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="btn btn-circle btn-md bg-white border-none text-black"
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-4 absolute bottom-3 left-1/2 -translate-x-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-warning" : "bg-warning/50"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
