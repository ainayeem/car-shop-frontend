import c1 from "../../assets/images/car-logo/c1.jpg";
import c2 from "../../assets/images/car-logo/c2.jpg";
import c3 from "../../assets/images/car-logo/c3.jpg";
import c4 from "../../assets/images/car-logo/c4.jpg";

const Company = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-80 lg:mt-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">Our Trusted Partners</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center justify-items-center">
          <div className="w-full max-w-[120px] aspect-[3/2] flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full object-contain" src={c1} alt="partner" />
          </div>
          <div className="w-full max-w-[120px] aspect-[3/2] flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full object-contain" src={c2} alt="partner" />
          </div>
          <div className="w-full max-w-[120px] aspect-[3/2] flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full object-contain" src={c3} alt="partner" />
          </div>
          <div className="w-full max-w-[120px] aspect-[3/2] flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full object-contain" src={c4} alt="partner" />
          </div>
          <div className="w-full max-w-[120px] aspect-[3/2] flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full object-contain" src={c1} alt="partner" />
          </div>
          <div className="w-full max-w-[120px] aspect-[3/2] flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full object-contain" src={c2} alt="partner" />
          </div>
          <div className="w-full max-w-[120px] aspect-[3/2] flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full object-contain" src={c3} alt="partner" />
          </div>
          <div className="w-full max-w-[120px] aspect-[3/2] flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full object-contain" src={c1} alt="partner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
