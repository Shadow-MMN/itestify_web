import { LuHeart } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
const TextCard = ({ item }) => {
  return (
    <Link
      to={`/text-testimonies/${item.id}`}
      className="bg-[#F5F5F5] rounded-xl p-3 flex flex-col gap-3 relative"
    >
      <h2>{item.title}</h2>
      <p className="font-thin">
        {item.excerpt}
        <span className="text-primary-50"> see more</span>
      </p>
      <div className="flex items-center gap-2">
        <img src={item.avatar} alt="Testifiers Profile" className="w-10 h-10" />
        <div className="flex flex-col ">
          <h3>{item.author}</h3>
          <p className="font-thin flex items-center gap-1">
            {item.category}
            <span>
              <GoDotFill />
            </span>
            {item.time}
          </p>
        </div>
      </div>
      <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center p-2 absolute top-2 right-4">
        <LuHeart className="text-[#1E1E1E] w-6 h-6" />
      </div>
    </Link>
  );
};

export default TextCard;
