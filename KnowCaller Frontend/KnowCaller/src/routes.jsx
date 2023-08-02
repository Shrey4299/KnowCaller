import { Home, Profile, SignIn, SignUp, LogOut  } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import Cookies from "js-cookie";



const userId = Cookies.get("id");

export const routes = userId
  ? [
      {
        icon: HomeIcon,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: UserCircleIcon,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: UserPlusIcon,
        name: "Log Out",
        path: "/logout",
        element: <LogOut />,
      },
    ]
  : [
      {
        icon: HomeIcon,
        name: "home",
        path: "/home",
        element: <Home />,
      },
      {
        icon: ArrowRightOnRectangleIcon,
        name: "Sign In",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: UserPlusIcon,
        name: "Sign Up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ];

export default routes;