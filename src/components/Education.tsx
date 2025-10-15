import React from "react";
import Image from "next/image";
import Link from "next/link";
const Education = () => {
  return (
    <div
      id="education"
      className="px-4 flex-col flex items-center justify-center"
    >
      <h1 className="text-center text-3xl sm:text-4xl mb-10 font-bold text-foreground/90">
        Education 🎓
      </h1>
      <div className="shadow-2xl bg-primary overflow-clip rounded-2xl font-inter relative max-w-[80rem] w-full grid grid-cols-1 xl:grid-cols-[minmax(0,160px)_1fr] xl:grid-rows-1">
        <div
          className={`bg-[#6a0106] flex justify-center items-center h-full shrink`}
        >
          <div className="h-22 w-22 bg-white rounded-full flex items-center justify-center">
            <Image
              src="/SSCRLogo1.png"
              height="80"
              width="80"
              alt="SSCRDCLOGO"
              className="-translate-y-1"
            />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row py-4">
          <div className="p-4 gap-2 flex flex-col grow">
            <h2 className="text-2xl font-semibold text-secondary">
              <Link
                href="https://sscr.edu/Beta/"
                target="_blank"
                rel="noopener noreferrer"
              >
                San Sebastian College Recoletos de Cavite
              </Link>
            </h2>
            <div>
              <h3 className="text-muted-foreground text-sm">
                Bachelor of Science in Computer Engineering
              </h3>
              <p className="text-muted-foreground">June 2020 - June 2024</p>{" "}
            </div>
            <p className="">
              Data Structure and Algorithms, Embedded Systems, Microprocessors,
              Operating Softwares, Object Oriented Programming
            </p>
          </div>
          <div className="flex flex-col px-4 border-l border-border xl:min-w-80 xl:max-w-80">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-start mt-2  text-secondary">
                Key Courses & Highlights
              </h2>
              <ul className="text-sm mt-2 gap-2">
                <li className="flex gap-2 items-start">
                  <div className="h-full">🎓</div>
                  <p>
                    Undergraduate Thesis: ARDUINO-CONTROLLED AUTOMATED BANANA
                    PEEL TO PANCAKE CONVERTER
                  </p>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="h-full">🎓</div>
                  <p className="text-wrap">Internet of Things Awards</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
