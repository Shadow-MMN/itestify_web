import EmojiPicker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import { IoSendOutline } from "react-icons/io5";
import CommentCard from "../../comments/CommentCard";
import { HiOutlineUser } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
const DesktopTextCommentSection = ({
  setShowDesktopCommentSection,
  value,
  setValue,
  show,
  setShow,
  showPicker,
  handleEmoji,
  handleCancel,
  textComments,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Sidebar */}
      <div className="relative bg-white w-1/2 h-full shadow-lg overflow-y-auto z-50 pl-6">
        <div className="flex gap-2 items-center py-6 border-b border-gray-300">
          <button
            onClick={() => setShowDesktopCommentSection(false)}
            className="font-bold"
          >
            <IoCloseSharp className=" size-8" />
          </button>
          <h2 className="text-2xl font-semibold">Comments</h2>
        </div>
        <div className="flex items-start gap-2 my-9">
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
        <div className="flex flex-col gap-6 mb-6">
          {textComments.map((item) => {
            return <CommentCard item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DesktopTextCommentSection;
