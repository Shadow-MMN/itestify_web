import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { LuHeart } from "react-icons/lu";

const quotes = Array(12).fill({
  image: "/Rectangle 2.png",
  source: "Southern Living",
});

const InspirationalQuotesPage = () => {
  return (
    <div className="min-h-screen px-4 md:px-12 flex flex-col gap-2 md:gap-4">
      <Link to={-1} className="flex items-center gap-4 md:gap-8">
        <div className="p-2 md:border border-secondary-10 md:bg-white rounded-md">
          <MdOutlineArrowBackIos className="size-6 text-black" />
        </div>
        <h1 className="text-xl md:text-3xl font-semibold">
          Inspirational Pictures
        </h1>
      </Link>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {quotes.map((quote) => {
          return (
            <div className="p-3 flex flex-col gap-3 relative">
              <img src={quote.image} alt="Inspirational Quotes" />
              <p className="font-bold">Source : {quote.source}</p>
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center p-2 absolute top-6 right-8">
                <LuHeart className="text-[#1E1E1E] w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>
      <button className="size-12 bg-primary-70 p-4 flex items-center justify-center rounded-full fixed right-16 bottom-16">
        <p className="text-3xl text-white">+</p>
      </button>
    </div>
  );
};

export default InspirationalQuotesPage;
