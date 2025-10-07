import React from "react";
import Image from "next/image";
const Certifications = () => {
  return (
    <div className="flex-col flex flex-wrap px-4">
      <div className="">
        <h1 className="text-center font-bold text-3xl mt-2 ">
          Professional Certifications & Credentials 📜
        </h1>
        <p className="text-center">Indrustry Recognized certifications</p>
        <div className="block shadow-2xl rounded-2xl overflow-clip ">
          <div className=" h-45 w-full flex items-center justify-center bg-gray-500  ">
            <Image
              className="h"
              src="/CiscoLogo.png"
              alt="CiscoLogo"
              height={150}
              width={150}
            ></Image>
          </div>
          <div className="text-center space-y-2">
            <h3 className="mt-1 text-2xl">Python</h3>
            <p className="">Machine Learning and Development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
