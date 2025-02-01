const About = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white  rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
          About Us
        </h1>

        <p className="text-lg text-gray-700 text-center mb-6">
          Welcome to <span className="font-bold text-blue-500">CarShop</span>,
          your trusted destination for quality vehicles. We are dedicated to
          providing reliable and affordable cars, ensuring a seamless experience
          for our customers.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission Section */}
          <div className="p-4 border-l-4 border-customYellow">
            <h2 className="text-2xl font-semibold text-gray-900">
              Our Mission
            </h2>
            <p className="text-gray-700 mt-2">
              At CarShop, our mission is to provide top-quality vehicles at
              unbeatable prices while maintaining transparency, trust, and
              exceptional customer service.
            </p>
          </div>

          {/* Vision Section */}
          <div className="p-4 border-l-4 border-customYellow">
            <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
            <p className="text-gray-700 mt-2">
              We aim to be the leading car dealership, offering a seamless
              shopping experience with a commitment to customer satisfaction and
              sustainability.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Why Choose Us?
          </h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li>✔ Wide selection of premium and affordable cars</li>
            <li>✔ Transparent pricing with no hidden fees</li>
            <li>✔ Excellent customer support and service</li>
            <li>✔ Easy financing options available</li>
            <li>✔ Commitment to quality and sustainability</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
          <p className="text-gray-700 mt-2">
            Have questions? Feel free to{" "}
            <span className="font-semibold text-blue-500">contact us</span> for
            more information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
