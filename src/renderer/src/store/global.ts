import { create } from 'zustand'
import useKeyframeStore from "./keyframes.ts";
import useParameterStore from "./parameters.ts";
import Environment from "../core/Environment.ts";

interface TGlobalState {
	isActive: boolean;
	isRecording: boolean;
	currentFrame: number;
	atFrameCallbacks: Record<number, unknown>,
}

const useGlobalStore = create<TGlobalState>((set, get) => ({
	isActive: false,
	isRecording: false,
	currentFrame: 0,
	atFrameCallbacks: {},
	setFrameCallback: (frame, callback) => set((state) => {
		return {
			atFrameCallbacks: {
				...state.atFrameCallbacks,
				[frame]: [
					...state.atFrameCallbacks[frame] || [],
					callback.toString()
				]
			}
		};
	}),
	setCurrentFrame: (frame) => set((state) => {
		const {currentFrame, atFrameCallbacks} = useGlobalStore.getState();
		const {keyframes} = useKeyframeStore.getState();
		const {setParameter} = useParameterStore.getState();

		if (keyframes[frame]) {
			keyframes[frame].forEach(data => {
				setParameter(data.name, data.value);
			});
		}

		if (atFrameCallbacks[frame]) {
			atFrameCallbacks[frame].forEach(callback => {
				Environment.run(`(${callback})();`);
			});
		}
		// Check if frame changed during atFrameCallbacks
		const newState = useGlobalStore.getState();
		if (newState.currentFrame !== currentFrame) {
			return {
				currentFrame: newState.currentFrame
			};
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