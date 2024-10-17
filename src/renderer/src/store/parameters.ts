import { create } from 'zustand'
import useControlStore from "./controls.ts";

const useParameterStore = create((set) => ({
	parameters: {},
	setParameter: (name, value) => set((state) => {

		const {onChangeCallbacks} = useControlStore.getState();

		if (onChangeCallbacks[name]) {
			onChangeCallbacks[name].forEach(callback => {
				callback(value);
			});
		}

		return {
			parameters: {
				...state.parameters,
				[name]: value
			}
		}
	})
}));

export default useParameterStore;