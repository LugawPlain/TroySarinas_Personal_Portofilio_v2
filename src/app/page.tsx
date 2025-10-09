import Technologies from "../components/Technologies";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SplashCursor from "@/components/SplashCursor";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <SplashCursor />
      <div className="flex flex-col space-y-8 font-inter relative">
        <Header />

        <HeroSection />
        <Projects />
        <Experience />
        {/* <div className="flex flex-col items-center">
          <h1 className="text-center text-3xl font-bold">
            Technical Proficiency
          </h1>
          <div className="text-center">
            <h2 className="">Web Development</h2>
            <div className="flex gap-2 flex-wrap items-center justify-center">
              <div className="">
                <Image
                  className="mx-auto"
                  src="/Icons/HTML5.svg"
                  alt="s"
                  width={60}
                  height={60}
                ></Image>
                <p className="text-center">HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="">Backend & Databases</h2>
            <div className="flex gap-2 flex-wrap items-center justify-center">
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="">Cloud and Devops</h2>
            <div className="flex gap-2 flex-wrap items-center justify-center">
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="">AI & Automations</h2>
            <div className="flex gap-2 flex-wrap items-center justify-center">
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
              <div className="">
                <div className="h-20 w-20 mx-auto bg-gray-500"></div>
                <p>HTML</p>
              </div>
            </div>
          </div>
        </div> */}
        <Education />
        <Technologies />
        <Certifications />
        <ChatWidget />
        <Footer />
      </div>
    </>
  );
}
