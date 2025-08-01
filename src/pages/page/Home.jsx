import Scripture from "../../components/home/Scripture";
import HomeInspirationalPics from "../../components/home/HomeInspirationalPics";
import HomeVideos from "../../components/home/Testimonies/HomeVideos";
import HomeText from "../../components/home/Testimonies/HomeText";
const Home = () => {
  return (
    <>
      <Scripture />
      <HomeVideos />
      <HomeText />
      <HomeInspirationalPics />
    </>
  );
};

export default Home;
