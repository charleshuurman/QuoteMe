import ChooseFeeling from "../components/ChooseFeeling";
import GeneratedQuotes from "../components/GeneratedQuotes";
import BulletinBoard from "../components/BulletinBoard";

const Home = () => {
  return (
    <div className="container">
      <h1>Home</h1>
      <ChooseFeeling />
      <GeneratedQuotes />
      <BulletinBoard />
    </div>
  );
};

export default Home;
