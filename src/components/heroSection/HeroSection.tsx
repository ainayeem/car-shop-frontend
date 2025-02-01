import { useEffect, useState } from "react";
import hero1 from "../../assets/images/hero-1.jpg";
import hero2 from "../../assets/images/hero-2.jpg";
import hero3 from "../../assets/images/hero-3.jpg";

const images = [hero1, hero2, hero3]; // Array of images

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1)); // Move Right to Left
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <div className="relative w-full h-[30vh] md:h-[65vh] lg:h-[55vh] overflow-hidden rounded">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-center px-4">
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold">
                Find Your Dream Car Today
              </h1>
              <p className="text-white text-sm md:text-lg lg:text-xl mt-2">
                Explore our vast collection of premium vehicles with unbeatable
                prices.
              </p>
            </div>
          </div>
        ))}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
              )
            }
            className="btn btn-circle bg-white bg-opacity-50 p-2 md:p-3 lg:p-4"
          >
            ❮
          </button>
          <button
            onClick={() =>
              setCurrentSlide(
                currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
              )
            }
            className="btn btn-circle bg-white bg-opacity-50 p-2 md:p-3 lg:p-4"
          >
            ❯
          </button>
        </div>
      </div>
      {/*  */}
      <div className="mt-5 border border-gray-200 p-5 grid grid-cols-3 rounded">
        <div className="border-r border-gray-200">
          <img
            className="w-16 mx-auto"
            src="/src/assets/images/delivery.png"
            alt=""
          />
          <p className="text-center mt-2 mb-1 font-semibold">
            DELIVERY ON TIME
          </p>
          <p className="text-center">Perfect goods condition</p>
        </div>
        <div className="border-r border-gray-200">
          <img
            className="w-16 mx-auto"
            src="/src/assets/images/payment.png"
            alt="benifits"
          />
          <p className="text-center mt-4 mb-1 font-semibold">SECURE PAYMENT</p>
          <p className="text-center">100% secure payment</p>
        </div>
        <div>
          <img
            className="w-16 mx-auto"
            src="/src/assets/images/support.png"
            alt=""
          />
          <p className="text-center mt-2 mb-1 font-semibold">24/7 SUPPORT</p>
          <p className="text-center">Dedicated support</p>
        </div>
      </div>{" "}
    </div>
  );
};

export default HeroSection;
