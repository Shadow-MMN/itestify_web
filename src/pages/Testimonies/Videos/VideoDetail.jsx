import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import EmojiPicker from "emoji-picker-react";
import { FaRegCopy } from "react-icons/fa6";
// import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import VideoComments from "../../../components/Testimonies /Video/VideoComments";
import VideoCard from "../../../components/Testimonies /Video/VideoCard";
import { HiOutlineUser } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";
import MainVideoDetail from "../../../components/Testimonies /Video/MainVideoDetail";
const relatedVideoSm = Array(6).fill({
  video: "/Screen Recording 2025-06-04 at 11.48.58 PM.mov",
  title: "Triplets after 25 years of waiting",
  church: "Redeemed Christian Church Of God",
  category: "Childbirth",
  views: 504,
  date: "18/6/2024",
});
const relatedVideolg = Array(8).fill({
  video: "/vidoeTestimoniesDetails/relatedVideos.mov",
  title: "Triplets after 25 years of waiting",
  church: "Redeemed Christian Church Of God",
  category: "Childbirth",
  views: 504,
  date: "18/6/2024",
});
const videoComments = Array(4).fill({
  image: "/commentImage.png",
  name: "Rotimi Gbenga",
  testimony:
    "Our God is indeed a good God, he knows all and can do all things, I will also testify In Jesus name, Amen!",
  likes: 15,
  dislikes: 0,
  days: 2,
});

const mainVideo = {
  video: "/vidoeTestimoniesDetails/mainVideo.mov",
  title: "Triplets after tweenty five years of waiting!",
  type: "Childbirth",
  views: "504",
  date: "18/6/2024",
};

const VideoDetails = () => {
  // const params = useParams();
  // const videoId = params.videoId;
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    inputRef.current?.focus();
  }, [showCommentSection]);

  const handleCancel = () => {
    setShow(false);
    setValue("");
    setShowPicker(false);
  };

  const handleEmoji = () => {
    setShowPicker((prev) => !prev);
  };

  return (
    <>
      <div className={`flex flex-col gap-4 lg:px-20`}>
        <div className="hidden md:block">
          <MdOutlineArrowBackIos className="size-6 text-black" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-4">
            <MainVideoDetail
              mainVideo={mainVideo}
              setShowShare={setShowShare}
            />
            {/*Comment Section for sm-md */}
            <div className="flex lg:hidden px-4">
              <div className="flex flex-col gap-2 bg-[#F5F5F5] rounded-lg p-4">
                <h2 className="font-bold">
                  Comments <span className="font-thin">(12)</span>
                </h2>
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src="/commentImage.png"
                      alt=""
                      className="rounded-full size-12 "
                    />
                    <p>
                      Our God is indeed a good God, he knows all and ...{" "}
                      <span className="text-primary-70 cursor-pointer">
                        <button onClick={() => setShowCommentSection(true)}>
                          see more
                        </button>
                      </span>
                    </p>
                  </div>
                  <p className="lg:hidden text-xs text-nowrap">2 days Ago</p>
                </div>
              </div>
            </div>
            {/*Comment section for lg */}
            <div className="hidden lg:flex flex-col gap-6">
              <h2 className="font-bold text-2xl">12 Comments</h2>
              <div className="flex items-start gap-2">
                <div className="bg-gray-200 rounded-full flex items-center justify-center p-3">
                  <HiOutlineUser className="text-gray-600 text-xl" />
                </div>
                {/* Adding Comment for lg */}
                <div className="flex flex-col gap-4 flex-1 ">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    className={`bg-[#F5F5F5] p-4 text-lg mr-6 rounded-lg placeholder:text-[#9A9A9A] focus:outline-none`}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    onFocus={() => setShow(true)}
                  />
                  {show && (
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <button aria-label="Add emoji" onClick={handleEmoji}>
                          <GrEmoji className="size-8" />
                        </button>
                        {showPicker && (
                          <div className="mx-5 absolute">
                            <EmojiPicker
                              onEmojiClick={(emojiData) =>
                                setValue((prev) => prev + emojiData.emoji)
                              }
                              skinTonesDisabled={true}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-6 mr-6">
                        <button
                          onClick={handleCancel}
                          className="border py-2 px-3 border-[#787878] rounded-xl text-[#787878]"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={!value.trim()}
                          className={`flex gap-2 items-center rounded-xl py-2 px-3 text-white ${
                            value.trim()
                              ? "bg-primary-70"
                              : "bg-[#787878] cursor-not-allowed"
                          }`}
                        >
                          <IoSendOutline /> Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Mapping will be done here , maybe a comment card will be created for lg */}
              <div className="flex flex-col gap-6 mb-6">
                {videoComments.map((item) => {
                  return <VideoComments item={item} />;
                })}
              </div>
            </div>
            {/* Related Video Sm */}
            <div className="lg:hidden">
              <h2 className="px-6 text-xl font-semibold">Related Videos</h2>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {relatedVideoSm.map((item, index) => (
                  <SwiperSlide key={index}>
                    {loading ? (
                      <div className="flex flex-col gap-4 relative px-6">
                        {/* Skeleton for video */}
                        <Skeleton height={320} borderRadius="0.75rem" />

                        {/* Skeleton for profile image + text */}
                        <div className="flex items-start gap-4">
                          <Skeleton circle width={40} height={40} />

                          <div className="flex flex-col gap-3 w-full">
                            <Skeleton height={20} width="80%" />
                            <Skeleton height={15} width="60%" />
                            <Skeleton height={15} width="70%" />
                          </div>
                        </div>

                        {/* Skeleton for heart icon */}
                        <div className="absolute top-2 right-10">
                          <Skeleton circle width={32} height={32} />
                        </div>
                      </div>
                    ) : (
                      <VideoCard ml={2} item={item} oneColumn={true} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          {/* Related Video Lg */}
          <div className="hidden lg:flex flex-col gap-2">
            <h2 className="px-6 text-xl font-semibold">Related Videos</h2>
            {relatedVideolg.map((item) => {
              return <VideoCard item={item} />;
            })}
          </div>
        </div>
        {showShare && (
          <div
            className={`
      fixed inset-0 z-50 flex
      items-end  lg:items-center
      justify-center
      bg-black/50 backdrop-blur-sm
      lg:bg-transparent lg:backdrop-blur-none
    `}
          >
            <div
              className={`
        w-full max-w-md 
        sm:w-[393px] sm:mx-0
        bg-white rounded-2xl shadow-2xl
        lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
        ${
          window.innerWidth >= 1024 ? "slide-in-from-bottom-4" : "translate-y-0"
        }
      `}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6">
                <h2 className="text-xl font-semibold text-gray-900">Share</h2>
                <button
                  onClick={() => setShowShare(false)}
                  className="
          flex items-center justify-center size-10
          text-black hover:text-gray-600 hover:bg-gray-100 
          rounded-full transition-colors duration-200
        "
                  aria-label="Close share modal"
                >
                  <svg
                    className="size-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Social Media Buttons */}
              <div className="px-6">
                <div className="grid grid-cols-5 gap-4 pb-6 border-b border-gray-200">
                  {[
                    {
                      name: "WhatsApp",
                      icon: "/share/Frame 134.png",
                    },
                    {
                      name: "Facebook",
                      icon: "/share/Vector.png",
                    },
                    {
                      name: "X",
                      icon: "/share/Frame 135.png",
                    },
                    {
                      name: "LinkedIn",
                      icon: "/share/Frame 136.png",
                    },
                    {
                      name: "Mail",
                      icon: "/share/Frame 137.png",
                    },
                  ].map((platform) => (
                    <button
                      key={platform.name}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95`}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                        <img
                          src={platform.icon}
                          alt={`Share on ${platform.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {platform.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Copy Link Button */}
                <button className="flex items-center gap-3 w-full py-4 text-left rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-[0.98]">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                    <FaRegCopy className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Copy link</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showCommentSection && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setShowCommentSection(false)}
        >
          {/* Stop click propagation to prevent modal closing when clicking inside */}
          <div
            className="fixed bottom-0 left-0 right-0 h-[75vh] bg-white z-50 rounded-t-3xl overflow-hidden flex flex-col border-t border-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between py-4 mx-6 border-b border-slate-400">
              <div className="w-6" />
              <h2 className="text-center font-bold text-2xl flex-1">
                Comments
              </h2>
              <button
                onClick={() => setShowCommentSection(false)}
                className="text-right"
              >
                <ImCancelCircle className="size-6" />
              </button>
            </div>

            {/* Scrollable Comments Section */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
              {videoComments.map((item, index) => (
                <VideoComments key={index} item={item} />
              ))}
            </div>

            {/* Input Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-60 p-4 bg-white flex items-center justify-between border-t">
              <img
                src="/Ellipse 5.png"
                alt=""
                className="size-12 rounded-full"
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Add a comment"
                className="bg-[#F5F5F5] p-4 text-lg mx-4 flex-1 rounded-lg placeholder:text-[#9A9A9A] focus:outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                disabled={!value.trim()}
                className={`flex gap-2 items-center rounded-xl p-4 text-white ${
                  value.trim()
                    ? "bg-primary-70"
                    : "bg-[#787878] cursor-not-allowed"
                }`}
              >
                <IoSendOutline className="size-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetails;
