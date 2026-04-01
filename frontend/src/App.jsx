import { useState, useRef, useEffect } from "react";
import Avatar from "./components/Avtar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import InputBox from "./components/InputBox.jsx";
import { speak } from "./utils/speak";
import { startListening } from "./utils/listen";
import CameraPreview from "./components/ui/CameraPreview.jsx";

// ✅ Import images
import codingImg from "./assets/coding.jpg"
import hrImg from "./assets/hr.jpg";
import economyImg from "./assets/economy.jpeg";
import growthImg from "./assets/self.jpg";

function App() {
  const [messages, setMessages] = useState([
    { text: "Welcome to Voxify AI 🚀", sender: "ai" },
  ]);

  const [mode, setMode] = useState("chat");
  const [category, setCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(null);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [timer, setTimer] = useState(0);

  const cameraRef = useRef(null);

  // ⏱ Timer
  useEffect(() => {
    let interval;
    if (interviewStarted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [interviewStarted]);

  // 🎯 Start Interview
  const startInterviewFlow = () => {
    setInterviewStarted(true);
    setTimer(0);
    setCurrentQuestion("");
    setUserAnswer("");
    handleSend("START_INTERVIEW");
  };

  // 🎯 AI CALL
  const handleSend = async (text) => {
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          mode,
          category,
          questionCount,
        }),
      });

      const data = await res.json();

      if (mode === "interview" && interviewStarted) {
        setCurrentQuestion(data.reply);

        speak(data.reply, () => {
          setTimeout(() => {
            startListening((voiceText) => {
              setUserAnswer(voiceText);
              handleSend(voiceText);
            });
          }, 300);
        });

      } else {
        const userMessage = { text, sender: "user" };
        const aiMessage = { text: data.reply, sender: "ai" };

        setMessages((prev) => [...prev, userMessage, aiMessage]);
        speak(data.reply);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* Header */}
      <div className="p-4 border-b border-gray-800 text-xl flex justify-between items-center backdrop-blur-md">
        Voxify AI 🤖

        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode("chat");
              setInterviewStarted(false);
            }}
            className={`px-4 py-1 rounded-lg transition ${
              mode === "chat" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Chat
          </button>

          <button
            onClick={() => {
              setMode("interview");
              setCategory(null);
              setQuestionCount(null);
              setInterviewStarted(false);
            }}
            className={`px-4 py-1 rounded-lg transition ${
              mode === "interview" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Interview
          </button>
        </div>
      </div>

      {/* Avatar */}
      {mode === "chat" && <Avatar />}

      {/* 🔥 PREMIUM CATEGORY UI */}
      {mode === "interview" && !category && (
        <div className="flex-1 flex items-center justify-center relative">

          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 blur-3xl" />

          {/* Cards */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 px-6">

            {[
              { name: "Coding", img: codingImg, color: "blue" },
              { name: "HR", img: hrImg, color: "green" },
              { name: "Economy", img: economyImg, color: "yellow" },
              { name: "Self Growth", img: growthImg, color: "purple" },
            ].map((cat) => (
              <div
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
              >

                {/* Glow */}
                <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-40 transition" />

                {/* Card */}
                <div className="relative bg-gray-900/70 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                  {/* Image */}
                  <div className="h-44 overflow-hidden">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 text-center">
                    <h3 className="text-white font-semibold text-lg">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Select to start interview
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* QUESTION COUNT */}
      {mode === "interview" && category && !questionCount && (
        <div className="flex justify-center gap-4 mt-10">
          {[3, 5, 10].map((num) => (
            <button
              key={num}
              onClick={() => setQuestionCount(num)}
              className="bg-gray-800 px-6 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              {num} Questions
            </button>
          ))}
        </div>
      )}

      {/* 🎥 INTERVIEW UI */}
      {mode === "interview" && category && questionCount && (
        <div className="flex-1 flex">

          {/* Camera */}
          <div className="flex-[6] border-b border-grey-800">
            <CameraPreview
              ref={cameraRef}
              onCameraStart={startInterviewFlow}
            />
          </div>

          {/* Chat */}
          <div className="flex-[4] p-6 flex flex-col justify-between bg-black/60 backdrop-blur-xl border-l border-gray-800">

            <div>
              <h2 className="text-blue-400 mb-2">🤖 Question</h2>
              <p className="text-lg">{currentQuestion || "Waiting..."}</p>
            </div>

            <div>
              <h2 className="text-green-400 mb-2">🎤 Answer</h2>
              <p>{userAnswer || "Listening..."}</p>
            </div>

            <div className="text-red-400 text-right font-bold">
              ⏱ {timer}s
            </div>

          </div>

        </div>
      )}

      {/* CHAT MODE */}
      {mode === "chat" && <ChatBox messages={messages} />}
      {mode === "chat" && <InputBox onSend={handleSend} />}

    </div>
  );
}

export default App;