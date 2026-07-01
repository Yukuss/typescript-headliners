export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in duration-700">
      <div className="mb-10">
        <h2 className="text-6xl font-black tracking-tighter uppercase italic dark:text-white">
          О проекте
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-8">
          <p className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-400 leading-tight">
            Мы верим, что в мире бесконечного информационного шума{" "}
            <span className="text-black dark:text-white font-bold italic">
              чистота восприятия
            </span>{" "}
            - это новая роскошь.
          </p>

          <div className="h-[1px] bg-gray-200 dark:bg-gray-800 w-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-500 mb-3 transition-transform">
                01. Концепция
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                HEADLINERS - это агрегатор, который не просто собирает новости,
                а упаковывает их в эстетически безупречную форму. Никакой лишней
                рекламы и визуального мусора.
              </p>
            </div>
            <div className="group">
              <h4 className="font-black uppercase tracking-widest text-xs text-blue-500 mb-3 transition-transform">
                02. Технологии
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Построен на базе React 18 с использованием Tailwind CSS. Мы
                используем локальное хранилище для мгновенной синхронизации
                ваших закладок и настроек темы.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-800 group">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80"
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              alt="News & Media"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black italic">
            H.
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest">
              Headliners App
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
              v1.2.0 Stable Build
            </p>
          </div>
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Дизайн и разработка: Daniil Kundelev
        </p>
      </div>
    </div>
  );
}
