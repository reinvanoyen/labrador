import { create } from 'zustand'

interface TGlobalState {
	isActive: boolean;
	currentFrame: number;
}

const useGlobalStore = create<TGlobalState>((set) => ({
	isActive: true,
	currentFrame: 0,
	activate: () => set((state) => ({
		...state,
		isActive: true
	})),
	deactivate: () => set((state) => ({
		...state,
		isActive: false
	}))
}));

export default useGlobalStore;