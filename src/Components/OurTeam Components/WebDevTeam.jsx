import { useState } from "react";
import { Leaderteam1 } from "./teamData";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Keyboard, Pagination, Navigation, Scrollbar } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CommonComp from "./CommonComp";

export const WebDevTeam = () => {
  const [webData, SetWebData] = useState(Leaderteam1);

  return (
    <>
      <CommonComp heading={'Web Development Team'} dataArray={webData}/>
    </>
  );
};
