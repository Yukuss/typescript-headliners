import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DATA } from "../data/newsData";

interface Props {
  favs: number[];
  toggleFav: (id: number) => void;
}

export default function NewsPage({ favs, toggleFav }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const newsItem = DATA.find((n) => n.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!newsItem)
    return (
      <div className="text-center py-20 text-2xl font-black uppercase italic opacity-50">
        Новость не найдена
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 font-medium hover:text-blue-700 transition cursor-pointer flex items-center gap-2"
      >
        <span>←</span> Назад
      </button>

      <div className="relative mb-8">
        <img
          src={newsItem.image}
          className="w-full h-[450px] object-cover rounded-[2rem] shadow-2xl"
          alt=""
        />
        <button
          onClick={() => toggleFav(newsItem.id)}
          className={`absolute top-6 right-6 p-4 rounded-2xl shadow-xl backdrop-blur-md transition-all active:scale-90 cursor-pointer ${favs.includes(newsItem.id) ? "bg-yellow-500 text-white" : "bg-white/90 dark:bg-gray-800/90 text-gray-400 hover:text-gray-600"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={favs.includes(newsItem.id) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </button>
      </div>

      <div className="flex gap-3 mb-4 items-center">
        <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
          {newsItem.cat}
        </span>
        <span className="text-gray-400 text-sm font-bold uppercase">
          {newsItem.date}
        </span>
      </div>

      <h1 className="text-5xl font-black mb-8 leading-[1.1] dark:text-white tracking-tighter italic">
        {newsItem.title}
      </h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-8 border-blue-500 pl-8 py-2">
        {newsItem.fullText}
      </p>
    </div>
  );
}
