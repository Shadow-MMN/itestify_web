import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import HeartBubble from "./HeartBubble";
const TextCard = ({ item }) => {
  return (
    <div className="relative">
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
          <img
            src={item.avatar}
            alt="Testifiers Profile"
            className="w-10 h-10"
          />
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
      </Link>
      <HeartBubble className="right-4" />
    </div>
  );
};

export default TextCard;
