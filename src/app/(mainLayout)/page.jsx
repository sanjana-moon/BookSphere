import FeaturedBooks from "@/component/homePage/FeaturedSection";
import HeroSlider from "@/component/homePage/Hero";
import TopLibrarians from "@/component/homePage/TopLibrarians";

const HomePage = () => {
    return (
        <div>
            <HeroSlider/>
            <FeaturedBooks/>
            <TopLibrarians/>
        </div>
    );
};

export default HomePage;