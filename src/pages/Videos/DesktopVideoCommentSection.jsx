import { IoSendOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import CommentCard from "../../components/comments/CommentCard";
const DesktopVideoCommentSection = ({
  videoComments,
  value,
  setValue,
  setShow,
  showPicker,
  handleEmoji,
  show,
  handleCancel,
}) => {
  return (
    <div className="hidden lg:flex flex-col gap-6">
      <h2 className="font-bold text-2xl">12 Comments</h2>
      <div className="flex items-start gap-2">
        <div className="bg-gray-200 rounded-full flex items-center justify-center p-3">
          <HiOutlineUser className="text-gray-600 text-xl" />
        </div>
        {/* Adding Comment for lg */}
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            placeholder="Add a comment"
            className={`bg-[#F5F5F5] p-4 text-lg mr-6 rounded-lg placeholder:text-[#9A9A9A] focus:outline-none`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onFocus={() => setShow(true)}
          />
          {show && (
            <div className="flex items-center justify-between">
              <div className="relative">
                <button aria-label="Add emoji" onClick={handleEmoji}>
                  <GrEmoji className="size-8" />
                </button>
                {showPicker && (
                  <div className="mx-5 absolute">
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
                  className="border py-2 px-3 border-[#787878] rounded-xl text-[#787878]"
                >
                  Cancel
                </button>
                <button
                  disabled={!value.trim()}
                  className={`flex gap-2 items-center rounded-xl py-2 px-3 text-white ${
                    value.trim()
                      ? "bg-primary-70"
                      : "bg-[#787878] cursor-not-allowed"
                  }`}
                >
                  <IoSendOutline /> Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mapping will be done here , maybe a comment card will be created for lg */}
      <div className="flex flex-col gap-6 mb-6">
        {videoComments.map((item) => {
          return <CommentCard item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default DesktopVideoCommentSection;
