import { useState } from "react";
import { startListening } from "../utils/listen.js";

export default function InputBar({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-4 border-t border-gray-800 flex items-center gap-2 backdrop-blur-md">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none focus:border-blue-500"
        placeholder="Type your answer..."
      />

      <button
  onClick={() => startListening(setInput)}
  className="bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-700"
>
  🎤
</button>

      <button
        onClick={handleSend}
        className="bg-blue-600 px-5 py-2 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30"
      >
        Send
      </button>
    </div>
  );
}