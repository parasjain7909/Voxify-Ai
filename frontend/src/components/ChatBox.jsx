import Message from "./Message";

export default function ChatBox({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 space-y-3">
      {messages.map((msg, i) => (
        <Message key={i} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
}