import ChooseUs from "../components/chooseUs/ChooseUs";
import Company from "../components/company/Company";
import ContactForm from "../components/contactForm/ContactForm";
import Featured from "../components/featured/Featured";
import HeroSection from "../components/heroSection/HeroSection";
import LatestNews from "../components/latestNews/LatestNews";
import ParallaxCover from "../components/parallaxCover/ParallaxCover";
import Services from "../components/services/Services";
import Testimonials from "../components/testimonials/Testimonials";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Featured />
      <Services />
      <ParallaxCover />
      <Company />
      <Testimonials />
      <ChooseUs />
      <LatestNews />
      <ContactForm />
    </div>
  );
};

export default HomePage;
