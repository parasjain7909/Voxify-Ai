export default function Message({ text, sender }) {
  return (
    <div
      className={`p-2 rounded max-w-xs ${
        sender === "user"
          ? "bg-blue-600 ml-auto"
          : "bg-gray-800"
      }`}
    >
      {text}
    </div>
  );
}