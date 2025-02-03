import { Link } from "react-router-dom";
import hero1 from "../../assets/images/hero-1.jpg";
import peraFront from "../../assets/images/pera-front.jpg";

const ParallaxCover = () => {
  return (
    <div className="pb-96 lg:pb-0">
      <div
        style={{ backgroundImage: `url(${hero1})` }}
        className="featured-item bg-fixed text-white py-6 my-20 bg-contain bg-center h-40 md:h-80 lg:h-[53vh] rounded"
      >
        <div className="md:flex justify-center items-center pb-20 pt-12 px-6 md:px-36 bg-slate-800 bg-opacity-70">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img
              className="w-48 md:w-72 h-auto object-contain rounded"
              src={peraFront}
              alt="Car Model"
            />
          </div>
          <div className="md:ml-10 text-center md:text-left">
            <p className="text-sm md:text-base mb-2">
              New Arrivals | June 2025
            </p>{" "}
            <p className="uppercase font-semibold text-xl md:text-4xl mb-4">
              Get Behind the Wheel of Your Dream Car Today!
            </p>
            <p className="text-sm md:text-base mb-4">
              Discover our exclusive selection of luxury cars at unbeatable
              prices. Whether you're looking for a sedan, SUV, or a sporty
              coupe, we have the perfect car for you. Enjoy exceptional
              performance, design, and comfort in every model. Don't miss
              out—your perfect ride is just a click away.
            </p>
            <Link to="/shop">
              <button className="bg-customYellow hover:bg-customYellowHover text-white font-bold py-2 px-4 rounded-lg">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxCover;
