import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

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

const Category = () => {
  return (
    <div className="min-h-screen pt-10 px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
      {categories.map((category) => {
        return (
          <Link
            to={`/category/${category.id}`}
            key={category.id}
            className="bg-[#F5F5F5] p-4 rounded-lg flex items-center justify-between gap-2"
          >
            <div className="flex flex-col">
              <h2 className="font-semibold text-[22px]">{category.heading}</h2>
              <p className="text-lg">{category.writeUp}</p>
            </div>
            <FaAngleRight className="size-5" />
          </Link>
        );
      })}
      <button className="size-12 bg-primary-70 p-4 flex items-center justify-center rounded-full fixed right-6 md:right-16 bottom-16">
        <p className="text-3xl text-white">+</p>
      </button>
    </div>
  );
};

export default Category;
