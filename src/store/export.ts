import { create } from 'zustand'

interface TExportState {
	renderedFrames: Array<string>;
}

const useExportState = create<TExportState>((set) => ({
	renderedFrames: [],
	clear: () => set((state) => ({
		renderedFrames: []
	})),
	addFrame: (frame: string) => set((state) => ({
		renderedFrames: [
			...state.renderedFrames,
			frame
		]
	}))
}));

export default useExportState;