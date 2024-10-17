import { create } from 'zustand'

interface TCodeState {
	code: string;
}

const useCodeStore = create<TCodeState>((set) => ({
	code: '',
	setCode: (code: string) => set((state) => ({
		code
	})),
	runCode: () => set((state) => ({
		code: state.code
	}))
}));

export default useCodeStore;