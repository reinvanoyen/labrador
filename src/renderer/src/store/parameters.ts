import { create } from 'zustand'

const useParameterStore = create((set) => ({
	parameters: {},
	setParameter: (name, value) => set((state) => ({
		parameters: {
			...state.parameters,
			[name]: value
		}
	}))
}));

export default useParameterStore;