import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Cookies from "js-cookie";

export function SpamList() {
  const [spamListItems, setSpamListItems] = useState([]);
  const navigate = useNavigate(); // Add this line to initialize the useNavigate hook

  useEffect(() => {
    const id = Cookies.get("id");
    console.log(id);

    if (!id) {
      // Redirect to login if user ID is not present
      navigate("/sign-in");
    } else {
      const url = `http://127.0.0.1:8000/registeruser/user-spam-list/${id}/`;

      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setSpamListItems(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [navigate]);

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
            color="red"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Spam List
            </Typography>
          </CardHeader>
          <CardBody>
            {spamListItems.length === 0 ? (
              <Typography variant="body" className="text-center text-gray-700">
                No spam list items found.
              </Typography>
            ) : (
              spamListItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-around border-b border-gray-200 py-2"
                >
                  <Typography variant="paragraph" color="gray">
                    {item.spammed_user.name}
                  </Typography>
                  <Typography variant="paragraph" color="gray">
                    {item.spammed_user.phone_number}
                  </Typography>
                </div>
              ))
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Typography
              variant="small"
              color="gray"
              className="mt-6 flex justify-center"
            >
              Want to add someone to the spam list?
              <Link to="/search" className="ml-1 font-bold text-red-500">
                Create Spam
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SpamList;
