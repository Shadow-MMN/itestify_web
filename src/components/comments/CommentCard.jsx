import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { GrEmoji } from "react-icons/gr";
import { IoSendOutline } from "react-icons/io5";

const CommentCard = ({ item, onReply }) => {
  const [isReply, setIsReply] = useState(false);
  const [value, setValue] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [show, setShow] = useState(false);

  const handleCancel = () => {
    setShow(false);
    setValue("");
    setShowPicker(false);
    setIsReply(false);
  };

  const handleEmoji = () => {
    setShowPicker((prev) => !prev);
  };

  const handleSending = () => {
    // Handle sending logic here
    console.log("Sending reply:", value);
    setIsReply(false);
    setValue("");
    setShow(false);
  };

  const handleReply = () => {
    // Check if we're on mobile or desktop
    const isMobile = window.innerWidth < 1024;

    if (isMobile && onReply) {
      // Mobile: navigate to reply section
      onReply(item.id.toString());
    } else {
      // Desktop: show inline reply
      setIsReply((prev) => !prev);
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-2 mb-4">
      <img src={item.image} alt="" className="rounded-full size-12" />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <p>{item.testimony}</p>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <BiLike className="size-6 cursor-pointer hover:text-blue-500" />
            <p>{item.likes}</p>
          </div>
          <div className="flex gap-1 items-center">
            <BiDislike className="size-6 cursor-pointer hover:text-red-500" />
            <p>{item.dislikes}</p>
          </div>
        </div>
        <button
          className="text-primary-70 cursor-pointer text-left hover:underline"
          onClick={handleReply}
        >
          Reply
        </button>

        {/* Desktop inline reply */}
        {isReply && (
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Reply..."
              className="bg-[#F5F5F5] p-4 text-lg mr-6 rounded-lg placeholder:text-[#9A9A9A] focus:outline-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setShow(true)}
            />
            {show && (
              <div className="flex items-center justify-between">
                <div className="relative">
                  <button aria-label="Add emoji" onClick={handleEmoji}>
                    <GrEmoji className="size-8" />
                  </button>
                  {showPicker && (
                    <div className="mx-5 absolute z-10">
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
                    className="border py-2 px-3 border-[#787878] rounded-xl text-[#787878] hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSending}
                    disabled={!value.trim()}
                    className={`flex gap-2 items-center rounded-xl py-2 px-3 text-white ${
                      value.trim()
                        ? "bg-primary-70 hover:bg-primary-80"
                        : "bg-[#787878] cursor-not-allowed"
                    }`}
                  >
                    <IoSendOutline /> Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <p className="text-sm font-thin">{item.days} days Ago</p>
    </div>
  );
};

export default CommentCard;
