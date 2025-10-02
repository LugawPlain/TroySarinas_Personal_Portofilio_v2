import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Technologies from "../components/Technologies";
import { GiHamburgerMenu } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import InfoIcon from "../../public/Icons/InformationIcon";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-8 ">
        <div className="Header top-0 bg-white z-999 backdrop-blur-2xl sticky flex items-center justify-between px-4 h-20 border-b-2 border-border">
          <h1 className=" text-3xl font-extralight flex items-center">
            <span className="text-gray-400">{"<"}</span>
            <span className="font-passionconflict text-5xl text-test">
              Troy Sarinas
            </span>
            <span className="text-gray-400">{"/>"}</span>
          </h1>
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
        <div className="flex flex-col justify-center items-center px-8 ">
          <div className="mt-4 flex w-40 h-40 overflow-hidden rounded-full bg-test items-center justify-center">
            <Avatar className="w-38 h-38">
              <AvatarImage src="/me2.webp" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-semi font-fraunces text-center ">
              Troy Sarinas
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              AI Automation & Full Stack Engineer
            </p>
            <p className="mt-2 text-justify">
              I am a graduate of Computer Engineering with a passion for
              technology and design. Collaborating with companies worldwide to
              create visually stunning, highly functional, and user-friendly
              digital experiences that deliver measurable results and support
              business growth.
            </p>
            <div className="grid grid-flow-col grid-rows-2 font-inter font-semibold gap-2">
              <div className="backdrop-blur-[20%] bg-gradient-to-br from-[rgba(17,153,142,0.15)] to-[rgba(56,239,125,0.1)] shadow-2xl border-[rgba(17,153,142,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-2">
                <div className="flex flex-row gap-4">
                  <div className="flex items-center relative justify-center">
                    <div className="bg-green-600 ml-2  w-3 h-3 rounded-full"></div>
                    <div className="bg-green-300 ml-2 absolute w-4 h-4 rounded-full animate-ping"></div>
                  </div>
                  <div className="bg-green-400/20 rounded-full text-sm px-3 py-1">
                    Available
                  </div>
                </div>
                <h2 className="text-2xl">Ready to Start</h2>
                <p className="text-md text-muted-foreground font-normal">
                  Full-time opportunities and Freelance projects
                </p>
                <div className="flex gap-2">
                  <div className="shadow-sm rounded-full bg-white/20 p-2 text-nowrap text-sm">
                    💼 Open to work
                  </div>
                  <div className="shadow-sm rounded-full bg-white/20 p-2 text-nowrap text-sm">
                    🌍 Remote Friendly
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-[20%] bg-gradient-to-br from-[rgba(102,126,234,0.15)] to-[rgba(118,75,162,0.1)] shadow-2xl border-[rgba(102,126,234,0.3)] border-2 rounded-3xl flex flex-col px-4 py-4 gap-2">
                <div className="flex flex-row gap-4">
                  <InfoIcon className="text-violet-500"></InfoIcon>
                  <div className="bg-violet-600/10 rounded-full text-sm px-3 py-1">
                    Available
                  </div>
                </div>
                <h2 className="text-2xl">2-4 Hours</h2>
                <p className="text-md text-muted-foreground font-normal">
                  Average response time on business days
                </p>
                <div className="flex gap-2 mt-auto">
                  <div className="shadow-sm rounded-full bg-white/20 p-2 text-nowrap text-sm">
                    ⚡ Quick Turnaround
                  </div>
                  <div className="shadow-sm rounded-full bg-white/20 p-2 text-nowrap text-sm">
                    🔄️ Regular Updates
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={""}
                className="flex bg-gray-50 justify-center items-center h-12 w-12 rounded-lg shadow-md"
              >
                <FaGithub size={24} />
              </Link>
              <Link
                href={""}
                className="flex bg-gray-50 justify-center items-center h-12 w-12 rounded-lg shadow-md"
              >
                <FaLinkedin className="text-blue-400" size={24} />
              </Link>
              <Link
                href={""}
                className="flex bg-gray-50 justify-center items-center h-12 w-12 rounded-lg shadow-md"
              >
                <FaEnvelope className="text-red-400" size={24} />
              </Link>
              <Link
                href={""}
                className="flex bg-gray-50 justify-center items-center h-12 w-12 rounded-lg shadow-md"
              >
                <FaInstagram className="" size={24} />
              </Link>
              <Link
                href={""}
                className="flex bg-gray-50 justify-center items-center h-12 w-12 rounded-lg shadow-md"
              >
                <FaFacebook className="text-blue-400" size={24} />
              </Link>
              <Link
                href={""}
                className="flex bg-gray-50 justify-center items-center h-12 w-12 rounded-lg shadow-md"
              >
                <FaXTwitter className="" size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className=" border-border border-2 items-center py-2 px-4 ">
          <div className="space-y-2">
            <h1 className="text-center font-bold text-3xl mt-2">PROJECTS</h1>
            <div className="py-4 card card shadow-2xl rounded-md">
              <div className=" min-h-40 min-w-4/5 bg-gray-500 rounded-sm">
                <Image src="" alt=""></Image>
              </div>
              <div className="mt-2 mb-2 text-center space-y-4">
                <h3>Yorticia.com</h3>
                <p className="text-start">
                  &emsp; Created a stunning personal portfolio website for model
                  Yorticia, enhancing her online presence and providing a
                  dedicated space to display her work and connect with industry
                  professionals. The site features an image-rich gallery and
                  detailed service listings
                </p>
                <div className="flex flex-wrap text-xs text-white gap-2">
                  <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                    Automation
                  </div>
                  <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                    Javascript
                  </div>
                  <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                    HTML
                  </div>
                  <div className="bg-gray-500 px-2 py-0.5 rounded-full">
                    Natural AI training and Processing
                  </div>
                </div>
                <div className="flex justify-between px-2">
                  <Button>View Project</Button>
                  <Button>View on Github</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col flex flex-wrap px-4">
          <div className="">
            <h1 className="text-center font-bold text-3xl mt-2 ">
              CERTIFICATES
            </h1>
            <p className="text-center">
              Research contributions and technical insights
            </p>
            <div className="block shadow-2xl rounded-md overflow-clip">
              <div className=" h-50 w-full bg-gray-500 ">
                <Image src="" alt=""></Image>
              </div>
              <div className="text-center space-y-2">
                <h3 className="mt-1 text-2xl">Python</h3>
                <p className="">Machine Learning and Development</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-center">Technical Proficiency</h1>
          <div className="text-center">
            <h2 className="">Web Development</h2>
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
        </div>
        <div className="px-2">
          <h1 className="text-center">Education</h1>
          <div className="shadow-2xl overflow-clip rounded-2xl">
            <div className="h-24 bg-black flex justify-center items-center">
              <div className="h-15 w-15 bg-white"></div>
            </div>
            <h2 className="text-3xl text-bold">
              San Sebastian College Recoletos de Cavite
            </h2>
            <h3 className="text-muted-foreground">
              Bachelor of Science in Computer Engineering
            </h3>
            <p className="text-muted-foreground">June 2020 - June 2024</p>
            <p></p>
            <p> </p>
            <br className="w-4/5"></br>
          </div>
        </div>
        <div className="px-2">
          <h1 className="text-center">Experience</h1>
          <div className="shadow-2xl overflow-clip rounded-2xl">
            <div className="h-24 bg-black flex justify-center items-center">
              <div className="h-15 w-15 bg-white"></div>
            </div>
            <h2></h2>
            <h3></h3>
            <p></p>
            <p></p>
            <p> </p>
            <br className="w-4/5"></br>
          </div>
        </div>
      </div>
    </>
  );
}
