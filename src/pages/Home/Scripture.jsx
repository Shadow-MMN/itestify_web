import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GoDotFill } from "react-icons/go";
const Scripture = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl">Scripture Of the day</h1>

      {loading ? (
        <Skeleton
          height={200}
          borderRadius={20}
          baseColor="#D9D9D9"
          highlightColor="#D9D9D9"
          className="!w-full"
          containerClassName="rounded-xl overflow-hidden"
        />
      ) : (
        <div className="bg-primary-80 rounded-xl">
          <div className="text-white px-4 py-3 flex flex-col gap-4">
            <div className="flex items-center gap-[2px] font-bold text-xl">
              <h2>Jeremiah 29:11 </h2>
              <GoDotFill className="text-white size-[8px]" />
              <span>KJV</span>
            </div>
            <p className="text-xl">
              “For I know the thoughts that I think towards you, saith the Lord,
              thoughts of peace, and not of evil, to give you an expected end.”
            </p>
            <hr className="rounded-l-full rounded-r-full text-white h-0" />
            <p>Prayers: Lord, guide me according to your will and plan</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Scripture;
