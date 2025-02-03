import Company from "../components/company/Company";
import Featured from "../components/featured/Featured";
import HeroSection from "../components/heroSection/HeroSection";
import ParallaxCover from "../components/parallaxCover/ParallaxCover";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <Featured />
      <ParallaxCover />
      <Company />
    </div>
  );
};

export default HomePage;
