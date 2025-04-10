const ChooseUs = () => {
  const items = [
    {
      id: "1",
      url: "https://amcdn.blob.core.windows.net/media/1/root/carshop-nottingham-final-063_w555_h555.jpg",
      title: "Wide Car Selection",
      description:
        "Browse our extensive range of vehicles—from compact cars to SUVs. Find the perfect match for your lifestyle.",
      tags: ["Cars", "SUV", "Sedan", "Inventory", "Vehicle Selection"],
    },

    {
      id: "2",
      url: "https://www.thebusinessdesk.com/_files/images/dec_20/Carshop-Nottingham-Final_071.jpg",
      title: "Fast & Easy Delivery",
      description:
        "Get your car delivered quickly and safely to your doorstep. We handle everything with care.",
      tags: ["Car Delivery", "Speed", "Convenience", "Logistics", "Reliable"],
    },

    {
      id: "3",
      url: "https://www.northamptonchron.co.uk/webimg/T0FLMTI2MjQxODM5.jpg?width=1200&enable=upscale",
      title: "24/7 Customer Support",
      description:
        "Questions? Our automotive experts are available around the clock to help you every step of the way.",
      tags: [
        "Customer Support",
        "Service",
        "Assistance",
        "24/7 Help",
        "Automotive Help",
      ],
    },
  ];

  return (
    <section className="py-16 bg-base-100 my-10 rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-4">Why Choose Us?</h2>
      <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
        We offer a wide selection of vehicles, fast delivery, and 24/7 customer
        support to ensure you have the best experience possible.
      </p>
      <div className="group flex max-md:flex-col justify-center gap-2 w-[80%] mx-auto mb-10 mt-3 text-white">
        {items.map((item) => (
          <article
            key={item.id}
            className="group/article relative w-full rounded-xl overflow-hidden md:group-hover:[&:not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] transition-all ease-\[cubic-bezier\(.5,.85,.25,1.15\)\] duration-300 before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur after:rounded-lg after:transition-all focus-within:ring focus-within:ring-indigo-300"
          >
            <a
              className="absolute inset-0 z-10 p-3 flex flex-col justify-end"
              href="#0"
            >
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition ease-\[cubic-bezier\(.5,.85,.25,1.15\)\] duration-300 group-hover/article:delay-300 group-focus-within/article:delay-300">
                {item?.title}
              </h1>
              <span className="text-sm md:text-lg lg:text-2xl font-medium md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition ease-\[cubic-bezier\(.5,.85,.25,1.15\)\] duration-300 group-hover/article:delay-500 group-focus-within/article:delay-500">
                {item?.description}
              </span>
            </a>
            <img
              className="object-cover h-72 md:h-[420px] w-full"
              src={item?.url}
              width="960"
              height="480"
              alt={item?.title}
            />
          </article>
        ))}
      </div>
    </section>
  );
};

export default ChooseUs;
