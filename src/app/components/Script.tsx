import React from "react";
import { useStore } from "../../store/useStore";
import { isArabic } from "../../utils/isArabic"

const Script: React.FC = () => {
  const { scriptFile, setScriptFile, scriptContent, setScriptContent } = useStore();

  const handleScriptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setScriptContent(event.target?.result as string);
      };
      reader.readAsText(file);
      setScriptFile(file);
    }
  };

  const splitTextIntoLines = (text: string, wordsPerLine: number) => {
    const words = text.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine){
        lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines;
  }

  const lines = scriptContent ? splitTextIntoLines(scriptContent, 8) : [];

  return (
    <div>
      {!scriptFile && (
        <div>
          <h1>Upload Script File</h1>
          <input type="file" accept=".txt" onChange={handleScriptUpload} />
        </div>
      )}
      {scriptFile && (
        <div className={`${isArabic(scriptContent || "") ? "text-right" : "text-left"}`}>
            { lines.map((line, index) => {
                return <p key={index} className="lines">{line}</p>;
            })}
        </div>
      )}
    </div>
  );
};

export default Script;
