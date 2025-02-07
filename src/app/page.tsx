"use client"

import React from "react";
import AudioPlayer from "./components/AudioPlayer";
import Script from "./components/Script";
import TimestampControls from "./components/TimestampControls";
import { useStore } from "../store/useStore";

export default function Home() {
  const { audioFile, setAudioFile, handleScriptRemove } = useStore();

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(URL.createObjectURL(file));
    }
  };

  return (
    <>
    <div className="w-full h-screen items-center justify-center flex gap-3 flex-col bg-slate-900">
      <div className="flex flex-col h-[80%] w-[80%] shadow-2xl items-center p-4 rounded-[10px] bg-blue-950">
        <div className="flex gap-[50px] flex-col lg:w-full p-4 rounded-lg">
          <AudioPlayer/>
        </div>
        <div className="max-h-full overflow-y-auto lg:w-full px-[20px]">
          <Script />
        </div>
      </div>
      <TimestampControls/>
    </div>
    <div>
      <button onClick={handleScriptRemove} className="p-2 bg-red-500 text-white rounded-md mt-2">Remove Script</button>
    </div>
    {/* FIX THIS!!! && fix decrement by 1 */}
    </>
  );
}
