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
        <div className="flex gap-4 items-start py-4">
          <div className="relative pl-6">
            <video src={item.video} className="rounded-3xl" controls></video>
            <HeartBubble className="right-4" />
          </div>
          <Link
            to={`/video-testimonies/${item.views}`}
            className="flex flex-col gap-2"
          >
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-sm font-light">{item.church}</p>
            <p className="font-thin text-sm flex items-center gap-1 text-nowrap">
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
          </Link>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
