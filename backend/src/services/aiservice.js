import groq from "../config/groq.js";

// 🔥 MEMORY STORE (simple)
let chatHistory = [];

export const getAIResponse = async (message, systemPrompt) => {
  // पहली बार system add करो
  if (chatHistory.length === 0) {
    chatHistory.push({
      role: "system",
      content: systemPrompt,
    });
  }

  // user message add
  chatHistory.push({
    role: "user",
    content: message,
  });

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: chatHistory,
  });

  const reply = response.choices[0].message.content;

  // AI reply save
  chatHistory.push({
    role: "assistant",
    content: reply,
  });

  return reply;
};