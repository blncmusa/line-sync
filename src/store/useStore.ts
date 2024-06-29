import { create } from 'zustand';
import React from 'react';

interface Line {
    text: string;
    timestamp: number | null
}
interface AudioState {
    audioFile: string | null;
    scriptFile: File | null;
    scriptContent: string | null;
    lines: Line[];
    currentLineIndex: number;
    audioRef: React.RefObject<HTMLAudioElement> | null;
    currentTime: number;
    setLines: (lines: Line[]) => void;
    setCurrentLineIndex: (currentLineIndex: number) => void;
    setTimeStampForCurrentLine: (timestamp: number) => void;
    setAudioFile: (audioFile: string | null) => void;
    setCurrentTime: (currentTime: number) => void;
    setAudioRef: (audioRef: React.RefObject<HTMLAudioElement>) => void;
    setScriptFile: (scriptFile: File | null) => void;
    setScriptContent: (scriptContent: string | null) => void;
}


export const useStore = create<AudioState>((set) => ({
    audioFile: null,
    scriptFile: null,
    scriptContent: null,
    lines: [],
    currentLineIndex: 0,
    audioRef: null,
    currentTime: 0,
    setAudioRef: (audioRef) => set({ audioRef }),
    setCurrentTime: (currentTime) => set({ currentTime }),
    setAudioFile: (audioFile) => set({ audioFile }),
    setScriptFile: (scriptFile) => set({ scriptFile }),
    setScriptContent: (scriptContent) => set({ scriptContent }),
    setLines: (lines) => set({ lines }),
    setCurrentLineIndex: (currentLineIndex) => set({ currentLineIndex }),
    setTimeStampForCurrentLine: (timestamp) => set((state) => {
        const updatedLines = [...state.lines];
        updatedLines[state.currentLineIndex] = {
            ...updatedLines[state.currentLineIndex],
            timestamp
        };
        return { lines: updatedLines };
    })
}));