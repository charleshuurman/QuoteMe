// Home component: This component serves as the main landing page of the application. It combines two primary functionalities:
// allowing users to choose an emotion and displaying generated affirmations/quotes related to the selected emotion.
import ChooseFeeling from "../components/ChooseFeeling";
import GeneratedQuotes from "../components/GeneratedQuotes";

const Home = () => {
  return (
    <div className="container">
      <ChooseFeeling />
      <GeneratedQuotes />
    </div>
  );
};

export default Home;
