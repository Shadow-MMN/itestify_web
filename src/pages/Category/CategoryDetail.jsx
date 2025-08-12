import { MdOutlineArrowBackIos } from "react-icons/md";
import { BsFileText } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { GoVideo } from "react-icons/go";
import VideoCard from "../../components/Testimonies /Video/VideoCard";
import TextCard from "../../components/Testimonies /Text/TextCard";
import { useState } from "react";

const categories = [
  {
    id: 1,
    heading: "Healing Testimonies",
    writeUp:
      "Watch and read about God's miraculous power to heal every illness and restore health.",
  },
  {
    id: 2,
    heading: "Deliverance Testimonies",
    writeUp:
      "Discover powerful testimonies of freedom from bondage and spiritual deliverance.",
  },
  {
    id: 3,
    heading: "Breakthrough Testimonies",
    writeUp:
      "Read and watch inspiring stories of God's breakthroughs in various areas of life.",
  },
  {
    id: 4,
    heading: "Faith Testimonies",
    writeUp:
      "Be encouraged by stories of unwavering faith and trust in God through life's challenges.",
  },
  {
    id: 5,
    heading: "Financial Testimonies",
    writeUp:
      "See how God has transformed financial situations and provided abundantly.",
  },
  {
    id: 6,
    heading: "Salvation Testimonies",
    writeUp:
      "Celebrate the joy of salvation and lives transformed by the gospel.",
  },
  {
    id: 7,
    heading: "Career Testimonies",
    writeUp:
      "Read and watch stories of divine guidance in career paths and workplace miracles.",
  },
  {
    id: 8,
    heading: "Marriage Restoration Testimonies",
    writeUp:
      "Stories of broken marriages healed and relationships transformed by God's intervention.",
  },
];
const VideoTestimonies = Array(12).fill({
  video: "/Screen Recording 2025-06-04 at 11.48.58 PM.mov",
  title: "Triplets after 25 years of waiting",
  church: "Redeemed Christian Church Of God",
  category: "Childbirth",
  views: 504,
  date: "18/6/2024",
});

const textTestimonies = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  title: "Jesus Changed my Genotype!",
  excerpt:
    "For years, I lived with the pain and limitations of having the sickle cell genotype. Countless hospital visits and painful crises became a part of my life. My faith in...",
  author: "Chika Amaka",
  category: "Healing",
  time: "30 Minutes ago",
  avatar: "/Ellipse 5.png",
}));

const CategoryDetail = () => {
  const params = useParams();
  const categoryId = params.categoryId;
  const mainHeading = categories.find((item) => item.id == categoryId);

  // State to track which tab is selected - video is default
  const [selectedTab, setSelectedTab] = useState("video");

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-10 px-4 lg:pl-20 my-3">
        <Link to={-1} className="flex items-center gap-4 md:gap-8">
          <MdOutlineArrowBackIos className="size-6 text-black" />
        </Link>
        <h1 className="text-[20px] lg:text-[28px] font-semibold">
          {mainHeading.heading}
        </h1>
      </div>

      <div className="relative border-b border-gray-200">
        <div className="flex items-center justify-center gap-24 pb-3">
          <button
            className="flex items-center gap-1 relative"
            onClick={() => setSelectedTab("video")}
          >
            <GoVideo className="w-5 h-4" />
            <span
              className={`text-[20px] ${
                selectedTab === "video" ? "font-semibold" : ""
              }`}
            >
              Videos
            </span>
            {selectedTab === "video" && (
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#9966CC]"></div>
            )}
          </button>

          <button
            className="flex items-center gap-1 relative"
            onClick={() => setSelectedTab("text")}
          >
            <BsFileText className="w-5 h-4" />
            <span
              className={`text-[20px] ${
                selectedTab === "text" ? "font-semibold" : ""
              }`}
            >
              Text
            </span>
            {selectedTab === "text" && (
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#9966CC]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Conditional rendering based on selected tab */}
      {selectedTab === "video" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VideoTestimonies.map((item) => {
            return <VideoCard item={item} oneColumn={true} />;
          })}
        </div>
      )}

      {selectedTab === "text" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-6 my-4">
          {textTestimonies.map((item) => {
            return <TextCard item={item} />;
          })}
        </div>
      )}
    </div>
  );
};
export default CategoryDetail;
