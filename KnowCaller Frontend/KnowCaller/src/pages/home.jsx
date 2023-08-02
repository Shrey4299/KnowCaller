import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { FeatureCard } from "@/widgets/cards";
import { featuresData } from "@/data";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative  flex h-screen content-center items-center justify-center pb-32 pt-16">
        <div className="absolute top-0 h-full w-full bg-[url('https://www.westend61.de/images/0000736200pw/smiling-woman-looking-at-her-cell-phone-at-home-EBSF001668.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className=" container relative ">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-min px-4 text-center lg:w-8/12">
              {/* search  */}
              <div className="relative left-60  flex h-screen w-full content-center items-center justify-end pb-32 pt-16">
                <div className="absolute top-0 h-full w-full bg-cover bg-center" />
                <div className=" container relative mx-auto">
                  <div className="relative left-60 top-10 flex w-[500px] scale-150 transform  flex-wrap items-center ">
                    <div className="  text-center ">
                      <Typography
                        variant="h1"
                        color="white"
                        className="mb-6 font-black"
                      >
                        {name ? "Hi" + name : "Know your Caller"}
                      </Typography>
                      <Typography
                        variant="lead"
                        color="white"
                        className="opacity-80"
                      >
                        The World’s Best Caller ID and Spam Blocking App
                      </Typography>
                      <div className="relative mx-auto mt-8 max-w-md">
                        <div className="flex items-center">
                          <span className="mr-2 text-blue-500">+91</span>
                          <input
                            type="text"
                            placeholder="Search phone number..."
                            className="h-10 flex-grow rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                          />
                          <button
                            onClick={() => navigate("/search")}
                            className="ml-2 rounded-md bg-blue-500 px-3 py-2 text-white"
                          >
                            <BsSearch className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* search  */}
            </div>
          </div>
        </div>
      </div>

      {/* features */}
      <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
