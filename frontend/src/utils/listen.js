let recognition;

export const startListening = (onResult) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition not supported ❌");
    return;
  }

  recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false; // 🔥 one answer at a time
  recognition.interimResults = false;

  recognition.start();

  console.log("🎤 Listening started...");

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("User said:", transcript);

    onResult(transcript);
  };

  recognition.onerror = (err) => {
    console.error("Mic error:", err);
  };
};