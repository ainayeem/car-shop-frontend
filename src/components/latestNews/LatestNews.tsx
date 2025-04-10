import { FaArrowRight } from "react-icons/fa";

const LatestNews = () => {
  const articles = [
    {
      title: "5 Signs Your Car Needs a Tune-Up",
      date: "March 15, 2025",
      image:
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      summary:
        "Learn the key warning signs that indicate your vehicle is due for maintenance. Catching these early can save you from costly repairs down the road.",
    },
    {
      title: "Electric Vehicle Maintenance: What You Need to Know",
      date: "February 28, 2025",
      image:
        "https://di-uploads-pod18.dealerinspire.com/walserautomotivegroup/uploads/2024/09/What-to-Know-about-Electric-Vehicle-Maintenance-Artboard-2.png",
      summary:
        "As electric vehicles become more common, understanding their unique maintenance needs is essential. We break down what every EV owner should know.",
    },
    {
      title: "Summer Road Trip? Prepare Your Car with These Tips",
      date: "January 20, 2025",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      summary:
        "Planning a summer adventure? Make sure your vehicle is ready for the journey with our comprehensive pre-trip checklist and recommendations.",
    },
  ];

  return (
    <section className="py-10 my-20 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Latest News & Tips
        </h2>
        <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
          Stay up-to-date with automotive trends and expert advice
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <span className="text-xs text-base-content/60">
                  {article.date}
                </span>
                <h3 className="card-title">{article.title}</h3>
                <p>{article.summary}</p>
                <div className="card-actions justify-start mt-2">
                  <button className="btn btn-link btn-sm px-0 flex items-center gap-2 text-customYellow">
                    Read More <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="flex justify-center mt-8">
          <button className="btn btn-outline btn-primary">
            View All Articles
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default LatestNews;
