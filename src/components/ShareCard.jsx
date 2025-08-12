import { FaRegCopy } from "react-icons/fa6";
const ShareCard = ({ setShowShare }) => {
  return (
    <div
      className={`
         fixed inset-0 z-50 flex
         items-end  lg:items-center
         justify-center
         bg-black/50 backdrop-blur-sm
         lg:bg-transparent lg:backdrop-blur-none
       `}
    >
      <div
        className={`
           w-full max-w-md 
           sm:w-[393px] sm:mx-0
           bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl
           lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
           ${
             window.innerWidth >= 1024
               ? "slide-in-from-bottom-4"
               : "translate-y-0"
           }
         `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-xl font-semibold text-gray-900">Share</h2>
          <button
            onClick={() => setShowShare(false)}
            className="
             flex items-center justify-center size-10
             text-black hover:text-gray-600 hover:bg-gray-100 
             rounded-full transition-colors duration-200
           "
            aria-label="Close share modal"
          >
            <svg
              className="size-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Social Media Buttons */}
        <div className="px-6">
          <div className="grid grid-cols-5 gap-4 pb-6 border-b border-gray-200">
            {[
              {
                name: "WhatsApp",
                icon: "/share/Frame 134.png",
              },
              {
                name: "Facebook",
                icon: "/share/Vector.png",
              },
              {
                name: "X",
                icon: "/share/Frame 135.png",
              },
              {
                name: "LinkedIn",
                icon: "/share/Frame 136.png",
              },
              {
                name: "Mail",
                icon: "/share/Frame 137.png",
              },
            ].map((platform) => (
              <button
                key={platform.name}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
                  <img
                    src={platform.icon}
                    alt={`Share on ${platform.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {platform.name}
                </span>
              </button>
            ))}
          </div>

          {/* Copy Link Button */}
          <button className="flex items-center gap-3 w-full py-4 text-left rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-[0.98]">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
              <FaRegCopy className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Copy link</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
