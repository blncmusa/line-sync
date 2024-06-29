import { useStore } from "../../store/useStore";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons"

export default function TimestampControls(){

    const {
        lines,
        currentLineIndex,
        setCurrentLineIndex,
        setTimeStampForCurrentLine,
        audioRef,
      } = useStore();

    const handleNextLine = () => {
      if(currentLineIndex < lines.length - 1){
        setCurrentLineIndex(currentLineIndex + 1);
      }
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

        } else if (event.key === "Enter") {
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
        <div className="flex gap-[50px] mt-4">
        <button onClick={handlePreviousLine} disabled={currentLineIndex === 0}>
          <FontAwesomeIcon icon={faCircleLeft} className="text-[50px]"/>
        </button>
        <button 
          onClick={() => handleSetTimestamp(audioRef?.current?.currentTime ?? 0)}
          className="border-2 p-4 rounded-md"
        >
          Set Timestamp
        </button>
        
        <button onClick={handleNextLine} disabled={currentLineIndex === lines.length - 1}>
          <FontAwesomeIcon icon={faCircleRight} className="text-[50px]"/>
        </button>
      </div>
    )
}