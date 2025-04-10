import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      content:
        "I've been bringing my cars to this shop for over 5 years. Their attention to detail and customer service is unmatched. I wouldn't trust my vehicle with anyone else!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "First-time Customer",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      content:
        "As someone who knows very little about cars, I appreciated how the staff took time to explain everything. Fair prices and great work - I'll definitely be back.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Business Fleet Manager",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      content:
        "We manage a fleet of 12 vehicles and this shop has been our go-to for maintenance. Their efficiency and reliability have saved us countless hours of downtime.",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-base-100 my-10 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Customer Testimonials
        </h2>
        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Don't just take our word for it - hear what our customers have to say
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-base-100 shadow-md relative">
              <div className="absolute -top-4 left-6 text-customYellow opacity-20">
                <FaQuoteLeft size={40} />
              </div>
              <div className="card-body">
                <p className="italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="avatar mr-4">
                    <div className="w-14 h-14 rounded-full">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-base-content/70">
                      {testimonial.role}
                    </p>
                    <div className="rating rating-sm mt-1">
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          type="radio"
                          name={`rating-${index}`}
                          className={`mask mask-star-2 ${
                            i < testimonial.rating
                              ? "bg-warning"
                              : "bg-base-300"
                          }`}
                          readOnly
                          checked={i === testimonial.rating - 1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
