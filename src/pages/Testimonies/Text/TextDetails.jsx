import { GoDotFill } from "react-icons/go";
import { LuHeart } from "react-icons/lu";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { LuShare2 } from "react-icons/lu";
import { BsChatRightText } from "react-icons/bs";
import { useRef, useState } from "react";
import ShareCard from "../../../components/ShareCard";
import MobileCommentSection from "../../../components/comments/MobileCommentSection";
import DesktopTextCommentSection from "../../../components/Testimonies /Text/DesktopTextCommentSection";
const textComments = Array(6)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    image: "/commentImage.png",
    name: "Rotimi Gbenga",
    testimony:
      "Our God is indeed a good God, he knows all and can do all things, I will also testify In Jesus name, Amen!",
    likes: 15,
    dislikes: 0,
    days: 2,
  }));

const TextDetails = () => {
  const [value, setValue] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [show, setShow] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showMobileCommentSection, setShowMobileCommentSection] =
    useState(false);
  const [showDesktopCommentSection, setShowDesktopCommentSection] =
    useState(false);
  const inputRef = useRef(null);

  const handleCommentSectionToggle = () => {
    if (window.innerWidth >= 1024) {
      setShowDesktopCommentSection(true);
    } else {
      setShowMobileCommentSection(true);
    }
  };
  const handleCancel = () => {
    setShow(false);
    setValue("");
    setShowPicker(false);
  };
  const handleEmoji = () => {
    setShowPicker((prev) => !prev);
  };
  return (
    <div className="min-h-screen px-6 lg:px-20 flex flex-col gap-8">
      {/*Going back */}
      <div className="flex items-center justify-between mt-2">
        <Link to={-1}>
          <MdOutlineArrowBackIos className="size-6 text-black" />
        </Link>
        <div className="border border-gray-200 w-8 h-8 rounded-full flex items-center justify-center p-2 lg:hidden">
          <LuHeart className="text-[#1E1E1E] w-6 h-6" />
        </div>
      </div>
      {/*User profile,name and testimony*/}
      <div className="flex flex-col gap-3 lg:flex-col-reverse">
        <div className="flex gap-2 ">
          <img
            src="/Component 1.png"
            alt=""
            className="size-[36px] lg:size-[48px] rounded-full"
          />
          <div className="flex flex-col gap-1 lg:gap-3">
            <p className="text-[12px] lg:text-[18px]">Uchechukwu Uzoachi</p>
            <div className="flex items-center gap-1 text-[10px] lg:text-base">
              <p>Healing</p>
              <GoDotFill />
              <p>30 Minutes ago</p>
            </div>
          </div>
        </div>
        <h2 className="font-semibold lg:text-2xl">
          Jesus Changed my Genotype!
        </h2>
      </div>
      <div className="bg-[#F5F5F5] py-4 px-2 lg:p-6 rounded-lg">
        <p className="text-[12px] text-[#575757] lg:text-[22px]">
          For years, I lived with the pain and limitations of having the sickle
          cell genotype. Countless hospital visits and painful crises became a
          part of my life. My faith in God was strong, but the struggle was
          relentless. Despite the adversity, I held on to the hope that one day,
          I would experience healing.
          <br /> One evening, during a powerful prayer session at my church, I
          felt an overwhelming sense of peace and warmth envelop me. The pastor,
          led by the Spirit, specifically prayed for those suffering from
          chronic illnesses. As the congregation joined in fervent prayer, I
          felt a shift within me. It was as if a heavy burden was being lifted
          off my shoulders. In the weeks that followed, I noticed a remarkable
          change. The frequent crises that had plagued my life began to subside.
          My energy levels increased, and I felt a renewed sense of vitality.
          Encouraged by these changes, I decided to visit my doctor for a
          comprehensive check-up.
          <br /> The results were nothing short of a miracle. My genotype had
          changed from SS to AA. The doctors were baffled, unable to explain the
          transformation scientifically. But I knew the truth—it was Jesus who
          had healed me. Today, I live free from the pain and limitations that
          once defined my life. My story is a testament to the incredible power
          of faith and prayer. Jesus changed my genotype, and with it, He
          transformed my entire life. I now use my testimony to encourage
          others, reminding them that with God, all things are possible.
        </p>
      </div>
      <div className="flex gap-6 p-3 items-center self-center bg-[#F5F5F5] rounded-lg text-[14px] lg:text-xl">
        <button className="flex items-center gap-1">
          <AiOutlineLike className="size-4 lg:size-6" />
          <span>10</span>
        </button>
        <button
          onClick={handleCommentSectionToggle}
          className="flex items-center gap-1"
        >
          <BsChatRightText className="size-4 lg:size-6" />
          <span>12</span>
        </button>
        <button
          onClick={() => setShowShare(true)}
          className="flex items-center gap-1"
        >
          <LuShare2 className="size-4 lg:size-6" />
          <span>Share</span>
        </button>
      </div>
      {showShare && <ShareCard setShowShare={setShowShare} />}
      {showMobileCommentSection && (
        <MobileCommentSection
          setShowCommentSection={setShowMobileCommentSection}
          comments={textComments}
          inputRef={inputRef}
          value={value}
          setValue={setValue}
        />
      )}
      {showDesktopCommentSection && (
        <DesktopTextCommentSection
          setShowDesktopCommentSection={setShowDesktopCommentSection}
          textComments={textComments}
          value={value}
          setValue={setValue}
          setShow={setShow}
          showPicker={showPicker}
          handleCancel={handleCancel}
          handleEmoji={handleEmoji}
          show={show}
        />
      )}
    </div>
  );
};

export default TextDetails;
