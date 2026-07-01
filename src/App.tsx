import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import NewsPage from "./pages/NewsPage";
import AboutPage from "./pages/AboutPage";
import { DATA, CATEGORIES } from "./data/newsData";

export default function App() {
  const [isAuth, setIsAuth] = useState(
    () => localStorage.getItem("h_auth") === "true",
  );
  const [favs, setFavs] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("h_favs") || "[]"),
  );
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("h_dark") === "true",
  );

  const [tab, setTab] = useState<"all" | "fav" | "about">("all");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Все");
  const [sort, setSort] = useState<"new" | "old" | "az" | "za">("new");

  useEffect(() => {
    localStorage.setItem("h_auth", isAuth.toString());
    localStorage.setItem("h_favs", JSON.stringify(favs));
    localStorage.setItem("h_dark", isDark.toString());
    document.documentElement.classList.toggle("dark", isDark);
  }, [isAuth, favs, isDark]);

  const toggleFav = (id: number) => {
    setFavs((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const currentNews = useMemo(() => {
    return DATA.filter((n) => (tab === "all" ? true : favs.includes(n.id)))
      .filter((n) => (filter === "Все" ? true : n.cat === filter))
      .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === "new")
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sort === "old")
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sort === "az") return a.title.localeCompare(b.title);
        if (sort === "za") return b.title.localeCompare(a.title);
        return 0;
      });
  }, [tab, favs, filter, search, sort]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-500">
        <Header
          isDark={isDark}
          toggleTheme={() => setIsDark(!isDark)}
          isAuth={isAuth}
          onLogout={() => {
            setIsAuth(false);
            setTab("all");
          }}
          setTab={setTab}
        />

        <Routes>
          <Route
            path="/"
            element={
              !isAuth ? (
                <Login onLogin={() => setIsAuth(true)} />
              ) : tab === "about" ? (
                <AboutPage />
              ) : (
                <main className="max-w-6xl mx-auto p-6 animate-in fade-in duration-500">
                  <div className="mb-10">
                    <h2 className="text-6xl font-black tracking-tighter uppercase italic mb-8 dark:text-white">
                      {tab === "all" ? "НОВОСТИ" : "ЗАКЛАДКИ"}
                    </h2>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          placeholder="Поиск по заголовку..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 focus:border-blue-500 outline-none transition-all shadow-sm"
                        />
                        <span className="absolute left-4 top-4.5 text-xl opacity-30">
                          🔍
                        </span>
                      </div>

                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as any)}
                        className="bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 py-4 px-6 rounded-2xl outline-none cursor-pointer font-bold"
                      >
                        <option value="new">Новые</option>
                        <option value="old">Старые</option>
                        <option value="az">А — Я</option>
                        <option value="za">Я — А</option>
                      </select>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {CATEGORIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => setFilter(c)}
                          className={`px-6 py-2 rounded-xl text-sm font-black tracking-widest uppercase transition-all cursor-pointer border-2 whitespace-nowrap ${filter === c ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-400 hover:border-blue-400"}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {currentNews.length === 0 ? (
                    <div className="text-center py-20 opacity-30 text-2xl font-black italic uppercase">
                      Ничего не найдено
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {currentNews.map((n) => (
                        <article
                          key={n.id}
                          className="group bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col"
                        >
                          <Link
                            to={`/news/${n.id}`}
                            className="block overflow-hidden relative"
                          >
                            <img
                              src={n.image}
                              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                              alt=""
                            />
                            <div className="absolute bottom-4 left-4">
                              <span className="px-3 py-1 bg-white dark:bg-gray-900 text-[10px] font-black rounded-lg uppercase tracking-widest shadow-lg">
                                {n.cat}
                              </span>
                            </div>
                          </Link>

                          <div className="p-8 flex flex-col flex-grow">
                            <Link to={`/news/${n.id}`}>
                              <h3 className="text-2xl font-black mb-4 leading-[1.2] group-hover:text-blue-600 transition-colors tracking-tighter">
                                {n.title}
                              </h3>
                            </Link>
                            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                              {n.text}
                            </p>

                            <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                {n.date}
                              </span>
                              <button
                                onClick={() => toggleFav(n.id)}
                                className={`cursor-pointer transition-all active:scale-150 ${favs.includes(n.id) ? "text-yellow-500" : "text-gray-200 dark:text-gray-700 hover:text-gray-400"}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill={
                                    favs.includes(n.id)
                                      ? "currentColor"
                                      : "none"
                                  }
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </main>
              )
            }
          />
          <Route
            path="/news/:id"
            element={
              isAuth ? (
                <NewsPage favs={favs} toggleFav={toggleFav} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
