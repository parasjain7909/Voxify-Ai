import { getAIResponse } from "../services/aiservice.js";

export const chatHandler = async (req, res) => {
  try {
    const { message, mode, category, questionCount } = req.body;

    let systemPrompt = "";

    if (mode === "interview") {
      systemPrompt = `
You are a strict voice-based ${category} interviewer.

IMPORTANT RULES:
- Total questions: ${questionCount}
- Start interview ONLY when user says "START_INTERVIEW"
- First ask a simple conceptual question (NO coding)
- Example: What is React?

FLOW:
1. Ask question
2. Wait for spoken answer
3. Give:
   - Score out of 10
   - Short feedback
4. Ask next question

NEVER ask to write code.
ONLY ask theory / spoken questions.
`;
    } else {
      systemPrompt = `You are a helpful assistant.`;
    }

    const reply = await getAIResponse(message, systemPrompt);

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
};