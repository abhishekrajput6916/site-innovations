import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import googleImage from "../../assets/Images/google.svg";
import exampleImage from "../../assets/Images/image.jpeg";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = import.meta.env.VITE_API_URL;
const domain = import.meta.env.VITE_DOMAIN_URL;
import gsap from "gsap";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  document.title = "Baoiam - Login";
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const requestRef = useRef(false);

  const [pass, setPass] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("access_token")) navigate("/profile");
    const values = queryString.parse(location.search);
    const state = values.state || null;
    const code = values.code || null;

    console.log("State:", state);
    console.log("Code:", code);

    if (state && code && !localStorage.getItem("authenticated")) {
      googleAuthenticate(state, code);
    }
  }, [location]);

  const googleAuthenticate = async (state, code) => {
    if (requestRef.current) return;
    requestRef.current = true;

    const details = {
      state: state,
      code: code,
    };

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    };

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");

    try {
      toast.loading("Verifying...");
      const response = await axios.post(
        `${apiUrl}/api/auth/o/google-oauth2/?${formBody}`,
        config
      );

      console.log(response, "response");
      if (response.status == 201) {
        const data = response.data;
        console.log(data, "data");
        toast.success("Login succcessful");

        localStorage.setItem("access", data.access);
        localStorage.setItem("authenticated", true);

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      console.error("Google Authentication failed:", error);
      toast.error("Authentication failed. Please try again.");
    } finally {
      requestRef.current = false;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const toastId = toast.loading("Processing your login...");

      const response = await axios.get(
        `${apiUrl}/api/auth/o/google-oauth2/?redirect_uri=${domain}/login`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response, "response received");
        toast.update(toastId, {
          render: "Redirecting to Google login...",
          type: "success",
          isLoading: true,
          autoClose: 2000,
        });
        window.location.replace(response.data.authorization_url);
      } else {
        throw new Error("Failed to get authorization URL.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Processing your login...");

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/jwt/create/`,
        { email, password },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access);
        toast.update(toastId, {
          render: "Login successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        throw new Error(response.data?.detail || "Login failed.");
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.response.data.detail,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.log("error", error);
    }
  };

  const cubeRefs = useRef([]);
  const Anime1 = useRef(null);
  const Anime2 = useRef(null);

  useEffect(() => {
    cubeRefs.current.forEach((cube, i) => {
      if (cube) {
        gsap.fromTo(
          cube,
          {
            scale: 0,
            rotate: 0,
            opacity: 1,
          },
          {
            scale: 20,
            rotate: 960,
            opacity: 0,
            duration: 15,
            ease: "ease-in",
            repeat: -1,
            delay: i * 3,
          }
        );
      }
    });

    const te = gsap.timeline({ repeat: -1, yoyo: true });

    // GSAP Timeline for background fading animations
    te.to(".bg-2", { opacity: 1, duration: 0 })
      // Fade out bg-2
      .to(".bg-2", { opacity: 0, duration: 3 }, "+=3")
      .to(".bg-3", { opacity: 1, duration: 3 }, "-=3")
      // Fade in bg-3
      .to(".bg-3", { opacity: 0, duration: 3 }, "+=3");

    // Explaination// GSAP timeline for swapping positions
    const tl = gsap.timeline();

    tl.to(Anime1.current, {
      // 1) Move Anime1 80% of the viewport width to the right
      x: "80vw",
      // 2) Move Anime1 80% of the viewport height down
      y: "50vh",
      duration: 1.5,
      ease: "power1.inOut",
    }).to(
      Anime2.current,
      {
        // 3) Move Anime2 80% of the viewport width to the left
        x: "-80vw",
        // 4) Move Anime2 80% of the viewport height up
        y: "-62vh",
        duration: 1.5,
        ease: "power1.inOut",
        position: "absolute",
      },
      // 5) Start Anime2 animation at the same time as Anime1
      "<"
    );

    // gsap.fromTo(
    //   Anime1.current,
    //   { rotate: 0 },
    //   { rotate: "360 deg", duration: 20, repeat: -1 }
    // );
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="flex items-center justify-center h-screen w-screen py-2 bg-transparent relative overflow-hidden z-3 dark:text-black">
        <div
          ref={Anime1}
          className=" w-[600px] h-[600px] top-[-10%] left-[-5%]  rounded-full bg-[#1D64DD]  absolute "
        ></div>
        <div
          ref={Anime2}
          className=" w-[400px] h-[400px] bottom-[-15%] right-[-5%]  rounded-full bg-[#1D64DD]  absolute "
        ></div>

        <div className="relative flex flex-col m-6 space-y-8 bg-white md:mx-20 shadow-lg lg:shadow-xl rounded-2xl md:flex-row md:space-y-0 ">
          {/* Left Side */}
          <div className="flex flex-col justify-center px-6 py-6 lg:p-14 animate-slideInLeft">
            <span className="mb-2 text-xl md:text-2xl font-bold text-blue-500">
              Welcome back
            </span>
            <span className="font-light text-gray-400 text-xs md:text-[1.4vw] lg:text-[1vw] mb-0 md:mb-6 animate-fadeIn">
              Please enter your details
            </span>
            <form onSubmit={handleLogin}>
              <div className="py-4 md:py-0 animate-slideInUp">
                <span className="mb-2 text-sm md:text-[1.4vw] lg:text-[1.3vw]">
                  Email
                </span>
                <input
                  type="text"
                  className="w-full p-2 text-sm md:text-[1.4vw] lg:text-[1vw] border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="py-4 animate-slideInUp">
                <span className="mb-2 text-sm md:text-[1.4vw] lg:text-[1.3vw]">
                  Password
                </span>
                <div className="flex items-center  p-2 border border-gray-300 rounded-md">
                  <input
                    type={pass ? "text" : "password"}
                    name="password"
                    id="password"
                    className="w-full text-sm md:text-[1.4vw] lg:text-[1vw] placeholder:font-light placeholder:text-gray-500 outline-none"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="cursor-pointer text-slate-500"
                    onClick={() => setPass(!pass)}
                  >
                    {pass ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mb-4 w-full animate-fadeIn">
                <div className=" md:mr-24 flex items-center">
                  <input type="checkbox" name="ch" id="ch" className="mr-2" />
                  <span className="text-[3.5vw]  md:text-[1vw]">Remember</span>
                </div>
                <Link
                  to={"/forget-password"}
                  className="font-bold  text-[3.5vw] md:text-[1vw] cursor-pointer"
                >
                  Forgot password
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white text-[4.4vw] md:text-[1vw] p-1 md:p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300 transform hover:scale-105 transition-all duration-300 animate-slideInUp"
              >
                Sign in
              </button>
            </form>
            {/* <button
              onClick={handleGoogleLogin}
              className="w-full border items-center flex justify-center border-gray-300 text-[4.4vw] md:text-[1vw] p-1 md:p-2 rounded-lg mb-6 hover:bg-black hover:text-white transform hover:scale-105 transition-all duration-300 animate-slideInUp"
            >
              <img
                src={googleImage}
                alt="Google"
                className=" md:h-4 h-4 inline mr-2"
              />
              Sign in with Google
            </button> */}
            <div className="text-center text-[3vw] md:text-[1vw] text-gray-500 animate-fadeIn">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-black cursor-pointer"
              >
                Sign up for free
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex items-center w-[35vw] lg:w-[32vw]">
            {/* Background Animation */}
            <div className="absolute  z-0 bg-[#3A80F6] overflow-hidden  w-full h-full rounded-r-2xl">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  ref={(el) => (cubeRefs.current[i] = el)}
                  className="absolute w-[10px] h-[10px] border border-[#0035A8]"
                  style={{
                    top: `${(i + 2) * 10}%`,
                    left: `${(i + 1) * 10}%`,
                    borderColor: i % 2 === 0 ? "#0035A8" : "#004DCC",
                  }}
                />
              ))}
            </div>

            {/* Foreground Text */}
            <div className="relative z-10 flex flex-col text-white items-center justify-evenly py-[7rem] h-full">
              <h1 className="font-bold text-[2vw]">New Here?</h1>
              <p className="px-[3rem] font-light sm:text-[1.5vw] sm:leading-[2vw] text-center leading-[3vw]">
                Those who see possibilities where others see limitations deserve
                to be one in a million!
              </p>
              <Link
                to={"/Signup"}
                className="px-16 bg-black sm:py-1 sm:text-[1.2vw] px-9 py-2 border rounded-full border-black"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
