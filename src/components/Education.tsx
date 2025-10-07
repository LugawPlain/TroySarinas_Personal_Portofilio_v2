import React from "react";
import Image from "next/image";
const Education = () => {
  return (
    <div id="education" className="px-4">
      <h1 className="text-center text-3xl sm:text-4xl mb-10 font-bold">
        Education 🎓
      </h1>
      <div className="shadow-2xl overflow-clip rounded-2xl font-inter relative">
        <a
          href="https://sscr.edu/Beta/"
          className="w-full h-full absolute top-0 left-0 rounded-2xl"
        ></a>
        <div className="h-24 bg-[#6a0106] flex justify-center items-center">
          <Image src="/SSCRLOGO1.png" height={80} width={80} alt="SSCRDCLOGO" />
        </div>
        <div className="p-4 gap-2 flex flex-col">
          <h2 className="text-2xl text-bold">
            San Sebastian College Recoletos de Cavite
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
          <hr />
          <h2>Key Courses & Highlights </h2>
          <p className="text-sm">
            Undergraduate Thesis 🎓: ARDUINO-CONTROLLED AUTOMATED BANANA PEEL TO
            PANCAKE CONVERTER
          </p>
          <p className="text-sm">Awards:</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
