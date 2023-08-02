import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsSearch, BsShieldFillExclamation } from "react-icons/bs";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import { FaSave, FaTag, FaExclamationCircle } from "react-icons/fa";
import Cookies from "js-cookie";

export function Search() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [spam, setSpam] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [comments, setComments] = useState([]);
  const [blocked, SetBlocked] = useState(false);
  const [spamed, SetSpamed] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    const requestData = {
      phone_number: phoneNumber,
    };

    axios
      .post("http://127.0.0.1:8000/checknumber/?format=json", requestData)
      .then((response) => {
        console.log("Response:", response.data);

        setName(response.data[0]["name"]);
        setSpam(response.data[0]["spam"]);
        setShowCard(true);
        handleWhoViewed();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleWhoViewed = () => {
    const requestData = {
      phone_number: phoneNumber,
    };

    const id = Cookies.get("id");
    const url = `http://127.0.0.1:8000/registeruser/who-viewed-list/${id}/`;

    axios
      .post(url, requestData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleBlock = async () => {
    const userId = Cookies.get("id");

    if (!userId) {
      navigate("/sign-in");
      return;
    }

    const url = `http://127.0.0.1:8000/registeruser/user-block-list/${userId}/`;

    try {
      const response = await axios.post(url, {
        phone_number: phoneNumber,
      });

      console.log("Number blocked:", response.data);
      SetBlocked(true);
      
    } catch (error) {
      console.error("Error blocking number:", error);
      SetBlocked(true);

    }
  };

  const handleSpamCreator = async (e) => {
    const userId = Cookies.get("id");

    if (!userId) {
      navigate("/sign-in");
      return;
    }

    const url = `http://127.0.0.1:8000/registeruser/user-spam-list/${userId}/`;

    try {
      const response = await axios.post(url, {
        phone_number: phoneNumber,
      });

      SetSpamed(true);
      console.log("Spam created:", response.data);
    } catch (error) {
      SetSpamed(true);

      console.error("Error creating spam:", error);
    }
  };

  const fetchComments = async (e) => {
    // const userId = Cookies.get("id");
    // if (!userId) {
    //   navigate("/sign-in");
    //   return;
    // }
    // const url = "http://127.0.0.1:8000/registeruser/comments/";
    // try {
    //   const response = await axios.get(url, {
    //     phone_number: phoneNumber,
    //   });
    //   console.log("Spam created:", response.data);
    // } catch (error) {
    //   console.error("Error creating spam:", error);
    // }
  };

  // useEffect to fetch comments when the component mounts or when the phoneNumber changes

  return (
    <>
      <div className="mx-auto h-full w-full flex-col items-center justify-center gap-10 bg-[#d0d6d9]  pb-10 pt-20 ">
        <div className="relative right-6 mx-auto mt-8 max-w-md">
          <div className="flex w-[500px] items-center rounded-full bg-white p-4">
            <span className="mr-2 text-blue-500">+91</span>
            <input
              type="text"
              placeholder="Search phone number..."
              value={phoneNumber}
              onChange={handleChange}
              className="h-10 flex-grow rounded-md py-2 pl-3 pr-10  text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="ml-2 rounded-full bg-blue-500 px-4 py-4 text-white"
            >
              <BsSearch className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showCard && (
          <div className="relative mx-auto mt-8 h-max w-[500px] rounded-xl bg-white pb-5 text-white">
            <div
              className={`flex content-center items-center justify-between rounded-t-xl  p-10 ${
                spam ? "bg-red-500" : "bg-blue-500"
              } `}
            >
              <div>
                <h1 className="flex items-center gap-1 text-sm text-gray-100">
                  Identified by{" "}
                  <span className="font-body text-lg">KnowCaller</span>
                </h1>
                <h1 className="text-2xl font-bold">
                  {name ? name.charAt(0).toUpperCase() + name.slice(1) : ""}
                </h1>
              </div>
              <div>
                {spam ? (
                  <div className="rounded-full bg-white px-3 py-3 text-red-500">
                    <BsShieldFillExclamation />
                  </div>
                ) : (
                  <h1 className="rounded-full bg-white px-5 py-3 text-3xl text-blue-500">
                    {name ? name.charAt(0).toUpperCase() : ""}
                  </h1>
                )}
              </div>
            </div>
            <div className="flex h-10 justify-evenly bg-white py-10 text-sm text-gray-600">
              <button className="h-10 rounded border-[1px] border-gray-700 px-2 font-bold text-gray-700 transition-transform duration-200 hover:scale-105">
                <FaSave className="inline-block" /> Suggest name
              </button>
              <button className="h-10 rounded border-[1px] border-gray-700  px-2 font-bold text-gray-700 transition-transform duration-200 hover:scale-105">
                <FaTag className="inline-block" /> Add tag
              </button>

              <button
                onClick={handleSpamCreator}
                className={`h-10 rounded border-[1px] border-gray-700  px-2 font-bold ${spamed ? "text-white bg-red-500" :"text-red-400"} transition-transform duration-200 hover:scale-105`}
              >
                <FaExclamationCircle className="inline-block" />
                {spamed ? "Spamed" : "Mark as spam"}
              </button>
              <button
                onClick={handleBlock}
                className={`h-10 rounded border-[1px] border-gray-700  px-2 font-bold ${blocked ? "text-white bg-red-500" : "text-red-400"} transition-transform duration-200 hover:scale-105`}
              >
                <FaExclamationCircle className="inline-block" />{" "}
                {blocked ? "Blocked" : "Block nUmber"}
              </button>
            </div>
            Comment Section
            <div
              className={`mx-auto h-max w-[500px] ${
                spam ? "" : "hidden"
              } rounded-xl bg-white p-8`}
            >
              <button
                onClick={fetchComments}
                className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
              >
                Comments
              </button>
              {/* Total Number of Comments */}
              <div className="mb-4 text-xl font-bold text-black">
                Total Comments: {comments.length}
              </div>
              <div className="mb-4 flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-grow rounded-lg border px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring"
                />
                <button className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
                  Post
                </button>
              </div>

              {/* Render all comments */}
              {comments.map((comment) => (
                <div key={comment.id} className="mt-4 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-sm text-gray-700">
                      {comment.name} ⸱ {comment.date}
                    </h1>
                    {/* Comment */}
                    <p className="text-black">{comment.content}</p>
                  </div>

                  {/* Likes and Dislikes */}
                  <div className="mt-4 flex justify-evenly gap-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>4</span>
                      <FaThumbsUp className="text-gray-700" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>1</span>
                      <FaThumbsDown className="text-gray-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Comment Section */}
          </div>
        )}

        {/* second card */}
        {showCard && (
          <div className="relative mx-auto mt-8 h-max w-[500px] rounded-xl bg-white p-5 pb-5 text-white">
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-5 text-gray-700">
                <FaPhone className="text-black" />
                <div className="">
                  <h1>M - Airtel</h1>
                  <p>{phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 text-gray-700">
                <FaMapMarkerAlt className="text-black" />
                <div className="">
                  <h1>Address</h1>
                  <p>Madhya Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* second card */}
      </div>
    </>
  );
}

export default Search;
