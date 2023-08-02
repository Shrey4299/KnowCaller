import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MdAlignHorizontalCenter, MdAllInbox, MdOutlineReportGmailerrorred } from "react-icons/md";
import { BsMailbox } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { AiFillMail } from "react-icons/ai";

export function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Add this line to initialize the useNavigate hook
  const [spamCount, setSpamCount] = useState(0);
  const [blockCount, setBlockCount] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);

  // Function to fetch user data from the API
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/registeruser/create/${userId}/?format=json`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle errors here if needed
    }
  };

  // Function to fetch response count from the API
  const fetchData = async (url, setDataFunction) => {
    try {
      const response = await axios.get(url);
      setDataFunction(response.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors here if needed
    }
  };

  // Fetch the user data and response counts using useEffect
  useEffect(() => {
    const userId = Cookies.get("id"); // Replace this with your actual code to get the user ID

    // URL for user data
    const userUrl = `http://127.0.0.1:8000/registeruser/create/${userId}/?format=json`;
    // URL for spam list
    const spamUrl = `http://127.0.0.1:8000/registeruser/user-spam-list/${userId}/`;
    // URL for blocked list
    const blockUrl = `http://127.0.0.1:8000/registeruser/user-block-list/${userId}/`;
    // URL for who viewed list
    const viewedUrl = `http://127.0.0.1:8000/registeruser/who-viewed-list/${userId}/`;

    fetchUserData(userId);
    fetchData(spamUrl, setSpamCount);
    fetchData(blockUrl, setBlockCount);
    fetchData(viewedUrl, setViewedCount);
  }, []);

  return (
    <>
      <section className="relative block h-[50vh]  ">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 px-4 py-36">
        <div className="container mx-auto">
          <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src="/img/Profile picture.png"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <Button className="bg-blue-400">Connect</Button>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  {/* Display the response counts */}
                  <div className="mt-8 flex justify-around">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        {spamCount}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Spammed
                      </Typography>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        {blockCount}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Blocked
                      </Typography>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        {viewedCount}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Who Viewed
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-8 text-center">
                {/* Display user data */}
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {userData ? userData.name : "Loading..."}
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  <AiFillMail className="-mt-px h-4 w-4 text-blue-gray-700" />
                  {/* Replace "email" with userData.email */}
                  <Typography className="font-medium text-blue-gray-700">
                    {userData ? userData.email : "Loading..."}
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <PhoneIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  {/* Replace "phone_number" with userData.phone_number */}
                  <Typography className="font-medium text-blue-gray-700">
                    {userData ? userData.phone_number : "Loading..."}
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  {/* Replace "address" with userData.address */}
                  <Typography className="font-medium text-blue-gray-700">
                    Madhya Pradesh, India
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
