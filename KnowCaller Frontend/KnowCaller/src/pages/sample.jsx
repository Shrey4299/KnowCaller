import React from "react";
import axios from "axios";

function Sample() {
  const fetchData = () => {
    const phone_number = "8908908901"; // Replace this with the phone number you want to use

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
        // Handle the response data here
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error fetching comments:", error);
      });
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

export default Sample;
