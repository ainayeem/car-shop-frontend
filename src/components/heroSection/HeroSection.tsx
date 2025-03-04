import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import delivery from "../../assets/images/delivery.png";
import hero1 from "../../assets/images/hero-1.jpg";
import hero2 from "../../assets/images/hero-2.jpg";
import hero3 from "../../assets/images/hero-3.jpg";
import securePayment from "../../assets/images/payment.png";
import support from "../../assets/images/support.png";

const slides = [
  { id: 1, image: hero1, title: "Find Your Best Car Here" },
  { id: 2, image: hero2, title: "Luxury Rides" },
  { id: 3, image: hero3, title: "Drive in Style" },
];

const HeroSection = () => {
  return (
    <div>
      {/* Hero Swiper Section */}
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
        className="mySwiper rounded-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative pt-24 pb-52 px-5 lg:px-20 bg-no-repeat bg-cover bg-center h-0 lg:h-96"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              {/* Content */}
              <div className="relative">
                <h1 className="text-4xl lg:text-7xl font-bold my-5 -ml-2 text-white">
                  {slide.title}
                </h1>
                <Link
                  to="/shop"
                  className="bg-customYellow px-3 lg:px-5 py-3 rounded-full text-white font-medium"
                >
                  View All Cars
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Benefits Section */}
      <div className="mt-5 border border-gray-200 p-5 grid grid-cols-3 rounded">
        <div className="border-r border-gray-200">
          <img className="w-16 mx-auto" src={delivery} alt="" />
          <p className="text-center mt-2 mb-1 font-semibold">
            DELIVERY ON TIME
          </p>
          <p className="text-center">Perfect goods condition</p>
        </div>
        <div className="border-r border-gray-200">
          <img
            className="w-16 mx-auto"
            src={securePayment}
            alt="secure payment"
          />
          <p className="text-center mt-4 mb-1 font-semibold">SECURE PAYMENT</p>
          <p className="text-center">100% secure payment</p>
        </div>
        <div>
          <img className="w-16 mx-auto" src={support} alt="support" />
          <p className="text-center mt-2 mb-1 font-semibold">24/7 SUPPORT</p>
          <p className="text-center">Dedicated support</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
