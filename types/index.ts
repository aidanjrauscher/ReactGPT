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
