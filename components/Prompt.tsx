import useGenerationStore from "@/hooks/useGenerationStore";
import useSearchResults from "@/hooks/useSearchResults";
import useSettingsStore from "@/hooks/useSettingsStore";
import { IconSearch, IconSettings } from "@tabler/icons-react";
import { KeyboardEvent, useRef } from "react";

export default function Prompt(){
    const {apiKey,  showSettings, openSettings, closeSettings} = useSettingsStore()
    const {query, updateQuery} = useGenerationStore()

    const inputRef = useRef<HTMLInputElement>(null);   

    const handleSearchResults = useSearchResults()

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchResults()
        }
    };

    return(
        <div className="flex flex-row w-screen justify-center items-center gap-2 px-1 pt-2 flex-wrap">
            {apiKey.length === 51 ? (
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="What does the useEffect hook do in React?"
                        className="bg-chatgpt-grey-accent shadow-sm shadow-chatgpt-black h-10 w-[60vw] rounded-md p-1 focus:outline-chatgpt-grey-light text-gray-800"
                        value={query}
                        onChange={(e) => updateQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <IconSearch color="black" className={`absolute rotate right-1 top-2 ${apiKey ? "hover:cursor-pointer hover:opacity-75" : "" }`}/>
                </div>
            ) : (
                <div className="text-center font-bold text-3xl mt-7">
                    Please enter your OpenAI API key in settings.
                </div>
            )}
            <IconSettings
                onClick={() => showSettings ? closeSettings() : openSettings()}
                size="24" 
                className="hover:opacity-75 hover:cursor-pointer text-white"
            />
        </div>
    )
}