"use client";
import React from "react";
import NameTitle from "./NameTitle";
import SocialLinks from "./SocialLinks";
import GitHubStarCount from "./GithubStarCount";
import GitHubButton from "react-github-btn";
import { Button } from "./ui/button";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BuyMeACoffeeButton from "./BuyMeACoffeeButton";

const Footer = () => {
  return (
    <footer
      id="contacts"
      className="bg-gray-200 gap-4  flex flex-col items-center justify-center px-6 py-4"
    >
      <div className="flex flex-col justify-center items-center gap-2 font-inter">
        <Link href="#">
          <NameTitle size="text-5xl" />
        </Link>
        <p className="text-sm">
          Ready to collaborate on something extraordinary? I'm always excited to
          connect with fellow innovators, explore cutting-edge projects, and
          push the boundaries of what's possible with technology. Let's build
          the future together.
        </p>
        <SocialLinks className="mt-4" size={16} />
      </div>
      <div className="flex flex-col justify-center items-center font-inter">
        <h3 className="font-semibold text-lg">Quick Links</h3>
        <ul className="flex flex-wrap justify-center gap-3 mt-4 text-sm ">
          <Link className="p-2 underline" href="#about">
            <li>About</li>
          </Link>
          <Link className="p-2 underline" href="#skills">
            <li>Skills</li>
          </Link>
          <Link className="p-2 underline" href="#skills">
            <li>Experience</li>
          </Link>
          <Link className="p-2 underline" href="#projects">
            <li>Projects</li>
          </Link>
          <Link className="p-2 underline" href="#publications">
            <li>Publications</li>
          </Link>
          <Link className="p-2 underline" href="#resume">
            <li>Resume</li>
          </Link>
        </ul>
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
      </div>
      <div className="flex flex-col justify-center items-center font-inter gap-2">
        <div className="flex flex-col items-center px-8">
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
      <div className="text-center mt-2">
        <p className="text-xs text-muted-foreground">© 2025 Troy Sarinas</p>
        <p className="text-xs text-muted-foreground">
          Built with React Next & Tailwind
        </p>
      </div>
    </footer>
  );
};

export default Footer;
