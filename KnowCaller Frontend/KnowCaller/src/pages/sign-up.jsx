import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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



export function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = "http://127.0.0.1:8000/registeruser/create/";

    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Sign-up successful:", response.data);
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error("Sign-up failed:", error);
      });
  };

  return (
    <>
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container  mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full my-10 max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input
                variant="standard"
                label="Name"
                size="lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
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
                type="tel"
                label="Phone Number"
                size="lg"
                name="phone_number"
                value={formData.phone_number}
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
                <Checkbox label="I agree to the Terms and Conditions" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth type="submit">
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign in
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

export default SignUp;
