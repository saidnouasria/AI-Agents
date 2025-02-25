import { z } from "zod"
import { ToolFn } from "../../types"
import{openai} from '../ai'
export const generateImageToolDef = {
  name: "generate_image",
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        "the prompt to use to generate the image. Be sure to consider the users original message when making the prompt. If you are unsure , then ask the user to provide more details"
      ),
  }),
  description: "generate an image",
}

type Args = z.infer<typeof generateImageToolDef.parameters>

export const generateImage:ToolFn<Args,string> = async({
    toolArgs,
    userMessage
})=>{
    const response = await openai.images.generate({
        model:'dall-e-3',
        prompt:toolArgs.prompt,
        n:1,
        size:'1024x1024'
    })
    return response.data[0].url!
}