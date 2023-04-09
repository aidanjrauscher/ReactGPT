import { DocChunk } from '@/types'
import { string } from 'prop-types'
import { create } from 'zustand'

export interface GenerationStoreInterface{
    chunks: DocChunk[];
    query: string;
    answer: string;
    loading: boolean;
    updateChunks: (chunks: DocChunk[])=>void;
    updateQuery: (query: string)=>void;
    updateAnswer: (answer:any)=>void;
    updateLoading:(loading:boolean)=>void;

}

const useGenerationStore = create<GenerationStoreInterface>((set)=>({
    chunks: [],
    query: '',
    answer: '',
    loading: false,
    updateChunks: (chunks)=>set({chunks: [...chunks]}),
    updateQuery: (query)=>set({query: query}),
    updateAnswer: (answer)=>set({answer: answer}),
    updateLoading: (loading)=>set({loading: loading})
}))

export default useGenerationStore