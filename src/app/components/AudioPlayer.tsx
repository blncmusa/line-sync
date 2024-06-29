// components/AudioPlayer.tsx
import React, { useState, useRef, useEffect } from "react";
import { faPlay, faPause, faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../store/useStore";

const AudioPlayer: React.FC = () => {
  const { audioFile, setAudioFile, setCurrentTime, setAudioRef } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTimeLocal] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setAudioRef(audioRef);
  }, [setAudioRef]);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(URL.createObjectURL(file));
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTimeLocal(audioRef.current.currentTime);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  if (!audioFile)
    return (
      <div className="flex w-full justify-center items-start space-x-4 border-b-4 pb-5 flex-col gap-3">
        <h1>Upload Audio File</h1>
        <input type="file" accept="audio/*" onChange={handleAudioUpload} />
      </div>
    );

  return (
    <div className="flex w-full items-center space-x-4 border-b-4 pb-5">
      <audio
        ref={audioRef}
        className="hidden"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={audioFile as string} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={() => skipTime(-5)} className="p-2">
        <FontAwesomeIcon icon={faBackward} /> 5s
      </button>
      <button onClick={togglePlayPause} className="p-2">
        {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
      </button>
      <button onClick={() => skipTime(5)} className="p-2">
        <FontAwesomeIcon icon={faForward} /> 5s
      </button>
      <select
        value={playbackRate}
        onChange={(e) => changePlaybackRate(Number(e.target.value))}
        className="p-2 bg-black"
      >
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={1.5}>1.5x</option>
        <option value={2}>2x</option>
      </select>
      <div className="flex items-center space-x-2 w-3/4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = Number(e.target.value);
            }
          }}
          className="w-full"
        />
        <div className="text-sm flex gap-2 pl-3">
          <p>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</p>
          <p>/</p>
          <p>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
