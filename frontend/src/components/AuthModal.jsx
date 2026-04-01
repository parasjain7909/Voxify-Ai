import { useState } from "react";

export default function AuthModal({ onClose, setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (isLogin) {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        onClose();
      } else {
        alert("Login failed ❌");
      }
    } else {
      alert("Signup success ✅ अब login करो");
      setIsLogin(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-gray-900 p-6 rounded-2xl w-80 border border-gray-700 shadow-2xl">

        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login 🔐" : "Signup 🚀"}
        </h2>

        {!isLogin && (
          <input
            placeholder="Name"
            className="w-full mb-2 p-2 rounded bg-gray-800"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        )}

        <input
          placeholder="Email"
          className="w-full mb-2 p-2 rounded bg-gray-800"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-800"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-center mt-3 text-gray-400 cursor-pointer"
        >
          {isLogin
            ? "Don't have account? Signup"
            : "Already have account? Login"}
        </p>

        <button
          onClick={onClose}
          className="text-xs text-gray-500 mt-3 w-full"
        >
          Close
        </button>

      </div>
    </div>
  );
}