import ContactForm from "../components/contactForm/ContactForm";
import Services from "../components/services/Services";

const ServicesPage = () => {
  return (
    <div>
      <Services />

      {/* Additional service details */}
      <div className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Professional Car Services
            </h2>
            <p className="mb-4">
              Our certified technicians use state-of-the-art equipment to
              diagnose and repair all makes and models. We take pride in
              providing exceptional service with transparent pricing and clear
              communication.
            </p>
            <p className="mb-4">
              Whether you need routine maintenance, complex repairs, or
              specialty services, our team has the expertise to get your vehicle
              back on the road quickly and safely.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-start">
                <div className="rounded-full bg-customYellow/10 p-3 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-customYellow"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Brake Service & Repair</p>
              </div>
              <div className="flex items-start">
                <div className="rounded-full bg-customYellow/10 p-3 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-customYellow"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Oil Changes</p>
              </div>
              <div className="flex items-start">
                <div className="rounded-full bg-customYellow/10 p-3 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-customYellow"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Tire Service</p>
              </div>
              <div className="flex items-start">
                <div className="rounded-full bg-customYellow/10 p-3 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-customYellow"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Engine Diagnostics</p>
              </div>
              <div className="flex items-start">
                <div className="rounded-full bg-customYellow/10 p-3 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-customYellow"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>AC Service</p>
              </div>
              <div className="flex items-start">
                <div className="rounded-full bg-customYellow/10 p-3 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-customYellow"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>Suspension Repair</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Mechanic working on car"
              className="rounded-lg shadow-lg max-h-96 object-cover"
            />
          </div>
        </div>
      </div>

      <ContactForm />
    </div>
  );
};

export default ServicesPage;
