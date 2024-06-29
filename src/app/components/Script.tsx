// components/Script.tsx
import React from "react";
import { useStore } from "../../store/useStore";
import { isArabic } from "../../utils/isArabic";

const Script: React.FC = () => {
  const {
    scriptFile,
    setScriptFile,
    scriptContent,
    setScriptContent,
    lines,
    setLines,
    currentLineIndex,
    setCurrentLineIndex,
    setTimeStampForCurrentLine,
    audioRef,
    currentTime
  } = useStore();

  const lineRefs = React.useRef<HTMLParagraphElement[]>([]);

  const handleScriptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setScriptContent(content);
        const splitContent = splitTextIntoLines(content, 8);
        setLines(splitContent.map((line) => ({ text: line, timestamp: null })));
      };
      reader.readAsText(file);
      setScriptFile(file);
    }
  };

  const splitTextIntoLines = (text: string, wordsPerLine: number) => {
    const words = text.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    return lines;
  };

  React.useEffect(() => {
   if(lineRefs.current[currentLineIndex]){
        lineRefs.current[currentLineIndex]
        .scrollIntoView({
            behavior: "smooth", 
            block: "center"
        })
   }
  }, [currentLineIndex]);

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
          {lines.map((line, index) => (
            <p
              key={index}
              ref={(element) => {
                lineRefs.current[index] = element as HTMLParagraphElement;
              }}
              className={`lines ${index === currentLineIndex ? "bg-blue-400" : ""}`}
            >
              {line.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Script;
