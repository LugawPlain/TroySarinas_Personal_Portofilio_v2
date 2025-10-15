"use client";
import React from "react";
import NameTitle from "./NameTitle";
import SocialLinks from "./SocialLinks";
import GitHubStarCount from "./GithubStarCount";
import GitHubButton from "react-github-btn";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BuyMeACoffeeButton from "./BuyMeACoffeeButton";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <footer id="contacts" className="bg-gray-200 py-4 mt-12">
      <div className="py-4 xl:flex-row max-w-[80rem] mx-auto flex flex-col justify-between items-center px-8 gap-4">
        <div className="flex flex-col justify-center items-center font-inter gap-2 max-w-80 min-w-80 order-3 xl:order-1">
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
          <Link href="#">
            <NameTitle
              className="font-medium"
              size="xl:text-7xl text-5xl lg:text-6xl "
            />
          </Link>
          <p className="text-sm font-medium font-montserrat text-justify">
            Ready to collaborate on something extraordinary? I&apos;m always
            excited to connect with fellow innovators, explore cutting-edge
            projects, and push the boundaries of what&apos;s possible with
            technology. Let&apos;s build the future together.
          </p>

          <SocialLinks className="mt-4" size={24} />
        </div>
        <div className="flex flex-col mt-4 xl:mt-0 justify-center pl-8 items-center font-inter max-w-80 min-w-80 xl:block oirder-2 xl:order-3">
          <h3 className="font-semibold text-xl text-secondary">Quick Links</h3>
          <ul className="flex flex-wrap justify-center gap-3 mt-4 text-sm xl:block ">
            <Link className="underline" href="#hero">
              <li className="py-2 text-secondary">About</li>
            </Link>
            <Link className="underline" href="#projects">
              <li className="py-2 text-secondary">Projects</li>
            </Link>
            <Link className="underline" href="#experience">
              <li className="py-2 text-secondary">Experience</li>
            </Link>
            <Link className="underline" href="#education">
              <li className="py-2 text-secondary">Projects</li>
            </Link>
            <Link className="underline" href="#technologies">
              <li className="py-2 text-secondary">Technologies</li>
            </Link>
            <Link className="underline" href="#certifications">
              <li className="py-2 text-secondary">Certifications</li>
            </Link>
            <button
              onClick={() => router.push("/?resume=true")}
              className="underline"
            >
              <li className="py-2 text-secondary">Resume</li>
            </button>
          </ul>
        </div>
      </div>
      <div className="text-center mt-2 xl:flex xl:justify-between mx-auto max-w-[80rem] px-20 border-t border-border py-2">
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
          <p className="text-xs text-muted-foreground">© 2025 Troy Sarinas</p>
          <p>+639569878251📞</p>
          <p>troysarinas22@gmail.com📩</p>
          <p className="text-xs text-muted-foreground">
            Built with React Next & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
