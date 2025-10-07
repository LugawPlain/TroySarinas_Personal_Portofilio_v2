import React from "react";
import NameTitle from "./NameTitle";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="Header top-0 bg-white z-999 backdrop-blur-2xl sticky flex items-center justify-between px-4 h-20 border-b-2 border-border">
      <NameTitle />
      <div className="flex items-center justify-between grow max-w-32">
        <ul className="flex justify-between ">
          <li className="hidden">Skills</li>
          <li className="hidden">Education</li>
          <li className="hidden">Work Expererience</li>
          <li className="hidden">Contact</li>
          <button className="block">
            <GiHamburgerMenu></GiHamburgerMenu>
          </button>
        </ul>
        <div>
          <Button className="text-xs">Dark Mode</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
