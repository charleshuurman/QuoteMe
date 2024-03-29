import { useThemeContext } from '../../utils/GlobalState';
import { useEffect } from 'react';

function ThemeList() {
  const [theme, setTheme] = useThemeContext(); // Access and modify the global theme state
  console.log("theme component:", theme);
  // DaisyUI built-in themes from https://daisyui.com/docs/themes/
  const themes = [
    "cupcake",
    "light",
    "dark",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const handleThemeChange = (themeName, event) => {
    event.preventDefault();
    setTheme(themeName); // Update the global theme state
    document.querySelector('html').setAttribute('data-theme', theme); // Apply the theme to the document
  };

  useEffect(() => {
    localStorage.setItem('colorTheme', theme); // Persists the selected theme in local storage
  }, [theme]);

  return (
    // Render a dropdown menu for theme selection
    // Each theme option is represented as a radio button within the list
    // The handleThemeChange function is attached to the onChange event of each radio button
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
        {themes.map((themename, index) => {
          return (
            <li key={index}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={themename}
                value={themename}
                onChange={(event) => handleThemeChange(themename, event)}
              />
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export default ThemeList;
