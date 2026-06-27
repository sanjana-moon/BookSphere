import FeaturedBooks from "@/component/homePage/FeaturedSection";
import HeroSlider from "@/component/homePage/Hero";
import TopLibrarians from "@/component/homePage/TopLibrarians";
import WhyChooseBookSphere from "@/component/homePage/WhyChoosePage";

const HomePage = () => {
    return (
        <div>
            <HeroSlider/>
            <FeaturedBooks/>
            <WhyChooseBookSphere/>
            <TopLibrarians/>
        </div>
    );
};

export default HomePage;