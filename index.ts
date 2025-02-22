import "dotenv/config"
import { z } from "zod"
import { runAgent } from "./src/agent"

const userMessage = process.argv[2]

if (!userMessage) {
  console.error("Please provide a message")
  process.exit(1)
}

const weatherTool = {
  name: "get_weather",
  parameters: z.object({
    
  }),
}

const shoppingTool = {
  name: "shop_shoes",
  parameters: z.object({
    reasoning : z.string().describe('why did you pick this tool?')
  }),
}

const response = await runAgent({ userMessage, tools: [weatherTool ,shoppingTool] })

console.log(response)
