import type { NextApiRequest, NextApiResponse } from "next";
import { supabasedb } from "@/lib/supabasedb";



export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try {

    
    const { query, apiKey, matches } = req.body

    const input = query.replace("/\n/g", " ")
    
    const embedResponse = await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      method: "POST",
      body: JSON.stringify({
        model: "text-embedding-ada-002",
        input
      })
    });

    const json = await embedResponse.json();
    const embedding = json.data[0].embedding;

    const { data: chunks, error } = await supabasedb.rpc("reactgpt_search", {
      query_embedding: embedding,
      similarity_threshold: 0.01,
      match_count: matches
    });
    res.status(200).send(JSON.stringify(chunks))

  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
};
