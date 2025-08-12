import Scripture from "../../components/home/Scripture";
import HomeQuote from "../../components/home/HomeQuote";
import HomeVideos from "../../components/home/Testimonies/HomeVideos";
import HomeText from "../../components/home/Testimonies/HomeText";
const Home = () => {
  return (
    <>
      <Scripture />
      <HomeVideos />
      <HomeText />
      <HomeQuote />
    </>
  );
};

export default Home;
