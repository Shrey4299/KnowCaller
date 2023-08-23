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
  const [content, setContent] = useState("");
  const [spam, setSpam] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [comments, setComments] = useState([]);
  const [blocked, SetBlocked] = useState(false);
  const [spamed, SetSpamed] = useState(false);
  const [suggestName, SetSuggestName] = useState(false);
  const [newName, SetNewName] = useState("");
  const [userNames, setUserNames] = useState({});


    useEffect(() => {
      fetchUserNames();
    }, []);

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
        fetchComments();
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

  const fetchComments = () => {
    const phone_number = phoneNumber;

    axios
      .get("http://127.0.0.1:8000/registeruser/comments/", {
        params: {
          phone_number: phone_number,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        // Update the comments state with the fetched data
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  const handlePostComment = () => {
    const userId = Cookies.get("id");

    if (!userId) {
      navigate("/sign-in");
      return;
    }

    const requestData = {
      phone_number: phoneNumber,
      content: content,
    };

    axios
      .post(
        `http://127.0.0.1:8000/registeruser/comments/${userId}/`,
        requestData
      )
      .then((response) => {
        console.log("New comment created:", response.data);
        setContent("");
        fetchComments();
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  };

  const handleSuggestName = () => {
    const userId = Cookies.get("id");

    if (!userId) {
      navigate("/sign-in");
      return;
    }

    const requestData = {
      phone_number: phoneNumber,
      name: newName,
    };

    axios
      .post(`http://127.0.0.1:8000/registeruser/create/${userId}/`, requestData)
      .then((response) => {
        console.log(response.data);
        SetSuggestName(false);
        handleSearch();
      })
      .catch((error) => {
        console.error("Error creating comment:", error);
      });
  };

  const calculateDaysPassed = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifferenceInMs = now - createdDate;
    const daysPassed = Math.floor(timeDifferenceInMs / (1000 * 60 * 60 * 24));
    return daysPassed;
  };

  const fetchUserNames = () => {
    axios
      .get("http://127.0.0.1:8000/users/") // Adjust the endpoint URL based on your API
      .then((response) => {
        // Create an object with user IDs as keys and user names as values
        const namesObj = {};
        response.data.forEach((user) => {
          namesObj[user.id] = user.name;
        });
        setUserNames(namesObj);
      })
      .catch((error) => {
        console.error("Error fetching user names:", error);
      });
  };

  useEffect(() => {
    fetchUserNames();
  }, []);

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
              <button
                onClick={() => SetSuggestName(!suggestName)}
                className="h-10 rounded border-[1px] border-gray-700 px-2 font-bold text-gray-700 transition-transform duration-200 hover:scale-105"
              >
                <FaSave className="inline-block" /> Suggest name
              </button>
              <button className="h-10 rounded border-[1px] border-gray-700  px-2 font-bold text-gray-700 transition-transform duration-200 hover:scale-105">
                <FaTag className="inline-block" /> Add tag
              </button>

              <button
                onClick={handleSpamCreator}
                className={`h-10 rounded border-[1px] border-gray-700  px-2 font-bold ${
                  spamed ? "bg-red-500 text-white" : "text-red-400"
                } transition-transform duration-200 hover:scale-105`}
              >
                <FaExclamationCircle className="inline-block" />
                {spamed ? "Spamed" : "Mark as spam"}
              </button>
              <button
                onClick={handleBlock}
                className={`h-10 rounded border-[1px] border-gray-700  px-2 font-bold ${
                  blocked ? "bg-red-500 text-white" : "text-red-400"
                } transition-transform duration-200 hover:scale-105`}
              >
                <FaExclamationCircle className="inline-block" />{" "}
                {blocked ? "Blocked" : "Block nUmber"}
              </button>
            </div>
            {/* suggest name section */}
            <div
              className={`my-4 flex items-center gap-4 px-8 ${
                suggestName ? " " : "hidden"
              } `}
            >
              <input
                type="text"
                placeholder="Suggest a name..."
                value={newName}
                onChange={(e) => SetNewName(e.target.value)}
                className="flex-grow rounded-lg border px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring"
              />
              <button
                onClick={handleSuggestName}
                className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
            {/* suggest name section */}
            {/* Comment Section */}
            <div
              className={`mx-auto h-max w-[500px] ${
                spam ? "" : "hidden"
              } rounded-xl bg-white p-8`}
            >
              {/* Total Number of Comments */}
              <div className="mb-4 text-xl font-bold text-black">
                Total Comments: {comments.length}
              </div>
              <div className="mb-4 flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-grow rounded-lg border px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring"
                />
                <button
                  onClick={handlePostComment}
                  className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                >
                  Post
                </button>
              </div>

              {/* Render all comments */}
              {comments.reverse().map((comment) => (
                <div
                  key={comment.id}
                  className="mt-4 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-5 ">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 font-bold text-white">
                      {/* Access the user name directly from the state */}
                      {userNames[comment.created_by]?.charAt(0).toUpperCase() ||
                        "S"}
                    </div>
                    <div>
                      <h1 className="text-sm text-gray-700">
                        {calculateDaysPassed(comment.created_at)} days ago⸱{" "}
                        {/* Access the user name directly from the state */}
                        {userNames[comment.created_by] || "Shrey"}
                      </h1>
                      {/* Comment */}
                      <p className="text-black">{comment.content}</p>
                    </div>
                  </div>

                  {/* Likes and Dislikes */}
                  <div className=" flex justify-evenly gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaThumbsUp className="text-gray-700" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
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
