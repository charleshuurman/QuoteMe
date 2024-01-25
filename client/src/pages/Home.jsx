import ChooseFeeling from "../components/ChooseFeeling";
import GeneratedQuotes from "../components/GeneratedQuotes";

const Home = () => {
  return (
    <div className="container">
      <h1>Home</h1>
      <ChooseFeeling />
      <GeneratedQuotes />
    </div>
  );
};

export default Home;
