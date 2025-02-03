import c1 from "../../assets/images/car-logo/c1.jpg";
import c2 from "../../assets/images/car-logo/c2.jpg";
import c3 from "../../assets/images/car-logo/c3.jpg";
import c4 from "../../assets/images/car-logo/c4.jpg";

const Company = () => {
  return (
    <div className="rounded bg-white border border-gray-300 h-24 flex gap-5 items-center justify-around mt-5">
      <div>
        <img className="h-20" src={c1} alt="partners" />
      </div>
      <div>
        <img className="h-20" src={c2} alt="partners" />
      </div>
      <div>
        <img className="h-20" src={c3} alt="partners" />
      </div>
      <div>
        <img className="h-20" src={c4} alt="partners" />
      </div>
      <div>
        <img className="h-20" src={c1} alt="partners" />
      </div>
      <div>
        <img className="h-20" src={c2} alt="partners" />
      </div>
      <div>
        <img className="h-20" src={c3} alt="partners" />
      </div>
      <div>
        <img className="h-20" src={c1} alt="partners" />
      </div>
    </div>
  );
};

export default Company;
