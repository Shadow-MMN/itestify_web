import VideoComments from "./VideoComments";
import { IoSendOutline } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useState } from "react";
import MobileReplySection from "./MobileReplySection";

const MobileCommentSection = ({
  setShowCommentSection,
  videoComments,
  inputRef,
  value,
  setValue,
}) => {
  const [showReply, setShowReplyComment] = useState(false);
  const [replyComment, setReplyComment] = useState(null);
  const handleCommenting = () => {
    setValue("");
  };
  const handleReply = (id) => {
    // Convert string ID to number for comparison
    const numericId = parseInt(id, 10);
    setReplyComment(numericId);
    setShowReplyComment(true);
    inputRef.current?.focus();
  };

  const handleBackToComments = () => {
    setShowReplyComment(false);
    setReplyComment(null);
  };

  // Find the comment safely
  const comment = replyComment
    ? videoComments.find((item) => item.id === replyComment)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
      onClick={() => setShowCommentSection(false)}
    >
      {/* Stop click propagation to prevent modal closing when clicking inside */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[80vh] bg-white z-50 rounded-t-3xl overflow-hidden flex flex-col border-t border-slate-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 mx-6 border-b border-slate-400">
          {showReply ? (
            <button onClick={handleBackToComments}>
              <MdOutlineArrowBackIos className="size-6" />
            </button>
          ) : (
            <div className="w-6" />
          )}
          <h2 className="text-center font-bold text-2xl flex-1">Comments</h2>
          {showReply ? (
            <div className="w-6" />
          ) : (
            <button
              onClick={() => setShowCommentSection(false)}
              className="text-right"
            >
              <ImCancelCircle className="size-6" />
            </button>
          )}
        </div>

        {/* Scrollable Comments Section */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28">
          {!showReply
            ? videoComments.map((item) => (
                <VideoComments
                  key={item.id}
                  item={item}
                  onReply={handleReply}
                />
              ))
            : comment && <MobileReplySection item={comment} />}
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-60 p-4 bg-white flex items-center justify-between border-t">
          <img src="/Ellipse 5.png" alt="" className="size-12 rounded-full" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a comment"
            className="bg-[#F5F5F5] p-4 text-lg mx-4 flex-1 rounded-lg placeholder:text-[#9A9A9A] focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            onClick={handleCommenting}
            disabled={!value.trim()}
            className={`flex gap-2 items-center rounded-xl p-4 text-white ${
              value.trim() ? "bg-primary-70" : "bg-[#787878] cursor-not-allowed"
            }`}
          >
            <IoSendOutline className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileCommentSection;
