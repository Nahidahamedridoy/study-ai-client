import HeroSection from './HeroSection';
import LatestResources from './LatestResources';
import FeaturesSection from './FeaturesSection';
import CategoriesSection from './CategoriesSection';
import StatsSection from './StatsSection';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import FAQSection from './FAQSection';
import CTASection from './CTASection';

export default function HomeView() {
    return (
        <>
            <HeroSection />
            <CategoriesSection />
            <FeaturesSection />
            <LatestResources />
            <StatsSection />
            <HowItWorks />
            <Testimonials />
            <FAQSection />
            <CTASection />
        </>
    );
}
