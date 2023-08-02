import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function SignIn() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {
     const response = await fetch("http://localhost:8000/registeruser/login/", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       credentials: "include",
       body: JSON.stringify(formData),
     });

     if (response.ok) {
       console.log("successful");

       // Parse the response body as JSON and log it to the console
       const responseData = await response.json();
       console.log("Response Data:", responseData);
       console.log("id of user:", responseData["id"]);

       Cookies.set("id", responseData["id"]);

       // Navigate to the "Home" page
       navigate("/home");

       // Reload the page after navigating to "Home"
       window.location.reload();
     } else {
       console.error("Request failed:", response.status, response.statusText);
     }
   } catch (error) {
     console.error("Error:", error);
   }
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
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input
                variant="standard"
                type="email"
                label="Email"
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                variant="standard"
                type="password"
                label="Password"
                size="lg"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                Sign In
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
