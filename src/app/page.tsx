"use client"

import React from "react";
import AudioPlayer from "./components/AudioPlayer";
import Script from "./components/Script";
import TimestampControls from "./components/TimestampControls";
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
    <div className="w-full h-screen items-center justify-center flex gap-3 flex-col">
      <div className="flex flex-col h-[90%] w-[80%] border-4 items-center p-4 rounded-[10px]">
        <div className="flex gap-[50px] flex-col lg:w-full p-4 rounded-lg">
          <AudioPlayer/>
        </div>
        <div className="max-h-full overflow-y-auto lg:w-full px-[20px]">
          <Script />
        </div>
      </div>
      <TimestampControls />
    </div>
  );
}
