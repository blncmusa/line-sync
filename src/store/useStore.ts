import { create } from 'zustand';

interface AudioState {
    audioFile: string | null;
    scriptFile: File | null;
    scriptContent: string | null;
    setAudioFile: (audioFile: string | null) => void;
    setScriptFile: (scriptFile: File | null) => void;
    setScriptContent: (scriptContent: string | null) => void;
}

export const useStore = create<AudioState>((set) => ({
    audioFile: null,
    scriptFile: null,
    scriptContent: null,
    setAudioFile: (audioFile) => set({ audioFile }),
    setScriptFile: (scriptFile) => set({ scriptFile }),
    setScriptContent: (scriptContent) => set({ scriptContent }),
}));