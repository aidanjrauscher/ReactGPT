import { Configuration, OpenAIApi } from "openai";
import fs from "fs"
import { supabasedb } from "@/lib/supabasedb";
import { Doc } from "@/types";
import * as dotenv from 'dotenv'
dotenv.config()

const generateTextEmbeddings = async(docs : Doc[])=>{

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    })

    const openai = new OpenAIApi(configuration)

    for (let i=0; i<docs.length; i++){
        const doc = docs[i]

        for (let j=0; j<doc.chunks.length; j++){
            const chunk = doc.chunks[j]

            const {title, url, content, chunkLength, chunkNumTokens} = chunk

            const response = await openai.createEmbedding({
                model: "text-embedding-ada-002",
                input: content
            })

            if(response.status != 200){
                throw new Error(`Error: ${response}`)
            }
            else{
                const [{embedding}] = response.data.data

                try{
                    //insert chunk into db
                    //had to do raw query to handle vector extension - i guess using prisma was pointless LMAO
                    const { data, error } = await supabasedb
                        .from("chunk_embedding")
                        .insert({
                            title,
                            url,
                            content,
                            numTokens: chunkNumTokens,
                            embedding
                        })
                        .select("*");
 
                }
                catch(error){
                    console.log(`Error adding ${title} - chunk ${j} to database: ${error}`)
                }
            }
        }
    }
    
}

// const getChunkCount = (docs: Doc[])=>{
//     let count = 0
//     for(let i =0; i<docs.length; i++){
//         for (let j=0; j<docs[i].chunks.length; j++){
//             count++ 
//         }
//     }
//     console.log(count)
// }

const docs: Doc[] = JSON.parse(fs.readFileSync("data/react-docs-chunks.json", "utf8"))
generateTextEmbeddings(docs)
