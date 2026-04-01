export default function Avatar({ isSpeaking }) {
  return (
    <div className="flex justify-center py-6">
      <div
        className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
          isSpeaking
            ? "bg-blue-500/30 shadow-lg shadow-blue-500/40 animate-pulse"
            : "bg-gray-800"
        }`}
      >
        🤖
      </div>
    </div>
  );
}