const testimonyDescription = [
  { id: 1, name: "Likes", number: 30 },
  { id: 2, name: "Views", number: 504 },
  { id: 3, name: 2024, number: "3 Jul" },
  { id: 4, name: "Category", number: "Childbirth" },
];
const VideoDescription = ({ setShowDescription }) => {
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
        <div className="flex items-center justify-between p-4 broder-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Description</h2>
          <button
            onClick={() => setShowDescription(false)}
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
        <div className="flex flex-col gap-4">
          <h2 className="font-bold px-4">
            Triplets after 25 Years of marriage
          </h2>
          <div className="flex justify-between px-8 items-center">
            {testimonyDescription.map((testimony) => {
              return (
                <div
                  key={testimony.id}
                  className="flex flex-col items-center gap-2"
                >
                  <p className="font-medium text-lg">{testimony.number}</p>
                  <span>{testimony.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="px-4 flex flex-col gap-2 my-4">
          <h2 className="font-semibold text-sm">Disclaimer</h2>
          <p className="text-sm font-sans">
            This video was sourced from YouTube. We do not own the rights to
            this video in any form or way. It is posted here for the purpose of
            sharing inspiring testimonies with our community
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoDescription;
