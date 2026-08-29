import { cookies } from "next/headers";
import Technologies from "../components/Technologies";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import HeroSection from "@/components/HeroSection";
import SplashCursor from "@/components/SplashCursor";
import ChatWidget from "@/components/ChatWidget";
import Resume from "@/components/Resume";
import { getEducation } from "@/lib/roles";
import NotFound from "./not-found";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ resume?: string }>;
}) {
  const params = await searchParams;
  const showResume = params.resume === "true";
  const educationItems = await getEducation();
  const cookieStore = await cookies();
  const hasRoleCookie = !!cookieStore.get("portfolio_role")?.value;

  if (!hasRoleCookie) {
    return <NotFound />;
  }

  return (
    <>
      <SplashCursor
        DENSITY_DISSIPATION={2}
        VELOCITY_DISSIPATION={1}
        PRESSURE_ITERATIONS={30}
        CURL={5}
      />
      {showResume && <Resume />}
      <div className="flex flex-col gap-8 font-inter relative">
        <HeroSection />
        <Projects />
        {/* <Experience /> */}
        <Education educationItems={educationItems} />
        {/* <Technologies /> */}
        {/* <Certifications /> */}
        {/* <ChatWidget /> */}
      </div>
    </>
  );
}
