import { create } from 'zustand'

const useKeyframeStore = create((set) => ({
	keyframes: {},
	keyframeProperties: {},
	setKeyframe: (frame, name, value) => set((state) => ({
		keyframeProperties: {
			...state.keyframeProperties,
			[name]: [
				...state.keyframeProperties[name] || [],
				frame
			]
		},
		keyframes: {
			...state.keyframes,
			[frame]: [
				...state.keyframes[frame] || [],
				{
					name,
					value
				}
			]
		}
	}))
}));

export default useKeyframeStore;