import { useStore } from "../../store/useStore";
import React from "react";

export default function TimestampControls(){

    const {
        lines,
        currentLineIndex,
        setCurrentLineIndex,
        setTimeStampForCurrentLine,
        audioRef,
      } = useStore();

    const handleNextLine = () => {
        setCurrentLineIndex(currentLineIndex + 1);
    };
    
    const handlePreviousLine = () => {
        if (currentLineIndex > 0) {
          setCurrentLineIndex(currentLineIndex - 1);
        } else {
            setCurrentLineIndex(0);
        }
    };
    
    const handleSetTimestamp = (timestamp: number) => {
        setTimeStampForCurrentLine(timestamp);
    };

    const handleDeleteTimestamp = () => {
        setTimeStampForCurrentLine(null);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            handlePreviousLine();
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            handleNextLine();

        } else if (event.key === " ") {
            event.preventDefault();
            handleSetTimestamp(audioRef?.current?.currentTime ?? 0);
            handleNextLine();
        } else if (event.key === "Backspace") {
            event.preventDefault();
            handleDeleteTimestamp();
        }
      }

    React.useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      } , [currentLineIndex, audioRef]);
    

    return (
        <div className="flex gap-2 mt-4">
        <button onClick={handlePreviousLine} disabled={currentLineIndex === 0}>
          Previous Line
        </button>
        <button onClick={handleNextLine} disabled={currentLineIndex === lines.length - 1}>
          Next Line
        </button>
        <button onClick={() => handleSetTimestamp(audioRef?.current?.currentTime ?? 0)}>
          Set Timestamp
        </button>
      </div>
    )
}