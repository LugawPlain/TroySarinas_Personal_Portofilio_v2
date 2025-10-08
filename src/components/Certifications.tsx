import React from "react";
import Image from "next/image";
const Certifications = () => {
  return (
    <div
      id="certifications"
      className="flex-col flex px-4 ] items-center justify-center"
    >
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-center font-bold text-3xl mt-2 ">
          Professional Certifications & Credentials 📜
        </h1>
        <p className="text-center text-muted-foreground ">
          Industry Recognized certifications
        </p>
        <div className="max-w-[80rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 gap-y-12 mt-8">
          <div className="block shadow-2xl rounded-2xl overflow-clip ">
            <div className=" h-45 w-full flex items-center justify-center border-b border-border bg-gray-200  ">
              <Image
                className="h"
                src="/CiscoLogo.png"
                alt="CiscoLogo"
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="text-center py-2 px-4">
              <h3 className="mt-1 text-2xl font-bold mb-1">Python</h3>
              <p className="text-center text-base/5 text-muted-foreground">
                Advance Android Development with Kotlin & Java
              </p>
            </div>
          </div>
          <div className="block shadow-2xl rounded-2xl overflow-clip ">
            <div className=" h-45 w-full flex items-center justify-center border-b border-border bg-gray-200  ">
              <Image
                className="h"
                src="/CiscoLogo.png"
                alt="CiscoLogo"
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="text-center py-2 px-4">
              <h3 className="mt-1 text-2xl font-bold mb-1">Python</h3>
              <p className="text-center text-base/5 text-muted-foreground">
                Advance Android Development with Kotlin & Java
              </p>
            </div>
          </div>
          <div className="block shadow-2xl rounded-2xl overflow-clip ">
            <div className=" h-45 w-full flex items-center justify-center border-b border-border bg-gray-200  ">
              <Image
                className="h"
                src="/CiscoLogo.png"
                alt="CiscoLogo"
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="text-center py-2 px-4">
              <h3 className="mt-1 text-2xl font-bold mb-1">Python</h3>
              <p className="text-center text-base/5 text-muted-foreground">
                Advance Android Development with Kotlin & Java
              </p>
            </div>
          </div>
          <div className="block shadow-2xl rounded-2xl overflow-clip ">
            <div className=" h-45 w-full flex items-center justify-center border-b border-border bg-gray-200  ">
              <Image
                className="h"
                src="/CiscoLogo.png"
                alt="CiscoLogo"
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="text-center py-2 px-4">
              <h3 className="mt-1 text-2xl font-bold mb-1">Python</h3>
              <p className="text-center text-base/5 text-muted-foreground">
                Advance Android Development with Kotlin & Java
              </p>
            </div>
          </div>
          <div className="block shadow-2xl rounded-2xl overflow-clip ">
            <div className=" h-45 w-full flex items-center justify-center border-b border-border bg-gray-200  ">
              <Image
                className="h"
                src="/CiscoLogo.png"
                alt="CiscoLogo"
                height={150}
                width={150}
              ></Image>
            </div>
            <div className="text-center py-2 px-4">
              <h3 className="mt-1 text-2xl font-bold mb-1">Python</h3>
              <p className="text-center text-base/5 text-muted-foreground">
                Advance Android Development with Kotlin & Java
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
