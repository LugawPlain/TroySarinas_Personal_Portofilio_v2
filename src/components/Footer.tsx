"use client";
import React from "react";
import NameTitle from "./NameTitle";
import SocialLinks from "./SocialLinks";
import GitHubStarCount from "./GithubStarCount";
import GitHubButton from "react-github-btn";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-200 gap-4  flex flex-col items-center justify-center px-4">
      <div className="flex mt-8 flex-col justify-center items-center font-inter">
        <NameTitle className="text-2xl" />
        <p className="text-sm">
          Ready to collaborate on something extraordinary? I'm always excited to
          connect with fellow innovators, explore cutting-edge projects, and
          push the boundaries of what's possible with technology. Let's build
          the future together.
        </p>
        <SocialLinks size={16} />
      </div>
      <div className="flex flex-col justify-center items-center font-inter">
        <h3>Quick Links</h3>
        <ul className="flex flex-wrap justify-center gap-4 ">
          <li>About</li>
          <li>Skills</li>
          <li>Experience</li>
          <li>Projects</li>
          <li>Publications</li>
          <li>Reusume</li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center font-inter gap-2">
        <GitHubStarCount
          username="LugawPlain"
          repo="TroySarinas_Personal_Portfolio"
        />
        <GitHubButton
          href="https://github.com/LugawPlain/TroySarinas_Personal_Portfolio"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star LugawPlain/TroySarinas_Personal_Portfolio on GitHub"
        >
          Stars on Github
        </GitHubButton>
        <p className="text-sm">© 2025 Troy Sarinas</p>
        <p className="text-sm">Built with React Next & Tailwind</p>
        <Button>
          <a href="https://buymeacoffee.com/troysarinas">Buy me a Coffee</a>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
