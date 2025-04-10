import { FaCar, FaChargingStation, FaSprayCan, FaTools } from "react-icons/fa";

const Services = () => {
  const servicesList = [
    {
      title: "Maintenance & Repairs",
      description:
        "Full-service maintenance and repair facility with certified technicians.",
      icon: <FaTools className="text-4xl text-customYellow" />,
    },
    {
      title: "Vehicle Inspection",
      description:
        "Comprehensive multi-point inspection to ensure your vehicle is in optimal condition.",
      icon: <FaCar className="text-4xl text-customYellow" />,
    },
    {
      title: "Car Detailing",
      description:
        "Premium interior and exterior detailing services to make your car look brand new.",
      icon: <FaSprayCan className="text-4xl text-customYellow" />,
    },
    {
      title: "Electric Conversions",
      description:
        "Specialized service for electric vehicle maintenance and charging solutions.",
      icon: <FaChargingStation className="text-4xl text-customYellow" />,
    },
  ];

  return (
    <section className="py-16 bg-base-200 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Professional automotive services to keep your vehicle in perfect
          condition
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="card-title">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
