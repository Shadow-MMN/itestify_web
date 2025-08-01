import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import HeartBubble from "../../HeartBubble";
const VideoCard = ({ item, ml, oneColumn }) => {
  return (
    <div key={item.id}>
      {oneColumn ? (
        <div className={`flex flex-col gap-4 relative px-6 -ml-${ml} my-4`}>
          <video src={item.video} className="rounded-lg" controls />
          <Link
            to={`/video-testimonies/${item.views}`}
            className="flex flex-col cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#9966cc] py-3 px-3 flex items-center justify-center rounded-full">
                <img src="/Logo.png" alt="Itestify Logo" className="w-4 h-4" />
              </div>
              <article className="flex flex-col gap-2">
                <h2 className="font-bold text-2xl">{item.title}</h2>
                <p className="text-base">{item.church}</p>
                <p className="font-thin text-sm flex items-center gap-1">
                  {item.category}
                  <span>
                    <GoDotFill />
                  </span>
                  {item.views} Views
                  <span>
                    <GoDotFill />
                  </span>
                  {item.date}
                </p>
              </article>
            </div>
            <HeartBubble className="right-10" />
          </Link>
        </div>
      ) : (
        <div className="flex gap-3 items-start py-6 px-4 lg:flex-row lg:flex">
          {/* Video Section */}
          <div className="relative w-[280px] flex-shrink-0 rounded-3xl overflow-hidden shadow-md">
            <video
              src={item.video}
              className="w-full h-auto object-cover"
              controls
            />
            <HeartBubble className="absolute bottom-4 right-4" />
          </div>

          {/* Info Section */}
          <Link
            to={`/video-testimonies/${item.views}`}
            className="flex flex-col gap-2"
          >
            <h2 className="text-2xl font-bold text-gray-900 leading-snug">
              {item.title}
            </h2>

            <p className="text-lg font-medium text-gray-600">{item.church}</p>

            <div className="flex items-center gap-2 text-gray-500 text-sm font-light text-nowrap">
              <span>{item.category}</span>
              <GoDotFill className="text-xs" />
              <span>{item.views} views</span>
              <GoDotFill className="text-xs" />
              <span>{item.date}</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
