import React from "react";
import Courses from "../Components/Home/Courses";
import Swiper from "../Components/Home/Swiper";
import Hero from "../Components/Home/Hero";
import Categories from "../Components/Home/Categories";
import JoinNow from "../Components/Home/JoinNow";
import Partners, { UniversityPartners } from "../Components/Home/Partners";
import Protocol from "../Components/Home/Protocol";
import How from "../Components/Home/How";
import Slider from "../Components/Home/Slider";
import Phone from "../Components/Home/Phone";
//import Meetourexperts from '../Components/Home/Meetourexperts'
import { SuccessDark, SuccessLight } from "../assets/assets";
import OurTeam from "../Components/AboutUs/OurTeam";
import ServicesTab from "../Components/AboutUs/ServicesTab";
import { useNavigate } from "react-router-dom";
import { brands } from "../assets/BrandPartners/Brands";
import { universities } from "../assets/Universities/Universities";
import OurReach from "../Components/Home/OurReach";
import ExploreSubjects from "../Components/College/ExploreSubjects";
const Home = ({ dark }) => {
  document.title = "Baoiam - Home";
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-11/12 mx-auto">
        <Hero />
        <How />
        {/* <ExploreSubjects /> */}
        <Slider />
        <ServicesTab />
        <Partners />
        <Courses />
        <UniversityPartners />
        {/* <Categories /> */}

        <Protocol />
        <JoinNow />
        <OurTeam />
        <Phone />
      </div>
    </>
  );
};

export default Home;
// SFP POSTER
{
  /* <div className="mx-auto w-full md:w-[85%] my-20">
          <img
            className="w-full h-full cursor-pointer"
            onClick={() => navigate("/Maintenance")}
            src={dark ? SuccessDark : SuccessLight}
            alt=""
          />
        </div> */
}
