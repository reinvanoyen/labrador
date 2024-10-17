import { create } from 'zustand'

interface TFileState {
	filename: string;
}

const useFileStore = create<TFileState>((set) => ({
	filename: 'Untitled',
	setFilename: (filename: string) => set((state) => ({
		filename
	}))
}));

export default useFileStore;