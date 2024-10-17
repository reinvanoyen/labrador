import { create } from 'zustand'

interface TExportState {
	renderedFrames: Array<string>;
	renderedVideos: Array<string>;
}

const useExportState = create<TExportState>((set) => ({
	renderedFrames: [],
	renderedVideos: [],
	clear: () => set((state) => ({
		renderedFrames: []
	})),
	addFrame: (frame: string) => set((state) => ({
		renderedFrames: [
			...state.renderedFrames,
			frame
		]
	})),
	addVideo: (video: string) => set((state) => ({
		renderedVideos: [
			...state.renderedVideos,
			video
		]
	}))
}));

export default useExportState;