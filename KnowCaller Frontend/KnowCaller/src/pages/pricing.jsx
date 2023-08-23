import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { MdCheck } from "react-icons/md";
import { Link } from "react-router-dom";

const Pricing = () => {
  const id = Cookies.get("id");

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="absolute left-2/4 top-2/4 flex min-h-screen w-full  -translate-x-2/4 -translate-y-2/4 items-center justify-center  ">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Free Plan Card */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Free Plan</h2>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <MdCheck className="mr-2 text-green-500" />
                  Basic features
                </li>
                <li className="flex items-center">
                  <MdCheck className="mr-2 text-green-500" />
                  Limited calls
                </li>
                <li className="flex items-center">
                  <MdCheck className="mr-2 text-green-500" />
                  Ad-supported
                </li>
              </ul>
              <div className="text-center">
                <Link to="/home">
                  <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Premium Plan Card */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Premium Plan</h2>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <MdCheck className="mr-2 text-yellow-700" />
                  All features unlocked
                </li>
                <li className="flex items-center">
                  <MdCheck className="mr-2 text-yellow-700" />
                  See Who Viewed Your Profile
                </li>
                <li className="flex items-center">
                  <MdCheck className="mr-2 text-yellow-700" />
                  Ad-free
                </li>
              </ul>
              <div className="text-center">
                <Link to={`${id ? "/payment" : "/sign-in"}`}>
                  <button className="rounded-md bg-green-500 px-4 py-2 text-white">
                    Get Premium
                  </button>
                </Link>
                <p className="mt-2 text-sm text-gray-500">₹150 per year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
