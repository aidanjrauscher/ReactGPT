import React, { useEffect, useState } from "react";
import styles from "./answer.module.css";
import DisplayCode from "../DisplayCode";

interface AnswerProps {
  text: string;
}

export const Answer: React.FC<AnswerProps> = ({ text }) => {
  const [answer, setAnswer] = useState<any[]>([]);
  const codeSplitText = /(```[\s\S]+?(```|$))/


  useEffect(() => {
    //save code from text
    //remove code from text
    //add code component back into text
    const splitText = splitCodeBlock(text)
    setAnswer(splitText)
  }, [text]);

  const splitCodeBlock = (text: String)=>{
    const codeRegex = /(```[\s\S]*?(```|$))/g
    //split text by sections that begin with ``` and with ``` or string end (handles cases where code block gets cutoff)
    let splitText = text.split(codeRegex)
    //filter out elements that just contain ticks and return 
    return splitText.filter((text)=>!/^```$/.test(text))
  }

  return (
    <div className="border border-gray-800 p-4 rounded-md shadow-md shadow-black">
      {answer.map((text)=>(
        codeSplitText.test(text) ? (
          <DisplayCode key={Math.random()} code={text}/>
        ):(
          text.split(" ").map((word:any, index: any) => (
            <span
              key={index}
              className={styles.fadeIn}
              style={{ animationDelay: `${index * 0.001}s` }}
            >
              {word}{" "}
            </span>
          ))
        )
    ))}
    </div>
  );
};
