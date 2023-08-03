import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FiUnlock } from "react-icons/fi";
import Cookies from "js-cookie";

export function WhoViewed() {
  const [whoViewedListItems, setWhoViewedListItems] = useState([]);
  const navigate = useNavigate();

  const [isPremium, setIsPremium] = useState(false); // Initialize isPremium as false

  useEffect(() => {
    const id = Cookies.get("id");

    if (!id) {
      navigate("/sign-in");
    } else {
      const url = `http://127.0.0.1:8000/registeruser/who-viewed-list/${id}/`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setWhoViewedListItems(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      // Fetch the premium data
      axios
        .get(`http://127.0.0.1:8000/registeruser/create/${id}/?format=json`)
        .then((response) => {
          const { premium } = response.data;
          setIsPremium(premium); // Update isPremium based on the response
          console.log("user is oremium" + isPremium)
        })
        .catch((error) => {
          console.error("Error fetching premium data:", error);
        });
    }
  }, [navigate]);

  const handleSignInNavigation = () => {
    const userId = Cookies.get("id");
    const route = userId ? "/pricing" : "/sign-in";
    navigate(route);
  };

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            color="amber"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Who Viewed You
            </Typography>
          </CardHeader>

          {/* Apply styles based on isPremium */}
          <div className={isPremium ? "py-2" : "blur-[3px]"}>
            <CardBody>
              {whoViewedListItems.length === 0 ? (
                <Typography variant="h6" className="text-center text-gray-700">
                  No one Viewed you.
                </Typography>
              ) : (
                whoViewedListItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-around border-b border-gray-200 py-2"
                  >
                    <Typography variant="paragraph" color="gray">
                      {item.viewed_user.name}
                    </Typography>
                    <Typography variant="paragraph" color="gray">
                      {item.viewed_user.phone_number}
                    </Typography>
                  </div>
                ))
              )}
            </CardBody>

            {/* Render the premium button only when isPremium is false */}
          </div>
          {!isPremium && (
            <div className="relative bottom-32 mt-4 flex items-center justify-center blur-[0px]">
              <Button
                color="blue"
                buttontype="filled"
                size="lg"
                className="flex items-center blur-[0px]"
                onClick={handleSignInNavigation}
              >
                <FiUnlock className="mr-2" /> Unlock
              </Button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

export default WhoViewed;
