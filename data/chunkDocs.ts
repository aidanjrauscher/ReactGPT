import fs from 'fs'
import { Doc, DocChunk } from '@/types'
import { encode } from 'gpt-3-encoder'

const CHUNK_SIZE = 256

const generateDocChunks = async(doc: Doc)=>{
    const { url, title, content, numTokens } = doc

    let docChunks = []

    //check that doc content is larger than chunk size
    if(numTokens > CHUNK_SIZE){

        const contentLines = content.split(/\r?\n/)
        const numLines = contentLines.length

        let chunkContent = ""

        //iterate over every line in content
        for (let l=0; l<numLines; l++){
            const line = contentLines[l]
            const lineNumTokens = encode(line).length
            const chunkContentNumTokens = encode(chunkContent).length

            //if line+chunkContent exceeds chunk size, add current chunk content to docChunks and reset chunkContent 
            if(lineNumTokens+chunkContentNumTokens > CHUNK_SIZE){
                docChunks.push(chunkContent)
                chunkContent = ""
            }
            
            //otherwise add line to current chunk
            chunkContent += line + "\n"

        }

        docChunks.push(chunkContent.trim())
    }
    else { //add all content as single chunk if its leq chunk size
        docChunks.push(content.trim())
    }

    //map each chunk of the doc content to a DocChunk object
    const chunkObjects = docChunks.map((content)=>{
        const chunk : DocChunk = {
            url: url,
            title: title,
            content: content.trim(),
            chunkLength: content.trim().length,
            chunkNumTokens: encode(content.trim()).length,
            embedding: []
        }

        return chunk
    })

    if(chunkObjects.length>1){
        for(let o=0; o<chunkObjects.length; o++){
            const currChunk = chunkObjects[o]
            const prevChunk = chunkObjects[o-1]

            if(currChunk.chunkNumTokens < 128 && prevChunk){
                prevChunk.content += "\n" + currChunk.content
                prevChunk.chunkLength += currChunk.chunkLength
                prevChunk.chunkNumTokens += currChunk.chunkNumTokens
                chunkObjects.splice(o,1)
                o--
            }
        }
    }

    const chunkedDoc : Doc = {
        ...doc,
        chunks: chunkObjects
    }
    
    return chunkedDoc

} 


(async ()=> {
    const docs: Doc[] = JSON.parse(fs.readFileSync("data/react-docs.json", "utf8"))

    const chunkedDocs: Doc[]= []
    for (let i=0; i<docs.length; i++){
        const chunkedDoc : Doc = await generateDocChunks(docs[i])
        chunkedDocs.push(chunkedDoc)
    }

    const chunkedDocsString = JSON.stringify(chunkedDocs)
    fs.writeFileSync("data/react-docs-chunks.json", chunkedDocsString)
})()
