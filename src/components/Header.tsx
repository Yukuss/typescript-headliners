import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
  isAuth: boolean;
  onLogout: () => void;
  setTab: (tab: "all" | "fav" | "about") => void;
}

export default function Header({
  isDark,
  toggleTheme,
  isAuth,
  onLogout,
  setTab,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (tabName: "all" | "fav" | "about") => {
    setTab(tabName);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-4 transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400 cursor-pointer select-none"
          onClick={() => handleNav("all")}
        >
          HEADLINERS.
        </Link>

        <div className="flex items-center gap-4">
          {isAuth && (
            <nav className="hidden md:flex gap-6 font-bold text-sm uppercase tracking-widest">
              <Link
                to="/"
                onClick={() => handleNav("all")}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                Новости
              </Link>
              <Link
                to="/"
                onClick={() => handleNav("fav")}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                Закладки
              </Link>
              <Link
                to="/"
                onClick={() => handleNav("about")}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                О нас
              </Link>
            </nav>
          )}

          <button
            onClick={toggleTheme}
            className="text-xl p-1 cursor-pointer hover:scale-110 transition"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {isAuth && (
            <button
              className="md:hidden text-2xl cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "✕" : "☰"}
            </button>
          )}

          {isAuth && (
            <button
              onClick={onLogout}
              className="hidden md:block cursor-pointer bg-red-50 dark:bg-red-900/20 text-red-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-600 hover:text-white transition"
            >
              Выйти
            </button>
          )}
        </div>
      </div>

      {isOpen && isAuth && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 shadow-xl">
          <Link
            to="/"
            onClick={() => handleNav("all")}
            className="text-left font-black text-2xl tracking-tighter uppercase italic"
          >
            Новости
          </Link>
          <Link
            to="/"
            onClick={() => handleNav("fav")}
            className="text-left font-black text-2xl tracking-tighter uppercase italic"
          >
            Закладки
          </Link>
          <Link
            to="/"
            onClick={() => handleNav("about")}
            className="text-left font-black text-2xl tracking-tighter uppercase italic"
          >
            О нас
          </Link>
          <div className="h-[1px] bg-gray-100 dark:bg-gray-800 w-full"></div>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="text-left text-red-500 font-bold uppercase tracking-widest"
          >
            Выйти из аккаунта
          </button>
        </div>
      )}
    </header>
  );
}
