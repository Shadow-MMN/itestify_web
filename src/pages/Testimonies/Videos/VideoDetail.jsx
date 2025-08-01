import { MdOutlineArrowBackIos } from "react-icons/md";
// import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import VideoCard from "../../../components/Testimonies /Video/VideoCard";
import MainVideoDetail from "../../../components/Testimonies /Video/MainVideoDetail";
import LGCommentSection from "../../../components/Testimonies /Video/LGCommentSection";
import ShareCard from "../../../components/Testimonies /Video/ShareCard";
import SMCommentSection from "../../../components/Testimonies /Video/SMCommentSection";
import VideoDisplay from "../../../components/VideoDisplay";
const relatedVideoSm = Array(6).fill({
  video: "/Screen Recording 2025-06-04 at 11.48.58 PM.mov",
  title: "Triplets after 25 years of waiting",
  church: "Redeemed Christian Church Of God",
  category: "Childbirth",
  views: 504,
  date: "18/6/2024",
});
const relatedVideolg = Array(8).fill({
  video: "/vidoeTestimoniesDetails/relatedVideos.mov",
  title: "Triplets after 25 years of waiting",
  church: "Redeemed Christian Church Of God",
  category: "Childbirth",
  views: 504,
  date: "18/6/2024",
});
const videoComments = Array(4).fill({
  image: "/commentImage.png",
  name: "Rotimi Gbenga",
  testimony:
    "Our God is indeed a good God, he knows all and can do all things, I will also testify In Jesus name, Amen!",
  likes: 15,
  dislikes: 0,
  days: 2,
});

const mainVideo = {
  video: "/vidoeTestimoniesDetails/mainVideo.mov",
  title: "Triplets after tweenty five years of waiting!",
  type: "Childbirth",
  views: "504",
  date: "18/6/2024",
};

const VideoDetails = () => {
  // const params = useParams();
  // const videoId = params.videoId;
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    inputRef.current?.focus();
  }, [showCommentSection]);

  const handleCancel = () => {
    setShow(false);
    setValue("");
    setShowPicker(false);
  };

  const handleEmoji = () => {
    setShowPicker((prev) => !prev);
  };

  return (
    <>
      <div className={`flex flex-col gap-4 lg:px-20`}>
        <div className="hidden md:block">
          <MdOutlineArrowBackIos className="size-6 text-black" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-4">
            <MainVideoDetail
              mainVideo={mainVideo}
              setShowShare={setShowShare}
            />
            {/*Comment Section for sm-md */}
            <div className="flex lg:hidden px-4">
              <div className="flex flex-col gap-2 bg-[#F5F5F5] rounded-lg p-4">
                <h2 className="font-bold">
                  Comments <span className="font-thin">(12)</span>
                </h2>
                <div className="flex justify-between gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src="/commentImage.png"
                      alt=""
                      className="rounded-full size-12 "
                    />
                    <p>
                      Our God is indeed a good God, he knows all and ...{" "}
                      <span className="text-primary-70 cursor-pointer">
                        <button onClick={() => setShowCommentSection(true)}>
                          see more
                        </button>
                      </span>
                    </p>
                  </div>
                  <p className="lg:hidden text-xs text-nowrap">2 days Ago</p>
                </div>
              </div>
            </div>
            {/*Comment section for lg */}
            <LGCommentSection
              videoComments={videoComments}
              value={value}
              setValue={setValue}
              setShow={setShow}
              showPicker={showPicker}
              handleCancel={handleCancel}
              handleEmoji={handleEmoji}
              show={show}
            />
            {/* Related Video Sm */}
            <div className="lg:hidden">
              <h2 className="px-6 text-xl font-semibold">Related Videos</h2>

              <VideoDisplay
                data={relatedVideoSm}
                ml={2}
                oneColumn={true}
                loading={loading}
              />
            </div>
          </div>
          {/* Related Video Lg */}
          <div className="hidden lg:flex flex-col gap-2">
            <h2 className="px-6 text-xl font-semibold">Related Videos</h2>
            {relatedVideolg.map((item) => {
              return <VideoCard item={item} />;
            })}
          </div>
        </div>
        {showShare && <ShareCard setShowShare={setShowShare} />}
      </div>
      {showCommentSection && (
        <SMCommentSection
          setShowCommentSection={setShowCommentSection}
          videoComments={videoComments}
          inputRef={inputRef}
          value={value}
          setValue={setValue}
        />
      )}
    </>
  );
};

export default VideoDetails;
