import { Answer } from "@/components/Answer/Answer";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import Head from "next/head";
import useSettingsStore from "@/hooks/useSettingsStore";
import { 
  IconExternalLink, 
} from "@tabler/icons-react";
import useGenerationStore from "@/hooks/useGenerationStore";
import SettingsModal from "@/components/SettingsModal";
import Prompt from "@/components/Prompt";
import {Comment} from "react-loader-spinner"


export default function Home() {

  const { apiKey } = useSettingsStore()
  const {chunks, query, answer, loading, updateChunks, updateQuery, updateAnswer, updateLoading} = useGenerationStore()
  
  return (
    <>
      <Head>
        <title>ReactGPT</title>
        <meta
          name="description"
          content={`AI-powered search and chat for the React documentation. `}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="shortcut icon"
          href="/favicon.png"
        />
      </Head>
      <main>
      <SettingsModal></SettingsModal>
      <div className="flex flex-col h-screen bg-gray-700 text-white">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex h-full w-screen max-w-[90vw] flex-col items-center px-3 pt-4 sm:pt-8">

            <Prompt/>
            {loading ? (
              <div className="mt-6 w-full">

                <div className="font-bold text-2xl mt-6">Documentation</div>
                <div className="animate-pulse mt-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="h-4 bg-gray-300 rounded mt-2"></div>
                </div>
              </div>
            ) : answer ? (
              <div className="flex flex-row w-full grow gap-8 mt-16">
                <div className="flex flex-col w-1/2 h-96 mb-2">
                  <div className="font-bold text-2xl mb-2">Answer</div>
                  <Answer text={answer} />
                </div>
                <div className="flex flex-col w-1/2 mb-10">
                  <div className="font-bold text-2xl">Documentation</div>

                  {chunks.map((chunk, index) => (
                    <div key={index}>
                      <div className="mt-4 border border-gray-800 rounded-lg p-4 shadow-md shadow-black">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="">
                              <div className="font-bold text-xl">{chunk.title}</div>
                            </div>
                          </div>
                          <a
                            className="hover:opacity-50 ml-4"
                            href={chunk.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <IconExternalLink />
                          </a>
                        </div>
                        <div className="mt-4 ml-2">{chunk.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : chunks.length > 0 ? (
              <div className="flex flex-row w-full grow gap-8 mt-16">
                <div className="flex flex-col w-1/2 h-96 mb-2">
                  <div className="font-bold text-2xl mb-2">Answer</div>
                    <Comment backgroundColor="#61DBFB" color="white" height="100" width="100"/>
                  </div>
                <div className="flex flex-col w-1/2 mb-10">
                  <div className="font-bold text-2xl">Documentation</div>

                  {chunks.map((chunk, index) => (
                    <div key={index}>
                      <div className="mt-4 border border-gray-800 rounded-lg p-4 shadow-md shadow-black">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="">
                              <div className="font-bold text-xl">{chunk.title}</div>
                            </div>
                          </div>
                          <a
                            className="hover:opacity-50 ml-4"
                            href={chunk.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <IconExternalLink />
                          </a>
                        </div>
                        <div className="mt-4 ml-2">{chunk.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center text-lg">{`AI-powered search and chat for the React documentation.`}</div>
            )}
          </div>
        </div>
        <Footer />
      </div>
      </main>
    </>
  );
}
