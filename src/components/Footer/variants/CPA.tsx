"use client";
import React from "react";
import NameTitle from "../../NameTitle";
import SocialLinks from "../../SocialLinks";
import GitHubStarCount from "../../GithubStarCount";
import GitHubButton from "react-github-btn";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BuyMeACoffeeButton from "../../BuyMeACoffeeButton";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { useContactModal } from "@/contexts/ContactModalContext";
import { Shield, Briefcase, Mail } from "lucide-react";

const CPAFooter = () => {
  const router = useRouter();
  const { setIsContactModalOpen } = useContactModal();

  return (
    <footer id="contacts" className="bg-gradient-to-b from-gray-100 to-gray-200 py-4 relative z-10">
      <div className="py-4 xl:flex-row max-w-[80rem] mx-auto flex flex-col justify-between items-center px-4 sm:px-8 gap-4">
        <div className="flex flex-col justify-center items-center font-inter gap-2 max-w-80 w-full order-2 xl:order-1">
          <div className="flex flex-col items-center">
            <div>
              <DotLottieReact
                src="https://lottie.host/480ba756-90d7-4ba6-bd6c-5167f02d7187/V1fklWpnHV.lottie"
                loop
                autoplay
              />
            </div>
            <div className="max-w-">
              <BuyMeACoffeeButton />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 font-inter order-1 xl:order-2 ">
          <NameTitle
            className="font-medium"
            size="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            href="#herosection"
          />
          <div className="flex items-center gap-2 bg-[#1e3a5f]/10 text-[#1e3a5f] px-3 py-1 rounded-full text-sm font-semibold mb-2">
            <Shield className="w-4 h-4" />
            <span>Licensed CPA</span>
          </div>
          <p className="text-sm font-medium font-montserrat text-justify text-gray-600">
            Committed to maintaining the highest standards of professional ethics and delivering accurate financial insights. Let&apos;s discuss how I can support your organization&apos;s financial success.
          </p>

          <SocialLinks className="mt-4" size={24} />
          <Button
            onClick={() => {
              setIsContactModalOpen(true);
            }}
            className="text-lg font-semibold w-42 py-4 m-4 bg-[#1e3a5f] text-white uppercase tracking-tight shadow-lg hover:bg-[#162d4a]"
          >
            <Mail className="w-4 h-4 mr-2" />
            Schedule Consultation
          </Button>
        </div>
        <div className="flex flex-col mt-4 xl:mt-0 justify-center items-center font-inter max-w-80 w-full xl:block order-3 xl:order-3">
          <h3 className="font-semibold text-xl text-[#1e3a5f]">Quick Links</h3>
          <ul className="flex flex-wrap justify-center gap-2 mt-2 text-sm xl:block ">
            <Link className="underline" href="/#herosection">
              <li className="py-2 text-gray-700">About</li>
            </Link>
            <Link className="underline" href="/blog">
              <li className="py-2 text-gray-700">Blogs</li>
            </Link>
            <Link className="underline" href="/projects">
              <li className="py-2 text-gray-700">Projects</li>
            </Link>
            <Link className="underline" href="/#experience">
              <li className="py-2 text-gray-700">Experience</li>
            </Link>
            <Link className="underline" href="/#education">
              <li className="py-2 text-gray-700">Education</li>
            </Link>
            <Link className="underline" href="/#certifications">
              <li className="py-2 text-gray-700">Certifications</li>
            </Link>
            <button
              onClick={() => router.push("/?resume=true")}
              className="underline"
            >
              <li className="py-2 text-gray-700">Resume</li>
            </button>
          </ul>
        </div>
      </div>
      <div className="text-center mt-2 xl:flex xl:justify-between mx-auto max-w-[80rem] px-4 sm:px-8 lg:px-20 border-t border-border py-2">
        <div className="mt-2">
          <GitHubStarCount
            username="LugawPlain"
            repo="TroySarinas_Personal_Portfolio"
          />
          <GitHubButton
            href="https://github.com/LugawPlain/TroySarinas_Personal_Portofilio_v2"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star LugawPlain/TroySarinas_Personal_Portofilio_v2 on GitHub"
          >
            Stars on Github
          </GitHubButton>
        </div>
        <div className="text-xs text-muted-foreground">
          <p className="text-xs text-muted-foreground">© 2025 Troy Sarinas, CPA</p>
          <p>+639569878251📞</p>
          <p>troyjeffreysarinas@gmail.com📩</p>
          <p className="text-xs text-muted-foreground">
            Licensed CPA | Built with React Next & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CPAFooter;
