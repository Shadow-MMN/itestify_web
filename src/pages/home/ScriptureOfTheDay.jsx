import React, { useEffect, useState } from "react";
import "/Users/appleplay/Desktop/itestify_web/src/blobBackground.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ScriptureOfTheDay = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="p-6 flex flex-col gap-4">
      <h1>Scripture Of the day</h1>

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
        <div className="glow-background rounded-xl">
          <div className="glow-content flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2>Jeremiah 29:11</h2>
              <span>KJV</span>
            </div>
            <p>
              “For I know the thoughts that I think towards you, saith the Lord,
              thoughts of peace, and not of evil, to give you an expected end.”
            </p>
            <p>Prayers: Lord, guide me according to your will and plan</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScriptureOfTheDay;
