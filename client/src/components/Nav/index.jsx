import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

// svg icon credits: https://flowbite.com/icons/ and DaisyUI

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="primary bg-base-200 flex flex-row menu menu-horizontal lg:menu-horizontal rounded-box">
          <li>
            <Link to="/">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5"
                />
              </svg>{" "}
              Home
            </Link>
          </li>
          <li>
            <Link to="/DashBoard">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7h1v12c0 .6-.4 1-1 1h-2a1 1 0 0 1-1-1V5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v14c0 .6.4 1 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z"
                />
              </svg>{" "}
              DashBoard
            </Link>
          </li>
          <li>
            <Link to="/Journal">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v13m0-13c-2.8-.8-4.7-1-8-1a1 1 0 0 0-1 1v11c0 .6.5 1 1 1 3.2 0 5 .2 8 1m0-13c2.8-.8 4.7-1 8-1 .6 0 1 .5 1 1v11c0 .6-.5 1-1 1-3.2 0-5 .2-8 1"
                />
              </svg>{" "}
              Journal
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/Profile">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.1 1.9-.7-.7m5.6 5.6-.7-.7m-4.2 0-.7.7m5.6-5.6-.7.7M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>{" "}
              Settings
            </Link>
          </li>
          <li>
            <details>
              <summary>
                <a className="mx-1 flex">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5V3m0 18v-2M7 7 5.7 5.7m12.8 12.8L17 17M5 12H3m18 0h-2M7 17l-1.4 1.4M18.4 5.6 17 7.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                    />
                  </svg>{" "}
                  Theme
                </a>
              </summary>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-300 rounded-box w-52">
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Default"
                    value="default"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Dark"
                    value="dark"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Retro"
                    value="retro"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Cyberpunk"
                    value="cyberpunk"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Valentine"
                    value="valentine"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Aqua"
                    value="aqua"
                  />
                </li>
              </ul>
            </details>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>{" "}
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
