
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/about/AboutHero";
import OurStorySection from "@/components/about/OurStorySection";
import MissionValuesSection from "@/components/about/MissionValuesSection";
import TeamSection from "@/components/about/TeamSection";
import JoinCTASection from "@/components/about/JoinCTASection";
import { values, teamMembers } from "@/components/about/data";

const About = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>About DentalDeals | Our Mission</title>
        <meta name="description" content="Learn about DentalDeals, our mission to help dental professionals save money, and the team behind the platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        <AboutHero />
        <OurStorySection />
        <MissionValuesSection values={values} />
        <TeamSection teamMembers={teamMembers} />
        <JoinCTASection />
        <Footer />
      </div>
    </>
  );
};

export default About;
