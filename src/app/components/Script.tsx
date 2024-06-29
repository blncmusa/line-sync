// components/Script.tsx
import React from "react";
import { useStore } from "../../store/useStore";
import { isArabic } from "../../utils/isArabic";
import { formatTimestamp } from "../../utils/formatTimestamp";
import Timestamp from "./Timestamp";

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
    currentTime,
    setIsPlaying,
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

  const handleLineClick = (index: number) => {
    setCurrentLineIndex(index);
    if (lines[index].timestamp && audioRef?.current) {
        audioRef.current.currentTime = lines[index].timestamp || 0 // converting milliseconds to seconds
        audioRef.current.play();
        setIsPlaying(true);
      }
  }

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
            <div className="items-center flex flex-row-reverse justify-between">
                <p
                    key={index}
                    ref={(element) => {
                        lineRefs.current[index] = element as HTMLParagraphElement;
                    }}
                    className={`lines ${index === currentLineIndex ? "bg-blue-400" : ""}`}
                    onClick={() => handleLineClick(index)}
                    >
                    {line.text}
                </p>
                {line.timestamp && (
                    <Timestamp line={{ timestamp: line.timestamp }} index={index} />
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Script;
