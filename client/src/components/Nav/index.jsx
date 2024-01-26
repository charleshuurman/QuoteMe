import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="primary bg-base-200 flex flex-row menu menu-horizontal lg:menu-horizontal rounded-box">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/DashBoard">DashBoard</Link>
          </li>
          <li>
            <Link to="/Journal">Journal</Link>
          </li>
          <li className="mx-1">
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <details>
              <summary><a className="mx-1">Theme</a></summary>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-300 rounded-box w-52">
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark"/></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
                <li><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/></li>
              </ul>
            </details>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="primary flex flex-row menu menu-vertical lg:menu-horizontal rounded-box">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex flex-row px-1 gap-2">
      <h1>
        <Link to="/">
          <span role="img" aria-label="smiley face">
            😀
          </span>
          -QuoteMe
        </Link>
      </h1>

      <nav className="primary">{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
