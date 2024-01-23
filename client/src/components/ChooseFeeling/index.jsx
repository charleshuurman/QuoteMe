import Auth from "../../utils/auth";

const ChooseFeeling = () => {
  return (
    <>
      <h1>ChooseFeeling</h1>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">How are you feeling?</p>
            <ul className="menu menu-lg bg-base-200 w-56 rounded-box">
              <li>
                <a>Happy</a>
              </li>
              <li>
                <a>Sad</a>
              </li>
              <li>
                <a>Bored</a>
              </li>
            </ul>
            <button className="btn btn-primary">Save a Quote</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseFeeling;
