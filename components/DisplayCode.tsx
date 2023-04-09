import React from "react";
import { CodeBlock, dracula } from "react-code-blocks"

interface CodeBlockProps {
    code: string;
  }

export default function DisplayCode({code}: CodeBlockProps){

    const trimmedCode = code.replace(/(\n*)(```)(\n*)/g, "")

    return(
        <div className="px-2 py-8">
            <CodeBlock
                text={trimmedCode}
                language="javascript"
                theme={dracula}
                showLineNumbers={false}
            />
        </div>
    )
}