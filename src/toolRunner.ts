import OpenAI from "openai"
import { dadJoke, dadJokeToolDef } from "./tools/dadJoke"
import { generateImage, generateImageToolDef } from "./tools/generateImage"

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
  }

  switch (toolCall.function.name) {
    case generateImageToolDef.name:
      return generateImage(input)

    case dadJokeToolDef.name:
      return dadJoke(input)

    default:
      return `never run this tool again : ${toolCall.function.name}`
  }
}
