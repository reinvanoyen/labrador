import { create } from 'zustand'
import useKeyframeStore from "./keyframes.ts";
import useParameterStore from "./parameters.ts";

interface TGlobalState {
	isActive: boolean;
	isRecording: boolean;
	currentFrame: number;
}

const useGlobalStore = create<TGlobalState>((set, get) => ({
	isActive: false,
	isRecording: false,
	currentFrame: 0,
	setCurrentFrame: (frame) => set((state) => {
		const {keyframes} = useKeyframeStore.getState();
		const {setParameter} = useParameterStore.getState();

		if (keyframes[frame]) {
			keyframes[frame].forEach(data => {
				setParameter(data.name, data.value);
			});
		}

		return {
			currentFrame: frame
		};
	}),
	activate: () => set((state) => ({
		isActive: true
	})),
	deactivate: () => set((state) => ({
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