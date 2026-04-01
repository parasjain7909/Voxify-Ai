export const speak = (text, onEnd) => {
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "en-US";

  utterance.onstart = () => {
    console.log("🤖 AI speaking...");
  };

  utterance.onend = () => {
    console.log("✅ AI finished speaking");

    if (onEnd) onEnd(); // 🔥 THIS IS KEY
  };

  speechSynthesis.cancel(); // 🔥 previous speech clear
  speechSynthesis.speak(utterance);
};