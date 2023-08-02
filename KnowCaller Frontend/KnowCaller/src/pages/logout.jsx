import React, { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

export function LogOut() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the "id" Cookie from the browser
    Cookies.remove("id");
    navigate("/home");
    window.location.reload();
  };
  const handleBack = () => {
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Show confirmation prompt before logging out
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      handleLogout();
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
            color="red"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Log Out
            </Typography>
          </CardHeader>

          <CardFooter className="pt-0">
            <Typography
              variant="small"
              className="text-md mt-6 flex justify-center"
            >
              Are you sure you want to Logout?
            </Typography>
          </CardFooter>
          <div className="mb-6 flex justify-center gap-5">
            <Button onClick={handleBack} type="submit" color="blue">
              no
            </Button>
            <Button onClick={handleSubmit} type="submit" color="red">
              yes
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default LogOut;
