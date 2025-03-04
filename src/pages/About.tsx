import { FaUsers, FaCar, FaHandshake, FaChartLine } from 'react-icons/fa';

const About = () => {
  const stats = [
    { number: "1000+", label: "Happy Customers", icon: <FaUsers className="w-8 h-8" /> },
    { number: "500+", label: "Vehicles Sold", icon: <FaCar className="w-8 h-8" /> },
    { number: "98%", label: "Customer Satisfaction", icon: <FaHandshake className="w-8 h-8" /> },
    { number: "15+", label: "Years Experience", icon: <FaChartLine className="w-8 h-8" /> },
  ];

  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Sarah Johnson",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Michael Chen",
      role: "Customer Relations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About CarShop</h1>
            <p className="text-xl">Your Trusted Partner in Automotive Excellence</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-customYellow mb-4 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700">
                At CarShop, our mission is to provide top-quality vehicles at unbeatable prices while maintaining transparency, trust, and exceptional customer service. We strive to make car buying a hassle-free experience for everyone.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700">
                We aim to be the leading car dealership, offering a seamless shopping experience with a commitment to customer satisfaction and sustainability. Our vision is to revolutionize the automotive industry through innovation and customer-centric service.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-customYellow mr-2">✓</span>
                  <span>Wide selection of premium and affordable cars</span>
                </li>
                <li className="flex items-center">
                  <span className="text-customYellow mr-2">✓</span>
                  <span>Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-center">
                  <span className="text-customYellow mr-2">✓</span>
                  <span>Excellent customer support and service</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-customYellow mr-2">✓</span>
                  <span>Easy financing options available</span>
                </li>
                <li className="flex items-center">
                  <span className="text-customYellow mr-2">✓</span>
                  <span>Commitment to quality and sustainability</span>
                </li>
                <li className="flex items-center">
                  <span className="text-customYellow mr-2">✓</span>
                  <span>Expert team of automotive professionals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-700 mb-8">
            Have questions? Our team is here to help you find the perfect vehicle for your needs.
          </p>
          <button className="bg-customYellow text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
