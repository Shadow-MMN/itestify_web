import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import TextCard from "../../components/TextCard";

const testimonies = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  title: "Jesus Changed my Genotype!",
  excerpt:
    "For years, I lived with the pain and limitations of having the sickle cell genotype. Countless hospital visits and painful crises became a part of my life. My faith in...",
  author: "Chika Amaka",
  category: "Healing",
  time: "30 Minutes ago",
  avatar: "/Ellipse 5.png",
}));
const TextTestimonies = () => {
  return (
    <div className="min-h-screen px-4 md:px-12 flex flex-col gap-2 md:gap-4">
      <Link to={-1} className="flex items-center gap-4 md:gap-8">
        <div className="p-2 md:border border-secondary-10 md:bg-white rounded-md">
          <MdOutlineArrowBackIos className="size-6 text-black" />
        </div>
        <h1 className="text-xl md:text-3xl font-semibold">
          Trending Written Testimonies
        </h1>
      </Link>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {testimonies.map((item) => {
          return <TextCard item={item} />;
        })}
      </div>
      <button className="size-12 bg-primary-70 p-4 flex items-center justify-center rounded-full fixed right-6 md:right-16 bottom-16">
        <p className="text-3xl text-white">+</p>
      </button>
    </div>
  );
};

export default TextTestimonies;
