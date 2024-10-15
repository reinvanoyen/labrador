import { create } from 'zustand'

interface TGlobalState {
	isActive: boolean;
	isRecording: boolean;
	currentFrame: number;
}

const useGlobalStore = create<TGlobalState>((set) => ({
	isActive: true,
	isRecording: false,
	currentFrame: 0,
	activate: () => set((state) => ({
		isActive: true
	})),
	deactivate: () => set((state) => ({
		...state,
		isActive: false
	})),
	startRecording: () => set((state) => ({
		isRecording: true
	})),
	stopRecording: () => set((state) => ({
		isRecording: false
	})),
}));

export default useGlobalStore;