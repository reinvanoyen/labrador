import { create } from 'zustand'

interface TCodeState {
	code: string;
}

const useCodeStore = create<TCodeState>((set, get) => ({
	code: '',
	variables: {},
	define: (name, value) => set((state) => ({
		variables: {
			...state.variables,
			[name]: value
		}
	})),
	get: (name: string) => {
		return get().variables[name];
	},
	setCode: (code: string) => set((state) => ({
		code
	}))
}));

export default useCodeStore;