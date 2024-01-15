/* eslint-disable no-console */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class ScriapService {

  getHello(): string {
    return 'Hello World!';
  }

  async generateText (prompt: string) {
    console.log(`Generating text with prompt: ${prompt}`);

    try {
      const completion = await openai.chat.completions.create({
        messages: [{
          role: "system",
          content: prompt
        }],
        model: "gpt-3.5-turbo",
      });

      console.log(completion.choices[0]);

      return completion?.choices[0]?.message.content || new HttpException("No response from OpenAI", HttpStatus.FORBIDDEN);

    } catch ({ error }) {
      console.log({ error })
      return new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }

  async generateImage (prompt: string) {
    console.log(`Generating image with prompt: ${prompt}`);

    try {
      const result = await openai.images.generate({
        model: "dall-e-2",
        prompt,
        size:"1024x1024",
        quality:"standard",
        n:1,
      });
  
      console.log(result.data[0]);

      return result;

    } catch ({ error }) {
      console.log({ error })
      return new HttpException(error.message, HttpStatus.FORBIDDEN)
    }

  }


  

}