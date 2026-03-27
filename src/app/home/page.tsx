import Hero from "@/components/home/hero";
import { AboutRefreshSection } from "@/components/home/about-refresh-section";
import { CommunitySection } from "@/components/home/community";
import { TestimonialSection } from "@/components/home/testimonial-section";
import MissionSection from "@/components/home/mission-section";
import { Footer } from "@/components/home/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <AboutRefreshSection /> */}
      <CommunitySection />
      <TestimonialSection />
      <MissionSection />
      <Footer />
    </>
  );
}