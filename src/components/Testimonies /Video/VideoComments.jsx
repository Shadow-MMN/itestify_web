import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
const VideoComments = ({ item }) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-2">
      <img src={item.image} alt="" className="rounded-full size-12" />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <p>{item.testimony}</p>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <BiLike className="size-6" />
            <p>{item.likes}</p>
          </div>
          <div className="flex gap-1 items-center">
            <BiDislike className="size-6" />
            <p>{item.dislikes}</p>
          </div>
        </div>
        <button className="text-primary-70 cursor-pointer text-left">
          Reply
        </button>
      </div>
      <p className="text-sm font-thin">{item.days} days Ago</p>
    </div>
  );
};

export default VideoComments;
