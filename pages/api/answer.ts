import { ChatGPTAPI } from 'chatgpt'
// import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { query, apiKey, tokens } = req.body

  // const configuration = new Configuration({
  //   apiKey: apiKey,
  // });

  const system_prompt = `You are a helpful assistant that accurately answers queries using documentation from the front-end JavaScript library React. Use the text and code examples provided to form your answer, but avoid copying word-for-word from the documentation. Try to use your own words when possible. Keep your answer under 120 words. Be accurate, helpful, concise, and clear. Use the following passages to provide an answer to the query: "${query}"`


  const chatgpt = new ChatGPTAPI({
    apiKey: apiKey,
    systemMessage: system_prompt,
    completionParams: {
      temperature: 0,
      max_tokens: tokens
    },

  })

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  const sendData = (data: string) => {
    if (res.writableEnded) {
      console.log("Response has already ended, cannot write more data");
      return;
    }
    res.write(`data: ${data}\n\n`);
  };

  const answer = await chatgpt.sendMessage(query,{
    onProgress: (stream)=>{sendData(JSON.stringify({ data: stream.text }))}
  })



  try {
    
  } catch (err) {
    console.error(err);
  } finally {
    sendData(JSON.stringify({data: "DONE"}) );
    res.end();
  }  
};

