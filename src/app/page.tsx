"use client"

import React from "react";
import AudioPlayer from "./components/AudioPlayer";
import Script from "./components/Script";
import { useStore } from "../store/useStore";

export default function Home() {
  const { audioFile, setAudioFile } = useStore();

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full border-4 h-screen items-center justify-center flex gap-3">
      <div className="flex gap-[50px] flex-col">
        <div>
          {!audioFile && (
            <div>
              <h1>Upload Audio File</h1>
              <input type="file" accept="audio/*" onChange={handleAudioUpload} />
            </div>
          )}
          {audioFile && <AudioPlayer />}
        </div>
        <Script />
      </div>
    </div>
  );
}
