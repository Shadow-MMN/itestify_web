import { LuShare2 } from "react-icons/lu";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useParams } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import ShareCard from "../../components/ShareCard";

const quotes = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: "/Rectangle 2.png",
  source: "Southern Living",
}));
const QuoteDetails = () => {
  const params = useParams();
  const quoteId = params.quoteId;
  const quote = quotes.find((quote) => quote.id == quoteId);

  const [showShare, setShowShare] = useState(false);
  return (
    <section className="min-h-screen px-10 lg:px-20 lg:grid grid-cols-1">
      <div className="flex items-center gap-4 md:gap-8">
        <Link to={-1} className="flex items-center gap-4 md:gap-8">
          <div className="p-2 rounded-md">
            <MdOutlineArrowBackIos className="size-6 text-black" />
          </div>
        </Link>
        <h1 className="text-xl md:text-3xl font-semibold">
          Inspirational Pictures
        </h1>
      </div>
      <div className="w-full flex items-center justify-end gap-6">
        <button
          onClick={() => setShowShare(true)}
          className="flex items-start justify-center gap-2 p-3 border border-[#BCBCBC] rounded-lg"
        >
          <LuShare2 className="size-4 lg:size-6" />
          <span className="text-[18px]">Share</span>
        </button>
        <button className="flex items-start justify-center gap-2 p-3 border border-[#BCBCBC] rounded-lg">
          <FiDownload className="size-4 lg:size-6" />
          <span className="text-[18px]">Download</span>
        </button>
      </div>
      <div className="h-[calc(100vh-40%)] flex justify-center">
        <div className="p-3 flex flex-col gap-3 relative">
          <img src={quote.image} alt="Inspirational Quotes" />
          <p className="font-bold">Source : {quote.source}</p>
        </div>
      </div>
      {showShare && <ShareCard setShowShare={setShowShare} />}
    </section>
  );
};

export default QuoteDetails;
