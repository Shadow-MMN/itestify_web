import { GoDotFill } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { LuShare2 } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
import { TfiAngleDown } from "react-icons/tfi";
import { LuHeart } from "react-icons/lu";
const MainVideoDetail = ({ setShowShare, mainVideo, setShowDescription }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Main Video Testimony Video */}
      <div className="relative">
        <video
          src={mainVideo.video}
          className="lg:rounded-lg w-full"
          controls
        />
        <div>
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center p-2 absolute top-2 right-16 lg:right-10">
            <LuHeart className="text-[#1E1E1E] w-6 h-6" />
          </div>
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center p-2 absolute top-2 right-6 lg:hidden">
            <MdOutlineSettings className="text-[#1E1E1E] w-6 h-6" />
          </div>
          <div className=" w-12 h-12  flex items-center justify-center p-2 absolute top-1 left-6 lg:hidden">
            <TfiAngleDown className="text-white w-6 h-6" />
          </div>
        </div>
      </div>
      {/* Main Video testimony details */}
      <div className="px-8 flex flex-col gap-3">
        <h2 className="font-bold text-xl">{mainVideo.title}</h2>
        <div className="flex items-center gap-1 text-nowrap">
          <p className="font-thin flex items-center gap-1 text-sm">
            {mainVideo.type}
            <span>
              <GoDotFill />
            </span>
            {mainVideo.views} Views
            <span>
              <GoDotFill />
            </span>
            {mainVideo.date}
            <span>
              <GoDotFill />
            </span>
          </p>
          <button
            onClick={() => setShowDescription(true)}
            className="text-primary-70 font-medium text-sm lg:hidden"
          >
            See Details
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex gap-1 items-center bg-[#F5F5F5] rounded-3xl p-3">
            <BiLike className="size-6" />
            <p className="text-lg">30</p>
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="flex gap-1 items-center bg-[#F5F5F5] rounded-3xl p-3"
          >
            <LuShare2 className="size-6" />
            <p className="text-lg">Share</p>
          </button>
        </div>
      </div>
      {/* Like and Share */}
      <div className="flex flex-col px-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#9966cc] py-3 px-3 flex items-center justify-center rounded-full">
            <img src="/Logo.png" alt="Itestify Logo" className="w-4 h-4" />
          </div>
          <p className="text-xl">iTestified</p>
        </div>
        <div className="lg:flex flex-col hidden gap-2 bg-[#F5F5F5] rounded-lg p-4">
          <h3>Disclaimer</h3>
          <p>
            This video was sourced from YouTube. We do not own the rights to
            this video in any form or way. It is posted here for the purpose of
            sharing inspiring testimonies with our community
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainVideoDetail;
