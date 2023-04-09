export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo"
}

export type ReactChunk = {
  pageContent: string;
  source: string;
  metadata: Metadata;
  length: number;
};

interface Metadata {
  id: string;
  title: string;
  link: string;
}

export type Doc = {
  url: string;
  title: string;
  length: number;
  numTokens: number;
  content: string;
  chunks: DocChunk[];
};

export type DocChunk = {
  url: string;
  title: string;
  content: string;
  chunkLength: number;
  chunkNumTokens: number;
  embedding: number[];
};
