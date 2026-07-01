import { useState } from "react";

interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "12345") {
      setError(false);
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 max-w-sm w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-2 text-blue-600 dark:text-blue-400">
            Вход
          </h2>  
          <p className="text-gray-500 text-sm">
            Добро пожаловать в HEADLINERS.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <input
              type="text"
              placeholder="Логин (admin)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl border-2 outline-none transition-all bg-gray-50 dark:bg-gray-800 dark:text-white ${
                error
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
              }`}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl border-2 outline-none transition-all bg-gray-50 dark:bg-gray-800 dark:text-white ${
                error
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-blue-500"
              }`}
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs font-bold text-center uppercase tracking-widest animate-in slide-in-from-top-2">
              Неверный логин или пароль
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold uppercase tracking-widest py-4 rounded-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-blue-500/30"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
