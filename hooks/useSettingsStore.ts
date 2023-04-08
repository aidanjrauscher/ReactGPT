import { create } from "zustand"

export interface SettingsStoreInterface{
    apiKey : string;
    updateApiKey: (apiKey:string)=>void;
    tokens: number;
    updateTokens:(tokens:number)=>void;
    showSettings: boolean;
    openSettings: ()=>void;
    closeSettings: ()=>void;
}

const useSettingsStore = create<SettingsStoreInterface>((set)=>({
    apiKey: '', 
    updateApiKey: (apiKey)=>set({apiKey: apiKey}),
    tokens: 250,
    updateTokens: (tokens)=>set({tokens: tokens}),
    showSettings: false,
    openSettings: ()=>set({showSettings: true}),
    closeSettings: ()=>set({showSettings: false})
}))

export default useSettingsStore