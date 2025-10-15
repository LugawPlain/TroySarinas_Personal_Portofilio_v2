import Technologies from "../components/Technologies";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
// import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SplashCursor from "@/components/SplashCursor";
import ChatWidget from "@/components/ChatWidget";
import Resume from "@/components/Resume";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ resume?: string }>;
}) {
  const params = await searchParams;
  const showResume = params.resume === "true";

  return (
    <>
      <SplashCursor />
      {showResume && <Resume />}
      <div className="flex flex-col space-y-8 font-inter relative">
        <Header />
        <HeroSection />
        <Projects />
        <Experience />
        <Education />
        <Technologies />
        {/* <Certifications /> */}
        <ChatWidget />
        <Footer />
      </div>
    </>
  );
}
