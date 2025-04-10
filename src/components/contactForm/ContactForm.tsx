import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    // setSubmitted(true);
    toast.success("Your message has been sent successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    // Hide the alert after 3 seconds
    // setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-16 bg-base-100 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Contact Us</h2>
        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Have questions? We're here to help with all your automotive needs
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <p className="mb-8">
              Fill out the form and our team will get back to you as soon as
              possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-customYellow/10 flex items-center justify-center mr-4">
                  <FaPhone className="text-customYellow" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Phone</p>
                  <p className="font-medium">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-customYellow/10 flex items-center justify-center mr-4">
                  <FaEnvelope className="text-customYellow" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Email</p>
                  <p className="font-medium">contact@carshop.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-customYellow/10 flex items-center justify-center mr-4">
                  <FaMapMarkerAlt className="text-customYellow" />
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Address</p>
                  <p className="font-medium">123 Main Street, City, Country</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* {submitted && <p>Your message has been sent successfully!</p>} */}

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea textarea-bordered h-32"
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <button
                    type="submit"
                    className="btn btn-primary bg-customYellow border-none text-white hover:bg-customYellowHover transition duration-300 ease-in-out"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
