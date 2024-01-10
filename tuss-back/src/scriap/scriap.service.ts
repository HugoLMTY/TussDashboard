/* eslint-disable no-console */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

@Injectable()
export class ScriapService {

  getHello(): string {
    return 'Hello World!';
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