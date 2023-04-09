import { DocChunk } from "@/types";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useCallback, useEffect } from "react";
import useGenerationStore from "./useGenerationStore";
import useSettingsStore from "./useSettingsStore";

export default function useSearchResults(){



    const { chunks, query, answer, loading, updateChunks, updateAnswer, updateLoading } = useGenerationStore()
    const { apiKey, tokens } = useSettingsStore()

    const handleSearchResults = async ()=>{
        if (!apiKey) {
            alert("Please enter an API key.");
            return;
        }
        
        if (!query) {
            alert("Please enter a query.");
            return;
        }

        updateLoading(true)

        const response = await fetch("/api/search", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ query, apiKey, matches: 5 })
        })
        if (!response.ok) {
            updateLoading(false);
            throw new Error(response.statusText);
        }

        const data: DocChunk[] = await response.json()
        updateChunks(data)

        const prompt = `Use the following pages from the React documentation to answer the user's query: "${query}"
        
        ${data?.map((chunk:DocChunk)=>chunk.content).join("\n\n\n")}`

        fetchEventSource("/api/answer",  {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ query, apiKey, tokens}),
            onmessage: (event) => { 
            updateLoading(false);
            const data = JSON.parse(event.data);
            if (data.data === "DONE") {

            } else {
                // Stream text
                updateAnswer(data.data);
            }
        }});
    }

    return handleSearchResults
}


