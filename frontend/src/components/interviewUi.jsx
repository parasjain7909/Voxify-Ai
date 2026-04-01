export default function InterviewUI({ question, answer, timer, children }) {
  return (
    <div className="w-full h-full flex flex-col">

      {/* 🎥 60% CAMERA */}
      <div className="flex-[6] border-b border-gray-800">
        {children}
      </div>

      {/* 💬 40% INFO */}
      <div className="flex-[4] p-6 flex flex-col justify-between bg-black/60">

        <div>
          <h2 className="text-blue-400 text-lg mb-2">🤖 Question</h2>
          <p className="text-xl">{question || "Waiting..."}</p>
        </div>

        <div>
          <h2 className="text-green-400 text-lg mb-2">🎤 Your Answer</h2>
          <p className="text-lg">{answer || "Listening..."}</p>
        </div>

        <div className="text-red-400 text-lg font-bold text-right">
          ⏱ {timer}s
        </div>

      </div>
    </div>
  );
}