import useSettingsStore from "@/hooks/useSettingsStore";
import React, { useEffect, useState } from "react";

export default function Settings(){

    const {apiKey, updateApiKey, tokens, updateTokens, showSettings, openSettings, closeSettings} = useSettingsStore()

    const handleSave = () => {
        if (apiKey.length !== 51) {
            alert("Please enter a valid API key.");
            return;
        }
        
        // Set values from user inputs 
        localStorage.setItem("KEY", apiKey);
        closeSettings();
    };
    
    const handleClear = () => {
        localStorage.removeItem("KEY");
        updateApiKey("");
    }
    
    useEffect(() => {
        const KEY = localStorage.getItem("KEY");
        if (KEY) {
            updateApiKey(KEY);
        }
    }, [apiKey]);

    return(
        <div 
        className={`${showSettings ? "display" : "hidden" }
            fixed inset-0 flex z-50 transition duration-200 justify-center items-center bg-gray-900 bg-opacity-75`}
        >
            <div className="bg-gray-900 h-min w-min rounded-md px-8 py-12 flex flex-col items-center gap-2 transition duration-300">
                <div className="mt-2">
                    <div>OpenAI API Key</div>
                    <input
                    type="password"
                    placeholder="OpenAI API Key"
                    className="w-[50vw] block rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    value={apiKey}
                    onChange={(e) => {
                        updateApiKey(e.target.value);

                        if (e.target.value.length !== 51) {
                        openSettings();
                        }
                    }}
                    />
                </div>

                <div className="mt-2">
                    <div>Max Number of Tokens</div>
                    <input
                    type="number"
                    min="1"
                    max="1000"
                    step={1}
                    placeholder="Tokens API Key"
                    className="w-[50vw] block rounded-md border border-gray-300 p-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    value={tokens}
                    onChange={(e) => {
                        updateTokens(/^([0-9]+|[^.-]*)$/.test(e.target.value) && Number(e.target.value)>0 && Number(e.target.value)<1001  ? Number(e.target.value) : 250);
                    }}
                    />
                </div>

                <div className="mt-4 flex space-x-2 justify-center">
                    <div
                    className="flex cursor-pointer items-center space-x-2 rounded-full bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                    onClick={handleSave}
                    >
                    Save
                    </div>

                    <div
                    className="flex cursor-pointer items-center space-x-2 rounded-full bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    onClick={handleClear}
                    >
                    Clear
                    </div>
                </div>
            </div>
        </div>
    )
}